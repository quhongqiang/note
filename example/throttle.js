
/*
* 节流的核心思想: 如果在定时器的时间范围内再次触发，则不予理睬，等当前定时器完成，
  才能启动下一个定时器任务。这就好比公交车，10 分钟一趟，10 分钟内有多少人
  在公交站等我不管，10 分钟一到我就要发车走人！
*/

/**
 * 节流函数
 * @version 时间戳计数
 * @description 持续触发事件，每隔一段时间只执行一次，事件触发停止之后，事件就不再执行
 * @param {function} func 
 * @param {number} wait 
 */
  function throttle(func, wait) {
    let startTime = 0;
    return function () {
        let args = arguments;
        let context = this;
        let nowTime = +new Date();
        if (nowTime - startTime > wait) {
            startTime = nowTime;
            func.apply(context, args)
        }
    }
  }
/**
* 节流函数
* @version 异步延迟
* @description 持续触发事件，只有等待一定间隔才会执行一次事件，事件触发停止之后，如果已经进入下一个计时周期，在计时结束之后仍会执行一次
* @param {function} func 
* @param {number} wait 
*/
  function throttle(func, wait) {
    let timeout;
    return function () {
        let args = arguments;
        let context = this;
        if (!timeout) {
            timeout = setTimeout(() => {
              timeout = null;
              func.apply(context, args);
            }, wait);
        }
    }
  }
/**
* 节流函数
* @version 混合使用时间戳计数和异步延迟触发
* @description 支持即时触发以及事件停止后再次触发
* @param {function} func 
* @param {number} wait 
*/
  function throttle(func, wait) {
    let startTime = 0;
    let timeout;
    return function () {
        let args = arguments;
        let context = this;
        let nowTime = +new Date();
        let remain = nowTime - startTime
        const later = () => {
            timeout = null;
            startTime = nowTime
            func.apply(context, args);
        }
        if (timeout) clearTimeout(timeout)
        if (remain > wait || remain < 0) {
            later()
        } else {
            timeout = setTimeout(later, wait - remain);
        }
    }
  }

/**
* 节流函数
* @version 混合使用时间戳计数和异步延迟触发，并支持配置
* @description 新增支持配置取消前置立即触发(option.leading === false)和后置停止事件后触发(option.trailing === false)，不可以同时设置，同时设置会导致leading配置失效
* @param {function} func 
* @param {number} wait 
* @param {object} option { leading: {{boolean}}, trailing: {{boolean}} }
*/
  function throttle(func, wait, option = {}) {
    option = typeof option === 'object' ? option : {}
    let startTime = option.leading === false ? +new Date() : 0;
    let timeout;
    return function () {
        let args = arguments;
        let context = this;
        let nowTime = +new Date();
        let remain = nowTime - startTime
        const later = () => {
            timeout = null;
            startTime = nowTime
            func.apply(context, args);
        }
        if (timeout) clearTimeout(timeout)
        if (remain > wait || remain < 0) {
            later()
        } else if (option.trailing !== false) {
            timeout = setTimeout(later, wait - remain);
        }
    }
  }

/**
* 节流函数
* @version 混合使用时间戳计数和异步延迟触发，并支持配置和取消
* @description 新增取消重置方法
* @param {function} func 
* @param {number} wait 
* @param {object} option { leading: {{boolean}}, trailing: {{boolean}} }
*/
  function throttle(func, wait, option = {}) {
    option = typeof option === 'object' ? option : {}
    let startTime = option.leading === false ? +new Date() : 0;
    let timeout;
    let throttleFunc = function () {
        let args = arguments;
        let context = this;
        let nowTime = +new Date();
        let remain = nowTime - startTime
        const later = () => {
            timeout = null;
            startTime = nowTime
            func.apply(context, args);
        }
        if (timeout) clearTimeout(timeout)
        if (remain > wait || remain < 0) {
            later()
        } else if (option.trailing !== false) {
            timeout = setTimeout(later, wait - remain);
        }
    }
    throttleFunc.cancel = function () {
        if (timeout) clearTimeout(timeout)
        timeout = null;
        startTime = 0
    }
    return throttleFunc
  }