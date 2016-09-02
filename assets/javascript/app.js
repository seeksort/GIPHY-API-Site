var topics = ["Cowboy Bebop", "Trigun", "Pokemon", "Dragonball Z", "FLCL", "Ouran High School Host Club", "Fairy Tail", "Attack on Titan"];
var queryUrl = "https://api.giphy.com/v1/gifs/search";
var apiKey = "dc6zaTOxFJmzC";
var searchData;

// Function: Create buttons from topics array
function createButtons() {
	$(".row-buttons > div").empty();
	for (var i = 0; i < topics.length; i++) {
		var topicsButton = $("<button>")
			.attr("class", "btn btn-anime")
			.attr("id", topics[i]).html(topics[i]);
		$(".row-buttons > div").append(topicsButton);
	}
}

createButtons();

// Listener: Grab user text from input field
$('#inputButtonRequest').keypress(function(e){
    if(e.which == 13) {
    	$("#btnSubmit").click();
    }
});
$("#btnSubmit").on("click", function(){
	var newButton = $("<button>")
		.attr("class", "btn btn-anime")
		.attr("id", $("#inputButtonRequest").val())
		.html($("#inputButtonRequest").val());
	$(".row-buttons > div").append(newButton);
	$("#inputButtonRequest").val(""); // clear input form
});

// Listener: When button clicked, run ajax call, add attributes and still/animate URLs to GIFs and pipe them out to body
$(".btn-anime").on("click", function() {
	searchData = {
		q: $(this).html(),
		"api_key": apiKey,
		limit: 10
	};
	$.ajax({
		url: queryUrl,
		method: 'GET',
		data: searchData
	}).done(function(response){
		$(".gifs-container > div").empty();
			var results = response.data;
		for (var j = 0; j < results.length; j++) {
			// Adding data- classes, Bootstrap classes, and rating
			var newImage = $("<img>")
				.attr("class", "img-responsive gifs")
				.attr("data-still", results[j].images.original_still.url)
				.attr("data-animate", results[j].images.original.url)
				.attr("src", results[j].images.original_still.url)
				.attr("data-state", "still");
			var newDiv = $("<div>").attr("class", "col-lg-4 col-md-4 col-sm-6 col-xs-12");
			var newRating = $("<p>").html("Rating: " + results[j].rating.toUpperCase());
			newDiv.append(newImage);
			newDiv.append(newRating);
			$(".gifs-container > div").append(newDiv);
		};
	});
});

// Listener: Animate or pause GIF when clicked
$(document.body).on("click", ".gifs", function(event){
		console.log("executing");
	if ($(this).attr("data-state") === "still") {
		$(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate");
	} 
	else {
		$(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
	}
});