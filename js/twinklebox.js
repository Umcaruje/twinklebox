/* Twinklebox */
// Wait for the document to load
document.addEventListener('DOMContentLoaded', function () {
	// Wrap all <img> tags with the twinklebox class with an <a> tag
	var imgLinks = document.querySelectorAll("img.twinklebox");
	for (var i = 0; i < imgLinks.length; ++i) {
		imgLinks[i].classList.remove('twinklebox');
		var currentContent = imgLinks[i].outerHTML;
		//console.log('classes left are' + imgLinks[i].classList);
		var wrappedContent = '<a href="' + imgLinks[i].src + '" class="twinklebox">' + currentContent + '</a>';
		imgLinks[i].outerHTML = wrappedContent;
	};

	var Tblinks = document.querySelectorAll('a.twinklebox');

	for (var i = 0; i < Tblinks.length; i++) {
		Tblinks[i].addEventListener('click', function (link) {
			link.preventDefault();
			// Get the image URL
			var image_link = this.getAttribute('href');

			//console.log('The image link is ' + image_link)

				// Twinklebox
			var twinklebox = '<div id="twinklebox">' +
				'<img src="' + image_link + '">' +
				'<div id="tb-nav-left"><svg class="tbi-previous"><use xlink:href="img/sprite.svg#tbi-previous"></use></svg></div>' +
				'<div id="tb-nav-right"><svg class="tbi-next"><use xlink:href="img/sprite.svg#tbi-next"></use></svg></div>' +
				'</div>';
			// Create the overlay div
			var elemDiv = document.createElement('div');
			elemDiv.id = 'tb-overlay'
			elemDiv.innerHTML = twinklebox;
			// Add eventListener for closing
			elemDiv.addEventListener('click', closeTwinklebox, false);
			// Append twinklebox to body
			document.body.appendChild(elemDiv);
			elemDiv.classList.add('tbVisible');
			//$('#tb-overlay').fadeIn(500);
		});
	}
});

var closeTwinklebox = function () {
	var tbOverlay = document.querySelector('#tb-overlay');
	tbOverlay.parentNode.removeChild(tbOverlay);
};
