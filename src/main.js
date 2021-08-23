import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {checkToken} from './API/api'
import {store} from './store';

Vue.config.productionTip = false

router.beforeEach( async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    const isLogged = await checkToken();

    if(!isLogged){
      next({ name: 'Login'});
    }
    else{
      next();
    }
  }
  else{
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
