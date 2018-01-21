// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import _ from './libraries/lodash.custom.min'

Vue.config.productionTip = false


/* Vue.directive('flip', {
  bind: function (el) {
    el.innerHTML = '<div class="flipper"><div class="front cBack1"></div><div class="back"></div></div>';
  },
  componentUpdated: function (a, b) {
    if (a.childNodes[0]) {
      a.childNodes[0].childNodes[1].className = 'back ' + b.value;
    }
  }
}); */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
