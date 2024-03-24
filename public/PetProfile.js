// Sample data for a dog
const dogData = {
  name: 'Buddy',
  age: '2 years old',
  species: 'Dog',
  type: 'Golden Retriever',
  size: 'Large',
  shelter: 'XYZ Shelter',
  behaviors: 'Friendly, energetic',
  background: 'Buddy was found as a stray and brought to the shelter.',
  image: 'sample_dog.jpg', // Assuming the image file is in the assets folder
};

/**
   * Function to update dog profile.
   * @param {dogData} data - Data of the dog.
*/
function updateDogProfile(data) {
  document.getElementById('dog-name-placeholder').innerText =
  'Hello, my name is ' + data.name;
  document.getElementById('age-placeholder').innerText = data.age;
  document.getElementById('species-placeholder').innerText = data.species;
  document.getElementById('type-placeholder').innerText = data.type;
  document.getElementById('size-placeholder').innerText = data.size;
  document.getElementById('shelter-placeholder').innerText = data.shelter;
  document.getElementById('behaviors-characteristics-placeholder').innerText =
  data.behaviors;
  document.getElementById('background-placeholder').innerText = data.background;
  document.getElementById('dog-image-placeholder').src = 'assets/' + data.image;
}

// Call the function with the sample data
updateDogProfile(dogData);
