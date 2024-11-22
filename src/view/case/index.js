import './index.less'

$(function () {

    let iframeList = []
    $.ajax({
        url: 'http://196.10.20.222:8081/prod-api/perspectives/list',
        method: 'get',
        data: {
            weekType: 1,
            pageSize: 4
        },
        success: function (result) {
            iframeList = result.rows
            // 假设有一个空的 div 容器来装视频
            result.rows.forEach((item, index) => {
                // 为每个视频创建一个唯一的ID
                const uniqueId = `my-player-${index}`;

                const $div = $(`<div class="swiper-item swiper-slide" data-index="${index}" id="my-player">
                                <iframe id="${uniqueId}" style="width: 100%;height:150px;pointer-events: none;" autoplay="false" src="${item.videoFile}"></iframe>
                                <div style="margin-top: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: 800;">${item.title}</div>
                            </div>
                `);

                if(index == 0) {
                    $("#current-play").append(`<div class="swiper-item swiper-slide" id="my-player" style="width: 100%;height:400px">
                                <iframe id="${uniqueId}" style="width: 100%;height:100%" autoplay="false" src="${item.videoFile}"></iframe>
                                <div class="menceng">
                                    <div>${item.title}</div>
                                    <div>节目类型：${item.type}</div>
                                    <div>播出时间：${item.broadcastdate}</div>
                                    <div>播出频道：${item.channelType2}</div>
                                </div>
                            </div>`)
                }

                // 将新创建的div添加到#video-swiper容器中
                $('#video-swiper').append($div);
            });

        }
    });
    
    $(document).on('click', '#my-player', function() {
        let indexId =$(this).attr('data-index')
        $("#current-play").empty()
        iframeList.forEach((item, index) => {
            if(Number(indexId) == index) {
                $("#current-play").append(`<div class="swiper-item swiper-slide" id="my-player" style="width: 100%;height:400px">
                    <iframe style="width: 100%;height:100%" autoplay="false" src="${item.videoFile}"></iframe>
                    <div class="menceng">
                        <div>${item.title}</div>
                        <div>节目类型：${item.type}</div>
                        <div>播出时间：${item.broadcastdate}</div>
                        <div>播出频道：${item.channelType2}</div>
                    </div>
                </div>`)
            }
        })
        // console.log(`Clicked on specific iframe: ${this.id}`);
    });


    $.ajax({
        url: 'http://196.10.20.222:8081/prod-api/perspectives/list',
        method: 'get',
        data: {
            weekType: 2,
            pageSize: 9,
            pageNum: 1
        },
        success: function (result) {
            console.log(result.rows, "result.rows")
            result.rows.forEach(item => {
                let $div = $(`<div class="menu-item">
                    <img class="img-logo" src="http://196.10.20.222:8081/prod-api${item.img}" />
                    
                    <div class="menu-item-right">
                        <div class="title">《${item.title}》</div>
                        <div class="sub-title">类型：${item.type}</div>
                        <div class="content">频道：${item.channelType2}</div>
                        <div class="content">播出时间：${item.broadcastdate}</div>
                        <div class="content">
                            <span>简介：</span>
                            <div class="text-container" id="textElement">${item.info}</div>
                        </div>
                        
                    </div>
                </div>`);
                $('.menu-list').append($div)
            })
              
            const container = document.querySelector('.text-container');
            const lineHeight = parseFloat(window.getComputedStyle(container).lineHeight);
            const maxHeight = lineHeight * 4;

            // 动态计算并裁剪文本
            function clipText() {
                while (container.scrollHeight > maxHeight) {
                    container.textContent = container.textContent.slice(0, -1);
                    $(container).addClass('ellipsis');
                }
            }
            
            clipText();

        }
    });

    
})