$('.setting-edit-item button').click(function(){
    var name = $('.edit-item-box.name input').val();
    var intro = $('.edit-item-box.intro textarea').val();
    var steam = $('.edit-item-box.steam input').val();
    var sina = $('.edit-item-box.sina input').val();
    var wechat = $('.edit-item-box.wechat input').val();
    var qq = $('.edit-item-box.qq input').val();
    var sex = $('.edit-item-box.sex input').val();
    var email = $('.edit-item-box.email input').val();

    $.ajax({
        type:"POST",
        data:{
            "name":name,
            "intro":intro,
            "steam":steam,
            "sina":sina,
            "wechat":wechat,
            "qq":qq,
            "sex":sex,
            "email":email,
            "modelType":"post",
        },
        url:"/addreply/",
        cache:false,
        dataType:"html",
        success:function(data,status,xml){
            if (data == "CommentReply_Flag"){
                //成功评论
                // alert("回复成功");
                // alert(data);
                alert(data);
            }
            else{
                //不成功报错
                // alert("回复失败");
                // alert(data);
            }
        }
    })
})