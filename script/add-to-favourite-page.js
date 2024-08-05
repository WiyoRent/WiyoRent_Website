import { favourites, removeFavouriteHouse } from "../data-structures/add-to-favourite.js";
import { main_Listings } from "../data-structures/main-listing-data.js";
import { priceConversion } from "../utils/price-conversion.js";

// Function to render favorite listings
function renderFavouriteListings(listings) {
    let favouriteListingHTML = '';

    listings.forEach((favouriteHouse) => {
        const houseId = favouriteHouse.houseId;
        let matching_house = main_Listings.find(main_Listing => main_Listing.id === houseId);

        if (matching_house) {
            favouriteListingHTML += `
                <div class="home-container js-home-container-delete-${matching_house.id}">
                    <div class="house-image">
                        <a href="../detailed-listing-page/detailed-listing.html" class="js-detailed-listing" data-house-id="${matching_house.id}">
                            <img class="houseImg" src="${matching_house.houseImg.Outdoor}" alt="${matching_house.house_overview.house_name}">
                        </a>
                    </div>
                    <div class="house-details">
                        <div class="house-name">
                            <a href="../detailed-listing-page/detailed-listing.html" class="js-detailed-listing" data-house-id="${matching_house.id}">
                                <h1>${matching_house.house_overview.house_name}</h1>
                            </a>
                            <button class="material-symbols-outlined favourite-house-delete-btn" data-house-id=${matching_house.id}>
                                <span>close</span>
                            </button>
                        </div>
                        <div class="home-overview">
                            <div class="row">
                                <div class="label">Status:</div>
                                <div class="value">${matching_house.house_overview.status}</div>
                            </div>
                            <div class="row">
                                <div class="label">Price:</div>
                                <div class="value">RWF ${priceConversion(matching_house.house_overview.house_price)}/per room</div>
                            </div>
                            <div class="row">
                                <div class="label">Bedrooms:</div>
                                <div class="value">${matching_house.house_overview.bedrooms}</div>
                            </div>
                            <div class="row">
                                <div class="label">Bathrooms:</div>
                                <div class="value">${matching_house.house_overview.bathrooms}</div>
                            </div>
                            <div class="row">
                                <div class="label">Distance From Campus (ALU):</div>
                                <div class="value">${matching_house.house_overview.distance}min</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    document.querySelector('.js-favourite-listing-container').innerHTML = favouriteListingHTML;

    document.querySelectorAll('.favourite-house-delete-btn').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', () => {
            const houseId = deleteBtn.dataset.houseId;
            removeFavouriteHouse(houseId);

            let favouriteHome = document.querySelector(`.js-home-container-delete-${houseId}`);
            if (favouriteHome) {
                favouriteHome.remove();
            }
        });
    });

    document.querySelectorAll('.js-detailed-listing').forEach((link) => {
        link.addEventListener('click', () => {
            const houseId = link.dataset.houseId;
            const houseData = main_Listings.find(house => house.id === houseId);
            localStorage.setItem('selectedHouse', JSON.stringify(houseData));
        });
    });
}

// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Initial render of favorite listings
    renderFavouriteListings(favourites);

    // Search functionality
    document.getElementById('search-button').addEventListener('click', () => {
        const searchQuery = document.getElementById('search-input').value.toLowerCase();
        const filteredListings = favourites.filter(favouriteHouse => {
            const houseId = favouriteHouse.houseId;
            let matching_house = main_Listings.find(main_Listing => main_Listing.id === houseId);
            return matching_house && matching_house.house_overview.house_name.toLowerCase().includes(searchQuery);
        });
        renderFavouriteListings(filteredListings);
    });
});
