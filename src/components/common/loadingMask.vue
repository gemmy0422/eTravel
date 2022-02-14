<template>
  <div class="bg">
    <div class="bg_container" />
  </div>
</template>

<script>
export default {
  name: 'loadingMask',
  
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/var'
@keyframes loading
  100%
    transform: translate(-50%, -190%)
.bg
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  z-index: 30
  &_container
    @extend %centerMiddle
    background: url('~@/assets/images/logo.jpg') no-repeat center
    background-size: cover
    width: 90px
    height: 90px
    padding: 12px
    border-radius: 12px
    overflow: hidden
    &:before
      content: ''
      position: absolute
      top: 100%
      left: 50%
      transform: translate(-50%, -10%)
      width: 150%
      height: 100%
      background-color: #804827
      animation: loading 1.5s ease-in-out infinite forwards
</style>