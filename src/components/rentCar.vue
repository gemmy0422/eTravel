<template>
  <div class="card fz-0">
    <div class="row">
      <CustomInput :inputType="'text'" :inputId="'input-start-rent'" v-model="rentCar.startLocation" :labelTitle="'租車地'" @input="startLocationFn" />
      <CustomInput :inputType="'text'" :inputId="'input-end-rent'" v-model="rentCar.endLocation" :labelTitle="'還車地'" @input="endLocationFn" />
    </div>
    <div class="row">
      <CustomInput :inputType="'date'" :inputId="'input-start-date'" v-model="rentCar.startDate" placeholder="ex: 2000-01-01" :labelTitle="'租車日'" @input="startDateFn" />
      <CustomInput :inputType="'time'" :inputId="'input-start-time-rentCar'" v-model="rentCar.startTime" placeholder="ex: 12:00" :labelTitle="'租車時間'" @input="startTimeFn" />
    </div>
    <div class="row">
      <CustomInput :inputType="'date'" :inputId="'input-end-date'" v-model="rentCar.endDate" placeholder="ex: 2000-01-01" :labelTitle="'還車日'" @input="endDateFn" />
      <CustomInput :inputType="'time'" :inputId="'input-end-time-rentCar'" v-model="rentCar.endTime" placeholder="ex: 12:00" :labelTitle="'還車時間'" @input="endTimeFn" />
    </div>
    <div class="row">
      <CustomInput :inputType="'text'" :inputId="'input-car'" v-model="rentCar.preferCar" :labelTitle="'指定車款'" :isHalfWidth="false" @input="preferCarFn" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { isAfter, parseISO } from 'date-fns'
import CustomInput from './common/CustomInput'
export default {
  name: 'rentCar',
  components: {
    CustomInput
  },
  data() {
    return {
      rentCar: {
        startLocation: '',
        endLocation: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        preferCar: ''
      }
    }
  },
  computed:{
    isInputLegal(){
      return Object.values(this.rentCar).every(val => val.length > 0)
    }
  },
  watch: {
    isInputLegal(val){
      if(val) this.rentCarVal(this.rentCar)
      else this.rentCarVal(false)
    }
  },
  methods:{
    ...mapMutations(['dateErrorFn']),
    rentCarVal(val){
      this.$emit('rentCarVal', val)
    },
    verifyDate(){
      if(isAfter(parseISO(this.rentCar.startDate), parseISO(this.rentCar.endDate))){
        this.dateErrorFn(true)
        this.rentCar.startDate = '';
        this.rentCar.endDate = '';
        alert('日期錯誤');
      }else{
        this.dateErrorFn(false)
      }
    },
    startLocationFn(val){
      this.rentCar.startLocation = val
    },
    endLocationFn(val){
      this.rentCar.endLocation = val
    },
    startDateFn(val){
      this.rentCar.startDate = val
      this.verifyDate()
    },
    startTimeFn(val){
      this.rentCar.startTime = val
    },
    endDateFn(val){
      this.rentCar.endDate = val
      this.verifyDate()
    },
    endTimeFn(val){
      this.rentCar.endTime = val
    },
    preferCarFn(val){
      this.rentCar.preferCar = val
    }
  }
}
</script>