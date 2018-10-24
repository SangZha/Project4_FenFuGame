// 游戏列表的动态效果与右侧详细介绍链接
$(".g-listbox-item").hover(function(){
    if($(this).siblings().hasClass("focus")){
        $(this).siblings().removeClass("focus");
        $(this).addClass("focus");

        var data_bid = $(this).data("bid");
        $(".gameinfobox").removeClass("focus");
        $("#gameid-"+data_bid+"").addClass("focus");
    }
    else{
        $(this).addClass("focus");
    }
})

// 切换游戏类型列表时的效果
$(".gamelist-switch").click(function(){
    var index = $(this).index();
    $(".gamelist-listbox").removeClass("focus");
    $(".gamelist-listbox").eq(index).addClass("focus");
    $(".gamelist-listbox").eq(index).find(".g-listbox-item").removeClass("focus");
    $(".gamelist-listbox").eq(index).find(".g-listbox-item").eq(0).addClass("focus");
    var data_bid = $(".gamelist-listbox").eq(index).find(".g-listbox-item").eq(0).data("bid");
    $(".gameinfobox").removeClass("focus");
    $("#gameid-"+data_bid+"").addClass("focus");
})