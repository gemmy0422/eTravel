<template>
  <div class="card fz-0">
    <div class="row">
      <CustomInput :inputType="'text'" :inputId="'input-hotel'" v-model="bookData.hotel.name" :labelTitle="'入住飯店'" :isHalfWidth="false" @input="nameFn" />
    </div>
    <div class="row">
      <CustomInput :inputType="'date'" :inputId="'input-start-date'" v-model="bookData.hotel.checkInDate" placeholder="ex: 2000-01-01" :labelTitle="'入住日期'" @input="checkInDateFn" />
      <CustomInput :inputType="'date'" :inputId="'input-end-time'" v-model="bookData.hotel.checkOutDate" placeholder="ex: 2000-01-01" :labelTitle="'退房日期'" @input="checkOutDateFn" />
    </div>
    <div class="row">
      <PersonAmount :mainTitle="'入住人數'" :itemTitleLeft="'成人'" :itemTitleRight="'兒童'" :amountAdult="bookData.hotel.hotelAdult" :amountChild="bookData.hotel.hotelChild"
        @addAdult="addAdult" @addChild="addChild" @minusAdult="minusAdult" @minusChild="minusChild" />
    </div>
  </div>
</template>

<script>
import { isAfter, parseISO } from 'date-fns'
import PersonAmount from './common/PersonAmount'
import CustomInput from './common/CustomInput'
export default {
  name: 'hotel',
  components:{
    PersonAmount,
    CustomInput
  },
  data() {
    return {
      bookData: {
        hotel: {
          name: '',
          checkInDate: '',
          checkOutDate: '',
          hotelAdult: 1,
          hotelChild: 0,
        }
      }
    }
  },
  computed:{
    isInputLegal(){
      return Object.values(this.bookData.hotel).every(val => typeof(val) === 'number' ? val > -1 : val.length > 0)
    }
  },
  watch: {
    isInputLegal(val){
      if(val) this.hotelVal(this.bookData)
      else this.hotelVal(false)
    }
  },
  methods:{
    hotelVal(val){
      this.$emit('hotelVal', val)
    },
    verifyDate(){
      if(isAfter(parseISO(this.bookData.hotel.checkInDate), parseISO(this.bookData.hotel.checkOutDate))){
        this.bookData.hotel.checkInDate = '';
        this.bookData.hotel.checkOutDate = '';
        alert('日期錯誤');
      }
    },
    // emit
    addAdult(){
      this.bookData.hotel.hotelAdult += 1
    },
    addChild(){
      this.bookData.hotel.hotelChild += 1
    },
    minusAdult(val){
      this.bookData.hotel.hotelAdult = val
    },
    minusChild(val){
      this.bookData.hotel.hotelChild = val
    },
    nameFn(val){
      this.bookData.hotel.name = val
    },
    checkInDateFn(val){
      this.bookData.hotel.checkInDate = val
      this.verifyDate()
    },
    checkOutDateFn(val){
      this.bookData.hotel.checkOutDate = val
      this.verifyDate()
    }
  }
}
</script>