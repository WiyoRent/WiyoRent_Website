export let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

export function saveToStorage() {
    localStorage.setItem('favourites', JSON.stringify(favourites));
}

export function addToFavourite(houseId) {
    let matching_house = '';

    favourites.forEach(favouriteHouse => {
        if (houseId === favouriteHouse.houseId) {
            matching_house = favouriteHouse;
        }
    });

    if (matching_house) {
        alert("This house has been saved already.");
    } else {
        favourites.push({
            houseId: houseId
        });
        saveToStorage();
    }
}

export function removeFavouriteHouse(houseId) {
    const newFavourites = [];

    favourites.forEach((favouriteHouse) => {
        if (favouriteHouse.houseId !== houseId) {
            newFavourites.push(favouriteHouse); // Use the existing favouriteHouse object
        }
    });

    favourites = newFavourites;
    saveToStorage();
}
