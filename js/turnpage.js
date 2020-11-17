(function () {
    /**
     * 翻页数据的存储对象构造函数
     */
    function TurnPage(options, wrap) {
        this.wrap = wrap;
        // 每一页的条数
        this.size = options.size || 5;
        // 当前页码
        this.current = options.current || 1;
        // 总页数
        this.allPage = options.allPage || (options.allSize ? Math.ceil(options.allSize / this.size) : 1);
        // 切换页码的回调函数
        this.changePage = options.changePage || function () {};
    }
    // 初始化
    TurnPage.prototype.init = function () {
        if (this.current > this.allPage) {
            alert('当前页码大于总页数');
        } else {
            this.fillHTML();
            this.bindEvent();
        }
    }

    // 功能处理
    TurnPage.prototype.bindEvent = function () {
        var self = this;
        $('.my-page-prev', this.wrap).click(function () {
            self.current --;
            self.change();
        });
        $('.my-page-next', this.wrap).click(function () {
            self.current ++;
           self.change()
        });
        $('.my-page-num', this.wrap).click(function () {
            self.current = parseInt($(this).text());
            self.change()
        });
        $('.my-page-size-inp').change(function (e) {
            self.size = parseInt($(this).val());//获取改动数据，更改每页条数
            self.current = 1;//每次更改每页条数后都从第一页开始显示
            self.change();
        })
    }

    TurnPage.prototype.change = function () {
        this.fillHTML();
        this.bindEvent();
        this.changePage(this.current, this.size);
    }

    // 填充html结构
    //第一页和最后一页是始终存在的
    //仅当当前页不等于1时，上一页始终存在，当当前页不等于最后一页时，下一页始终存在
    //当当前页和第一页之间有超过两页以上的页码时（this.current-2>2），出现前省略号，当与最后一页有超过两个以上的页码时出现后省略号(this.total-this.current-1>2)
    //出去以上页外，每一页在被点击时都会成为当前页，每次渲染时除去以上元素外，最多会显示当前页的左右各两个标签，如果左右标签数不够就有多少显示多少。
    TurnPage.prototype.fillHTML = function () {
        $(this.wrap).empty();
        var myPageDiv = $('<div class="my-page"></div>');
        var pageSizeDiv = $('<div class="my-page-size">每一页条数:<input class="my-page-size-inp" type="number" min=1 max=50 value=' + this.size + ' /></div>')
        var myTurnPage = $('<ul class="my-turn-page"></ul>');
        // 上一页
        if (this.current > 1) {
            $('<li class="my-page-prev">上一页</li>').appendTo(myTurnPage);
        }
        // 添加第一页
        $('<li class="my-page-num">1</li>').appendTo(myTurnPage).addClass(this.current == 1 ? 'current-page': '');
        // 添加前面的省略号   当前页 - 2  页码和第一页之间是否还有页码  如果有则出现省略号 否则不出现
        if (this.current - 2 > 2) {
            $('<span>...</span>').appendTo(myTurnPage);
        }
        // 添加中间5页
        for (var i = this.current - 2;i <= this.current + 2;i++) {
            if (i > 1 && i < this.allPage) {
                $('<li class="my-page-num"></li>').text(i).appendTo(myTurnPage).addClass(this.current == i ? 'current-page': '');;
            }
        }
        // 添加后面的省略号  如果当前页+2  的页码和最后一页之间还有页码  那么添加这个省略号， 否则不添加
        if (this.allPage - this.current - 1 > 2) {
            $('<span>...</span>').appendTo(myTurnPage);
        }
        // 最后一页
        this.allPage != 1 && $('<li class="my-page-num"></li>').text(this.allPage).appendTo(myTurnPage).addClass(this.current == this.allPage ? 'current-page': '');
        // 下一页
        if (this.current < this.allPage) {
            $('<li class="my-page-next">下一页</li>').appendTo(myTurnPage);
        }
        myPageDiv.append(pageSizeDiv).append(myTurnPage).appendTo(this.wrap);

    }

    $.fn.extend({
        page: function (options) {
            var obj = new TurnPage(options, this);
            obj.init()
        }
    })
})()