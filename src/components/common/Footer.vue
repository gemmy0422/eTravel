<template>
  <div class="footer ta-center" :style="{'height': footerHeight}">
    <div class="row ta-left row-md">
      <div class="col-12 col-lg-3 col-md-4 xs-mb-30" @click="notice">
        <p class="fz-18 fw-bold pb-8">Intro</p>
        <p class="fz-14 footer_title">關於eTravel</p>
        <p class="fz-14 footer_title">條款宣告</p>
        <p class="fz-14 footer_title">相關網站</p>
      </div>
      <div class="col-12 col-lg-5 col-md-4 xs-mb-30">
        <p class="fz-18 fw-bold pb-8">Contact</p>
        <div class="mb-12">
          <p class="fz-12 op-60">Email</p>
          <a href="mailto:eTravel@service.com" class="fz-14">eTravel@service.com</a>
        </div>
        <div class="mb-12">
          <p class="fz-12 op-60">電話</p>
          <a href="tel:+123234567890" class="fz-14">(123) 2-3456-7890</a>
        </div>
        <div class="mb-12">
          <p class="fz-12 op-60">地址</p>
          <a href="https://www.google.com/maps/" target="_blank" class="fz-14">SomeWhere, I don't know</a>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-md-4">
        <p class="fz-18 fw-bold">Follow us</p>
        <div class="row">
          <div class="ta-center col-3">
            <a href="https://www.facebook.com/" target="_blank">
              <img :src="imgFB" alt="facebook">
            </a>
          </div>
          <div class="ta-center col-3">
            <a href="https://www.youtube.com/" target="_blank">
              <img :src="imgYT" alt="youtube">
            </a>
          </div>
          <div class="ta-center col-3">
            <a href="https://line.me/zh-hant/" target="_blank">
              <img :src="imgLine" alt="line">
            </a>
          </div>
          <div class="ta-center col-3">
            <a href="https://telegram.org/" target="_blank">
              <img :src="imgTelegram" alt="telegram">
            </a>
          </div>
        </div>
      </div>
    </div>
    <p class="fz-12 ta-center copyright">Copyright © 2022 eTravel. All rights reserved</p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data(){
    return{
      imgFB: require('@/assets/images/facebook.svg'),
      imgYT: require('@/assets/images/youtube.svg'),
      imgLine: require('@/assets/images/line.svg'),
      imgTelegram: require('@/assets/images/telegram.svg'),
      footerHeight: ''
    }
  },
  mounted(){
    window.addEventListener('resize', () => {this.resizeStyle()})
  },
  methods:{
    notice(){
      alert("目前尚未開放");
    },
    resizeStyle(){
      this.footerHeight = window.innerWidth < 800 ?
        `${document.body.clientHeight - 36 - document.querySelector('.container').clientHeight}px` : 'auto'
    }
  },
  beforeDestroy(){
    window.removeEventListener('resize', () => {this.resizeStyle()})
  }
}
</script>

<style lang="sass" scoped>
p, a
  color: #fff
.pb-8
  padding-bottom: 8px
img
  width: 30px
  height: 30px
  cursor: pointer
.footer
  margin-top: 36px
  padding: 18px
  background: #22252f
  &_title
    cursor: pointer
    line-height: 2.5
.xs-mb-30
  margin-bottom: 30px
.copyright
  color: #bbbbbb

@media only screen and (min-width: 800px) and (-webkit-min-device-pixel-ratio: 1)
  .footer
    > .row
      width: 70%
      align-items: flex-start
    &_title
      line-height: 2
@media only screen and (min-width: 1200px) and (-webkit-min-device-pixel-ratio: 1)
  .footer > .row
    width: 50%
</style>