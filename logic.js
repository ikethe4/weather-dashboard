//vars needed:
// var citySearched= //text in search box in sidebar;
// var cityDisplay
// var dateDisplay
// var temperature
// var windSpeed
// var uvIndex

//search button click event: citySearched should feed into API search in openweathermaps
function searchWeather(city) {
    var apiKey = "3a62f7eb84bb3fe25640af56e798b7da"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    //   citySearch needs a new row added to the sidebar for each submission 
    $("#citySearch").val("");

    //ajax call

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(citySearch);
        console.log(response);
        $(".city-name").text(response.name);
        $(".temp").text("Temperature: " + response.main.temp + "° F");
        $(".hum").text("Humidity: " + response.main.humidity);
        $(".windSpeed").text("Windspeed: " + response.wind.speed + " MPH");

        // UV index call
        // latitude and longetude pulled from coordinates from first ajax call

        var lat = response.coord.lat
        var lon = response.coord.lon
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uv) {
            // console.log(uv);
            $(".UV").text("UV index: ");

            if (uv.value < 3) {
                var uvColor = $("<span class= 'low'>");
            }
            else if (uv.value < 5) {
                var uvColor = $("<span class= 'medium'>");
            }
            else if (uv.value < 7) {
                var uvColor = $("<span class= 'high'>");
            }
            else if (uv.value < 9) {
                var uvColor = $("<span class= 'very-high'>");
            }
            else {
                var uvColor = $("<span class= 'extreme'>");
            }


            uvColor.text(uv.value);
            $(".UV").append(uvColor);

        })

        //5 day forecast call
        var fiveURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&units=imperial&appid=" + apiKey

        $.ajax({
            url: fiveURL,
            method: "GET"
        }).then(function (fiveDay) {
            console.log(fiveDay);

            //images
            //alt tags
            // $(".day1-image").html(fiveDay.list[0].weather[0].description);
            // $(".day2-image").html(fiveDay.list[1].weather[0].description);
            // $(".day3-image").html(fiveDay.list[2].weather[0].description);
            // $(".day4-image").html(fiveDay.list[3].weather[0].description);
            // $(".day5-image").html(fiveDay.list[3].weather[0].description);



            // icon url: `http://openweathermap.org/img/w/${iconCode}.png`

            //source tags
            var iconOne= fiveDay.list[0].weather[0].icon
            var iconTwo= fiveDay.list[1].weather[0].icon
            var iconThree= fiveDay.list[2].weather[0].icon
            var iconFour= fiveDay.list[3].weather[0].icon
            var iconFive= fiveDay.list[4].weather[0].icon
            var urlOne = "http://openweathermap.org/img/w/" + iconOne +".png"
            var urlTwo = "http://openweathermap.org/img/w/" + iconTwo +".png"
            var urlThree = "http://openweathermap.org/img/w/" + iconThree +".png"
            var urlFour = "http://openweathermap.org/img/w/" + iconFour +".png"
            var urlFive = "http://openweathermap.org/img/w/" + iconFive +".png"



            $(".day1-image").attr("src", urlOne);
            $(".day2-image").attr("src", urlTwo);
            $(".day3-image").attr("src", urlThree);
            $(".day4-image").attr("src", urlFour);
            $(".day5-image").attr("src", urlFive);

            

            // $(".day2-image").html(fiveDay.list[1].weather[0].icon);
            // $(".day3-image").html(fiveDay.list[2].weather[0].icon);
            // $(".day4-image").html(fiveDay.list[3].weather[0].icon);
            // $(".day5-image").html(fiveDay.list[4].weather[0].icon);


            //temps
            $(".day1-temp").html("Temperature: " + fiveDay.list[0].main.temp);
            $(".day2-temp").html("Temperature: " + fiveDay.list[1].main.temp);
            $(".day3-temp").html("Temperature: " + fiveDay.list[2].main.temp);
            $(".day4-temp").html("Temperature: " + fiveDay.list[3].main.temp);
            $(".day5-temp").html("Temperature: " + fiveDay.list[4].main.temp);

            //humidity
            $(".day1-hum").html("Humidity: " + fiveDay.list[0].main.humidity);
            $(".day2-hum").html("Humidity: " + fiveDay.list[1].main.humidity);
            $(".day3-hum").html("Humidity: " + fiveDay.list[2].main.humidity);
            $(".day4-hum").html("Humidity: " + fiveDay.list[3].main.humidity);
            $(".day5-hum").html("Humidity: " + fiveDay.list[4].main.humidity);


        })

    });
    //Append buttons
    var btn = $("<button>");
    btn.addClass("btn btn-secondary col-md-10");
    btn.text(city);

    $("#saved-searches").append(btn)

    $(".btn-secondary").on("click", function () {
        // console.log(this);
        searchWeather(city)

    })


}

function saveToStorage(data) {
    var currentData = JSON.parse(localStorage.getItem("saved-cities")) || [];
    currentData.push(data);
    localStorage.setItem("saved-cities", JSON.stringify(currentData))
};

//search button click registers info then clears
$("#searchBtn").on("click", function () {
    var citySearch = $("#citySearch").val();
    searchWeather(citySearch);
    saveToStorage(citySearch);
})
//call on local storage
function loadLastCity() {
    var currentData = JSON.parse(localStorage.getItem("saved-cities"));
    var lastCity = currentData[currentData.length - 1];
    searchWeather(lastCity);

}
loadLastCity()

//clicking former searches




// function renderSavedCities(){
//     var currentData = JSON.parse(localStorage.getItem("saved-cities"));
//     currentData.forEach(function(city){
//         // console.log(city)"
//         var btn = $("<button>");
//         btn.addClass("btn btn-secondary col-md-10");
//         btn.text(city);

//         $("#saved-searches").append(btn)
//     })
// }
// renderSavedCities() 