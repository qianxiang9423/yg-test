import './index.less';

function skipDetail(id) {
  var newUrl = "/detail.html?id=" + id
      // window.location.href = newUrl;
}

$(function () {
  $.ajax({
    url: 'http://196.10.20.222:8081/prod-api/news/list?type=1',
    async: false,
    success: function (result) {
      result.rows.forEach((item, index) => {
        // 创建一个新的列表项元素，并将当前数组元素的值设置为其文本内容
        var $li = $(`<div class="item">
            <a href="newDetail.html?id=${item.id}">${item.title}</a>
            <span>${item.updatedAt}</span>
          </div>`);

        // 将新创建的列表项添加到无序列表中
        $('#new-list').append($li);
      })
    }
  });

  var searchKey = 0
  var query = window.location.search.substring(1);
  console.log(query, "query")
  var params = query.split('&');
  for (var i = 0; i < params.length; i++) {
    var keyValue = params[i].split('=');
    if (keyValue[0] === 'searchKey') {
      searchKey = decodeURIComponent(keyValue[1]);
      break;
    }
  }

  let searchInput = null

  $(document).ready(function () {
    searchInput = new SearchInput({ searchValue: searchKey });
  });

  function getSearch(searchkey) {
    $.ajax({
      url: 'http://196.10.20.222:8081/prod-api/recommendations/defaut?pageSize=3',
      method: 'GET',
      data: {
        searchKey: searchkey
      },
      success: function (result) {
        searchInput.addOptions(result.rows)
        $('#search-list').empty()
        result.rows.forEach(item => {
          // let $div = ``
          $('#search-list').append(`<div id="${item.id}" class="search-item">
                  <img class="img-logo" src="http://196.10.20.222:8081/prod-api/${item.goodImg}" />

                  <div class="search-item-right">
                      <div class="search-head">
                          <div>
                              <div class="title">${item.title}</div>
                              <div class="sub-title">${item.episodes || "37集"}</div>
                          </div>

                          <button class="tv-rate">${item.rate || "1.534%平均收视率"}</button>
                      </div>
                      <div class="content tv-station"><span>导演：</span>${item.channelType2}</div>
                      <div class="content"><span>主演：</span>${item.info}</div>
                  </div>
              </div>`)
        })

        // 使用事件委托，为动态生成的元素绑定点击事件
        $('#search-list').on('click', '.search-item', function(event) {
          var targetElement = event.target.closest('.search-item');
          console.log(targetElement, "targetElement")
          let id = targetElement.getAttribute('id');
          skipDetail(id);
        });
      }
    });
  }

  $("#search-contanier").on('change', function (event, selectedValue) {
    $.throttle(getSearch(selectedValue), 200);
  })
})