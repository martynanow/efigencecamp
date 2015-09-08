$( '.c-pic-box' ).hover(function() {
  $(this).children('.text-layer').fadeToggle(200).removeClass('box-inactive');
});

$('.icon-menu').on('click', function() {
	$('.mobile-menu').slideToggle(200).toggleClass('menu-inactive');
});

$('.icon-cancel-circle').on('click', function() {
	$('.mobile-menu').slideToggle(200).toggleClass('menu-inactive');
});