<template>
  <div class="container">
    <div class="header">
      <span class="">已經預訂行程了嗎?</span>
      <a href="javascript:;" class="goToPage goToHistory" @click="goToHistory">
        <span class="fz-14">前往紀錄</span>
        <img :src="imgGoToHistory" alt="goToHistory">
      </a>
    </div>
    <div class="tabsGroup" :class="{scroll: positionY}">
      <button v-for="(item, index) in tabs" :key="index" class="tab ta-center"
       :class="{active: componentType === item.componentType}"
       @click="componentType = item.componentType" v-scroll-to="'#app'">
        <div class="tab_img">
          <img :src="item.img" :alt=item.componentType>
        </div>
        <span>{{ item.typeTitle }}</span>
      </button>
    </div>
    <div class="content">
      <planeTicket v-if="componentType === 'planeTicket'" @planeTicketVal=bookDataVal />
      <hotel v-if="componentType === 'hotel'" @hotelVal=bookDataVal />
      <rentCar v-if="componentType === 'rentCar'" @rentCarVal=bookDataVal />
    </div>
    <div class="infoForm">
      <div class="separateLine" v-scroll-to="'#idSection'">
        <hr>
        <img :src="imgScrollDown" alt="scrollDown">
        <hr>
      </div>
      <div class="pd-md-12 row-lg">
        <contact @contactVal=contactVal />
        <note @noteVal=noteVal />
      </div>
    </div>
    <div class="btn" :class="{'block': isPosting}" @click="confirmSend()">
      <span>確認送出</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import contact from '@/components/contact'
import note from '@/components/note'
import planeTicket from '@/components/planeTicket'
import hotel from '@/components/hotel'
import rentCar from '@/components/rentCar'
import { formatISO } from 'date-fns'
import { dataUrl_post } from '@/api/api'

export default {
  name: 'Home',
  components: {
    contact,
    note,
    planeTicket,
		hotel,
		rentCar,
  },
  data(){
    return{
      imgGoToHistory: require('@/assets/images/arrow-right-white.png'),
      imgScrollDown: require('@/assets/images/down-chevron.svg'),
      tabs: [
        {
          img: require('@/assets/images/airplane.svg'),
          typeTitle: '機票',
          componentType: 'planeTicket'
        },
        {
          img: require('@/assets/images/bed.svg'),
          typeTitle: '飯店',
          componentType: 'hotel'
        },
        {
          img: require('@/assets/images/car.svg'),
          typeTitle: '租車',
          componentType: 'rentCar'
        },
      ],
      componentType: 'planeTicket',
      positionY: 0,
      bookData: false,
      mainContact: false,
      note: '',
      scrollFn: null,
      isPosting: false
    }
  },
  computed: {
    stateRandom(){
      return `${Math.floor(Math.random() * 10) % 3}`
    },
    stateConvert(){
      return this.stateRandom === 0 ? '待處理' : this.stateRandom === 1 ? '處理中' : '已處理'
    }
  },
  mounted(){
    this.scrollFn = () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || document.querySelector('#app').scrollTop;
      if (scrollTop >= 48) {
        this.positionY = true
      } else {
        this.positionY = false
      }
    }
    window.addEventListener('scroll', this.scrollFn)
  },
  methods:{
    ...mapActions(['MSG_POPUP_HANDLER']),
    goToHistory(){
      this.$router.push({name: "History"})
    },
    bookDataVal(val){
      this.bookData = val
    },
    contactVal(val){
      this.mainContact = val
    },
    noteVal(val){
      this.note = val
    },
    confirmSend(){
      if(this.isPosting) return
      // data判斷
      if(this.bookData === false && this.mainContact === false){
        alert("預訂選項及聯絡人資料未填寫正確")
        return
      }else if(this.bookData === false){
        alert("預定選項未填寫正確")
        return
      }else if(this.mainContact === false){
        alert("聯絡人資料未填寫正確")
        return
      }else{
        this.isPosting = true
        dataUrl_post({
          ...this.bookData,
          ...this.mainContact,
          note: this.note || '無', 
          bookNumber: `${this.componentType === 'planeTicket'? '票' : this.componentType === 'hotel' ? '住' : '租'}-${Math.floor(Math.random()*10000)}`,
          bookDate: formatISO(new Date(), {representation: 'date'}),
          state: this.stateConvert,
        }).then(() => {
          this.successFn(() => {
            this.$router.go(0);
            window.scrollTo(0, 0);
          }, 3000)
        }).catch(err => {
          alert(err)
          this.isPosting = false
        })
      }
    },
    successFn(callback, delay){
      this.MSG_POPUP_HANDLER({txt: '送出成功！', status: 'success'}, 1000)
      setTimeout(callback, delay)
    }
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.scrollFn)
    this.scrollFn = null
  }
}
</script>

<style lang="sass">
.content
  margin-top: 170px
select
  width: 100%
  border: 0
  appearance: none
.ta-right select
  direction: rtl
.disabled
  opacity: 0.2
.inputGroup.width-half input[type="date"]
  white-space: nowrap
.btn.block
  background-color: #ddd
  border: 1px solid #ddd
  cursor: initial
</style>