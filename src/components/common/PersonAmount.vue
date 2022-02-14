<template>
  <div class="inputGroup ta-left">
    <p><span class="fz-12 text-secondary">{{ mainTitle }}</span></p>
    <div class="row">
    <div class="inputGroup_content ta-center">
      <button class="btn_count minus" @click="minusAdult()" :class="{disabled: amountAdult < 2}" />
      <span class="fz-22 text-primary guestNumber">{{ ` ${amountAdult}` }}</span>
      <span class="fz-14">{{ itemTitleLeft }}</span>
      <button class="btn_count plus" @click="addAdult" />
    </div>
    <div class="inputGroup_content ta-center">
      <button class="btn_count minus" @click="minusChild()" :class="{disabled: amountChild === 0}" />
      <span class="fz-22 text-primary guestNumber">{{ ` ${amountChild}` }}</span>
      <span class="fz-14">{{ itemTitleRight }}</span>
      <button class="btn_count plus" @click="addChild" />
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonAmount',
  props: {
    mainTitle: {
      type: String,
      required: true
    },
    itemTitleLeft: {
      type: String,
      required: true
    },
    itemTitleRight: {
      type: String,
      required: true
    },
    amountAdult: {
      type: Number,
      required: false
    },
    amountChild: {
      type: Number,
      required: false
    }
  },
  methods: {
    addAdult(){
      this.$emit('addAdult')
    },
    addChild(){
      this.$emit('addChild')
    },
    minusAdult(){
      if(this.amountAdult < 2) return
      this.$emit('minusAdult', this.amountAdult - 1)
    },
    minusChild(){
      if(this.amountChild === 0) return
      this.$emit('minusChild', this.amountChild - 1)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/css/var'
.row
  padding: 8px 0 0
.inputGroup_content
  display: inline-flex
  align-items: center
.btn_count
  position: relative
  width: 24px
  height: 24px
  border-radius: 50%
  border: 1px solid $secondary
  background: none
  &.minus
    margin-right: 16px
    &:before
      content: ''
      @extend %centerMiddle
      width: 8px
      height: 1px
      background: $secondary
  &.plus
    margin-left: 16px
    &:before, &:after
      content: ''
      @extend %centerMiddle
      width: 8px
      height: 1px
      background: $secondary
    &:after
      transform: translate(-50%,-50%) rotate(90deg)
.guestNumber
  margin-right: 4px
</style>