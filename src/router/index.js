import Vue from 'vue'
import Router from 'vue-router'
import Meily from '@/components/Meily'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Meily',
      component: Meily
    }
  ]
})
