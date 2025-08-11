// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
console.log ("Inside js file");


//Get DOM elements - these must match the Ids to the HTML 
let inputdata = document.getElementById("search-input");
let btn = document.getElementById("search-button");
let gifContainer = document.getElementById("gif-container");
let form = document.getElementById("search-form");
let clearButton = document.getElementById("clear-button");


// append a single gif url to the page
function appendGif(url, title = "") {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = url;
  img.alt = title || "Giphy GIF";
  figure.appendChild(img);
  gifContainer.appendChild(figure);
}

/// submit handler for the form (covers button click + Enter key)
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // don’t reload the page

  // get user input and trim spaces
  const searchTerm = inputdata.value.trim(); //what you type
  console.log("Search term:", searchTerm); //debug #1 

  if (!searchTerm) return; // if it's empty, do nothing 


  // Build the Giphy search URL
  const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(searchTerm)}&api_key=${giphyApiKey}&limit=50&rating=pg-13`;
  console.log("Giphy API URL:", url); // display the Giphy API URL    


  try {
    // Ask Giphy for GIFs
    const response = await axios.get(url);
    console.log("Giphy API response:", response.data); // debug #3

    const results = response.data.data;
    console.log("Found GIFs:", results.length); // debug #4

    if (results.length === 0) {
      alert(`No GIFs found for "${searchTerm}"`);
      return;
    }

// pick one random GIF per search
    const randomIndex = Math.floor(Math.random() * results.length);
    const gif = results[randomIndex];

    // choose a stable, reasonable rendition
    const gifUrl =
      gif.images?.fixed_height?.url ||
      gif.images?.downsized_medium?.url ||
      gif.images?.original?.url;

    if (gifUrl) appendGif(gifUrl, gif.title);

    // reset input for next search
    inputdata.value = "";
    inputdata.focus();
  } catch (err) {
    console.error(err);
    alert("Sorry, something went wrong fetching from Giphy.");
  }
});

// remove all gifs
clearButton.addEventListener("click", () => {
  gifContainer.innerHTML = "";
  inputdata.focus();
});