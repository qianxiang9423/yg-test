import './index.less';
import { LOGINURLBASE, BASEURL } from '../../api/api.js'

$(function () {
    var tId = null; //
    var swiper = null

    console.log(LOGINURLBASE, "LOGINURLBASE")
    // 右侧新闻banner
    $.ajax({
        url: 'http://196.10.20.222:8081/prod-api/news/list?type=2&pageSize=5',
        method: 'get',
        success: function (result) {
            $.each(result.rows, function (index, item) {
                let url = ""
                if (item.img){
                    url = "http://196.10.20.222:8081/prod-api" + item.img
                } else {
                    url = "/images/banner.png"
                }
                var $li = $('<div class="home-swipe swipe-item swiper-slide" ><img alt="cvb" style="width:100%;height:100%;object-fit: cover;" src="' + url + '"/></div>');
                // 将新创建的列表项添加到无序列表中
                $('#swiper').append($li);
                var $li = $(`<div class="banner item" data-index=${index} data-id=${index}>
                    <a target="_blank" href="newDetail.html?id=${item.id}&type=2" style="display:flex;justify-content: space-between;">
                        <div style="flex:1">${item.title}</div>
                        <div style="width: 100px">${item.updatedAt}</div>
                    </a>
                    </div>`);
                // 将新创建的列表项添加到无序列表中
                $('.left').append($li);
                swiper = new Swiper('.home-banner-swipe', {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        type: 'bullets',
                    },
                    loop: true,
                });
                swiper.update()
            })
        }
    });
    $(document).ready(function() {
        $(document).on('mouseenter', '.banner', function () {
            var id = $(this).attr("data-id");
            var index = $(this).attr("data-index");
            swiper.slideTo(id, 1000, false);
            $('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active'); // 移除所有指示器的'active'类
            $($('.swiper-pagination-bullet')[index]).addClass('swiper-pagination-bullet-active'); // 为当前幻灯片的指示器添加'active'类
        });
    })
    


    $.ajax({
        url: 'http://196.10.20.222:8081/prod-api/index_video_recom/list',
        method: 'get',
        data: {
            weekType: 1
        },
        success: function (result) {
            // 假设有一个空的 div 容器来装视频
            result.rows.forEach((item, index) => {
                // 为每个视频创建一个唯一的ID
                // https://www.mgtv.com/activity/mgtv-player-page/?vid=21862777&muted=1&cxid=iencrbs7v&autoplay=0
                const uniqueId = `my-player-${index}`;
                let $div = $(`<div class="swipe-item swiper-slide" id="my-player">
                                <iframe id="${uniqueId}" style="width: 100%;height:67.5%" autoplay="false" src="${item.videoFile}"></iframe>
                                <div class="heade-title">
                                    <div>节目名称：${item.name}</div>
                                    <div>节目类型：${item.type}</div>
                                    <div>播放频道：${item.channelType2}</div>
                                </div>
                            </div>`)

                // 将新创建的div添加到#video-swiper容器中
                $('#video-swiper').append($div);

                // 使用唯一的ID初始化 video.js 播放器
                // const player = videojs(uniqueId, {
                //     preload: 'auto'
                // });
            });

            var swiper = new Swiper('.video-swipe-container', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: false,
                },
                navigation: {
                    nextEl: '.swiper-video-next',
                    prevEl: '.swiper-video-prev',
                },
                paginationClickable: true,
                watchActiveIndex: true
            });

        }
    });
    
})