var topics = ["Cowboy Bebop", "Trigun", "Pokemon", "Dragonball Z", "FLCL", "Ouran High School Host Club", "Fairy Tail", "Attack on Titan"]
var queryUrl = "http://api.giphy.com/v1/gifs/search"
var apiKey = "dc6zaTOxFJmzC"
var searchData = {
	q: "funny cat",
	"api_key": apiKey,
	limit: 3 // TODO: Update to 10 when finished
}
// http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=1&offset=0


// Function: Create buttons from topics array
	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button>").attr("class", "btn btn-anime").attr("id", topics[i]).html(topics[i]);
		$(".row-buttons > div").append(newButton);
	}

// Function: Write static & animated image URLs to <img>, Write static image to src
$.ajax({
	url: queryUrl,
	method: 'GET',
	data: searchData
}).done(function(response){
	console.log(response)
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
	// Function: Change gif to animate when clicked
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
	// Function: Pull item from search box when Submit pressed & add to topics array
	$("#btnSubmit").on("click", function(){
		topics.push($("#inputButtonRequest").val());
		console.log(topics);
	});
	$('#inputButtonRequest').keypress(function(e){
        if(e.which == 13) {
        	$("#btnSubmit").click();
        }
    });
});

// Re-run buttons function?









