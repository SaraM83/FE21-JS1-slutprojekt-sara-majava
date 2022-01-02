
const btn = document.querySelector('#search-button'); 
const searchInput = document.querySelector('#search');
const key = '508a86f0255748e6a850038f0ab068e5'; 

btn.addEventListener('click', function(){
    const url = `https://api.weatherbit.io/v2.0/current?city=${searchInput.value}&key=${key}&lang=sv`; 
    const url2 = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchInput.value}&key=${key}&days=6&lang=sv`; 
    removeSearch();
    fetch(url).then(
        function(response){ 
            if (response.status >= 200 && response.status < 300) {
                return response.json(); 
            } else {
                failMessage(); 
                throw 'Something went wrong, please try again.'
            } 
        }
    ).then(
        function(data){
        
            const displayCity = document.createElement('h1'); 
            const divWeather = document.getElementById('weather-display');
            divWeather.style.padding = '10px'; 
            divWeather.appendChild(displayCity);
            displayCity.style.marginTop = '30px'; 
            displayCity.style.opacity = '.6'; 
            displayCity.textContent = data.data[0].city_name; 
            const weatherData = data.data[0].weather; 
            showIcon(weatherData);
            weatherDescript(weatherData);
            showWeather(data); 
            fetchTwo(url2); 
            searchInput.value = '';   // rensar sökform 
        }
    ).catch(
        function(error) {
            console.log(error); 
            failMessage(); 
        }
    )
})
 
//// Funktioner 


function showIcon(weather) { // func som visar ikonen 
    const img = document.createElement('img'); 
    const div = document.getElementById('weather-display'); 
    div.appendChild(img);
    img.src = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`; 
    img.style.opacity = .5;
    anime({ // animering av väder ikon 
        targets: img,
        scale: 1.2,
        opacity: 1
    });
}

function weatherDescript(weather) { // func som visar väder beskrivning 
    const showDescription = document.createElement('p');
    const descDiv = document.getElementById('weather-display'); 
    descDiv.appendChild(showDescription); 
    showDescription.innerText = weather.description;
    showDescription.style.marginTop = '10px'; 
}

function showWeather(data) { // func som visar resterande väderinfo  
    const showTemp = document.createElement('p');
    const weatherDiv = document.getElementById('weather-display');
    weatherDiv.appendChild(showTemp);
    showTemp.innerText = 'Temperatur: ' + Math.floor(data.data[0].temp) + '°C'; 
    const showHum = document.createElement('p'); 
    weatherDiv.appendChild(showHum); 
    showHum.innerText = 'Luftfuktighet: ' + Math.floor(data.data[0].rh) + '%';
    const showWndSpd = document.createElement('p');
    weatherDiv.appendChild(showWndSpd);
    showWndSpd.innerText = 'Vindhastighet: ' + Math.floor(data.data[0].wind_spd) + ' m/s'; 
}


function removeSearch() { // tar bort nuvarande sökning 
    let allH1 = document.querySelectorAll('body h1');
    for(let i = 0; i < allH1.length; i++) {
        allH1[i].remove();
    }

    let allP = document.querySelectorAll('body p'); 
    for(let i = 0; i < allP.length; i++) {
        allP[i].remove(); 
    }

    let allImg = document.querySelectorAll('body img');
    for(let i = 0; i < allImg.length; i++) {
        allImg[i].remove(); 
    }
}

function failMessage() { // meddelande om något inte fungerar 
    const failPar = document.createElement('p');
    const failDiv = document.getElementById('weather-display');
    failDiv.appendChild(failPar); 
    failPar.innerText = 'Oups, something went wrong! Please submit an existing city.'; 
    anime({ // animering 
        targets: failPar,
        translateY: 250,
        translateX: 85,
        scale: 1.5,
    });
    
}

function showWeather2(data2) { // visar resterande dagars väder 
        const forcastDiv = document.getElementById('weather-display'); 
        const forcast = document.createElement('p');
        forcast.style.fontSize = '24px'; 
        forcast.style.opacity = '0.5'; 
        forcast.style.paddingTop = '2em'; 
        forcast.innerText = '5-dygnsprognos: ';
        forcastDiv.appendChild(forcast); 

    for(let i = 1; i < data2.length; i++) { 
        const showDate = document.createElement('p'); 
        showDate.style.fontSize = '20px'; 
        forcastDiv.appendChild(showDate);
        showDate.innerText = data2[i].datetime; 
        showDate.style.opacity = '0.5'; 
        const dataArray = data2[i].weather;
        const imgIcon = document.createElement('img'); 
        const imgDiv = document.getElementById('weather-display'); 
        imgDiv.appendChild(imgIcon);
        imgIcon.src = `https://www.weatherbit.io/static/img/icons/${dataArray.icon}.png`;
        const descr = document.createElement('p');
        forcastDiv.appendChild(descr);
        descr.innerText = dataArray.description; 
        const showTemp2 = document.createElement('p');
        forcastDiv.appendChild(showTemp2);
        showTemp2.innerText = 'Temperatur: ' + Math.floor(data2[i].temp) + '°C'; 
        
    }
}

function fetchTwo(arg) { // hämtar data gällande 5-dygnsprognos 
    fetch(arg).then( 
        function(response2) {
            if (response2.status >= 200 && response2.status < 300) {
                return response2.json(); 
            } else {
                throw 'Something went wrong, please try again.'
            }
        }
    ).then(
        function(data2) {
            console.log(data2); 
            const data2Array = data2.data;
            console.log(data2Array); 
            showWeather2(data2Array); 
        }
    ).catch(
        function(error) {
            console.log(error);
        }
    )
}



