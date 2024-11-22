import '@/components/header/header.css';
import '@/components/footer/footer.css';
import '@/components/home-footer/footer.less';
import '@/css/common/common.less';
import '@/components/qrocde/index.less';
import '@/components/search-input/index.less'

import './jquery/jquery.waypoints.min.js';
import './jquery/jquery.countup.js';
import '../css/common/css/style.css'
import '../css/common/css/xui.css';
import '../css/common/message.min.css'
import '../components/header/header.js';
import '../components/footer/footer.js';
import './common/message.min.js';
import '../api/api.js'
import { LOGINURLBASE } from '../api/api.js'


(function () {
  var commonFunction = {
    switchToke: function (that, Element, targetElement, activeElement, switchElement) {
      $(`.${targetElement} div`).removeClass(activeElement);
      $('.triangle').remove();
      that.addClass(activeElement);
      $(`.${activeElement}`).parent()[0].appendChild(Element);
      refreshClue(that, switchElement);
    }
  }

  $(".jump-link").click(function () {
    window.open(`${LOGINURLBASE}`, "_blank");
  })

  var autoAnimation = {
    visiable: false,
    exitVisable: false, //确认不在浏览器显示屏中
    getTimeOut: function (time, element, sumElement) {
      const timeSpeed = 10; //默认的每100ms变化一次
      const changeSum = time / 10; //一个轮回变化的次数
      var numberArr = []; // 暂存所有dom的现在的值和最大值的数组

      // 遍历dom，拿值
      element.forEach((item) => {
        numberArr.push({
          now: 0,
          max: item.attr("sum")
        })
      })

      // 延迟动画
      if ($(sumElement).attr("sum-arry") === "join") {
        element.forEach((item, index) => {
          setTime(item);
        })
      }

      function setTime(item) {
        $('#' + item.attr("id")).countUp();
      }
    }
  }
  window.animateTimeOut = autoAnimation;

  var onScrollElement = {
    sumArray: [],
    // clientHeight: null,//页面的可视高度
    elementArry: [], //存放所有有sum-arry属性，处理后的元素
    dataHandle: function () {
      var sumArray = $('*[sum-arry]');
      onScrollElement.sumArray = sumArray;
      sumArray.map((item) => {
        var sumElement = sumArray[item] //每项元素
        var sumElementPosition = sumElement.offsetTop; //每项元素的位置
        var sumHeight = sumElement.offsetHeight; //每项元素的高度
        var elementObj = {
          sumElement,
          sumElementPosition,
          sumHeight
        }
        onScrollElement.elementArry.push(elementObj);
      })
    },
    onScrollAuto: function (elementItem, clientHeight) {
      var scrollTop = $(document).scrollTop();  //当前页面的滚动高度
      var sumElement = elementItem.sumElement;
      var sumElementPosition = elementItem.sumElementPosition;
      var sumHeight = elementItem.sumHeight;


      if (sumElementPosition - clientHeight < scrollTop && sumElementPosition + sumHeight > scrollTop) {
        var sumAttribute = $(sumElement).attr("sum-arry");
        if (sumAttribute === "exit") {
          $(sumElement).attr("sum-arry", "join");
          var sumItemArray = $(sumElement).find($("[sum]"));
          var TimeOutArry = [];
          sumItemArray.map((i) => {
            TimeOutArry.push($(sumItemArray[i]))
          })
          animateTimeOut.getTimeOut(2000, TimeOutArry, sumElement);
        }
      } else {
        $(sumElement).attr("sum-arry", "exit");
      }
    }
  }

  // 页面懒加载
  var lazyLoad = function (clientHeight) {
    // 获取所有的含有data-src属性的元素
    var imgArray = $('*[data-src]');


    var scrollTop = $(document).scrollTop();  //当前页面的滚动高度
    imgArray.map((i) => {
      var img = imgArray[i];
      var nowImgHeight = null;
      if ($(img)[0].offsetParent !== 'body') {
        nowImgHeight = $(img)[0].offsetTop
      } else {
        nowImgHeight = $(img).parent().offsetTop
      }

      // 如果图片的offestTop在区间内则把data-src的地址赋给src
      if (nowImgHeight - clientHeight - 200 < scrollTop &&
        nowImgHeight + clientHeight + 200 > scrollTop) {
        $(img).context.src = $(img).context.dataset.src;
      } else if (nowImgHeight === 0) {
        $(img).context.src = $(img).context.dataset.src;
      }
    })
  }

  window.commonjs = commonFunction;
  window.lazyLoad = lazyLoad;
  window.onScrollElement = onScrollElement;
}(window)); 

