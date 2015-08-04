$(function() {

function findAll (inputString) {
	var arr = [];
	var re = /[a-z0-9]{6}/g;
	arr.push(inputString.match(re));
	arr[0].shift();
	console.log(arr[0]);
	$('#examples').show();
	$('body').css('background-color', '#'+arr[0][4]);
	$('.change').css('color', '#'+arr[0][2]);
}

$('#import-kuler').on('submit', function (e) {
	e.preventDefault();
	findAll($('#kuler-url').val());
});


$('#reset-color').on('click', function (e) {
	e.preventDefault();
	$('#examples').hide();
	$('body').css('background-color', 'white');
	$('.change').css('color', '#333');

});
})