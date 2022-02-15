const mutations = {
  setContents(state, data){
    state.bookData = data ? Object.values(data) : null
  },
  showMsgPopup(state){
    state.isShowMsgPopup = true
  },
  hideMsgPopup(state){
    state.isShowMsgPopup = false
  },
  setMsgStatus(state, data){
    state.msgStatus = data
  },
  setMsgContext(state, data){
    state.msgContext = data
  },
  showLoading(state){
    state.isLoading = true
  },
  hideLoading(state){
    state.isLoading = false
  },
  dateErrorFn(state, data){
    state.dateError = data
  }
}
export { mutations }