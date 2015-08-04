$(function() {

function replaceString (inputString) {
	var re = /\//g;
	return inputString.replace(re, '%2f');
}

$('#import-kuler').on('submit', function (e) {
	e.preventDefault();
	console.log(encodeURIComponent($('#kuler-url').val()));
	$.get('/search', function (data) {
		console.log(data);
	})
});

$('#reset-color').on('click', function (e) {
	e.preventDefault();
	$('#examples').hide();
	$('body').css('background-color', 'white');
	$('.change').css('color', '#333');

});
})