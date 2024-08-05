import { addToFavourite } from "../data-structures/add-to-favourite.js";
import { main_Listings } from "../data-structures/main-listing-data.js";
import { priceConversion } from "../utils/price-conversion.js";

function filterListings() {
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const distance = document.getElementById('Distance').value;
    const price = document.getElementById('Price').value;
    const status = document.getElementById('Status').value;

    console.log("Filter criteria:", { bedrooms, bathrooms, distance, price, status });

    const filteredListings = main_Listings.filter(listing => {
        let matches = true;

        if (bedrooms && listing.house_overview.bedrooms < bedrooms) matches = false;
        if (bathrooms && listing.house_overview.bathrooms < bathrooms) matches = false;
        if (distance && listing.house_overview.distance < parseInt(distance)) matches = false;

        if (price) {
            const [minPrice, maxPrice] = price.split('-');
            if (maxPrice) {
                if (listing.house_overview.house_price < parseInt(minPrice) || listing.house_overview.house_price > parseInt(maxPrice)) {
                    matches = false;
                }
            } else if (listing.house_overview.house_price < parseInt(minPrice)) {
                matches = false;
            }
        }

        if (status && listing.house_overview.status !== status) matches = false;

        return matches;
    });

    console.log("Filtered Listings:", filteredListings);

    displayListings(filteredListings);
    attachDetailPageListeners();  // Attach listeners after displaying listings
}

function displayListings(listings) {
    let main_page = '';

    if (listings.length === 0) {
        // Display a message when no listings match the filter criteria
        main_page = `
            <div class="no-results">
                <h2>Oops, house not found</h2>
                <p>Please adjust your search criteria and try again.</p>
            </div>
        `;
    } else {

    listings.forEach(main_Listing => {
        const allImages = [
            ...main_Listing.houseImg.Outdoor,
            ...main_Listing.houseImg.LivingRoom,
            ...main_Listing.houseImg.Kitchen,
            ...main_Listing.houseImg.Bedroom,
            ...main_Listing.houseImg.Bathroom
        ];

        const imagesHTML = allImages.map(src => `<img src="${src}" alt="${main_Listing.house_overview.house_name}">`).join('');

        main_page += `
            <div class="container">
                <div class="js-image-container">
                    <a href="detailed-listing-page/detailed-listing.html" class="js-detailed-listing" data-house-id="${main_Listing.id}">
                        ${imagesHTML}
                    </a>
                    <div class="status">${main_Listing.house_overview.status}</div>
                    <div class="advert-type">${main_Listing.house_overview.advert_type}</div>
                    <button class="left-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"/></svg>
                    </button>
                    <button class="right-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z"/></svg> 
                    </button>
                </div>
                <div class="home-information">
                    <div class="home-title">
                        <a href="detailed-listing-page/detailed-listing.html" class="js-detailed-listing" data-house-id="${main_Listing.id}">
                            <h3>${main_Listing.house_overview.house_name}</h3> 
                        </a>
                        <button class="add-to-favourite js-add-to-favourite-btn" data-house-id="${main_Listing.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>
                            <div id="tooltip" class="tooltip">Save</div>
                        </button>
                    </div>
                    <div class="home-details">
                        <p class="price">RWF ${priceConversion(main_Listing.house_overview.house_price)}/per room</p>
                        <div class="beds">
                            <span class="material-symbols-outlined">bed</span>
                            <p class="amount-of-beds">${main_Listing.house_overview.bedrooms}</p>
                        </div>
                        <div class="bathrooms">
                            <span class="material-symbols-outlined">bathtub</span>
                            <p class="amount-of-bathrooms">${main_Listing.house_overview.bathrooms}</p>
                        </div>
                        <div class="distance">
                            <span class="material-symbols-outlined">distance</span>
                            <p class="distance-from-camp">${main_Listing.house_overview.distance}min</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    const containerGrid = document.querySelector('.js-container-grid');
    containerGrid.innerHTML = main_page;

    document.querySelectorAll('.js-add-to-favourite-btn').forEach(button => {
        button.addEventListener('click', () => {
            const houseId = button.dataset.houseId;
            addToFavourite(houseId);
            button.style.backgroundColor = "#f8a32c";
        });
    });

    initialization();
    }
}

function attachDetailPageListeners() {
    document.querySelectorAll('.js-detailed-listing').forEach(link => {
        link.addEventListener('click', () => {
            const houseId = link.dataset.houseId;
            const houseData = main_Listings.find(house => house.id === houseId);
            localStorage.setItem('selectedHouse', JSON.stringify(houseData));  // Use localStorage instead
        });
    });
}


document.getElementById('filter-form').addEventListener('submit', (event) => {
    event.preventDefault();
    filterListings();
});

filterListings();
