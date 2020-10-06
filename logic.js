//vars needed:
// var citySearched= //text in search box in sidebar;
// var cityDisplay
// var dateDisplay
// var temperature
// var windSpeed
// var uvIndex

//search button click event: citySearched should feed into API search in openweathermaps

//search button click registers info then clears
$("#searchBtn").on("click", function () {
    var apiKey = "7295765f9a8470ed196df254c5b22bfd"
    var citySearch = $("#citySearch").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + apiKey;

    //   citySearch needs a new row added to the sidebar for each submission 
    $("#citySearch").val("");

    //ajax call

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(citySearch);
        console.log(response);
        $(".city-name").text(response.name);
        $(".temp").text("Temperature: " + response.main.temp + "° F");
        $(".hum").text("Humidity: " + response.main.humidity);
        $(".windSpeed").text("Windspeed: " + response.wind.speed + " MPH");

        // UV index call
        // latitude and longetude pulled from coordinates from first ajax call

        var lat = response.coord.lat
        var lon = response.coord.lon
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uv) {
            console.log(uv);
            $(".UV").text("UV index: " + uv.value);
        })

    });


})

