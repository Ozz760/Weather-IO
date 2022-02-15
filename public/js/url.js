const searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  // Prevent browser from reloading page.
  event.preventDefault();

  // Get form input
  const searchInputVal = document.querySelector('#search-input').value;
 
  // End function if nothing was entered
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  // Create url for search results page including the input in the parameters
  const queryString = './search?q=' + searchInputVal;

  // Use assign (not replace) so that the back button will work if the user
  // wishes to return to the home page.
  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
