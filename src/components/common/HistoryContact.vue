<template>
  <div class="historyContent">
    <p><span class="mainTitle">訂單聯絡人</span></p>
    <div class="row">
      <div class="col-6 ta-left">
        <p><span class="fz-12 text-secondary">聯絡人姓名</span></p>
        <input type="text" class="p-0 m-0" :value="name" readonly>
      </div>
      <div class="col-6 ta-right">
        <p><span class="fz-12 text-secondary">聯絡人電話</span></p>
        <input type="tel" class="p-0 m-0 ta-right" :value="phone" readonly>
      </div>
    </div>
    <div class="row">
      <div class="col-6 ta-left">
        <p><span class="fz-12 text-secondary">聯絡人信箱</span></p>
        <input type="email" class="p-0 m-0" :value="email" readonly>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryContact',
  props: {
    name: {
      type: String,
      require: true
    },
    phone: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    }
  }
}
</script>

<style lang="sass" scoped>

</style>