/* Twinklebox */
// Wait for the document to load
document.addEventListener('DOMContentLoaded', function () {
	// Wrap all <img> tags with the twinklebox class with an <a> tag
	var imgLinks = document.querySelectorAll("img.twinklebox");
	for (var i = 0; i < imgLinks.length; ++i) {
		imgLinks[i].classList.remove('twinklebox');
		var currentContent = imgLinks[i].outerHTML;
		var wrappedContent = '<a href="' + imgLinks[i].src + '" class="twinklebox">' + currentContent + '</a>';
		imgLinks[i].outerHTML = wrappedContent;
	};
	// Push all links to an array
	var tbLinks = document.querySelectorAll('a.twinklebox');
	var tbImages = new Array;
	for (var i = 0; i < tbLinks.length; i++) {
		tbImages.push(tbLinks[i].getAttribute('href'))
	};

	// Make the tbImages array global
	window.tbImages = tbImages;

	for (var i = 0; i < tbLinks.length; i++) {
		tbLinks[i].addEventListener('click', function (link) {
			link.preventDefault();
			// Create Twinklebox
			createTwinklebox(this);
		});
	}
});

function createTwinklebox(imageLink) {
	// Get image number in the album
	var imageNum = tbImages.indexOf(imageLink.getAttribute('href'));

	// Twinklebox
	var twinklebox = '<div id="twinklebox">' +
		'<img src="' + tbImages[imageNum] + '" class="tbImage">' +
		'<div id="tbNavPrev"><svg class="tbi-previous"><use xlink:href="img/sprite.svg#tbi-previous"></use></svg></div>' +
		'<div id="tbNavNext"><svg class="tbi-next"><use xlink:href="img/sprite.svg#tbi-next"></use></svg></div>' +
		'</div>';

	// Create the overlay div
	var elemDiv = document.createElement('div');
	elemDiv.id = 'tbOverlay'
	elemDiv.innerHTML = twinklebox;

	// Append twinklebox to body
	document.body.appendChild(elemDiv);
	elemDiv.classList.add('tbVisible');

	// Hide the appropriate nav buttons
	hideNavButtons(elemDiv);

	// Add eventListener for closing
	elemDiv.addEventListener('click', closeTwinklebox, false);

	// Event handler for the tbNavPrev button
	elemDiv.querySelector('div#tbNavPrev').addEventListener('click', function (e) {
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		changeImage(elemDiv, -1);
		hideNavButtons(elemDiv);
	}, false);

	// Event handler for the tbNavNext button
	elemDiv.querySelector('div#tbNavNext').addEventListener('click', function (e) {
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		changeImage(elemDiv, 1);
		hideNavButtons(elemDiv);
	}, false);
};

function changeImage (elemDiv, a) {
	var currImg = elemDiv.querySelector('.tbImage').src;
	var change = tbImages.indexOf(currImg) + a;
	elemDiv.querySelector('.tbImage').src = tbImages[change];
}

var hideNavButtons = function (elemDiv) {
	var currImg = elemDiv.querySelector('.tbImage').src;
	console.log(tbImages.indexOf(currImg));
	console.log('The length is ' + tbImages.length )
	if (tbImages.indexOf(currImg) == 0) {
		elemDiv.querySelector('#tbNavPrev').style.display = ('none');
	} else {
		elemDiv.querySelector('#tbNavPrev').style.display = ('inline-block');
	};
	if (tbImages.indexOf(currImg) == tbImages.length - 1) {
		elemDiv.querySelector('#tbNavNext').style.display = ('none');
	} else {
		elemDiv.querySelector('#tbNavNext').style.display = ('inline-block');
	};
};
var closeTwinklebox = function () {
	var tbOverlay = document.querySelector('#tbOverlay');
	tbOverlay.parentNode.removeChild(tbOverlay);
};

