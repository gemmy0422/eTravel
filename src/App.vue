<template>
	<div id="app" class="fz-0">
		<router-link to="/" class="fz-0">Home</router-link>
		<router-link to="/history" class="fz-0">History</router-link>
		<router-view/>
		<appFooter></appFooter>
		<msgPopup v-if="isShowMsgPopup" />
		<loadingMask v-if="isLoading" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import appFooter from './components/common/Footer'
import msgPopup from '@/components/common/msgPopup'
import loadingMask from '@/components/common/loadingMask'
export default {
	components:{
		appFooter,
		msgPopup,
		loadingMask
	},
	computed: {
		...mapGetters(['isShowMsgPopup', 'isLoading'])
	}
}
</script>