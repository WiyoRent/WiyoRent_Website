import {featured_houses} from '../data-structures/featured-house-data.js'
import { priceConversion } from '../utils/price-conversion.js';

let featuredHTML = ''

featured_houses.forEach((featured_house) => {

     // Collect all images from house_details
     const allImages = [
        ...featured_house.houseImg.Outdoor,
        ...featured_house.houseImg.LivingRoom,
        ...featured_house.houseImg.Kitchen,
        ...featured_house.houseImg.Bedroom,
        ...featured_house.houseImg.Bathroom
    ];

    // Generate HTML for images
    const imagesHTML = allImages.map(src => `<img src="${src}" alt="">`).join('');

    featuredHTML += `
                    <div class="featured-house">
                            <div class="featured_js-image-slider">
                               <a href="detailed-listing-page/detailed-listing.html" class="js-detailed-listing" data-house-id="${featured_house.id}">
                                    ${imagesHTML}
                                </a>
                            </div>

                            <div class="status">
                                ${featured_house.house_overview.status}
                            </div>
                            <div class="featured_price">
                                RWF ${priceConversion(featured_house.house_overview.house_price)}/per room
                            </div>

                            <button class="add-to-favourite js-add-to-favourite-btn" data-house-id="${featured_house.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>
                                <div class="tooltip">
                                    Save
                                </div>
                            </button>

                            <button class="left-button">
                                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"/></svg>
                            </button>
                            <button class="right-button">
                                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z"/></svg> 
                            </button>
                        <div class= "featured-home-information"> 
                            <div class="home-title">
                               <h3><a href="detailed-listing-page/detailed-listing.html" class="js-detailed-listing" data-house-id="${featured_house.id}">${featured_house.house_overview.house_name}</a></h3>
                            </div>
                            <div class="home-details">
                                <div class="beds">
                                    <span class="material-symbols-outlined">
                                        bed
                                    </span> ${featured_house.house_overview.bedrooms}
                                </div>
                                <div class="bathrooms">
                                    <span class="material-symbols-outlined">
                                        bathtub
                                    </span> ${featured_house.house_overview.bathrooms}
                                </div>
    
                                <div class="distance">
                                    <span class="material-symbols-outlined">
                                        distance
                                    </span> ${featured_house.house_overview.distance}min
                                </div>
                            </div>
                        </div>
                    </div>
    `
    document.querySelector('.featured_house_grid').innerHTML = featuredHTML;
})


