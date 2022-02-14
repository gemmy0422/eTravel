<template>
  <div class="card fz-0">
    <div class="row">
      <div class="inputGroup width-half">
        <input type="text" id="input-start-rent" v-model="rentCar.startLocation"/>
        <label for="input-start-rent" class="">租車地</label>
      </div>
      <div class="inputGroup width-half">
        <input type="text" id="input-end-rent" v-model="rentCar.endLocation"/>
        <label for="input-end-rent" class="">還車地</label>
      </div>
    </div>
    <div class="row">
      <div class="inputGroup width-half">
        <input type="date" v-model="rentCar.startDate" @change="verifyDate" placeholder="ex: 2000-01-01"/>
        <label class="">租車日</label>
      </div>
      <div class="inputGroup width-half">
        <input type="time" id="input-start-time-rentCar" v-model="rentCar.startTime" placeholder="ex: 12:00"/>
        <label for="input-start-time-rentCar" class="">租車時間</label>
      </div>
    </div>
    <div class="row">
      <div class="inputGroup width-half">
        <input type="date" v-model="rentCar.endDate" @change="verifyDate" placeholder="ex: 2000-01-01"/>
        <label class="">還車日</label>
      </div>
      <div class="inputGroup width-half">
        <input type="time" id="input-end-time-rentCar" v-model="rentCar.endTime" placeholder="ex: 12:00"/>
        <label for="input-end-time-rentCar" class="">還車時間</label>
      </div>
    </div>
    <div class="row">
      <div class="inputGroup">
        <input type="text" id="input-car" v-model="rentCar.preferCar"/>
        <label for="input-car" class="">指定車款</label>
      </div>
    </div>
  </div>
</template>

<script>
import { isAfter, parseISO } from 'date-fns'
export default {
  name: 'rentCar',
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
    rentCarVal(val){
      this.$emit('rentCarVal', val)
    },
    verifyDate(){
      if(isAfter(parseISO(this.rentCar.startDate), parseISO(this.rentCar.endDate))){
        alert('日期錯誤');
        this.rentCar.startDate = '';
        this.rentCar.endDate = '';
      }
    }
  }
}
</script>