import { useState } from "react";
function Weatherapp()
{
  const [city,getcity]=useState("");
  return(
    <div class="flex flex-col items-center mt-6">
  <h1 class="text-3xl font-bold mb-4">Weather App</h1>
  <input placeholder="Enter City"
   class="border rounded-lg px-3 py-2 w-64 text-center focus:outline-none focus:ring-2 focus:ring-blue-500">

   </input>
   <button
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Get Weather
      </button>
  <p class="mt-2 text-lg text-gray-600">Current Temprature</p>
</div>
  );
}
export default Weatherapp;
