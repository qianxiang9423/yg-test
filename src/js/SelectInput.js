class SelectInput {
    constructor(elemet, defaultValue, options, type) {
        this.elemet = elemet;
        this.defaultValue = defaultValue || '';
        this.options = options || [];
        this.type = type || "default";
        this.currentDate = new Date();
        this.render();
    }

    addInit() {
        const self = this;  // 保存当前对象的引用
        $(this.elemet).click(function (event) {
            $('.select-option').hide();
            $(self.elemet + ' .select-option').show();
        });
        
        // 选择下拉框内容
        $(this.elemet).on('click', '.option-item', (event) => {
            event.preventDefault();  // 阻止默认行为
            event.stopPropagation(); // 阻止事件冒泡

            // 获取当前点击的选项文本
            this.defaultValue = this.options.filter((item) => {
                if(item.label == event.currentTarget.textContent) {
                    return item;
                }
            })
            // this.defaultValue = event.currentTarget.textContent;

            // 更新下拉框容器的显示文本
            // $(event.currentTarget).closest('.select-container').find('> span').text(event.currentTarget.textContent);

            // 尝试隐藏父元素
            $(event.currentTarget).parent().attr('style', 'display: none !important;');

            // 触发 change 事件，并传递选中的值
            $(this.elemet).trigger('change', this.defaultValue);
        });

        $(document).click(function (event) {
            // 点击的目标不是下拉框元素并且不在下拉框内部时，隐藏下拉框
            if (!$(event.target).closest(self.elemet).length) {
                $(self.elemet + ' .select-option').hide();
            }
        });
        
        // 阻止点击下拉框内部时关闭
        $(self.elemet).click(function (event) {
            event.stopPropagation();  // 防止事件冒泡
        });
        
    }

    addMonthChangeListeners() {
        $('#prevMonth').click((res) => {
            let currentDate = this.currentDate;
            currentDate.setMonth(currentDate.getMonth() - 1);  // 修正为 -1，上一月
            this.displayWeeks(currentDate);
        });

        $('#nextMonth').click((res) => {
            let currentDate = this.currentDate;
            currentDate.setMonth(currentDate.getMonth() + 1);  // 下一月
            this.displayWeeks(currentDate);
        });
    }

    formatDate(dateString) {
        const dateParts = dateString.split('/');
        const month = dateParts[1];
        const day = dateParts[2];
        return `${month}${day}`;
    }

    getWeekRanges(currentDate) {
        const weeks = [];
        const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        let currentWeekStart = new Date(startOfCurrentMonth);
        let day = currentWeekStart.getDay();
        let diff = (day === 0 ? -6 : 1) - day;  // 获取当前月的第一个周一
        currentWeekStart.setDate(currentWeekStart.getDate() + diff);

        while (currentWeekStart <= endOfCurrentMonth || currentWeekStart.getDay() !== 1) {
            let currentWeekEnd = new Date(currentWeekStart);
            currentWeekEnd.setDate(currentWeekStart.getDate() + 6);  // 当前周的周日

            const formattedStart = `${currentWeekStart.getMonth() + 1}月${currentWeekStart.getDate()}日`;
            const formattedEnd = `${currentWeekEnd.getMonth() + 1}月${currentWeekEnd.getDate()}日`;

            weeks.push(`${formattedStart} - ${formattedEnd}`);

            currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        }

        return weeks;
    }

    displayWeeks(currentDate) {
        const weeks = this.getWeekRanges(currentDate);
        let currentYear = new Date().getFullYear();
        let html = `
            <div>
                <i class="iconfont icon-jiantou2" id="prevMonth"></i>
                <span>${currentYear}</span>
                <i class="iconfont icon-jiantou21" id="nextMonth"></i>
            </div>`;

        weeks.forEach((item) => {
            html += `<div class="option-item">${item}</div>`;
        });

        $(this.elemet).html(`
            <div class="select-container">
                <span style="padding-left: 25px;>${this.defaultValue}</span>
                <i class="iconfont icon-xiangxiajiantou"></i>
                <div class="select-option">${html}</div>
            </div>
        `);

        // 重新绑定事件监听器
        this.addMonthChangeListeners();
    }

    addMenuChangeListeners() {
        $('#prevMenu').click((res) => {
            let options = [
                {
                    label: '斗破苍穹'
                },
                {
                    label: '凡人修仙传'
                }
            ]
            this.displayMenu(options);
        });

        $('#nextMenu').click((res) => {
            let options = [
                {
                    label: '少年歌行'
                },
                {
                    label: '斗罗大陆'
                }
            ]
            this.displayMenu(options);
        });
    }

    displayMenu(options) {
        let currentYear = new Date().getFullYear();
        let html = `
            <div>
                <i class="iconfont icon-jiantou2" id="prevMenu"></i>
                <span>${currentYear}</span>
                <i class="iconfont icon-jiantou21" id="nextMenu"></i>
            </div>`;

        options.forEach((item) => {
            html += `<div class="option-item">${item.label}</div>`;
        });

        $(this.elemet).html(`
            <div class="select-container">
                <span>${this.defaultValue}</span>
                <i class="iconfont icon-xiangxiajiantou"></i>
                <div class="select-option">${html}</div>
            </div>
        `);

        // 重新绑定事件监听器
        this.addMenuChangeListeners();
    }

    render() {
        if (this.type == "default") {
            console.log(222222222)
            var html = '';
            $.each(this.options, function (index, item) {
                html += `<div class="option-item">${item.label}</div>`;
            });
            // let optionHtml = $(this.elemet + ' .select-option').append(html);
            $(this.elemet).append(`<div class="select-container"><span>${this.defaultValue}</span><i class="iconfont icon-xiangxiajiantou"></i><div class="select-option">${html}</div></div>`);
        } else if (this.type == "changeDate") {
            this.displayWeeks(this.currentDate);
        } else if (this.type == "changeMenu") {
            this.displayMenu(this.options);
        }

        this.addInit();  // 初始化事件
    }
}
