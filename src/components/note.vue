<template>
  <div class="listGroup_bg col-lg-5">
    <div class="listGroup">
      <span>其他需求</span>
    </div>
    <div class="listGroup">
      <div class="title fz-0">
        <span class="fz-14 op-60">備註</span>
      </div>
      <textarea cols="24" rows="5" placeholder="若有其他需求，都可以在這邊提出" v-model.lazy="note" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'note',
  data(){
    return{
      note: null
    }
  },
  watch: {
    note(){
      this.noteVal(this.note || '無')
    }
  },
  methods: {
    noteVal(val){
      this.$emit('noteVal', val)
    }
  }
}
</script>

<style scoped lang="sass">	
.title
  margin: 13px 0
.listGroup
  &:first-of-type
    height: 40px
  &:last-of-type
    align-items: flex-start
</style>