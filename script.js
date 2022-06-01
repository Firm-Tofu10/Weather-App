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
            var storage = JSON.parse( localStorage.getItem("weatherdashboardAPI")) || [] // || or operator
            if(storage.indexOf(cityname) === -1){
            storage.push(cityname)
            localStorage.setItem("weatherdashboardAPI",JSON.stringify(storage))
            displayStorage()
            }
        })
}


function locationcall(lat, lon, cityname) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alert&appid=${APIkey}&units=imperial`) //template literals
        .then(data => data.json())
        .then(apiDT => {
            console.log(apiDT)
            var sectionTag = document.createElement("section")
            var h2Tag = document.createElement("h2")
            h2Tag.textContent = cityname
            sectionTag.appendChild(h2Tag)
            var ptag = document.createElement("p")
            ptag.textContent = "Temperture:" + apiDT.current.temp
            sectionTag.appendChild(ptag)
            var wind = document.createElement("p")
            wind.textContent = "wind_speed:" + apiDT.current.wind_speed
            var uvi = document.createElement("p")
            uvi.textContent = "uvi:" + apiDT.current.uvi
            var humidity = document.createElement("p")
            humidity.textContent = "humidity:" + apiDT.current.humidity
            var icon = document.createElement("img")
            var Temp = document.createElement("p")
            Temp.textContent = apiDT.current.weather[0].description
            icon.setAttribute("src", `https://openweathermap.org/img/wn/${apiDT.current.weather[0].icon}@2x.png`) //http://openweathermap.org/img/wn/10d@2x.png
            sectionTag.appendChild(icon)
            sectionTag.appendChild(Temp)
            sectionTag.appendChild(wind)
            sectionTag.appendChild(uvi)
            sectionTag.appendChild(humidity)
            document.getElementById("containerB").innerHTML = ""
            document.getElementById("containerB").appendChild(sectionTag)
            console.log(locationcall)
            for (let i = 0; i < 5; i++) {
                var sectionTag = document.createElement("section")
                // var h2Tag = document.createElement("h2")
                // h2Tag.textContent = cityname
                // sectionTag.appendChild(h2Tag)
                var ptag = document.createElement("p")
                ptag.textContent = "Temperture:" + apiDT.daily[i].temp.max
                sectionTag.appendChild(ptag)
                var wind = document.createElement("p")
                wind.textContent = "wind_speed:" + apiDT.daily[i].wind_speed
                var uvi = document.createElement("p")
                uvi.textContent = "uvi:" + apiDT.daily[i].uvi
                var humidity = document.createElement("p")
                humidity.textContent = "humidity:" + apiDT.daily[i].humidity
                var icon = document.createElement("img")
                var Temp = document.createElement("p")
                Temp.textContent = apiDT.daily[i].weather[0].description
                icon.setAttribute("src", `https://openweathermap.org/img/wn/${apiDT.daily[i].weather[0].icon}@2x.png`) //http://openweathermap.org/img/wn/10d@2x.png
                sectionTag.appendChild(icon)
                sectionTag.appendChild(Temp)
                sectionTag.appendChild(wind)
                sectionTag.appendChild(uvi)
                sectionTag.appendChild(humidity)
                document.getElementById(`day${i + 1}`).innerHTML = ""
                document.getElementById(`day${i + 1}`).appendChild(sectionTag)
                console.log(locationcall)
            }
        })
}


function displayStorage() {
    var storage = JSON.parse( localStorage.getItem("weatherdashboardAPI")) || [] // || or operator
    document.getElementById("previous").innerHTML = ""
    for (let i =0; i < storage.length; i++) {
        var Temp = document.createElement("button")
        Temp.textContent = storage[i]
        Temp.addEventListener("click",buttonpress)
        document.getElementById("previous").appendChild(Temp)
    }
}

displayStorage()

function buttonpress(){
    console.log(this.textContent,"onclick")
    apiCall(this.textContent)
}