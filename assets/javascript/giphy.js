

// Array of gif search terms
// =====================================

var searchTerm = [];

// Function to render the HTML to the DOM
// =====================================

function displayGifImages() {

	$("#gifs").empty();

	var gif = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=95a5e7e23ef143ea8bc270fc854c1dc3&limit=10";


// // Ajax Call
// // =====================================

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		// Storing response in a result variable
		var result = response.data;

		// console.log(result[0].images);

		for (var i = 0; i < response.data.length; i++) {

			var activeUrl = result[i].images.original.url;

			var stillUrl = result[i].images.original_still.url;

			// Creating a div to hold the gif
			var gifImage = $("<img>");

			gifImage.attr("src", stillUrl);

			gifImage.attr("data-still", stillUrl);

			gifImage.attr("data-active", activeUrl);

			gifImage.attr("data-state", "still");

			gifImage.addClass("gif-images");

			$("#gifs").append(gifImage);
		}

	})
}


// =====================================


function renderButtons() {

	$("#buttons-view").empty();

	for (var i = 0; i < searchTerm.length; i++) {

		var a = $("<button class='btn btn-default btn-sm'>");

		a.addClass("gif");

		a.attr("data-name", searchTerm[i]);

		a.text(searchTerm[i]);

		$("#buttons-view").append(a);

		// console.log(a);

	}

}

$("#add-gif").on("click", function(event) {
	event.preventDefault();
	var gif = $("#user-input").val().trim();
	searchTerm.push(gif);
	renderButtons();
});

$(document).on("click", ".gif", displayGifImages);

$(document).on("click", ".gif-images", function() {

	var state = $(this).attr("data-state");

	console.log("It's been clicked");

	console.log(state);

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-active"));
		$(this).attr("data-state", "active");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
})

