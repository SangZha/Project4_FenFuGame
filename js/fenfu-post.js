$(".attention-button").click(function(){
    $(this).removeClass("on");
    $(this).siblings().addClass("on");
})

$(".reply-button,.answer-button").click(function(){
    var id = 0;
    var root = $(this).parents(".reply-output").find(".output-inputbox").find(".inputbox")
    if($(root).hasClass("off")){
        $(".inputbox").removeClass("on").addClass("off");
        root.removeClass("off");
    }
        
    $(".inputbox textarea").removeClass("reply").removeClass("answer");
    if($(this).is('.reply-button')){
        id = $(this).parents(".reply-output").data('id');
        root.addClass("on").find("textarea").addClass("reply").data('id',id).attr('data-id',id);
    }
    else{   
        id = $(this).parents(".output-answer").data('id');
        root.addClass("on").find("textarea").addClass("answer").data('id',id).attr('data-id',id);
    }
})

