import { useState } from "react";

function Weatherapp()
{

  const [city,getcity]=useState("");
  const [weather,setweather]=useState("");
  
  const latlong=`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=64692fc86a6f990bd9151c6ba77b4d45`;

  async function gettemp()
  {
    try
    {
      const response=await fetch(latlong);
      const data= await response.json();
      const lat=data[0].lat;
      const lon=data[0].lon;
      const weather_detail=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=64692fc86a6f990bd9151c6ba77b4d45`; 
      const response2=await fetch(weather_detail);
      const w_data=await response2.json();
      const temp_c=(w_data.main.temp-273.15).toFixed(1);
      setweather(`${w_data.weather[0].main}, ${temp_c} °C`);
    }
    catch(e)
    {
      setweather("Error");
    }
  }

  return(
    <div className="flex flex-col items-center mt-6">
  <h1 className="text-3xl font-bold mb-4">Weather App</h1>
  <input placeholder="Enter City"
    value={city}
    onChange={(event)=>{getcity(event.target.value);}}
   class="border rounded-lg px-3 py-2 w-64 text-center focus:outline-none focus:ring-2 focus:ring-blue-500">
    
   </input>
   <button
   onClick={gettemp}
      className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Current Weather
      </button>
  <p className="mt-2 text-lg text-gray-600">Current weather:{weather}</p>
</div>
  );
}
export default Weatherapp;
