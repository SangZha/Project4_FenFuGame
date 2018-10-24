// 根据后台传过来的帖子内容（默认两个p），如果帖子第一行大于100个字符，删除第二行
// 反之显示第二行，并对第二行进行删减
// 这里后台如果可以实行就后台实行
    var post_content = $(".post-content").find("p");
    var index = post_content.eq(0).text().length;
    var dump = 0;
    if(index>100){
        dump = post_content.eq(0).text().slice(0,100) + "...."
        post_content.eq(0).text(dump);
        post_content.eq(1).remove();
    }
    else{
        dump = post_content.eq(1).text().slice(0,100) + "...."
        post_content.eq(1).text(dump);
    }

    $(".attention-button").click(function(){
        $(this).removeClass("on");
        $(this).siblings().addClass("on");
    })

    $('.grouparea-content').find('.group-navblock').find('.group-postbutton').find('.post-button').click(function(){
        $('.grouparea-writearea').addClass("active");
    })

// 判断当前点击为目标窗口以外的地方，进行事件
    $(document).mouseup(function(e){
        var _con = $('.grouparea-write');   // 设置目标区域
        if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
            $('.grouparea-writearea').removeClass("active");
        }
    });