$(function () {
    'use strict';
//********************************************* 通过 .data(key,value)可以修改 data-*的属性， 但是！并不会在前端显示修改 ****************************
//********************************************* 就像 .attr(name,value)可以在前端修改，但如果修改的是data-* 只会变样子实际的值是不会变的  所以俩一起用 ****************************
    //replybox_location 存放评论框的位置
    var replybox_location = $(this).parents('.reply_list_main').children(".reply_box");
    //textarea_length 存放动态出现的评论框中的内容
    var textarea_length = replybox_location.find('.reply_box_input').val();
    //replyto_id 获取当前 回复按键 评论的ID
    var replyto_id
    //replyto_userid 获取当前 回复按键 被回复者的ID
    var replyto_userid;
    //replyto_name 获取当前 回复按键 被回复者的名字
    var replyto_name;

    $(".reply_button,.answer_button").click(function () {
        replybox_location = $(this).parents('.reply_list_main').children(".reply_box");
        textarea_length = replybox_location.find('.reply_box_input').val();

//增加一个if事件，判断是否是回复他人，如果是在textarea中提前放好被回复人姓名
        if ($(this).is('.answer_button')) {          
            replyto_id = $(this).parents(".article_reply_list").data('id');              
            replyto_name = $(this).parent().prev().prev().find('.reply_answer_name').text();
            replyto_userid = $(this).parents('.list_answer_main').children('.list_answer_name').data("uid");

                     //如果当前 回复按键 存在回复框
            if (replybox_location.length > 0) {     // <-- 再进行一次判断，为了区分同一评论中的回复楼层和回复楼中楼
                //如果当前动态生成评论框未输入文字
                if (textarea_length == '') {
                    //动态添加目标名称
                    replybox_location.find('.reply_box_input').val("回复 " + replyto_name + " :");
                    //对 data-* 进行修改 不然传值后对象就错了
                        $(".reply_box_submit").data("aid", replyto_id);
                        $(".reply_box_submit").data("uid", replyto_userid);
                        $(".reply_box_submit").attr("data-aid", replyto_id);
                        $(".reply_box_submit").attr("data-uid", replyto_userid);
                }
                else if (replybox_location.find('.reply_box_input').val() == "回复 " + replyto_name + " :") {
                    $(".reply_box").remove();
                }
                else {
                    //删除(达到点击出现再点消失)
                    replybox_location.find('.reply_box_input').val("回复 " + replyto_name + " :");
                        $(".reply_box_submit").data("aid", replyto_id);
                        $(".reply_box_submit").data("uid", replyto_userid);
                        $(".reply_box_submit").attr("data-aid", replyto_id);
                        $(".reply_box_submit").attr("data-uid", replyto_userid);
                }
            }
            else {
                if ($(".article_reply_list").find(".reply_box").length > 0) {  //如果 评论区列表 存在回复框
                    $(".reply_box").remove();   //删除(达到整个评论区回复框只出现一个的效果)
                }
                $('<div/>', {
                    class: 'reply_box',
                }).appendTo($(this).closest(".reply_list_main"));
                $('<textarea/>', {
                    class: 'reply_box_input',
                    placeholder: '请发布健康、积极向上，符合社会主义核心价值观的评论哦',
                    name: 'reply_box',
                    text: "回复 "+ replyto_name +":"    //被回复者的姓名
                }).appendTo(".reply_box");
                $('<button/>', {
                    type: 'button',
                    class: 'reply_box_submit',
                    text: '发表评论',
                    runat: 'server',
                    "data-aid": replyto_id,   //存放被回复评论的ID
                    "data-uid": replyto_userid  //存放被回复评论的评论者名字
                }).appendTo(".reply_box");
            }
        }
//内容同上，只有textarea少一个name而已
        else {
            replyto_id = $(this).parents(".article_reply_list").data('id');
            replyto_userid = $(this).parents(".reply_list_main").children(".reply_user_name").data('uid');

            if (replybox_location.length > 0) {
                if (textarea_length == '') {
                    $(".reply_box").remove();
                }
                else {
                    replybox_location.find('.reply_box_input').val('');
                    $(".reply_box_submit").data("aid", replyto_id);
                    $(".reply_box_submit").data("uid", replyto_userid);
                    $(".reply_box_submit").attr("data-aid", replyto_id);
                    $(".reply_box_submit").attr("data-uid", replyto_userid);
                }
            }
            else {
                if ($(".article_reply_list").find(".reply_box").length > 0) {
                        $(".reply_box").remove();   
                }
                $('<div/>', {
                        class: 'reply_box',
                    }).appendTo($(this).closest(".reply_list_main"));
                    $('<textarea/>', {
                        class: 'reply_box_input',
                        placeholder: '请发布健康、积极向上，符合社会主义核心价值观的评论哦',
                        name: 'reply_box',
                    }).appendTo(".reply_box");
                    $('<button/>', {
                        type: 'button',
                        class: 'reply_box_submit',
                        text: '发表评论',
                        runat: 'server',
                        "data-aid": replyto_id, 
                        "data-uid": replyto_userid
                    }).appendTo(".reply_box");   
            }
        }
    });
})