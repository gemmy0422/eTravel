const storage = {
  get(key){
    const data = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : ''
    if(data && (new Date().getTime() - data.time < 0)){
      return data.val
    }else{
      for (const storageKey in localStorage){
        if(storageKey.includes(key.split(':')[0])){
          this.remove(key)
        }
      }
      return ''
    }
  },
  set(key, val, time = 0){
    localStorage.setItem(key, JSON.stringify({val, time: new Date().getTime() + time * 60 * 1000}))
  },
  remove(key){
    localStorage.removeItem(key)
  },
  clear(){
    localStorage.clear()
  }
}

const session = {
  get(key){
    const data = sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : ''
    if(data && (new Date().getTime() - data.time < 0)){
      return data.val
    }else{
      for (const storageKey in sessionStorage){
        if(storageKey.includes(key.split(':')[0])){
          this.remove(key)
        }
      }
      return ''
    }
  },
  set(key, val, time = 0){
    sessionStorage.setItem(key, JSON.stringify({val, time: new Date().getTime() + time * 60 * 1000}))
  },
  remove(key){
    sessionStorage.removeItem(key)
  },
  clear(){
    sessionStorage.clear()
  }
}

export { session, storage }