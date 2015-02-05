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

	// Add eventListener for closing
	elemDiv.addEventListener('click', closeTwinklebox, false);

	// Event handler for the tbNavPrev button
	elemDiv.querySelector('div#tbNavPrev').addEventListener('click', function (e) {
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		prevImage(elemDiv);
	}, false);

	// Event handler for the tbNavNext button
	elemDiv.querySelector('div#tbNavNext').addEventListener('click', function (e) {
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		nextImage(elemDiv);
	}, false);

	elemDiv.querySelector('.tbImage').addEventListener('change', hideNavButtons(elemDiv, this.src), false);
};

function prevImage (elemDiv) {
	var currImg = elemDiv.querySelector('.tbImage').src;
	var prev = tbImages.indexOf(currImg) - 1;
	elemDiv.querySelector('.tbImage').src = tbImages[prev];
	//hideNavButtons(elemDiv, currImg);
}

function nextImage (elemDiv) {
	var currImg = elemDiv.querySelector('.tbImage').src;
	var next = tbImages.indexOf(currImg) + 1;
	elemDiv.querySelector('.tbImage').src = tbImages[next];
	//hideNavButtons(elemDiv, currImg);
}

var hideNavButtons = function (elemDiv, currImg) {
	if (tbImages.indexOf(currImg) == 0) {
		elemDiv.querySelector('#tbNavPrev').style.display = ('none');
	} else {
		elemDiv.querySelector('#tbNavPrev').style.display = ('inline-block');
	};
	if (tbImages.indexOf(currImg) == tbImages.length) {
		elemDiv.querySelector('#tbNavNext').style.display = ('none');
	} else {
		elemDiv.querySelector('#tbNavNext').style.display = ('inline-block');
	}
}
var closeTwinklebox = function () {
	var tbOverlay = document.querySelector('#tbOverlay');
	tbOverlay.parentNode.removeChild(tbOverlay);
};
