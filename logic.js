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
    var citySearch = $("#citySearch").val(); 
    console.log(citySearch);
    //   citySearch needs a new row added to the sidebar for each submission 
    $("#citySearch").val("");

})

