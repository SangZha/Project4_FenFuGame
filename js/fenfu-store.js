//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

$(".gamelist-switch").click(function(){
    var list_index = $(this).index();

    location.href = "./store.html?type="+list_index+"";
})
$(".tag-name").click(function(){
    var tag = $(this).parent(".tags-block");
    var index = $(this).parent().index();
    var boxid = $(this).parents(".search-block").index();
    var typeid = getUrlParam('type');
    var priceid = getUrlParam('price');
    var dateid = getUrlParam('date');

    tag.siblings().removeClass("checked");
    tag.addClass("checked")

    tag.siblings().children(".fa").removeClass("fa-check-square-o");
    tag.siblings().children(".fa").addClass("fa-square-o");
    tag.children(".fa").addClass("fa-check-square-o");
    tag.children(".fa").removeClass("fa-square-o");

    if(boxid===0){
        if(priceid===null && dateid===null){location.href = "./store.html?type="+index+"";}
        else if(!dateid){location.href = "./store.html?type="+index+"&price="+priceid+"";}
        else if(!priceid){location.href = "./store.html?type="+index+"&date="+dateid+"";}
        else{location.href = "./store.html?type="+index+"&price="+priceid+"&date="+dateid+"";}}
    else if(boxid===1){
        if(typeid===null && dateid===null){location.href = "./store.html?price="+index+"";}
        else if(!typeid){location.href = "./store.html?price="+index+"&date="+dateid+"";}
        else if(!dateid){location.href = "./store.html?type="+typeid+"&price="+index+"";}
        else{location.href = "./store.html?type="+typeid+"&price="+index+"&date="+dateid+"";}}
    else if(boxid===2){
        if(priceid===null && dateid===null){location.href = "./store.html?date="+index+"";}
        else if(!typeid){location.href = "./store.html?price="+index+"&date="+dateid+"";}
        else if(!priceid){location.href = "./store.html?type="+typeid+"&date="+index+"";}
        else{location.href = "./store.html?type="+typeid+"&price="+priceid+"&date="+index+"";}}
})

window.onload = function(){
    var typeid = getUrlParam('type');
    var priceid = getUrlParam('price');
    var dateid = getUrlParam('date');
// 函数，用来根据网址记录用户选择
    function editList (boxid,index){
       $(".search-block").eq(boxid).find(".tags-block").eq(index).addClass("checked");
       $(".search-block").eq(boxid).find(".fa").eq(index).removeClass("fa-square-o");
       $(".search-block").eq(boxid).find(".fa").eq(index).addClass("fa-check-square-o");
    }
// 初始化网页选择列表
    if(typeid===null && priceid===null && dateid===null){
       $(".search-block").find(".tags-block").removeClass("checked");
       $(".search-block").find(".fa").removeClass("fa-check-square-o");
       $(".search-block").find(".fa").addClass("fa-square-o");
    }
// 运行上方函数
    if(typeid===null){editList(0,0)}
    else {editList(0,typeid)}
    if(priceid===null){editList(1,0)}
    else {editList(1,priceid)}
    if(dateid===null){editList(2,0)}
    else {editList(2,dateid)}

    $(".gamelist-switch").removeClass("active");
    $(".gamelist-switch").eq(typeid).addClass("active");
}
