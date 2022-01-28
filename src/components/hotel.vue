<template>
    <div class="card fz-0">
        <div class="row">
            <div class="inputGroup">
                <input type="text" id="input-hotel" v-model="book.hotel.name"/>
                <label for="input-hotel" class="">入住飯店</label>
            </div>
        </div>
        <div class="row">
            <div class="inputGroup width-half">
                <input type="date" v-model="book.hotel.checkInDate" @change="verifyDate('start')" placeholder="ex: 2000-01-01"/>
                <label class="">入住日期</label>
            </div>
            <div class="inputGroup width-half">
                <input type="date" v-model="book.hotel.checkOutDate" @change="verifyDate('end')" placeholder="ex: 2000-01-01"/>
                <label class="">退房日期</label>
            </div>
        </div>
        <div class="row">
            <div class="inputGroup ta-left">
                <p><span class="fz-12 text-secondary">入住人數</span></p>
                <div class="row" style="padding: 8px 0 0;">
                    <div class="inputGroup_content ta-center">
                        <button class="btn_count minus" @click="guestNum(book.hotel.hotelAdult,'hotelAdult','minus')" :class="{disabled: book.hotel.hotelAdult < 2}"></button>
                        <span class="fz-22 text-primary guestNumber">{{ book.hotel.hotelAdult }}</span>
                        <span class="fz-14"> 成人</span>
                        <button class="btn_count plus" @click="guestNum('','hotelAdult','plus')"></button>
                    </div>
                    <div class="inputGroup_content ta-center">
                        <button class="btn_count minus" @click="guestNum(book.hotel.hotelChild,'hotelChild','minus')" :class="{disabled: book.hotel.hotelChild == false}"></button>
                        <span class="fz-22 text-primary guestNumber">{{ book.hotel.hotelChild }}</span>
                        <span class="fz-14"> 兒童</span>
                        <button class="btn_count plus" @click="guestNum('','hotelChild','plus')"></button>
                    </div>
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
			book:{
				hotel:{
					name: '',
					checkInDate: '',
					checkInDay: '',
					checkOutDate: '',
					checkOutDay: '',
                    hotelAdult: 1,
                    hotelChild: 0,
				}
			},
		}
	},
	computed:{
        startDayFn(){
            let dayIndex = new Date(this.book.hotel.checkInDate).getDay();
            return `週${['日', '一', '二', '三', '四', '五', '六'][dayIndex]}`;
        },
        endDayFn(){
            let dayIndex = new Date(this.book.hotel.checkOutDate).getDay();
            return `週${['日', '一', '二', '三', '四', '五', '六'][dayIndex]}`;
        }
    },
    watch: {
        startDayFn() {
            this.book.hotel.checkInDay = this.startDayFn
        },
        endDayFn() {
            this.book.hotel.checkOutDay = this.endDayFn
        },
    },
	methods:{
        // val = 多少人 || type = 機票/飯店 的 大人/小孩 || calc = 增加|減少
        guestNum(val,type,calc){
            if(type == 'hotelAdult'){
                switch(calc){
                    case 'minus':
                        if(val < 2) return false;
                        this.book.hotel.hotelAdult--;
                        break;
                    case 'plus':
                        this.book.hotel.hotelAdult++;
                        break;
                }
            }else{
                switch(calc){
                    case 'minus':
                        if(!val) return false;
                        this.book.hotel.hotelChild--;
                        break;
                    case 'plus':
                        this.book.hotel.hotelChild++;
                        break;
                }
            }
        },
        verifyDate(val){
            let nowYear = new Date().getFullYear();
            let nowMonth = new Date().getMonth()+1;
            let nowDate = new Date().getDate();
            let bookCheckInArray = this.book.hotel.checkInDate.split('-')
            let bookCheckOutArray = this.book.hotel.checkOutDate.split('-')
            if(val == 'start'){
                if(bookCheckInArray[0] == nowYear){
                    if(bookCheckInArray[1] == nowMonth){
                        if(bookCheckInArray[2] >= nowDate) return true
                        else alert("入住日錯誤"); this.book.hotel.checkInDate = '';
                        return true
                    }else if(bookCheckInArray[1] > nowMonth){
                        return true
                    }else alert("入住日錯誤"); this.book.hotel.checkInDate = '';
                }else if(bookCheckInArray[0] > nowYear){
                    return true
                }else alert("入住日錯誤"); this.book.hotel.checkInDate = '';
            }else{
                if(bookCheckOutArray[0] == bookCheckInArray[0]){
                    if(bookCheckOutArray[1] == bookCheckInArray[1]){
                        if(bookCheckOutArray[2] >= bookCheckInArray[2]) return true
                        else alert("退房日錯誤"); this.book.hotel.checkOutDate = '';
                        return true
                    }else if(bookCheckOutArray[1] > bookCheckInArray[1]){
                        return true
                    }else alert("退房日錯誤"); this.book.hotel.checkOutDate = '';
                }else if(bookCheckOutArray[0] > bookCheckInArray[0]){
                    return true
                }else alert("退房日錯誤"); this.book.hotel.checkOutDate = '';
            }
        }
	}
}
</script>