/* Twinklebox */
// Wait for the document to load
document.addEventListener('DOMContentLoaded', function () {
	// Wrap all <img> tags with the twinklebox class with an <a> tag
	var imgLinks = document.querySelectorAll("img.twinklebox");
	for (var i = 0; i < imgLinks.length; ++i) {
		imgLinks[i].classList.remove('twinklebox');
		var currentContent = imgLinks[i].outerHTML;
		console.log('the length is ' + imgLinks[i].classList);
		var wrappedContent = '<a href="' + imgLinks[i].src + '" class="twinklebox">' + currentContent + '</a>';
		imgLinks[i].outerHTML = wrappedContent;
	};
	/*$('.twinklebox').click(function (link) {
		link.preventDefault();

		var image_link = $(this).attr('href');

		var twinklebox = '<div id="tb-overlay">' +
						 '<div id="twinklebox">' +
						 '<img src="' + image_link + '">' +
						 '<div id="tb-nav-left"><svg class="tbi-previous"><use xlink:href="../img/sprite.svg#tbi-previous"></use></svg></div>' +
						 '<div id="tb-nav-right"><svg class="tbi-next"><use xlink:href="../img/sprite.svg#tbi-next"></use></svg></div>' +
						 '</div>' +
						 '</div>';
		$('body').append(twinklebox);
		$('#tb-overlay').fadeIn(500);
	});*/
});

/*$(document).on('click', '#tb-overlay', function () {
	$('#tb-overlay').fadeOut(500);
	$('#tb-overlay').remove();
});
*/
