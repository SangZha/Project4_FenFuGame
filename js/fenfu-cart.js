
// .substr(index) 截取从index开始之后的字符串
// 简单的增减class和修改div
$(".cart-itembox").click(function(){
    var id = $(this).data("id");  //判断当前游戏id
    var price = $(this).find('.price').text().substr(1);
    var total = $('.total-number').text().substr(1);
    var number = $('.meta-number').text();
    var coupon_price;
    // parseInt -> 对变量进行转换，这样 + 符号就能使用
    price = parseInt(price);               
    total = parseInt(total);

    if($(this).hasClass("checked")){
        number--;
        total = total - price;
        $(this).removeClass("checked");
        //修改该游戏前面的勾选框样式（改为未选中）
        $(this).find(".fa").removeClass("fa-check-square-o").addClass("fa-square-o");
        //通过判断是否还存在没被选中的框，有就修改全选的样式(不全选)
        if($(".cart-itembox").find('.fa').hasClass('fa-square-o')){
            $(".cart-tag .fa").removeClass("fa-check-square-o").addClass("fa-square-o")
        }
        //判断当前选择的商品是否选择了对应的优惠券，有 -> 去除选中相应优惠券产生的数据变动
        $('.cart-coupon').each(function(){     
            if($(this).data('id')===id){
                if($(this).hasClass('yes')){
                    coupon_price = parseInt($(this).find(".cart-coupon-value").text());
                    $(this).removeClass('yes');
                    $(this).find('.cart-coupon-border').removeClass('on')
                    total = total + coupon_price 
                }
            }
        })

        $(".meta-number").text(number);  
        $(".total-number").text("¥" +total+ ".00");       
    }
    else{
        $(this).addClass("checked");
        //修改该游戏前面的勾选框样式（改为选中）
        $(this).find(".fa").removeClass("fa-square-o").addClass("fa-check-square-o");
        //通过判断是否还存在没被选中的框，有就修改全选的样式(已全选)
        if(!($(".cart-itembox").find('.fa').hasClass('fa-square-o'))){
            $(".cart-tag .fa").removeClass("fa-square-o").addClass("fa-check-square-o")
        }

        number++;
        total = price + total;
        $(".meta-number").text(number);
        $(".total-number").text("¥" +total+ ".00");       
    }
})
// 简单的增减class和修改div（全选的一系列操作）
$(".cart-tag .fa").click(function(){
    var price=0;
    var total_price=0;
    var number=0;
    // 遍历购物车列表，统合游戏数量和游戏价格
    $(".cart-itembox").each(function(){
        price = parseInt($(this).find('.price').text().substr(1));
        total_price+=price;
        number++;
    })
    // 取消全选勾选框被选中 -> 清零游戏总数，游戏价格，优惠券的使用
    if($(this).hasClass("fa-check-square-o")){
        $(".cart-tag .fa").removeClass("fa-check-square-o").addClass("fa-square-o")
        $(".cart-itembox").removeClass("checked")
        $(".cart-itembox").find(".fa").addClass("fa-square-o").removeClass("fa-check-square-o");  
        $(".meta-number").text(0);  
        $(".total-number").text("¥"+0+".00");    
        $(".cart-coupon-border").removeClass('on');
        $(".cart-coupon").removeClass('yes');
    }
    // 将全选勾选框选中 -> 修改游戏总数，游戏价格
    else{
        $(".cart-tag .fa").removeClass("fa-square-o").addClass("fa-check-square-o")
        $(".cart-itembox").addClass("checked")
        $(".cart-itembox").find(".fa").removeClass("fa-square-o").addClass("fa-check-square-o");
        $(".meta-number").text(number);
        $(".total-number").text("¥" +total_price+ ".00");
    }
})


//优惠券与对应游戏进行绑定
//为什么这个狗屁加号老把字符串串联而不是相加，老要parseInt
$(".cart-coupon").click(function(){
    var id = $(this).data("id");  //判断当前优惠券id
    var coupon_border = $(this).find(".cart-coupon-border");
    var coupon_price = $(this).find(".cart-coupon-value").text(); //获取当前优惠券价格
    var total_price = parseInt($('.total-number').text().substr(1)); //记录总价格
    var item_price; //物品价格
    var number = $('.meta-number').text(); //物品数量

    if(coupon_border.hasClass("on")){              //取消优惠券使用
        $(this).removeClass("yes")
        total_price = parseInt(total_price);
        coupon_price = parseInt(coupon_price);
        total_price = total_price + coupon_price
        
        coupon_border.removeClass("on");
        $(".total-number").text("¥" +total_price+ ".00");
    }
    else{                                          //使用优惠券
        $(this).addClass("yes")
        coupon_border.addClass("on");

        $('.cart-itembox').each(function(){        //循环检测哪个是优惠券对应的游戏
            if($(this).data('id')===id){
                item_price = $(this).find('.price').text().substr(1);
                //如果优惠券未被选中，选中优惠券  并勾选对应的游戏 并将购物车总价修改为 总价 + 游戏价格 - 优惠券价格
                if(!($(this).hasClass('checked'))){
                    number++;
                    total_price = total_price + (item_price - coupon_price);
                }
                //如果优惠券被选中，取消选中  并将购物车总价 修改为 总价 - 优惠券价格
                else{
                    coupon_price = parseInt(coupon_price);
                    total_price = total_price - coupon_price;
                }
                $(this).addClass("checked")
                $(this).find(".fa").removeClass("fa-square-o").addClass("fa-check-square-o");
                
                $(".meta-number").text(number);
                $(".total-number").text("¥" +total_price+ ".00");
            }
        })
    }
})

// 将游戏从购物车中删除
$('.oprbox-delete').click(function(){
    var root = $(this).parents('.cart-itembox');
    var price = root.find('.price').text().substr(1);
    var total = $('.total-number').text().substr(1);
    var number = $('.meta-number').text();
    price = parseInt(price);
    total = parseInt(total);
    if(root.hasClass("checked")){
        number--;
        total = total - price;
        root.removeClass("checked");
        root.find(".fa").removeClass("fa-check-square-o").addClass("fa-square-o");
        $(".meta-number").text(number);  
        $(".total-number").text("¥" +total+ ".00");  
        root.remove();     
    }
    else{      
        root.remove();
    }
})


//如何他妈的循环修改json数据然后存入一个数组里面？？？（数组里面放的是循环生成的不同的json对象）
$(".count-button button").click(function(){
    var g_id;
    var c_id;
    var g_name;
    var c_name;
    var g_price;
    var c_price;
    var game_id = new Array();
    var coupon_id = new Array();

    var total_price = parseInt($('.total-number').text().substr(1));
    var game_detail_array = new Array();
    var coupon_detail_array = new Array();
    function game_detail(id,name,price){
        this.id = id
        this.name = name;
        this.price = price;
    }
    function coupon_detail(id,name,price){
        this.id = id
        this.name = name;
        this.price = price;
    }

//处理选中的游戏和优惠券的数据，放入数组中
    var total_price = parseInt($('.total-number').text().substr(1))
    $('.cart-itembox').each(function(){
        if($(this).hasClass('checked')){
            g_id = $(this).data('id');
            game_id.push(g_id);
            g_name = $(this).find('.item-tag.name a').text();
            g_price = parseInt($(this).find('.item-tag.price').text().substr(1));
            game_detail_array.push(new game_detail(g_id,g_name,g_price));
        }
    })
    $('.cart-coupon').each(function(){
        if($(this).hasClass('yes')){
            c_id = $(this).data('cid');
            coupon_id.push(c_id);            
            c_name = $(this).find('.cart-coupon-name').text();
            c_price = parseInt($(this).find('.cart-coupon-value').text());
            coupon_detail_array.push(new coupon_detail(c_id,c_name,c_price));
        }
    })

//从数组中取出订单的数据，用jq动态生成
    $(game_detail_array).each(function(){
        //直接用 x.append().append()的方法动态生成dom树  append()可以通过逗号隔开的方式 添加多个兄弟节点
        $('.paybox-gamebox').append(
            $('<div/>',{
                class:'gamebox-detail'
            }).append(
                $('<div/>',{
                    class:'gamebox-name',
                    text:this.name,
                }),
                $('<div/>',{
                    class:'gamebox-price',
                    text:'￥' + this.price + '.00',
                })
            )
        )
        g_price = g_price + this.price;
    })
    $(coupon_detail_array).each(function(){
        $('.paybox-couponbox').append(
            $('<div/>',{
                class:'couponbox-detail'
            }).append(
                $('<div/>',{
                    class:'couponbox-name',
                    text:this.name + "(优惠券)",
                }),
                $('<div/>',{
                    class:'couponbox-price',
                    text:'-￥' + this.price + '.00',
                })
            )
        )
    })
    console.log(game_detail_array.id)
    console.log(game_detail_array)
    alert(game_detail_array)
//处理订单中的总数
    $('.settlement-price').text("￥" + total_price + ".00");
//订单的跳出
    $('.paybox-overlay').addClass('active');    

ajax传递订单详情给后台
    $.ajax({
        type:'POST',
        data:{
            'game_id':game_id,
            'coupon_id-id':coupon_id,
            'total_price':total_price,
            "modelType":"post",
        },
        // url:"/addreply/",
        cache:false,
        dataType:"html",
        success:function(data,status,xml){
            alert("支付成功");
        }
    })
})
