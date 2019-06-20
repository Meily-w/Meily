import types from '../../mutation-types';
import fetch from '../../../utils/fetch';
const homeData = {
  state: {
    info: ''
  },
  mutations: {
    [types.GETUSER] (state, info) {
      state.info = info
    }
  },
  actions: {
    getInfo ({dispatch, commit}, obj) {
      return new Promise((resolve, reject) => {
        fetch(obj).then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
  }
}
export default homeData
