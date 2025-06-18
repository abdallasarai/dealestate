console.log("JavaScript is working!");

// Select elements
const form = document.getElementById("post-form");
const listingsContainer = document.getElementById("rental-listings");
const searchBox = document.getElementById("search-box");

// Submit and Save to localStorage
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = form.querySelector('input[placeholder="Title"]').value;
  const location = form.querySelector('input[placeholder="Location"]').value;
  const price = form.querySelector('input[placeholder="Price (KES)"]').value;
  const description = form.querySelector('textarea[placeholder="Description"]').value;

  if (!title || !location || !price || !description) {
    alert("Please fill all the fields.");
    return;
  }

  const newListing = { title, location, price, description };
  const savedListings = JSON.parse(localStorage.getItem("listings")) || [];

  savedListings.push(newListing);
  localStorage.setItem("listings", JSON.stringify(savedListings));

  displayListing(newListing);
  form.reset();
});

// Display a single listing on the page
function displayListing(listing) {
  const listingElement = document.createElement("div");
  listingElement.className = "listing";

  // Create inner HTML with a delete button
  listingElement.innerHTML = `
    <h4>${listing.title}</h4>
    <p><strong>Location:</strong> ${listing.location}</p>
    <p><strong>Price:</strong> KES ${listing.price}</p>
    <p>${listing.description}</p>
    <button class="delete-btn">Delete</button>
    <hr>
  `;

  // Handle delete button click
  listingElement.querySelector(".delete-btn").addEventListener("click", function () {
    // Remove from DOM
    listingsContainer.removeChild(listingElement);

    // Remove from localStorage
    let savedListings = JSON.parse(localStorage.getItem("listings")) || [];
    savedListings = savedListings.filter(
      (item) =>
        item.title !== listing.title ||
        item.location !== listing.location ||
        item.price !== listing.price ||
        item.description !== listing.description
    );
    localStorage.setItem("listings", JSON.stringify(savedListings));
  });

  listingsContainer.appendChild(listingElement);
}

// Load all listings from localStorage when the page loads
window.addEventListener("DOMContentLoaded", function () {
  const savedListings = JSON.parse(localStorage.getItem("listings")) || [];
  savedListings.forEach(displayListing);
});

// Search/filter functionality
searchBox.addEventListener("input", function () {
  const query = searchBox.value.toLowerCase();
  const listings = listingsContainer.getElementsByClassName("listing");

  for (let listing of listings) {
    const text = listing.innerText.toLowerCase();
    listing.style.display = text.includes(query) ? "block" : "none";
  }
});