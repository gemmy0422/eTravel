<template>
	<div id="app" class="fz-0">
		<router-link to="/" class="fz-0">Home</router-link>
		<router-link to="/history" class="fz-0">History</router-link>
		<router-view/>
		<appFooter></appFooter>
		<MsgPopup v-if="isShowMsgPopup" />
		<LoadingMask v-if="isLoading" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import appFooter from './components/common/Footer'
import MsgPopup from '@/components/common/MsgPopup1'
import LoadingMask from '@/components/common/LoadingMask1'
export default {
	components:{
		appFooter,
		MsgPopup,
		LoadingMask
	},
	computed: {
		...mapGetters(['isShowMsgPopup', 'isLoading'])
	}
}
</script>

<style lang="sass" scoped>
#app
	height: 100%
</style>