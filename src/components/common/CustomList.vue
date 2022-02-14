<template>
  <div class="listGroup">
    <span class="fz-14 op-60">{{ title }}</span>
    <input :type="type" :placeholder="placeholder" v-model.trim.lazy="inputVal">
  </div>
</template>

<script>

export default {
  name: 'CustomList',
  props:{
    type: {
      type: String,
      required: true,
      default: 'text'
    },
    title: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
  },
  data(){
    return{
      inputVal: ''
    }
  },
  watch: {
    inputVal(newVal, oldVal){
      if(newVal !== oldVal){
        this.$emit('customListInput', newVal)
      }
    }
  },
  methods: {
    
  }
}
</script>

<style scoped lang="sass">	

</style>