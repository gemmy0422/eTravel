import { dataUrl_get } from '@/api/api'
const actions = {
  MSG_POPUP_HANDLER({commit}, data, sec = 2000) {
    commit('showMsgPopup')
    commit('setMsgStatus', data.status)
    commit('setMsgContext', data.txt)
    setTimeout(() => {
      commit('hideMsgPopup')
      commit('setMsgStatus', '')
      commit('setMsgContext', '')
    }, sec)
  },
  DATA_GET ({commit}) {
    dataUrl_get(1).then(res => {
      commit('setContents', res.data)
    }).catch(err => {
      commit('showMsgPopup', err)
      commit('setMsgContext', err)
    })
  }
}
export { actions }