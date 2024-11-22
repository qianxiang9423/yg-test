import './index.less';
import { LOGINURLBASE } from '../../api/api.js'

$(function() {
  // window.animateTimeOut.getTimeOut(5000,1500,[$("#renewal"),$("#growth"),$("#company"),$("#clue")]);
  var tId = null;

    window.onScrollElement.dataHandle();

    window.onscroll = function(){
      var elementArry = window.onScrollElement.elementArry;
      var clientHeight = $(window).height();
      clearTimeout(tId);
      tId = setTimeout(function(){
          window.lazyLoad(clientHeight);
          elementArry.forEach((obj,i)=>{
              window.onScrollElement.onScrollAuto(obj,clientHeight);
          })
      },100)
  }
})