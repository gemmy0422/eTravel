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
        <p><span class="mainTitle">機票</span></p>
        <div class="row">
          <div class="col-6 ta-left">
            <p><span class="fz-12 text-secondary">出發地</span></p>
            <p><span class="fz-20 text-primary">{{ history.planeTicket.departureLocation }}</span></p>
          </div>
          <div class="col-6 ta-right">
            <p><span class="fz-12 text-secondary">目的地</span></p>
            <p><span class="fz-20 text-primary">{{ history.planeTicket.terminalLocation }}</span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-6 ta-left">
            <p><span class="fz-12 text-secondary">出發日</span></p>
            <p><span class="fz-20 text-primary">{{ history.planeTicket.departureDate }}</span><span class="text-primary">{{ departureWeekDay }}</span></p>
            <p><span class="fz-20 text-primary">{{ history.planeTicket.departureTime }}</span></p>
          </div>
          <div class="col-6 ta-right" v-if="history.planeTicket.terminalDate !== 'null'">
            <p><span class="fz-12 text-secondary">回程日</span></p>
            <p><span class="fz-20 text-primary">{{ history.planeTicket.terminalDate }}</span><span class="text-primary">{{ terminalWeekDay }}</span></p>
            <p><span class="fz-20 text-primary">{{ history.planeTicket.terminalTime }}</span></p>
          </div>
        </div>
        <div class="row">
          <div class="col-6 ta-left">
            <p><span class="fz-12 text-secondary">艙等偏好</span></p>
            <p><span class="fz-20 text-primary">{{ history.planeTicket.planeClass }}</span></p>
          </div>
          <div class="col-6 ta-right">
            <p><span class="fz-12 text-secondary">航空公司偏好</span></p>
            <p><span class="fz-20 text-primary">{{ history.planeTicket.planeCompany }}</span></p>
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
  name: 'history_content_planeTicket',
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
    departureWeekDay(){
      return `週${['一','二','三','四','五','六','日'][getDay(parseISO(this.history.planeTicket.departureDate)) - 1]}`
    },
    terminalWeekDay(){
      return `週${['一','二','三','四','五','六','日'][getDay(parseISO(this.history.planeTicket.terminalDate)) - 1]}`
    }
  }
}
</script>

<style lang="sass" scoped>

</style>