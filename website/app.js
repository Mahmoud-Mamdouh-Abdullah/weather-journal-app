/* Global Variables */
const generate = document.getElementById('generate');
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=012f4d0b39937e045bce14f0621f077e&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let newDate = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

document.getElementById('reset').addEventListener('click', function (event) {
  document.getElementById('city').innerHTML = '';
  document.getElementById('date').innerHTML = '';
  document.getElementById('temp').innerHTML = '';
  document.getElementById('content').innerHTML = '';
  document.getElementById('zip').value = '';
  document.getElementById('feelings').value = '';
});

generate.addEventListener('click', function(event) {

  event.preventDefault();
  let zip = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;

  if(!zip) {
    alert('Please, enter a zip code');
  } else {
    getWeather(baseUrl, zip, apiKey)
      .then(function (data) { // data is an object
        postData('/addData', {
          location: `${data.name}, ${data.sys.country}`,
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
    console.log(data);
    return data;
  } catch (error) {
    console.log("get weather error", error);
  }
}


const updateUI = async (url = '') => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();

    document.getElementById('city').innerHTML = allData.location;
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = `${allData.temp} °C`;
    document.getElementById('content').innerHTML = `Your feeling: ${allData.feelings}`;
  } catch (error) {
    console.log("update UI error", error);
  }
}