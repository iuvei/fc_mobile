import Vue from 'vue'

// 禁止滑动
Vue.directive('stopSlide', {
	inserted: function(el, binding, vnode) {
		el.addEventListener("touchmove", function(e) {
			e.preventDefault();
		}, false);
	}
})
Vue.directive('stopPropagation', {
	inserted: function(el, binding, vnode) {
		el.addEventListener("touchmove", function(e) {
			e.stopPropagation();
		}, false);
		el.addEventListener("touchend", function(e) {
			e.stopPropagation();
		}, false);
	}
})
