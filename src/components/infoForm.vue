<template>
	<div>
		<div class="separateLine" v-scroll-to="'#idSection'">
			<hr>
			<img :src="imgScrollDown" alt="scrollDown">
			<hr>
		</div>
		<div class="pd-md-12 row-lg">
			<div class="listGroup_bg col-lg-6" id="idSection">
				<div class="listGroup" style="height: 40px;">
					<span>訂單聯絡人</span>
				</div>
				<div class="listGroup">
					<span class="fz-14 op-60">聯絡人姓名</span>
					<input type="text" placeholder="請輸入聯絡人姓名" v-model.trim.lazy="mainContact.name">
				</div>
				<div class="listGroup">
					<span class="fz-14 op-60">聯絡人電話</span>
					<input type="tel" placeholder="請輸入聯絡人電話 包含國碼" v-model.trim.lazy="mainContact.phone">
				</div>
				<div class="listGroup">
					<span class="fz-14 op-60">聯絡人信箱</span>
					<input type="email" placeholder="請輸入聯絡人信箱" v-model.trim.lazy="mainContact.email">
				</div>
			</div>

			<!-- <div class="listGroup_bg" v-if="this.$parent.componentType !== 'rentCar'">
				<div class="listGroup" style="height: 40px;">
					<span>旅客資料</span>
				</div>
				<guestInfo></guestInfo>
			</div> -->
			<div class="listGroup_bg col-lg-5">
				<div class="listGroup" style="height: 40px;">
					<span>其他需求</span>
				</div>
				<div class="listGroup" style="align-items: flex-start;">
					<div class="title fz-0">
						<span class="fz-14 op-60">備註</span>
					</div>
					<textarea cols="24" rows="5" placeholder="若有其他需求，都可以在這邊提出" v-model="note.content"></textarea>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data(){
		return{
			imgScrollDown: require('../assets/images/down-chevron.svg'),
			mainContact:{
				name: '',
				phone: '',
				email: ''
			},
			note:{
				content: ''
			}
		}
	},
}
</script>

<style scoped lang="sass">	
.title
	margin: 13px 0
</style>