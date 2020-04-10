$('.scheme rect').click(function (event) {
	console.log("x: " + event.clientX + "; y: " + event.clientY); // DEBUG
	$('.scheme-popup').hide();
	$('.scheme rect').attr('class', '');



	var popup = $('.scheme-popup[data-id=' + $(this).data('id') + ']');
	$(popup).css('top', event.clientY + "px");
	$(popup).css('left', event.clientX + 'px');
	$('.scheme rect[data-id=' + $(this).data('id') + ']').attr('class', 'active');
	$(popup).show();


});


// Клик вне магазинов все закрывает.
$("body").click(function (e) {
	if ($(e.target).closest(".scheme rect, .scheme-popup").length == 0) {
		$(".scheme-popup").hide();
		$('.scheme rect').attr('class', '');

	}
});

function changeZindex(elemId) {
	document.getElementById('q1').style.zIndex = "5";
	document.getElementById('q2').style.zIndex = "5";
	document.getElementById('q3').style.zIndex = "5";
	document.getElementById('q4').style.zIndex = "5";

	document.getElementById(elemId).style.zIndex = "500";
}