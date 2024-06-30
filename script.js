let timezone = document.getElementById('timezone');
let latitude = document.getElementById('latitude')
let longitude = document.getElementById('longitude');
let offsetStd = document.getElementById('offsetStd');
let offsetStdSec = document.getElementById('offsetStdSec');
let offsetDst = document.getElementById('offsetDst');
let offsetDstSec = document.getElementById('offsetDstSec');
let country = document.getElementById('country');
let statecode = document.getElementById('statecode');
let city = document.getElementById('city');
let timezone1 = document.getElementById('timezone1');
let latitude1 = document.getElementById('latitude1')
let longitude1 = document.getElementById('longitude1');
let offsetStd1 = document.getElementById('offsetStd1');
let offsetStdSec1 = document.getElementById('offsetStdSec1');
let offsetDst1 = document.getElementById('offsetDst1');
let offsetDstSec1 = document.getElementById('offsetDstSec1');
let country1 = document.getElementById('country1');
let statecode1 = document.getElementById('statecode1');
let city1 = document.getElementById('city1');
let container = document.querySelector(".container");
let addressInput = document.getElementById('address');
let btn = document.getElementById('btn');
let error = document.querySelector('.error');


function getTimeZone(lat, lon, field) {
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=03be9ae215d14d4683f7b8aa1a48bd31`)
        .then(resp => { return resp.json() })
        .then((result) => {
            if (result.results[0]) {
                if (field == "main") {
                    container.style.display = "none";
                    timezone.textContent = result.results[0].timezone.name;
                    latitude.textContent = result.results[0].lat;
                    longitude.textContent = result.results[0].lon;
                    offsetStd.textContent = result.results[0].timezone.offset_STD;
                    offsetStdSec.textContent = result.results[0].timezone.offset_STD_seconds;
                    offsetDst.textContent = result.results[0].timezone.offset_DST;
                    offsetDstSec.textContent = result.results[0].timezone.offset_DST_seconds;
                    country.textContent = result.results[0].country;
                    statecode.textContent = result.results[0].state_code;
                    city.textContent = result.results[0].county;
                }
                else {
                    container.style.display = "block";
                    timezone1.textContent = result.results[0].timezone.name;
                    latitude1.textContent = result.results[0].lat;
                    longitude1.textContent = result.results[0].lon;
                    offsetStd1.textContent = result.results[0].timezone.offset_STD;
                    offsetStdSec1.textContent = result.results[0].timezone.offset_STD_seconds;
                    offsetDst1.textContent = result.results[0].timezone.offset_DST;
                    offsetDstSec1.textContent = result.results[0].timezone.offset_DST_seconds;
                    country1.textContent = result.results[0].country;
                    statecode1.textContent = result.results[0].state_code;
                    city1.textContent = result.results[0].state_district;
                }

            } else {
                alert("No location found");
            }
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.")
    }
}

function showPosition(position) {

    getTimeZone(position.coords.latitude, position.coords.longitude, "main")
}

function getCoordinates() {
    if (addressInput.value == '') {
        error.style.display = 'block';
        container.style.display = "none";
    }
    else {
        error.style.display = 'none';
        const address = addressInput.value;
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=03be9ae215d14d4683f7b8aa1a48bd31`)
            .then(resp => resp.json())
            .then((geocodingResult) => {
                let coo = geocodingResult.features[0].geometry.coordinates;
                getTimeZone(coo[1], coo[0])
            });
    }

}
btn.addEventListener("click", getCoordinates);
getLocation();