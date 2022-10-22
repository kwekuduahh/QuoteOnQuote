const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const quoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// This function displays the loader under a condition.
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get quote from API
async function getQuote() {
  // initiates Loading as API request is done
  loading();

  const proxyUrl = "https://cors.eu.org/"
  const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    //if the Author Name is not available then replace the field with Unknown 
    if (data.authorText == "") {
      quoteAuthor.innerText = `-Author Unknown`;
    } else {
      quoteAuthor.innerText = `-${data.quoteAuthor}`;
    }

    // To reduce Quote Text font size for quotes that are too long
    if (data.quoteText.length > 100) {
      quoteText.classList.add("long-quote");
      quoteText.innerText = data.quoteText;
    } else {
      quoteText.innerText = data.quoteText;
    }
  } catch (error) {
    getQuote();
    console.log("Whoops! Something went wrong", error);
  }
  complete();
}


//Function for tweeting quotes
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}

  ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener for tweeting quote
twitterBtn.addEventListener("click", tweetQuote);

// Event listener for New Quote button
quoteBtn.addEventListener("click", getQuote);

//Window is Loading for the first time
getQuote();