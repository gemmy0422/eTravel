<template>
	<div class="header">
		<a href="javascript:;" class="goToPage goToHome" @click="routerGoToHome">
			<img :src="goToHome" alt="goToHome" />
			<span class="fz-14">回到訂票</span>
		</a>
		<span>訂票紀錄</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			goToHome: require("@/assets/images/arrow-right-white.png")
		};
	},
	methods: {
		routerGoToHome() {
			this.$router.push({ name: "Home" });
		}
	}
};
</script>