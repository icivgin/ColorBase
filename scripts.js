$(function() {

$('#new-color').on('submit', function (e) {
	e.preventDefault();
	var colorBg = $('#color-value-bg').val();
	var colorFont = $('#color-value-font').val();
	$('body').css('background-color', colorBg);
	$('.change').css('color', colorFont)

	$('#color-value-bg').focus();
	$('#color-value-bg').val('');
	$('#color-value-font').val('');
});

})