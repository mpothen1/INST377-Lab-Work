const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const services = [];
// fetch json data into a services array
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => services.push(...data));

console.log(services);

function findMatches(wordToMatch, services) {
  return services.filter((place) => {
    // if zip code matches
    const regex = new RegExp(wordToMatch, 'gi');
    return place.zip.match(regex);
  });
}

function displayMatches() {
  console.log(this.value);
  // console.log(findMatches(this.value, services))
  const matchArray = findMatches(this.value, services);
  console.log(matchArray);
  const html = matchArray.map((place) => `
      <li>
          <span class="name">${place.name}</span>
          <span class="category">${place.category}</span>
          <span class="address">${place.address_line_1}</span>
          <span class="zip">${zipcode}</span>
      </li>
      `).join(''); // forms into a string
  suggestions.innerHTML = html;
}