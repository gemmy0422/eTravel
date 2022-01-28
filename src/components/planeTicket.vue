<template>
	<div>
        <div class="card_tabsGroup fz-0">
            <div class="card_tab" :class="{active: isSingle == false}" @click="isSingle = false">
                <span>來回</span>
            </div>
            <div class="card_tab" :class="{active: isSingle == true}" @click="isSingle = true">
                <span>單程</span>
            </div>
        </div>
        <div class="card card-bd0088 fz-0">
            <div class="row">
                <div class="inputGroup width-half">
                    <input type="text" id="input-departure" v-model="book.planeTicket.departureLocation"/>
                    <label for="input-departure">出發地</label>
                </div>
                <div class="inputGroup width-half">
                    <input type="text" id="input-terminal" v-model="book.planeTicket.terminalLocation"/>
                    <label for="input-terminal">目的地</label>
                </div>
            </div>
            <div class="row">
                <div class="inputGroup width-half">
                    <input type="date" id="input-start-date" v-model="book.planeTicket.departureDate" @change="verifyDate('start')" placeholder="ex: 2000-01-01"/>
                    <label for="input-start-date">出發日</label>
                </div>
                <div class="inputGroup width-half">
                    <input type="time" id="input-start-time" v-model="book.planeTicket.departureTime" placeholder="ex: 12:00"/>
                    <label for="input-start-time">出發時間</label>
                </div>
            </div>
            <div class="row" v-if="!isSingle">
                <div class="inputGroup width-half">
                    <input type="date" id="input-back-date" v-model="book.planeTicket.terminalDate" @change="verifyDate('end')" placeholder="ex: 2000-01-01"/>
                    <label for="input-back-date">回程日</label>
                </div>
                <div class="inputGroup width-half">
                    <input type="time" id="input-back-time" v-model="book.planeTicket.terminalTime" placeholder="ex: 12:00"/>
                    <label for="input-back-time">回程時間</label>
                </div>
            </div>
            <div class="row">
                <div class="inputGroup ta-left">
                    <p><span class="fz-12 text-secondary">旅客人數</span></p>
                    <div class="row" style="padding: 8px 0 0;">
                        <div class="inputGroup_content ta-center">
                            <button class="btn_count minus" @click="guestNum(book.planeTicket.planeAdult,'planeAdult','minus')" :class="{disabled: book.planeTicket.planeAdult < 2}"></button>
                            <span class="fz-22 text-primary guestNumber">{{ book.planeTicket.planeAdult }}</span>
                            <span class="fz-14"> 成人</span>
                            <button class="btn_count plus" @click="guestNum('','planeAdult','plus')"></button>
                        </div>
                        <div class="inputGroup_content ta-center">
                            <button class="btn_count minus" @click="guestNum(book.planeTicket.planeChild,'planeChild','minus')" :class="{disabled: book.planeTicket.planeChild == false}"></button>
                            <span class="fz-22 text-primary guestNumber">{{ book.planeTicket.planeChild }}</span>
                            <span class="fz-14"> 兒童</span>
                            <button class="btn_count plus" @click="guestNum('','planeChild','plus')"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="inputGroup width-half ta-left">
                    <p><span class="fz-12 text-secondary">艙等偏好</span></p>
                    <select v-model="book.planeTicket.planeClass">
                        <option v-for="planeClass in planeClasses" :key="planeClass">{{ planeClass }}</option>
                    </select>
                </div>
                <div class="inputGroup width-half ta-right">
                    <p><span class="fz-12 text-secondary">航空公司偏好</span></p>
                    <select v-model="book.planeTicket.planeCompany">
                        <option v-for="planeCompany in planeCompanies" :key="planeCompany">{{ planeCompany }}</option>
                    </select>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

export default {
	data() {
		return {
            isSingle: false,
			planeClasses:['不限艙等', '經濟艙', '豪華經濟艙', '商務艙', '頭等艙'],
			planeCompanies:['不限航空公司','中華航空','長榮航空','台灣虎航'],
			book:{
				planeTicket:{
                    departureLocation: '',
                    departureDate: '',
                    departureWeekDay: '',
                    departureTime: '',
                    terminalLocation: '',
                    terminalDate: '',
                    terminalWeekDay: '',
                    terminalTime: '',
					planeAdult: 1,
                    planeChild: 0,
                    planeClass: '不限艙等',
                    planeCompany: '不限航空公司'
				}
			},
		}
	},
	computed:{
        startDayFn(){
            let dayIndex = new Date(this.book.planeTicket.departureDate).getDay();
            return `週${['日', '一', '二', '三', '四', '五', '六'][dayIndex]}`;
        },
        endDayFn(){
            let dayIndex = new Date(this.book.planeTicket.terminalDate).getDay();
            return `週${['日', '一', '二', '三', '四', '五', '六'][dayIndex]}`;
        }
    },
    watch: {
        startDayFn() {
            this.book.planeTicket.departureWeekDay = this.startDayFn
        },
        endDayFn() {
            this.book.planeTicket.terminalWeekDay = this.endDayFn
        },
    },
	methods:{
        // val = 多少人 || type = 機票/飯店 的 大人/小孩 || calc = 增加|減少
        guestNum(val,type,calc){
            if(type == 'planeAdult'){
                switch(calc){
                    case 'minus':
                        if(val < 2) return false;
                        this.book.planeTicket.planeAdult--;
                        break;
                    case 'plus':
                        this.book.planeTicket.planeAdult++;
                        break;
                }
            }else{
                switch(calc){
                    case 'minus':
                        if(!val) return false;
                        this.book.planeTicket.planeChild--;
                        break;
                    case 'plus':
                        this.book.planeTicket.planeChild++;
                        break;
                }
            }
        },
        verifyDate(val){
            let nowYear = new Date().getFullYear();
            let nowMonth = new Date().getMonth()+1;
            let nowDate = new Date().getDate();
            let bookDepartureArray = this.book.planeTicket.departureDate.split('-')
            let bookTerminalArray = this.book.planeTicket.terminalDate.split('-')
            if(val == 'start'){
                if(bookDepartureArray[0] == nowYear){
                    if(bookDepartureArray[1] == nowMonth){
                        if(bookDepartureArray[2] >= nowDate) return true
                        else alert("出發日錯誤"); this.book.planeTicket.departureDate = '';
                        return true
                    }else if(bookDepartureArray[1] > nowMonth){
                        return true
                    }else alert("出發日錯誤"); this.book.planeTicket.departureDate = '';
                }else if(bookDepartureArray[0] > nowYear){
                    return true
                }else alert("出發日錯誤"); this.book.planeTicket.departureDate = '';
            }else{
                if(bookTerminalArray[0] == bookDepartureArray[0]){
                    if(bookTerminalArray[1] == bookDepartureArray[1]){
                        if(bookTerminalArray[2] >= bookDepartureArray[2]) return true
                        else alert("回程日錯誤"); this.book.planeTicket.terminalDate = '';
                        return true
                    }else if(bookTerminalArray[1] > bookDepartureArray[1]){
                        return true
                    }else alert("回程日錯誤"); this.book.planeTicket.terminalDate = '';
                }else if(bookTerminalArray[0] > bookDepartureArray[0]){
                    return true
                }else alert("回程日錯誤"); this.book.planeTicket.terminalDate = '';
            }
        }
    }
}
</script>