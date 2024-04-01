document.addEventListener('DOMContentLoaded', function() {
    const speciesDropdown = document.getElementById('speciesDropdown');
    const breedDropdown = document.getElementById('breedDropdown');
    const ageDropdown = document.getElementById('ageDropdown');

    /**
     * Function to populate breed dropdown options
     * @param {String} breeds - The breeds
     */
    function populateBreeds(breeds) {
        breeds.forEach((breed) => {
            breedDropdown.innerHTML +=
                `<option value="${breed.toLowerCase()}">${breed}</option>`;
        });
    }

    // Populate breed dropdown based on selected species
    speciesDropdown.addEventListener('change', function() {
        const selectedSpecies = speciesDropdown.value;
        breedDropdown.innerHTML = ''; // Clear previous options

        if (selectedSpecies === 'dog') {
            populateBreeds(['Any', 'Shih Tzu',
                'Mini Poodle', 'Border Collie', 'Labrador', 'Yorkie']);
        } else if (selectedSpecies === 'cat') {
            populateBreeds(['Any', 'Ragdoll',
                'Shorthair', 'Maine Coon', 'Siamese']);
        } else if (selectedSpecies === 'bird') {
            populateBreeds(['Any',
                'Parakeet', 'Parrot', 'Cockatoo']);
        } else if (selectedSpecies === 'hamster') {
            populateBreeds(['Any',
                'Dwarf', 'Roborovski', 'Syrian']);
        } else {
            breedDropdown.innerHTML =
                '<option value="any">Any</option>'; // Default option
        }
    });

    // Populate age dropdown with options from below 1 year to 15 years old
    for (let i = 0; i < 15; i++) {
        ageDropdown.innerHTML += `<option value="${i + 1}-year">${i + 1} 
        year${i === 0 ? '' : 's'} old</option>`;
    }

    populateBreeds(['Any']);

    const searchButton = document.getElementById("search-button");
    const petContainers = document.querySelectorAll(".pet-container .pet-profile");

    searchButton.addEventListener("click", function() {
        const selectedSpecies = speciesDropdown.value;
        const selectedBreed = breedDropdown.value.toLowerCase(); // Get selected breed and convert to lowercase
    
        petContainers.forEach(container => {
            const containerSpecies = container.classList.contains(selectedSpecies + "-profile");
            const containerBreed = container.dataset.breed.toLowerCase() === selectedBreed || selectedBreed === "any";
    
            if (selectedSpecies === "any" || (containerSpecies && containerBreed)) {
                container.style.display = "block";
            } else {
                container.style.display = "none";
            }
        });
    });
});
