<template>
  <div class="inputGroup" :class="{'width-half': isHalfWidth}">
    <input :type="inputType" :id="inputId" v-model="inputBindVal" :placeholder="placeholder" @change="changeFn" :min="minDate" :max="maxDate" />
    <label :for="inputId">{{ labelTitle }}</label>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatISO, addYears } from 'date-fns'
export default {
  name: 'CustomInput',
  props: {
    inputType: {
      type: String,
      required: true
    },
    inputId: {
      type: String,
      required: true
    },
    labelTitle: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    isHalfWidth: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data(){
    return{
      inputBindVal: '',
      minDate: '',
      maxDate: ''
    }
  },
  computed: {
    ...mapGetters(['dateError']),
  },
  created(){
    if(this.inputType === 'date'){
      this.minDate = formatISO(new Date(), { representation: 'date' })
      this.maxDate = formatISO(new Date(addYears(new Date(this.minDate), 1)), { representation: 'date' })
    }
  },
  watch: {
    ['$attrs.value'](newVal){
      if(newVal === ''){
        this.inputBindVal = ''
      }
    }
  },
  methods: {
    changeFnEmit(){
      this.$emit('input', this.inputBindVal)
    },
    changeFn(){
      this.changeFnEmit()
      if(this.dateError){
        this.inputBindVal = ''
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  
</style>