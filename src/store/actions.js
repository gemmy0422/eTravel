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
    return new Promise((resolve, reject) => {
        dataUrl_get(1).then(res => {
        commit('setContents', res.data)
        resolve(res)
      }).catch(err => {
        commit('showMsgPopup', err)
        commit('setMsgContext', err)
        reject(err)
      })
    })
  }
}
export { actions }