<template>
  <div>
    <div class="card_tabsGroup fz-0">
      <div class="card_tab" :class="{active: isSingle === false}" @click="typeChange(false)">
        <span>來回</span>
      </div>
      <div class="card_tab" :class="{active: isSingle === true}" @click="typeChange(true)">
        <span>單程</span>
      </div>
    </div>
    <div class="card card-bd0088 fz-0">
      <div class="row">
        <CustomInput :inputType="'text'" :inputId="'input-departure'" v-model="planeTicket.require.departureLocation" :labelTitle="'出發地'" @input="departureLocationFn" />
        <CustomInput :inputType="'text'" :inputId="'input-terminal'" v-model="planeTicket.require.terminalLocation" :labelTitle="'目的地'" @input="terminalLocationFn" />
      </div>
      <div class="row">
        <CustomInput :inputType="'date'" :inputId="'input-start-date'" v-model="planeTicket.require.departureDate" placeholder="ex: 2000-01-01" :labelTitle="'出發日'" @input="departureDateFn" />
        <CustomInput :inputType="'time'" :inputId="'input-start-time'" v-model="planeTicket.require.departureTime" placeholder="ex: 12:00" :labelTitle="'出發時間'" @input="departureTimeFn" />
      </div>
      <div class="row" v-if="!isSingle">
        <CustomInput :inputType="'date'" :inputId="'input-end-date'" v-model="planeTicket.optional.terminalDate" placeholder="ex: 2000-01-01" :labelTitle="'回程日'" @input="terminalDateFn" />
        <CustomInput :inputType="'time'" :inputId="'input-end-time'" v-model="planeTicket.optional.terminalTime" placeholder="ex: 12:00" :labelTitle="'回程時間'" @input="terminalTimeFn" />
      </div>
      <div class="row">
        <PersonAmount :mainTitle="'旅客人數'" :itemTitleLeft="'成人'" :itemTitleRight="'兒童'" :amountAdult="planeTicket.require.planeAdult" :amountChild="planeTicket.require.planeChild"
          @addAdult="addAdult" @addChild="addChild" @minusAdult="minusAdult" @minusChild="minusChild" />
      </div>
      <div class="row">
        <div class="inputGroup width-half ta-left">
          <p><span class="fz-12 text-secondary">艙等偏好</span></p>
          <select v-model="planeTicket.require.planeClass">
            <option v-for="planeClass in planeClasses" :key="planeClass">{{ planeClass }}</option>
          </select>
        </div>
        <div class="inputGroup width-half ta-right">
          <p><span class="fz-12 text-secondary">航空公司偏好</span></p>
          <select v-model="planeTicket.require.planeCompany">
            <option v-for="planeCompany in planeCompanies" :key="planeCompany">{{ planeCompany }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { isAfter, parseISO } from 'date-fns'
import PersonAmount from './common/PersonAmount'
import CustomInput from './common/CustomInput'
export default {
  name: 'planeTicket',
  components:{
    PersonAmount,
    CustomInput
  },
  data() {
    return {
      isSingle: false,
      planeClasses: ['不限艙等', '經濟艙', '豪華經濟艙', '商務艙', '頭等艙'],
      planeCompanies: ['不限航空公司','中華航空','長榮航空','台灣虎航'],
      planeTicket: {
        require: {
          departureLocation: '',
          departureDate: '',
          departureTime: '',
          terminalLocation: '',
          planeAdult: 1,
          planeChild: 0,
          planeClass: '不限艙等',
          planeCompany: '不限航空公司'
        },
        optional: {
          terminalDate: '',
          terminalTime: ''
        },
      }
    }
  },
  computed:{
    isInputLegal(){
      return Object.values(
        this.isSingle ? this.planeTicket.require : {...this.planeTicket.require, ...this.planeTicket.optional}
      ).every(val => typeof(val) === 'number' ? val > -1 : val.length > 0)
    }
  },
  watch: {
    isInputLegal(val){
      if(val) this.planeTicketVal(this.isSingle ? this.planeTicket.require : this.planeTicket)
      else this.planeTicketVal(false)
    }
  },
  methods:{
    ...mapMutations(['dateErrorFn']),
    typeChange(val){
      this.isSingle = val
      if(val){
        this.clearTerminalData()
      }
    },
    clearTerminalData(){
      this.planeTicket.optional.terminalDate = ''
      this.planeTicket.optional.terminalTime = ''
    },
    planeTicketVal(val){
      this.$emit('planeTicketVal', val)
    },
    verifyDate(){
      if(isAfter(parseISO(this.planeTicket.require.departureDate), parseISO(this.planeTicket.optional.terminalDate))){
        this.dateErrorFn(true)
        this.planeTicket.require.departureDate = '';
        this.planeTicket.optional.terminalDate = '';
        alert('日期錯誤')
      }else{
        this.dateErrorFn(false)
      }
    },
    addAdult(){
      this.planeTicket.require.planeAdult += 1
    },
    addChild(){
      this.planeTicket.require.planeChild += 1
    },
    minusAdult(val){
      this.planeTicket.require.planeAdult = val
    },
    minusChild(val){
      this.planeTicket.require.planeChild = val
    },
    departureLocationFn(val){
      this.planeTicket.require.departureLocation = val
    },
    terminalLocationFn(val){
      this.planeTicket.require.terminalLocation = val
    },
    departureDateFn(val){
      this.planeTicket.require.departureDate = val
      this.verifyDate()
    },
    departureTimeFn(val){
      this.planeTicket.require.departureTime = val
    },
    terminalDateFn(val){
      this.planeTicket.optional.terminalDate = val
      this.verifyDate()
    },
    terminalTimeFn(val){
      this.planeTicket.optional.terminalTime = val
    }
  }
}
</script>