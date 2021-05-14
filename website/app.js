/* Global Variables */
const generate = document.getElementById('generate');
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=012f4d0b39937e045bce14f0621f077e&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

generate.addEventListener('click', function(event) {

  let zip = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;

  if(!zip) {
    alert('Please, enter a zip code');
  } else {
    getWeather(baseUrl, zip, apiKey)
      .then(function (data) { // data is an object
        postData('/addData', {
          date: newDate,
          temp: data.main.temp,
          feelings: feelings
        })

        updateUI();
      })
  }
});

//post data
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    return;
  } catch (error) {
    console.log("postData error", error)
  }
}


//get API data
const getWeather = async (url, zip, apiKey) => {
  const req = await fetch(url + zip + apiKey);
  try {
    const data = await req.json();
    return data;
  } catch (error) {
    console.log("get weather error", error);
  }
}


const updateUI = async (url = '') => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();

    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = `${allData.temp} Fahrenheit`;
    document.getElementById('content').innerHTML = `Your feeling: ${allData.feelings}`;
  } catch (error) {
    console.log("update UI error", error);
  }
}