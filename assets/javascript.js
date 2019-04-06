// My array of animals to show gifs for once clicked
var animalList = ["Dogs", "Cats", "Bears", "Lions", "Elephants", "Rabbits", "Moose"];
animalList.sort();

// Global variable to link to $counterparts
var animalButtons = $("#animal-buttons");

// function that displays the gifs
function displayAnimal() {
    var animal = $(this).attr("data-name");
    //call to giphy database
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=pKCHSjye8BR1VMWxmo4mxbHcwO58FBKt";

    $.ajax({
        url: queryURL,
        method: "GET"

    })

        .done(function (response) {
            var { data, meta } = response
            console.log(response);

            // Loop through each result item 
            for (var i = 0; i < response.data.length; i++) {
                // put gifs in a div
                var animalDiv = $("<div class='animal'>");

                // Show results of gifs
                var results = response.data;
                var rating = response.Rated;

                // pull rating of gif
                var p = $("<p>").text("Rating: " + results[i].rating);

                // pull gif
                var animalImage = $("<img class='image'>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                //paused images
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                //animated images
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                //how images come in, already paused
                animalImage.attr("data-state", "still");
                animalImage.addClass("gif");
                animalDiv.append(p);
                animalDiv.append(animalImage);
                // add new div to existing divs
                $("#animal-view").prepend(animalDiv);
            }
        });
};


// Function for displaying animal data //
function renderButtons() {
    // Devare the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons) //
    $("#animal-buttons").empty();

    // Loop through the array of animals
    for (var i = 0; i < animalList.length; i++) {
        // TDynamicaly generate buttons for each animal in the array //
        var a = $("<button>");
        // Add a class of animal-btn to the button //
        a.addClass("animal-btn");
        // Add a data-attribute //
        a.attr("data-name", animalList[i]);
        // Provide the initial button text //
        a.text(animalList[i]);
        // Add the button to the buttons-view div //
        $("#animal-buttons").append(a);
    }
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // listening for input in textbox
    var animal = $("#animal-input").val().trim();
    // Adding new animal from the textbox to the array
    animalList.push(animal);

    // Calling renderButtons which handles the processing of the animal array //
    renderButtons();
    $("#animal-input").val("");
});

//event listeners
$("#animal-view").on("click", ".image", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    };
})

//function for what happens when you click on a button
$(document).on("click", ".animal-btn", displayAnimal);
// $("#animal-view").empty();

// Calling the renderButtons function to display the intial buttons //
renderButtons();

