<template>
  <div>
    <div class="historyList" @click="toggleItem = !toggleItem">
      <span class="fz-12 text-secondary">訂單編號</span>
      <span class="fz-22 text-primary">{{ history.bookNumber }}</span>
      <div class="fz-0 historyList_createDate">
        <span class="fz-12 text-secondary">下訂時間：</span>
        <span class="fz-12">{{ history.bookDate }}</span>
      </div>
      <div class="fz-0 historyList_status" :class="{active: toggleItem}">
        <span class="fz-14" :class="[history.state === '待處理'? 'undo': history.state === '處理中'?'doing': 'done']">{{ history.state }}</span>
      </div>
    </div>
    <div class="historyContainer" :class="{active: toggleItem}">
      <div class="historyContent">
        <p><span class="mainTitle">飯店</span></p>
        <div class="row">
          <div class="col-6 ta-left">
            <p><span class="fz-12 text-secondary">入住飯店</span></p>
            <p><span class="fz-20 text-primary">{{ history.hotel.name }}</span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-6 ta-left">
            <p><span class="fz-12 text-secondary">入住日</span></p>
            <p><span class="fz-20 text-primary">{{ history.hotel.checkInDate }}</span><span class="text-primary">{{ checkInDay }}</span></p>
          </div>
          <div class="col-6 ta-right">
            <p><span class="fz-12 text-secondary">退房日</span></p>
            <p><span class="fz-20 text-primary">{{ history.hotel.checkOutDate }}</span><span class="text-primary">{{ checkOutDay }}</span></p>
          </div>
        </div>
      </div>
      <HistoryContact :name="history.name" :phone="history.phone" :email="history.email" />
      <HistoryRemark :note="history.note" />
    </div>
  </div>
</template>

<script>
import { getDay, parseISO } from 'date-fns'
import HistoryRemark from '@/components/common/HistoryRemark'
import HistoryContact from '@/components/common/HistoryContact'
export default {
  name: 'history_content_hotel',
  components: {
    HistoryRemark,
    HistoryContact
  },
  props: {
    history: {
      type: Object,
      require: true
    }
  },
  data(){
    return {
      toggleItem: false
    }
  },
  computed: {
    checkInDay(){
      return `週${['一','二','三','四','五','六','日'][getDay(parseISO(this.history.hotel.checkInDate)) - 1]}`
    },
    checkOutDay(){
      return `週${['一','二','三','四','五','六','日'][getDay(parseISO(this.history.hotel.checkOutDate)) - 1]}`
    }
  }
}
</script>

<style lang="sass" scoped>

</style>