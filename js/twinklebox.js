/* Twinklebox */
$(document).ready(function () {
	$("img.twinklebox").each(function () {
		$(this).wrap('<a href="' + $(this).attr('src') + '" class="twinklebox"></a>');
		$(this).removeClass("twinklebox");
	});

	$('.twinklebox').click(function (link) {
		link.preventDefault();

		var image_link = $(this).attr('href');

		var twinklebox = '<div id="tb-overlay">' +
						 '<div id="twinklebox">' +
						 '<img src="' + image_link + '">' +
						 '<div id="tb-nav-left"></div>' +
						 '<div id="tb-nav-right"></div>' +
						 '</div>' +
						 '</div>';
		$('body').append(twinklebox);
		$('#tb-overlay').fadeIn(500);
	});
});

$(document).on('click', '#tb-overlay', function () {
	$('#tb-overlay').fadeOut(500);
	$('#tb-overlay').remove();
});
