<template>
	<div class="dashboard-container">
	    <component :is="currentRole" />
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
	name:'dashboard',
	data(){
		return {
			currentRole:"adminDashboard"
		}
	}
})	
</script>
