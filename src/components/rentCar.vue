<template>
    <div class="card fz-0">
        <div class="row">
            <div class="inputGroup width-half">
                <input type="text" id="input-start-rent" v-model="book.rentCar.startLocation"/>
                <label for="input-start-rent" class="">租車地</label>
            </div>
            <div class="inputGroup width-half">
                <input type="text" id="input-end-rent" v-model="book.rentCar.endLocation"/>
                <label for="input-end-rent" class="">還車地</label>
            </div>
        </div>
        <div class="row">
            <div class="inputGroup width-half">
                <input type="date" v-model="book.rentCar.startDate" @change="verifyDate('start')" placeholder="ex: 2000-01-01"/>
                <label class="">租車日</label>
            </div>
            <div class="inputGroup width-half">
                <input type="time" id="input-start-time-rentCar" v-model="book.rentCar.startTime" placeholder="ex: 12:00"/>
                <label for="input-start-time-rentCar" class="">租車時間</label>
            </div>
        </div>
        <div class="row">
            <div class="inputGroup width-half">
                <input type="date" v-model="book.rentCar.endDate" @change="verifyDate('end')" placeholder="ex: 2000-01-01"/>
                <label class="">還車日</label>
            </div>
            <div class="inputGroup width-half">
                <input type="time" id="input-end-time-rentCar" v-model="book.rentCar.endTime" placeholder="ex: 12:00"/>
                <label for="input-end-time-rentCar" class="">還車時間</label>
            </div>
        </div>
        <div class="row">
            <div class="inputGroup">
                <input type="text" id="input-car" v-model="book.rentCar.preferCar"/>
                <label for="input-car" class="">指定車款</label>
            </div>
        </div>
    </div>
</template>

<script>

export default {
	name: 'app',
	data() {
		return {
			book:{
				rentCar:{
					startLocation: '',
					endLocation: '',
                    startDate: '',
                    startDay: '',
					endDate: '',
					endDay: '',
					startTime: '',
					endTime: '',
					preferCar: ''
				}
			},
		}
	},
	computed:{
        startDayFn(){
            let dayIndex = new Date(this.book.rentCar.startDate).getDay();
            return `週${['日', '一', '二', '三', '四', '五', '六'][dayIndex]}`;
        },
        endDayFn(){
            let dayIndex = new Date(this.book.rentCar.endDate).getDay();
            return `週${['日', '一', '二', '三', '四', '五', '六'][dayIndex]}`;
        }
    },
    watch: {
        startDayFn() {
            this.book.rentCar.startDay = this.startDayFn
        },
        endDayFn() {
            this.book.rentCar.endDay = this.endDayFn
        },
    },
	methods:{
        verifyDate(val){
            let nowYear = new Date().getFullYear();
            let nowMonth = new Date().getMonth()+1;
            let nowDate = new Date().getDate();
            let bookStartArray = this.book.rentCar.startDate.split('-')
            let bookEndArray = this.book.rentCar.endDate.split('-')
            if(val == 'start'){
                if(bookStartArray[0] == nowYear){
                    if(bookStartArray[1] == nowMonth){
                        if(bookStartArray[2] >= nowDate) return true
                        else alert("租車日錯誤"); this.book.rentCar.startDate = '';
                        return true
                    }else if(bookStartArray[1] > nowMonth){
                        return true
                    }else alert("租車日錯誤"); this.book.rentCar.startDate = '';
                }else if(bookStartArray[0] > nowYear){
                    return true
                }else alert("租車日錯誤"); this.book.rentCar.startDate = '';
            }else{
                if(bookEndArray[0] == bookStartArray[0]){
                    if(bookEndArray[1] == bookStartArray[1]){
                        if(bookEndArray[2] >= bookStartArray[2]) return true
                        else alert("還車日錯誤"); this.book.rentCar.endDate = '';
                        return true
                    }else if(bookEndArray[1] > bookStartArray[1]){
                        return true
                    }else alert("還車日錯誤"); this.book.rentCar.endDate = '';
                }else if(bookEndArray[0] > bookStartArray[0]){
                    return true
                }else alert("還車日錯誤"); this.book.rentCar.endDate = '';
            }
        }
	}
}
</script>