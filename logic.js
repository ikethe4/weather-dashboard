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
    // console.log(citySearch);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+citySearch + "&appid=" + apiKey;

    //   citySearch needs a new row added to the sidebar for each submission 
    $("#citySearch").val("");
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(citySearch);
        console.log(response);
    })

})

