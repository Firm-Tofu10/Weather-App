console.log("JS loaded")
var search = document.getElementById("SearchBar");
var APIkey = '8f26704d4a67876a2b30b6d888f31d27'
search.addEventListener("click", function () {
    var cityname = document.getElementById("press1").value
    console.log(`City is ${cityname}`)
    apiCall(cityname)
});
function apiCall(cityname) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`) //template literals
        .then(data => data.json())
        .then(apiDT => {
            console.log(apiDT)
            var lat = apiDT.coord.lat
            var lon = apiDT.coord.lon
            locationcall(lat, lon, cityname)
        })
}


function locationcall(lat, lon, cityname) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alert&appid=${APIkey}`) //template literals
        .then(data => data.json())
        .then(apiDT => {
            console.log(apiDT)
            var sectionTag = document.createElement("section")
            var h2Tag = document.createElement("h2")
            h2Tag.textContent = cityname
            sectionTag.appendChild(h2Tag)
            var ptag = document.createElement("p")
            ptag.textContent = "Temperture:" + apiDT.weather[0].description
            console.log(description)
            sectionTag.appendChild(ptag)
            var wind = document.createElement("p")
            wind.textContent = "wind_speed:" + apiDT.wind_speed
            var uvi = document.createElement("p")
            uvi.textContent = "uvi:" + apiDT.uvi
            var humidity = document.createElement("p")
            humidity.textContent = "humidity:" + apiDT.humidity
            var icon = document.createElement("img")
            icon.setAttribute("src", `https://openweathermap.org/img/wn/${apiDT.weather[0].icon}.png`)
            sectionTag.appendChild(icon)
            sectionTag.appendChild(wind)
            sectionTag.appendChild(uvi)
            sectionTag.appendChild(humidity)
            document.getElementById("containerB").inerhtml = sectionTag
                

    })
}