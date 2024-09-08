import { priceConversion } from "../utils/price-conversion.js";
import { initializeImageSlider } from "../detailed-listing-page/Detailed_Listing_image_slider.js";
import { addToFavourite } from "../data-structures/add-to-favourite.js";

document.addEventListener('DOMContentLoaded', () => {
    const selectedHouse = JSON.parse(localStorage.getItem('selectedHouse')); 

    if (selectedHouse) {
        document.querySelector('.js-detailed-home-grid .js-detailed-image-container').innerHTML = `
            ${selectedHouse.houseImg.Outdoor.map(src => `<img src="${src}" alt="">`).join('')}
            ${selectedHouse.houseImg.LivingRoom.map(src => `<img src="${src}" alt="">`).join('')}
            ${selectedHouse.houseImg.Kitchen.map(src => `<img src="${src}" alt="">`).join('')}
            ${selectedHouse.houseImg.Bedroom.map(src => `<img src="${src}" alt="">`).join('')}
            ${selectedHouse.houseImg.Bathroom.map(src => `<img src="${src}" alt="">`).join('')}
            <button class="left-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"/></svg>
            </button>
            <button class="right-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z"/></svg> 
            </button>
        `;

        document.querySelector('.Listing-Details .Commision p').innerText = `Service Fee (${selectedHouse.house_overview.house_commission}%):`;
        document.querySelector('.Commision h4').innerText = `RWF ${priceConversion(selectedHouse.house_overview.house_price * (selectedHouse.house_overview.house_commission / 100))}`;
        document.querySelector('.Listing-title h2').innerText = selectedHouse.house_overview.house_name;
        document.querySelector('.Listing-title .faveBtn').innerHTML = ` 
            <button data-house-id="${selectedHouse.id}" class="add-to-favourite">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M200-120v-656.67q0-27 19.83-46.83 19.84-19.83 46.84-19.83h426.66q27 0 46.84 19.83Q760-803.67 760-776.67V-120L480-240 200-120Zm66.67-101.33L480-312l213.33 90.67v-555.34H266.67v555.34Zm0-555.34h426.66-426.66Z"/></svg>
            </button>
        `;
        document.querySelector('.House-Price h4').innerText = `RWF ${priceConversion(selectedHouse.house_overview.house_price)}/roommate/month`;
        document.querySelector('.total h4').innerText = `RWF ${priceConversion(selectedHouse.house_overview.house_price + selectedHouse.house_overview.house_price * (selectedHouse.house_overview.house_commission / 100))}/Roommate`;
        document.querySelector('.minimum_stay h4').innerText = `${selectedHouse.house_overview.minimun_stay_period} months`;

        document.querySelector('.Security-Deposit').innerHTML = `
            <p>Security Deposit (${selectedHouse.house_overview.security_deposit_status} & Refundable):</p>
            <h4>RWF ${priceConversion(selectedHouse.house_overview.security_deposit)}</h4>
        `;
        document.querySelector('.Booking-Fee').innerHTML = `
            <p>Booking-Fee (Optional & Non-Refundable):</p>
            <h4>RWF ${priceConversion(selectedHouse.house_overview.booking_fee)}</h4>
        `;

        document.querySelector('.user-message textarea').innerText = `Hello, I am interested in booking a room in this ${selectedHouse.house_overview.house_name}`;
        document.querySelector('.roommate-message textarea').innerText = `Hello, I am interested in booking a room in this ${selectedHouse.house_overview.house_name} and I am currently looking for a Roommate. Use this link to see the house's details`;

        // Populate home information
        document.querySelector('.tabSection .overview-card .row:nth-child(1) .value').innerText = selectedHouse.house_overview.status;
        document.querySelector('.tabSection .overview-card .row:nth-child(2) .value').innerText = selectedHouse.house_overview.bedrooms;
        document.querySelector('.tabSection .overview-card .row:nth-child(3) .value').innerText = selectedHouse.house_overview.bathrooms;
        document.querySelector('.tabSection .overview-card .row:nth-child(4) .value').innerText = `${selectedHouse.house_overview.distance} min`;
        document.querySelector('.tabSection .tab-content .overview-card .row:nth-child(5) .value').innerText = selectedHouse.house_overview.property_type;

        // Populate house amenities
        const amenities = selectedHouse.house_amenities;
        document.querySelector('.tabSection .property-card').innerHTML = Object.keys(amenities).map(key => 
            `<div class="row">
                <div class="label">${key.replace(/_/g, ' ')}:</div>
                <div class="value">${amenities[key]}</div>
            </div>`
        ).join('');

        initializeImageSlider();

        const saveBtn = document.querySelector('.Listing-title .faveBtn button');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const houseId = saveBtn.dataset.houseId;
                addToFavourite(houseId);
                saveBtn.style.backgroundColor = "#f8a32c";
            });
        }
    }
});