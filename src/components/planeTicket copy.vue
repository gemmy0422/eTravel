// Vuex

<template>
	<div>
        <div class="card_tabsGroup fz-0">
            <div class="card_tab" :class="{active: isSingle == false}" @click="isSingle = false">
                <span class="">來回</span>
            </div>
            <div class="card_tab" :class="{active: isSingle == true}" @click="isSingle = true">
                <span class="">單程</span>
            </div>
        </div>
        <div class="card card-bd0088 fz-0">
            <div class="row">
                <div class="inputGroup width-half">
                    <input type="text" id="input-departure" v-model="book.planeTicket.departure.location" required/>
                    <label for="input-departure" class="">出發地</label>
                </div>
                <div class="inputGroup width-half">
                    <input type="text" id="input-terminal" v-model="book.planeTicket.terminal.location" required/>
                    <label for="input-terminal" class="">目的地</label>
                </div>
            </div>
            <div class="row">
                <div class="inputGroup width-half">
                    <input type="date" value="" id="input-start-date" v-model="book.planeTicket.departure.date"/>
                    <label for="input-start-date" class="">出發日</label>
                </div>
                <div class="inputGroup width-half">
                    <input type="time" id="input-start-time" v-model="book.planeTicket.departure.time"/>
                    <label for="input-start-time" class="">出發時間</label>
                </div>
            </div>
            <div class="row" v-if="!isSingle">
                <div class="inputGroup width-half">
                    <input type="date" value="" id="input-back-date" v-model="book.planeTicket.terminal.date"/>
                    <label for="input-back-date" class="">回程日</label>
                </div>
                <div class="inputGroup width-half">
                    <input type="time" id="input-back-time" v-model="book.planeTicket.terminal.time"/>
                    <label for="input-back-time" class="">回程時間</label>
                </div>
            </div>
            <div class="row">
                <div class="inputGroup ta-left">
                    <p><span class="fz-12 op-60">旅客人數</span></p>
                    <div class="row" style="padding: 8px 0 0;">
                        <div class="inputGroup_content ta-center">
                            <button class="btn_count minus" @click="guestNum(book.planeTicket.planePrefer.countAdult,'planeAdult','minus')" :class="{disabled: book.planeTicket.planePrefer.countAdult == false}"></button>
                            <span class="fz-22 text-purple guestNumber">{{ book.planeTicket.planePrefer.countAdult }}</span>
                            <span class="fz-14"> 成人</span>
                            <button class="btn_count plus" @click="guestNum('','planeAdult','plus')"></button>
                        </div>
                        <div class="inputGroup_content ta-center">
                            <button class="btn_count minus" @click="guestNum(book.planeTicket.planePrefer.countChild,'planeChild','minus')" :class="{disabled: book.planeTicket.planePrefer.countChild == false}"></button>
                            <span class="fz-22 text-purple guestNumber">{{ book.planeTicket.planePrefer.countChild }}</span>
                            <span class="fz-14"> 兒童</span>
                            <button class="btn_count plus" @click="guestNum('','planeChild','plus')"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="inputGroup width-half ta-left">
                    <p><span class="fz-12 op-60">艙等偏好</span></p>
                    <!-- <span class="">不限艙等</span> -->
                    <select v-model="book.planeTicket.planePrefer.planeClass">
                        <option v-for="planeClass in planeClasses" :key="planeClass">{{ planeClass }}</option>
                    </select>
                </div>
                <div class="inputGroup width-half ta-right">
                    <p><span class="fz-12 op-60">航空公司偏好</span></p>
                    <!-- <span class="">不限航空公司</span> -->
                    <select v-model="book.planeTicket.planePrefer.planeCompany">
                        <option v-for="planeCompany in planeCompanies" :key="planeCompany">{{ planeCompany }}</option>
                    </select>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

export default {
	name: 'app',
	component:{
		
	},
	data() {
		return {
            isSingle: false,
            
			planeClasses:['不限艙等', '經濟艙', '豪華經濟艙', '商務艙', '頭等艙'],
			planeCompanies:['不限航空公司','中華航空','長榮航空','台灣虎航'],
			book:{
				planeTicket:{
					departure:{
						location: '',
                        date: '',
                        weekDay: '',
						time: ''
					},
					terminal:{
						location: '',
                        date: '',
                        weekDay: '',
						time: ''
					},
					planePrefer:{
						countAdult: 0,
						countChild: 0,
						planeClass: '不限艙等',
						planeCompany: '不限航空公司'
					},
				}
			},
		}
	},
	computed:{
        startDayFn(){
            let dayIndex = new Date(this.book.planeTicket.departure.date).getDay();
            return `週${['日', '一', '二', '三', '四', '五', '六'][dayIndex]}`;
        },
        endDayFn(){
            let dayIndex = new Date(this.book.planeTicket.terminal.date).getDay();
            return `週${['日', '一', '二', '三', '四', '五', '六'][dayIndex]}`;
        }
    },
    watch: {
        startDayFn() {
            this.book.planeTicket.departure.weekDay = this.startDayFn
        },
        endDayFn() {
            this.book.planeTicket.terminal.weekDay = this.endDayFn
        },
    },
	methods:{
        // val = 多少人 || type = 機票/飯店 的 大人/小孩 || calc = 增加|減少
        guestNum(val,type,calc){
            if(calc == 'minus'){
                if(!val) return false;
                switch (type) {
                    case 'planeAdult':
                        this.book.planeTicket.planePrefer.countAdult--;
                        break;
                    case 'planeChild':
                        this.book.planeTicket.planePrefer.countChild--;
                        break;
                }
            }else{
                switch (type) {
                    case 'planeAdult':
                        this.book.planeTicket.planePrefer.countAdult++;
                        break;
                    case 'planeChild':
                        this.book.planeTicket.planePrefer.countChild++;
                        break;
                }
            }
            // this.$store.commit('',val)
		}
	}
}
</script>