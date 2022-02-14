<template>
  <div class="container">
    <div class="segmentControl fz-0">
      <div v-for="(item, index) in tabs" :key="index" class="segment" :class="{active: historyType === item}" @click="clickTab(item)" v-scroll-to="'#app'">
        <span class="fz-14 text-primary">{{ item }}</span>
      </div>
    </div>

    <div class="history">
      <ul v-if="historyType === '機票'">
        <li class="historyList_group" v-for="(history, i) in history_planeTicket" :key="i">
          <historyPlaneTicket :history="history" />
        </li>
        <p v-if="!isLoading && history_planeTicket.length === 0" class="fz-24 op-60 ta-center reminder">目前尚未有預訂紀錄</p>
      </ul>
      <ul v-if="historyType === '飯店'">
        <li class="historyList_group" v-for="(history, i) in history_hotel" :key="i">
          <historyHotel :history="history" />
        </li>
        <p v-if="!isLoading && history_hotel.length === 0" class="fz-24 op-60 ta-center reminder">目前尚未有預訂紀錄</p>
      </ul>
      <ul v-if="historyType === '租車'">
        <li class="historyList_group" v-for="(history, i) in history_rentCar" :key="i">
          <historyRentCar :history="history" />
        </li>
        <p v-if="!isLoading && history_rentCar.length === 0" class="fz-24 op-60 ta-center reminder">目前尚未有預訂紀錄</p>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import historyPlaneTicket from './history_content_planeTicket.vue'
import historyHotel from './history_content_hotel.vue'
import historyRentCar from './history_content_rentCar.vue'
export default {
  name: 'historyContent',
  components: {
    historyPlaneTicket,
    historyHotel,
    historyRentCar
  },
  data(){
    return{
      tabs: ['機票', '飯店', '租車'],
      historyType: '機票',
      histories: [],
    }
  },
  computed:{
    ...mapGetters(['bookData', 'isLoading']),
    history_planeTicket(){
      return this.histories ? this.histories.filter(item => item.planeTicket !== undefined) : []
    },
    history_hotel(){
      return this.histories ? this.histories.filter(item => item.hotel !== undefined) : []
    },
    history_rentCar(){
      return this.histories ? this.histories.filter(item => item.rentCar !== undefined) : []
    },
    data_reminder(){
      return this.histories.length ? '' : '目前尚未有預訂紀錄'
    }
  },
  mounted(){
    this.dataGet()
  },
  methods:{
    ...mapMutations(['showLoading', 'hideLoading']),
    dataGet(){
      this.showLoading()
      this.$store.dispatch('DATA_GET').then(() => {
        this.hideLoading()
        this.histories = this.bookData
      })
    },
    clickTab(name){
      this.historyType = name
      this.dataGet()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/var'
.segmentControl
  margin-top: 72px
  text-align: center
.segment
  display: inline-flex
  justify-content: center
  width: calc((100% - 12px * 2) / 3)
  padding: 4px 0
  border: 1px solid $primary
  &:first-of-type
    border-radius: 4px 0 0 4px
  &:nth-of-type(2)
    border-left-width: 0
    border-right-width: 0
  &:last-of-type
    border-radius: 0 4px 4px 0
  &.active
    background: $primary
    span
      color: #fff
.reminder
  margin-top: 16px
</style>