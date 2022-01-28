<template>
	<div id="app" class="fz-0">
		<router-link to="/" class="fz-0">Home</router-link>
		<router-link to="/history" class="fz-0">History</router-link>
		<router-view/>
		<appFooter></appFooter>
	</div>
</template>

<script>
import appFooter from './components/footer'
export default {
	components:{
		appFooter,
	}
}
</script>