import './index.less'

// 工作动态
$.ajax({
  url: 'http://196.10.20.222:8081/prod-api/reports/list2',
  method: 'get',
  data: {
    type: "行业趋势报告",
  },
  async: false,
  success: function (result) {
    // 创建一个新的列表项元素，并将当前数组元素的值设置为其文本内容
    result.rows.forEach((item) => {
      var $div = $(`<div class="tendency-item" data-url="http://196.10.20.222:8081/prod-api${item.pdfFile}">
        <img class="cover-img" src="http://196.10.20.222:8081/prod-api${item.image}" />
        <div class="tendency-right">
            <div class="tendency-item-title">${item.title}</div>
            <div class="tendency-item-subtitle">
                报到摘要：
            </div>
            <div class="tendency-item-content">
                ${item.baseInfo}
            </div>
        </div>
    </div>`);

      // 将新创建的列表项添加到无序列表中
      $('#tendency-list').append($div);
    })
  }
});
function downloadFile(url, fileName) {
  window.open(url);
  // $.ajax({
  //   url: url,
  //   method: 'GET',
  //   xhrFields: {
  //     responseType: 'blob'
  //   },
  //   success: function (data) {
  //     var a = document.createElement('a');
  //     var url = window.URL.createObjectURL(data);
  //     a.href = url;
  //     a.download = fileName;
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();
  //     window.URL.revokeObjectURL(url);
  //   }
  // });
}

$('#tendency-list').on('click', '.tendency-item', function(event) {
  var targetElement = event.target.closest('.tendency-item');
  let dataUrl = targetElement.getAttribute('data-url');
  downloadFile(dataUrl, dataUrl.split('/').pop())
});

$.ajax({
  url: 'http://196.10.20.222:8081/prod-api/reports/list2',
  method: 'get',
  data: {
    type: "特别栏目报告",
  },
  async: false,
  success: function (result) {
    // 创建一个新的列表项元素，并将当前数组元素的值设置为其文本内容
    result.rows.forEach((item) => {
      var $div = $(`<div class="programa-item" data-url="http://196.10.20.222:8081/prod-api${item.pdfFile}">
        <img class="cover-img" src="http://196.10.20.222:8081/prod-api${item.image}" />
        <div class="programa-right">
            <div class="programa-item-title">${item.title}</div>
            <div class="programa-item-subtitle">
                报到摘要：
            </div>
            <div class="programa-item-content">
            ${item.baseInfo}
            </div>
        </div>
    </div>`);

      // 将新创建的列表项添加到无序列表中
      $('#programa-list').append($div);
    })
  }
});

$('#programa-list').on('click', '.programa-item', function(event) {
  var targetElement = event.target.closest('.programa-item');
  let dataUrl = targetElement.getAttribute('data-url');
  downloadFile(dataUrl, dataUrl.split('/').pop())
});

$.ajax({
  url: 'http://196.10.20.222:8081/prod-api/reports/list',
  method: 'get',
  // data: {
  //   type: "收视综合分析",
  // },
  async: false,
  success: function (result) {
  //   var $div = $(`<div class="analyse-item">
  //     <div>中国视听大数据发布2023年收视年报</div>
  // </div>`);

  result.rows.forEach((item) => {
    var $div = $(`<div class="analyse-item" data-url="http://196.10.20.222:8081/prod-api${item.pdfFile}">
      <div>${item.title}</div>
  </div>`);
      // 将新创建的列表项添加到无序列表中
      $('#analyse-list').append($div);
    })
  }
});