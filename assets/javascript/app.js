var topics = ["Cowboy Bebop", "Trigun", "Pokemon", "Dragonball Z", "FLCL", "Ouran High School Host Club", "Fairy Tail", "Attack on Titan"];
var queryUrl = "https://api.giphy.com/v1/gifs/search";
var apiKey = "dc6zaTOxFJmzC";
var searchData = {
	q: "cowboy bebop",
	"api_key": apiKey,
	limit: 5 // TODO: Update to 10 when finished
};

/*
========================
ADD EVENT LISTENERS
========================
*/
// Create buttons and add event listenters to new buttons
function newButtonsEventListeners() {
	createButtons();
	animeButtonClicked();
}
// Add Event listener to submit button and gifs currently on page
function runOnPageLoad() {
	addInputToTopicsArr();
	animateGifs();
}
/*
========================
FUNCTIONS
========================
*/
// Function: Create buttons from topics array
function createButtons() {
	$(".row-buttons > div").empty();
	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button>").attr("class", "btn btn-anime").attr("id", topics[i]).html(topics[i]);
		$(".row-buttons > div").append(newButton);
	}
}
// Function: push relevant GIFs to page when anime button is clicked 
function animeButtonClicked() {
	$(".btn-anime").unbind();
	$(".btn-anime").on("click", function() {
		searchData = {
			q: $(this).html(),
			"api_key": apiKey,
			limit: 5
		};
		runAjax();
	});
}
// Function: Pull item from search box when Submit pressed & add to topics array
function addInputToTopicsArr() {
	$('#inputButtonRequest').unbind();
	$("#btnSubmit").unbind();
	$('#inputButtonRequest').keypress(function(e){
        if(e.which == 13) {
        	$("#btnSubmit").click();
        }
    });
	$("#btnSubmit").on("click", function(){
		topics.push($("#inputButtonRequest").val());
		$("#inputButtonRequest").val(""); // clear input form
		newButtonsEventListeners();
	});
}
// Function: Change gif to animate when clicked
function animateGifs() {
	$(".gifs").on("click", function(){
		if ($(this).attr("data-state") === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} 
		else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});
}
/*
========================
AJAX
========================
*/
// Function: Run ajax call, run GIFs function and re-add event listeners when ajax call is done 
function runAjax() {
	$.ajax({
		url: queryUrl,
		method: 'GET',
		data: searchData
	}).done(function(response){
		pullRequestedGifs(response);
		runOnPageLoad();
	});
}
// Function: empty the page; for each ajax result write static & animated image URLs to <img>, Write static image to src
function pullRequestedGifs(response) {
	$(".gifs-container > div").empty();
	var results = response.data;
	for (var j = 0; j < results.length; j++) {
		var newImage = $("<img>")
			.attr("class", "img-responsive gifs")
			.attr("data-still", results[j].images.original_still.url)
			.attr("data-animate", results[j].images.original.url)
			.attr("src", results[j].images.original_still.url)
			.attr("data-state", "still");
		var newDiv = $("<div>").attr("class", "col-lg-4 col-md-4 col-sm-6 col-xs-12");
		var newRating = $("<p>").html("Rating: " + results[j].rating);
		newDiv.append(newImage);
		newDiv.append(newRating);
		$(".gifs-container > div").append(newDiv);
	}
}

newButtonsEventListeners();
runAjax();