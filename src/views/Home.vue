<template>
	<div class="container">
		<div class="header">
			<span class="">已經預訂行程了嗎?</span>
			<a href="javascript:;" class="goToPage goToHistory" @click="goToHistory">
				<span class="fz-14">前往紀錄</span>
				<img :src="imgGoToHistory" alt="goToHistory">
			</a>
		</div>
		<div class="tabsGroup" :class="{scroll: positionY}">
			<button class="tab ta-center" :class="{active: componentType == 'planeTicket'}" @click="componentType = 'planeTicket'" v-scroll-to="'#app'">
				<div class="tab_img">
					<img :src="imgPlane" alt="hotel">
				</div>
				<span>機票</span>
			</button>
			<button class="tab ta-center" :class="{active: componentType == 'hotel'}" @click="componentType = 'hotel'" v-scroll-to="'#app'">
				<div class="tab_img">
					<img :src="imgHotel" alt="hotel">
				</div>
				<span>飯店</span>
			</button>
			<button class="tab ta-center" :class="{active: componentType == 'rentCar'}" @click="componentType = 'rentCar'" v-scroll-to="'#app'">
				<div class="tab_img">
					<img :src="imgRentCar" alt="rentCar">
				</div>
				<span>租車</span>
			</button>
		</div>
		<div class="content">
			<bookType ref="bookType" v-bind:componentType="componentType"></bookType>
		</div>
		<infoForm ref="infoForm"></infoForm>
		<div class="btn" @click="confirmSend()">
			<span>確認送出</span>
		</div>
	</div>
</template>

<script>
import infoForm from '../components/infoForm'
import bookType from '../components/bookType'
import axios from 'axios'

export default {
	name: 'Home',
	components: {
		infoForm,
		bookType,
	},
	data(){
		return{
			imgGoToHistory: require('@/assets/images/arrow-right-white.png'),
			imgPlane: require('@/assets/images/airplane.svg'),
			imgHotel: require('@/assets/images/bed.svg'),
			imgRentCar: require('@/assets/images/car.svg'),

			componentType: 'planeTicket',
			positionY: 0,
			testObj: {}
		}
	},
	methods:{
		confirmSend(){
			let book = this.$refs.bookType.$children[0].book;
			let mainContact = this.$refs.infoForm.mainContact;
			let note = this.$refs.infoForm.note;
			// let d = function(){ // 選租車需隱藏
			// 	this.componentType == 'rentCar'? false : this.$refs.infoForm.$children[0].guestInfo
			// };
			let frontWord = this.componentType == 'planeTicket'? '票-' : this.componentType == 'hotel' ? '住-' : '租-';
			let stateRandom = function(){
				let randomNum = Math.floor(Math.random()*10) % 3
				if(randomNum == 0) return '待處理'
				else if(randomNum == 1) return '處理中'
				else return '已處理'
			}
			let date = {
				toggleItem: false,
				bookNumber: frontWord + Math.floor(Math.random()*10000),
				bookDate: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
				state: stateRandom(),
			};

			// 預訂選項判斷
			if(this.$refs.bookType.$children[0].isSingle == true){
				[book.planeTicket.terminalDate, book.planeTicket.terminalTime, book.planeTicket.terminalWeekDay] = ["null","null","null"]
			}
			let IdentifyA = Object.values(Object.values(book)[0]).map(function(val){
				if(typeof(val) == "number"){
					if(val > -1) return true
					else return
				}else{
					if(val.length > 0) return true
					else return
				}
			}).every(val => val == true);

			// 聯絡人資料判斷
			let IdentifyB = Object.values(mainContact).every(val => val.length > 0);

			// 備註修正
			note.content.length > 0 ? note.content : note.content = "無"

			if(!IdentifyA && !IdentifyB){
				alert("預訂選項及聯絡人資料未填寫正確");
				return false;
			}else if(!IdentifyA){
				alert("預定選項未填寫正確");
				return false;
			}else if(!IdentifyB){
				alert("聯絡人資料未填寫正確");
				return false;
			}else{
				this.testObj = Object.assign(book,mainContact,note,date)
			}

			axios.post("https://etravel-f011c.firebaseio.com/data.json",this.testObj).then((res) => {
				this.$store.commit("addContent", res.data)
			}).then(() => {
				this.$router.go(0);
				window.scrollTo(0,0);
			})
		},

		goToHistory(){
			this.$router.push({name: "History"});
		}
	},
	mounted(){
		window.addEventListener('scroll', () => {
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || document.querySelector('#app').scrollTop;
			if (scrollTop >= 48) {
				this.positionY = true
			} else {
				this.positionY = false
			}
		});
	},
	beforeDestroy(){
		window.removeEventListener('scroll')
	}
}
</script>

<style lang="sass">
.content
	margin-top: 170px
select
	width: 100%
	border: 0
	appearance: none
.ta-right select
	direction: rtl
.disabled
	opacity: 0.2
.inputGroup.width-half input[type="date"]
	white-space: nowrap
</style>