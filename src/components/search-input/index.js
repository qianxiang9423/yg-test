// import './index.less'

$.throttle = function (func, wait) {
  var context, args, timeout, previous = 0;
  return function () {
    var now = new Date().getTime();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
};

class SearchInput {
  constructor(props) {
    const { keywords = [], searchValue } = props
    this.init(keywords)

    if (searchValue) {
      $("#searchInput").val(searchValue)
      $("#search-contanier").trigger('change', [searchValue]);
    }
  }

  init(keywords) {
    keywords.forEach(function (item, index) {
      if (index > 2) {
        return;
      }
      $(".related-search").append("<span>" + item.searchKey + "</span>")
    })
    $(document).ready(function () {
      if ($("#searchInput").val().trim() !== '') {
        $('.related-search').hide();
      }

      // 监听输入框是否有值
      $("#searchInput").on("input", function () {
        var inputValue = $(this).val();
        // 如果输入框中有内容
        if (inputValue) {
          $('.related-search').hide();
          $("#search-contanier").trigger('change', [inputValue]);
        } else if (inputValue == "" && !$(this).is(':focus')) {
          console.log("输入框中没有内容");
          $(".search-content").empty();
          $(".search-content").hide();
          $('.related-search').show();
        }
      });

      $(".search-content").on('click', 'div', function () {
        var name = $(this).attr('data-name'); // 假设你将 item.name 作为一个自定义属性存储
        // 
        $(".search-content").trigger('change', [name]);
      });

      // input 获得焦点
      $('input').off('focus').on('focus', function () {
        console.log('Input获得焦点');
        $('.related-search').hide();
        if ($(this).val().trim() !== '') {
          $(".search-content").show();
        }
      });

      // input 失去焦点
      $('input').off('blur').on('blur', function (event) {
        const isClickedInsideSearchContent = $(event.relatedTarget).closest('.search-content').length > 0;

        if (!isClickedInsideSearchContent) {
          setTimeout(() => {
            console.log('Input失去焦点', $(this).val().trim());
            $('.search-content').hide();

            if ($(this).val().trim() !== '') {
              $('.related-search').hide();
            } else {
              $('.related-search').show();
            }
          }, 100); // 100ms 延迟
        }
      });

      $('.search-content').on('mousedown', function (event) {
        event.preventDefault(); // 防止失去焦点导致的 blur 事件触发
      });
    });
  }

  // 渲染搜索列表
  addOptions(list) {
    $(".search-content").empty();
    list.forEach((item) => {
      $(".search-content").append('<div data-name="' + item.name + '" style="margin: 20px;border-bottom: 1px solid #d4bebe;padding-bottom: 20px;">' + item.title + '</div>')
    })
    $(".search-content").show();
  }
}

$(function () {
  let searchInput = null
  if ($("#searchInput")[0]) {
    $.ajax({
      url: 'http://196.10.20.222:8081/prod-api/recommendations/list2',
      success: function (result) {
        if (!searchInput) {
          searchInput = new SearchInput({ keywords: result.rows });
        }
      }
    });
  }

  function getSearch(searchkey) {
    $.ajax({
      url: 'http://196.10.20.222:8081/prod-api/recommendations/defaut',
      method: 'GET',
      data: {
        searchKey: searchkey
      },
      success: function (result) {
        searchInput.addOptions(result.rows)
      }
    });
  }

  $("#search-contanier").on('change', function (event, selectedValue) {
    console.log(selectedValue, "selectedValue")
    if (selectedValue) {
      $.throttle(getSearch(selectedValue), 200);
    }
  })

  function skipDetail(name) {
    // 拼接URL和参数
    var newUrl = "/searchDetail.html?searchKey=" + name
    window.open(newUrl);
  }

  $(".search-content").on('change', function (event, selectedValue) {
    console.log('选择:', selectedValue);
    skipDetail(selectedValue);
  })
})
