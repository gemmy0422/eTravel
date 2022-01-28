<template>
	<!-- <ul> -->
		<!-- <li v-for="amount in amounts" :key="amount"> -->
			<div class="guestInfo">
				<div class="listGroup" style="height: 40px;">
					<p><span class="fz-14">旅客{{`${amount}`}}</span></p>
					<div class="btn-function">
						<div class="renew" @click="renew"></div>
					</div>
				</div>
				<div class="listGroup">
					<div class="title fz-0">
						<span class="fz-14 op-60">英文姓</span>
					</div>
					<input type="text" placeholder="請輸入旅客護照英文姓" v-model.lazy="guestInfo.passportFirstName">
				</div>
				<div class="listGroup">
					<div class="title fz-0">
						<span class="fz-14 op-60">英文名</span>
					</div>
					<input type="text" placeholder="請輸入旅客護照英文名" v-model.lazy="guestInfo.passportLastName">
				</div>
				<div class="listGroup" style="justify-content: unset; height: 36px;">
					<div class="title fz-0">
						<span class="fz-14 op-60">性別</span>
					</div>
					<label class="fz-0 customRadioOuter">
						<input type="radio" name="gender" value="male" v-model.lazy="guestInfo.gender">
						<div class="customRadio"></div>
						<span>男</span>
					</label>
					<label class="fz-0 customRadioOuter">
						<input type="radio" name="gender" value="female" v-model.lazy="guestInfo.gender">
						<div class="customRadio"></div>
						<span>女</span>
					</label>
				</div>
				<div class="listGroup">
					<div class="title fz-0">
						<span class="fz-14 op-60">出生日期</span>
					</div>
					<input type="date" required v-model.lazy="guestInfo.birthday">
				</div>
				<div class="listGroup">
					<div class="title fz-0">
						<span class="fz-14 op-60">國籍</span>
					</div>
					<input type="text" placeholder="請輸入國籍" v-model.lazy="guestInfo.nation">
				</div>
				<div class="listGroup">
					<div class="title fz-0">
						<span class="fz-14 op-60">護照號碼</span>
					</div>
					<input type="text" placeholder="請輸入護照號碼" v-model.lazy="guestInfo.passportNumber">
				</div>
				<div class="listGroup">
					<div class="title fz-0">
						<span class="fz-14 op-60">護照有效期</span>
					</div>
					<input type="date" required v-model.lazy="guestInfo.passportValid">
				</div>
			</div>
		<!-- </li> -->
	<!-- </ul> -->
</template>

<script>
export default {
	data(){
		return{
			amount: 1,
			guestInfo:{
				passportFirstName: '',
				passportLastName: '',
				gender: '',
				birthday: '',
				nation: '',
				passportNumber: '',
				passportValid: ''
			}
		}
	},
	methods:{
		renew(){
			for (const i in this.guestInfo) {
				this.guestInfo[i] = "";
			}
		}
	}
}
</script>

<style lang="sass">
.btn-function
	padding-top: 6px
.renew
	display: inline-block
	width: 16px
	height: 16px
	margin-right: 16px
	background-image: url('../asset/images_booking/renew.svg')
	background-size: cover
</style>