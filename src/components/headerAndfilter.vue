<template>
	<div>
		<div class="header_goToHistory">
			<span class="tips">已經預訂行程了嗎?</span>
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
			<div v-if="componentType == 'planeTicket'">
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
			<div v-else-if="componentType == 'hotel'">
				<div class="card fz-0">
					<div class="row">
						<div class="inputGroup">
							<input type="text" id="input-hotel" v-model="book.hotel.name" required/>
							<label for="input-hotel" class="">入住飯店</label>
						</div>
					</div>
					<div class="row">
						<div class="inputGroup width-half">
							<input type="date" value="" v-model="book.hotel.checkInDate"/>
							<label class="">入住日期</label>
						</div>
						<div class="inputGroup width-half">
							<input type="date" value="" v-model="book.hotel.checkOutDate"/>
							<label class="">退房日期</label>
						</div>
					</div>
					<div class="row">
						<div class="inputGroup ta-left">
							<p><span class="fz-12 op-60">入住人數</span></p>
							<div class="row" style="padding: 8px 0 0;">
								<div class="inputGroup_content ta-center">
									<button class="btn_count minus" @click="guestNum(book.hotel.hotelPrefer.countAdult,'hotelAdult','minus')" :class="{disabled: book.hotel.hotelPrefer.countAdult == false}"></button>
									<span class="fz-22 text-purple guestNumber">{{ book.hotel.hotelPrefer.countAdult }}</span>
									<span class="fz-14"> 成人</span>
									<button class="btn_count plus" @click="guestNum('','hotelAdult','plus')"></button>
								</div>
								<div class="inputGroup_content ta-center">
									<button class="btn_count minus" @click="guestNum(book.hotel.hotelPrefer.countChild,'hotelChild','minus')" :class="{disabled: book.hotel.hotelPrefer.countChild == false}"></button>
									<span class="fz-22 text-purple guestNumber">{{ book.hotel.hotelPrefer.countChild }}</span>
									<span class="fz-14"> 兒童</span>
									<button class="btn_count plus" @click="guestNum('','hotelChild','plus')"></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="card fz-0">
					<div class="row">
						<div class="inputGroup width-half">
							<input type="text" id="input-start-rent" v-model="book.rentCar.startLoaction" required/>
							<label for="input-start-rent" class="">租車地</label>
						</div>
						<div class="inputGroup width-half">
							<input type="text" id="input-end-rent" v-model="book.rentCar.endLoaction" required/>
							<label for="input-end-rent" class="">還車地</label>
						</div>
					</div>
					<div class="row">
						<div class="inputGroup width-half">
							<input type="date" value="" v-model="book.rentCar.startDate"/>
							<label class="">租車日</label>
						</div>
						<div class="inputGroup width-half">
							<input type="time" id="input-start-time-rentCar" v-model="book.rentCar.startTime"/>
							<label for="input-start-time-rentCar" class="">租車時間</label>
						</div>
					</div>
					<div class="row">
						<div class="inputGroup width-half">
							<input type="date" value="" v-model="book.rentCar.endDate"/>
							<label class="">還車日</label>
						</div>
						<div class="inputGroup width-half">
							<input type="time" id="input-end-time-rentCar" v-model="book.rentCar.endTime"/>
							<label for="input-end-time-rentCar" class="">還車時間</label>
						</div>
					</div>
					<div class="row">
						<div class="inputGroup">
							<input type="text" id="input-car" v-model="book.rentCar.preferCar" required/>
							<label for="input-car" class="">指定車款</label>
						</div>
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
			imgGoToHistory: require('@/assets/images_booking/arrow-right-white.png'),
			imgPlane: require('@/assets/images_booking/airplane.svg'),
			imgHotel: require('@/assets/images_booking/bed.svg'),
			imgRentCar: require('@/assets/images_booking/car.svg'),
			isSingle: false,
			componentType: 'planeTicket',
			positionY: 0,

			planeClasses:['不限艙等', '經濟艙', '豪華經濟艙', '商務艙', '頭等艙'],
			planeCompanies:['不限航空公司','中華航空','長榮航空','台灣虎航'],
			book:{
				planeTicket:{
					departure:{
						location: '',
						date: '',
						time: ''
					},
					terminal:{
						location: '',
						date: '',
						time: ''
					},
					planePrefer:{
						countAdult: 0,
						countChild: 0,
						planeClass: '不限艙等',
						planeCompany: '不限航空公司'
					},
				},
				hotel:{
					name: '',
					checkInDate: '',
					checkOutDate: '',
					hotelPrefer:{
						countAdult: 0,
						countChild: 0,
					},
				},
				rentCar:{
					startLoaction: '',
					endLoaction: '',
					startDate: '',
					endDate: '',
					startTime: '',
					endTime: '',
					preferCar: ''
				}
			},
		}
	},
	computed:{
		
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
                    case 'hotelAdult':
                        this.book.hotel.hotelPrefer.countAdult--;
                        break;
                    case 'hotelChild':
                        this.book.hotel.hotelPrefer.countChild--;
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
                    case 'hotelAdult':
                        this.book.hotel.hotelPrefer.countAdult++;
                        break;
                    case 'hotelChild':
                        this.book.hotel.hotelPrefer.countChild++;
                        break;
                }
            }
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

<style lang="sass" scoped>
select
	width: 100%
	border: 0
	appearance: none
.ta-right select
	direction: rtl
.disabled
	opacity: 0.2
</style>