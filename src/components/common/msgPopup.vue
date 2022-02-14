<template>
  <div class="mask">
    <div class="mask_container">
      <img v-if="msgStatus === 'success'" src="~@/assets/images/check.png" alt="">
      <img v-else-if="msgStatus === 'fail'" src="~@/assets/images/close.png" alt="">
      <p>{{ msgContext }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'msgPopup',
  computed: {
    ...mapGetters(['msgContext', 'msgStatus'])
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/var'
.mask
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  background-color: rgba(#000, 0.2)
  z-index: 25
  &_container
    @extend %centerMiddle
    padding: 24px 36px
    border-radius: 4px
    background-color: #22252f
    color: #fff
    text-align: center
    p
      padding-top: 10px
      color: #fff
</style>