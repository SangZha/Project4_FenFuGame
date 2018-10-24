var number = $('.wish-totalnumber-number').text();
$('.wish-game-delete').click(function(){
    number--;
    $(this).parents('.wish-listbox').remove();
    $('.wish-totalnumber-number').text(number);
})