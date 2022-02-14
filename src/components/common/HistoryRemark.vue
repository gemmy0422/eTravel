<template>
  <div class="historyContent">
    <p><span class="mainTitle">備註</span></p>
    <div class="row">
      <p><span class="fz-12 text-secondary">我的備註</span></p>
      <p><span>{{ note }}</span></p>
    </div>
    <div class="row">
      <p><span class="fz-12 text-secondary">服務人員備註</span></p>
      <p><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, deserunt.</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryRemark',
  props: {
    note: {
      type: String,
      require: false
    }
  }
}
</script>

<style lang="sass" scoped>
.row
  display: block
</style>