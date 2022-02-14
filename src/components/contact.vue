<template>
  <div class="listGroup_bg col-lg-6" id="idSection">
    <div class="listGroup">
      <span>訂單聯絡人</span>
    </div>
    <CustomList :type="'text'" :title="'聯絡人姓名'" :placeholder="'請輸入聯絡人姓名'" @customListInput="customListInputName" />
    <CustomList :type="'tel'" :title="'聯絡人電話'" :placeholder="'請輸入聯絡人電話 包含國碼'" @customListInput="customListInputPhone" />
    <CustomList :type="'email'" :title="'聯絡人信箱'" :placeholder="'請輸入聯絡人信箱'" @customListInput="customListInputEmail" />
  </div>
</template>

<script>
import CustomList from '@/components/common/CustomList'
export default {
  name: 'contact',
  components: {
    CustomList
  },
  data(){
    return{
      mainContact: {
        name: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    isInputLegal(){
      return Object.values(this.mainContact).every(val => val.length > 0)
    }
  },
  watch: {
    isInputLegal(val){
      if(val) this.contact(this.mainContact)
      else this.contact(false)
    }
  },
  methods: {
    contact(val){
      this.$emit('contactVal', val)
    },
    customListInputName(val){
      this.mainContact.name = val
    },
    customListInputPhone(val){
      this.mainContact.phone = val
    },
    customListInputEmail(val){
      this.mainContact.email = val
    }
  }
}
</script>

<style scoped lang="sass">
.listGroup
  height: 40px
</style>