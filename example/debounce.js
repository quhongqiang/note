
/**
 * 防抖函数
 * @version 1.0
 * @description 返回的函数只有在事件触发停止之后，间隔至少wait毫秒才会执行，缺点：this指向错误，event事件参数丢失
 * @example document.getElementById('box').onclick = debounce(function () { console.log('哟，切克闹') }, 1000)
 * @param {function} func 
 * @param {number} wait 
 */
function debounce(func, wait) {
  let timeout;
  return function () {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
  }
}
/**
* 防抖函数
* @version 2.0
* @description 修复了上一版本this指向错误和event事件参数丢失的问题
* @example document.getElementById('box').onclick = debounce(function (e) { console.log('哟，切克闹', e) }, 1000)
* @param {function} func 
* @param {number} wait 
*/
function debounce(func, wait) {
  let timeout;
  return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
          func.apply(context, args);
      }, wait);
  }
}
/**
* 防抖函数
* @version 3.0
* @description 新加入一个立即执行的特性，保证事件触发之后可以立即执行，然后延迟wait毫秒之后才可以再次触发
* @example document.getElementById('box').onclick = debounce(function (e) { console.log('哟，切克闹', e) }, 1000， true)
* @param {function} func 
* @param {number} wait 
* @param {boolean} immediate 
*/
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
          if (!timeout) func.apply(context, args)
          timeout = setTimeout(() => {
              timeout = null;
          }, wait);
      } else {
          timeout = setTimeout(function () {
              func.apply(context, args);
          }, wait);
      }
  }
}
/**
* 防抖函数
* @version 4.0
* @description 新加入一个函数返回值的特性，func是可能有返回值的。但是因为setTimeout异步执行的特性，所以仅支持在立即执行为true时，提供返回值
* @example document.getElementById('box').onclick = debounce(function (e) { console.log('哟，切克闹', e) }, 1000， true)
* @param {function} func 
* @param {number} wait 
* @param {boolean} immediate 
*/
function debounce(func, wait, immediate) {
  let timeout;
  let result;
  return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
          if (!timeout) result = func.apply(context, args)
          timeout = setTimeout(() => {
              timeout = null;
          }, wait);
      } else {
          timeout = setTimeout(function () {
              func.apply(context, args);
          }, wait);
      }
      return result
  }
}
/**
* 防抖函数
* @version 5.0
* @description 新加入一个可以取消的特性，返回的函数具有重置取消计时的功能，可以保证事件再次立即触发
* @example let mydebounce = debounce(function (e) { console.log('哟，切克闹', e) }, 1000， true); document.getElementById('box').onclick = mydebounce; mydebounce.cancel()
* @param {function} func 
* @param {number} wait 
* @param {boolean} immediate 
*/
function debounce(func, wait, immediate) {
  let timeout;
  let result;
  let debounceFunc = function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
          if (!timeout) result = func.apply(context, args)
          timeout = setTimeout(() => {
              timeout = null;
          }, wait);
      } else {
          timeout = setTimeout(function () {
              func.apply(context, args);
          }, wait);
      }
      return result
  }
  debounceFunc.cancel = function () {
      clearTimeout(timeout);
      timeout = null;
  }
  return debounceFunc
}