$(".coupon-button").click(function(){
    $(this).addClass('off').parent().find(".coupon-done").addClass('off');
    $(this).children().text("已经领取")
})  