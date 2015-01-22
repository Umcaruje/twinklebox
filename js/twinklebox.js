/* Twinklebox */
$(document).ready(function () {
	$("img.twinklebox").each(function () {
		$(this).wrap('<a href="' + $(this).attr('src') + '" class="twinklebox"></a>');
		$(this).removeClass("twinklebox");
	});

	$('.twinklebox').click(function (link) {
		link.preventDefault();

		var image_link = $(this).attr('href');

		var twinklebox = '<div id="twinklebox-overlay">' +
						'<div id="twinklebox">' +
						'<img src="' + image_link + '">' +
						'<div id="twinklebox-nav-left"></div>' +
						'<div id="twinklebox-nav-right"></div>' +
						'</div>' +
						'</div>';
		$('body').append(twinklebox);
		$('#twinklebox-overlay').css('opacity', '1');
	});
});

$(document).on('click', '#twinklebox-overlay', function () {
	$('#twinklebox-overlay').css('opacity', '0');
	$('#twinklebox-overlay').remove();
});
