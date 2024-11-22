import './index.less'

var id = 0
  var query = window.location.search.substring(1);
  console.log(query, "query")
  var params = query.split('&');
  for (var i = 0; i < params.length; i++) {
    var keyValue = params[i].split('=');
    if (keyValue[0] === 'id') {
      id = decodeURIComponent(keyValue[1]);
      break;
    }
  }

  

  $(document).ready(function() {
    $.ajax({
      url: `http://196.10.20.222:8081/prod-api/lib/${id}`,
      method: 'get',
      success: function (result) {
        let date = result.data
        $(".img-logo").attr("src", `http://196.10.20.222:8081/prod-api/${date.goodImg}`);
        $(".title").text(date.title)
        $(".sub-title").text(date.episodes)
        $(".detail-right").text(date.info)
        $(".rate").text(date.rate)
        $(".leading-role").text(date.actStr || "暂无")
        $(".director").text(date.director || "暂无")
      }
  });
  })