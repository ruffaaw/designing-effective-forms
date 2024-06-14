let clickCount = 0;

const countryInput = document.getElementById('country');
const countryCallingCode = document.getElementById('countryCallingCode')
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        const countryFromIP = await getCountryByIP();
        delete countries[findCountryIdFromArray(countries,countryFromIP)]
        countries.sort();
        countries.unshift(countryFromIP);
        countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

async function getCountryByIP() {
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych z serwera GeoJS');
        }
        const data = await response.json();
        const country = data.country;
        return country;
    } catch (error) {
        console.error('Błąd pobierania danych z serwera GeoJS:', error);
        return null;
    }
}

async function getCountryCallingCode(){
    try{
        const countryName = await getCountryByIP()
        const respose = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        if(!respose.ok){
            throw new Error('Błąd pobierania danych z serwera GeoJS');
        }
        const data = await respose.json();
        const callingCode = data.map(country=>country.idd.root + country.idd.suffixes);
        document.getElementById('countryCallingNumber').value = callingCode;

    }catch(error){
        console.error('Błąd pobierania danych numerów kierunkowych')
    }
}
function getCountryCode() {
    const countryName = document.getElementById('countryName').textContent;
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("")
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}


(() => {
    document.addEventListener('click', handleClick);
    
    fetchAndFillCountries();
    getCountryCallingCode();
})()

function findCountryIdFromArray(array,countryName){
    for(const i in array){
        if(array[i] === countryName){
            return i
        }
    }
}