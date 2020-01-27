//Create initial array
let animals = ["rabbit", "horse", "porcupine", "cat", "squirrel", "woodchuck", "moose", "snake", "camel", "lion", "tiger", "bear"];

// Add a button to HTML for every value in the animals array
function addButtons() {
    for (let i = 0; i < animals.length; i++) {
        let button = $("<button>");
        button.addClass("button");
        button.attr({
            "name": `${animals[i]}`,
            "type": "submit",
            "value": `${animals[i]}`
        });
        button.text(`${animals[i]}`);
        $(".giphyButtons").append(button);
    }
}

// Call the addButtons function
addButtons();

// Create new button everytime something is entered into the textbox and submitted
$("#submit").on("click", function () {
    event.preventDefault();
    if ($("#animalText").val() == "") {
        alert("You need to enter a value");
    } else {
        let value = $("#animalText").val().trim();
        animals.push(value);
        let button = $("<button>");
        button.addClass("button");
        button.attr({
            "name": `${animals[animals.length-1]}`,
            "type": "submit",
            "value": `${animals[animals.length-1]}`
        });
        button.text(`${animals[animals.length-1]}`);
        $(".giphyButtons").append(button);
        $("#animalText").val("");
    }
});

// Create ajax request
let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=FGLJYIo5FRRuG0foJ1456WMaClBF0zQN";
let q = "&q=";
let limit = "&limit=" + 5;
let rating = "&rating=" + "";

// Create click event for querying the Giphy API
$("body").on("click", ".button", function () {
    let value = $(this).attr("value");
    let url = queryURL+q+value+limit;
    console.log(url);
    
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        data = response.data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let d = $("<div>");
            let p = $("<p>");
            p.text("Rating: " + data[i].rating);
            d.append(p);
            let img = $("<img>");
            let still = data[i].images.fixed_height_still.url;
            let animate = data[i].images.fixed_height.url;
            img.addClass("gif");
            img.attr({
                "src": still,
                "data-still": still,
                "data-animate": animate,
                "data-state": "still"
            });
            d.append(img);
            $(".giphyContainer").prepend(d);
        }
    });
});

//Create on click event for starting and stopping the gif's
$("body").on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });