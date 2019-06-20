import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import actions from './actions'
import mutations from './mutations'
import modules from './modules'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 内存数据状态，UI可通过this.$store.state.* 获得数据
  state,
  // 唯一拥有更改内存数据的接口，不可进行异步操作
  mutations,
  // 与mutation通讯，ui层写入内存数据的接口，可异步操作
  actions,
  // 所有局部模块
  modules,
  getters
})
export default store
