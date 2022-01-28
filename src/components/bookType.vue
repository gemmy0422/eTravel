<template>
    <div>
        <planeTicket v-if="componentType == 'planeTicket'"></planeTicket>
        <hotel v-if="componentType == 'hotel'"></hotel>
        <rentCar v-if="componentType == 'rentCar'"></rentCar>
    </div>
</template>

<script>
import planeTicket from './planeTicket'
import hotel from './hotel'
import rentCar from './rentCar'

export default {
    props:{
        componentType:{
            type: String,
            required: true
        }
    },
    components: {
		planeTicket,
		hotel,
		rentCar,
    }
}
</script>