function generateQRCode() {
  const qrCodeContainer = document.getElementById('qrCode');
  qrCodeContainer.innerHTML = '';
  const url = window.location.href;
  new QRCode(qrCodeContainer, {
    text: url,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}
const offers = [
  {
    name: "Maria",
    title: "Hilfe beim Einkaufen",
    description: "Ich biete an, für jemanden aus der Nachbarschaft einkaufen zu gehen.",
    location: [47.4818, 8.2077],
    rating: 4.5,
    image: "https://i.imgur.com/ZGtX4Zz.png"
  },
  {
    name: "Max",
    title: "Mathe-Nachhilfe",
    description: "Biete Nachhilfe für Schüler in Mathematik, speziell für Gymnasium oder Sekundarstufe.",
    location: [47.4878, 8.2161],
    rating: 4.8,
    image: "https://i.imgur.com/brPkgzI.png"
  },
  {
    name: "Sarah",
    title: "Gartenarbeit",
    description: "Hilfe bei der Gartenarbeit: Unkraut jäten, Pflanzen giessen und mehr.",
    location: [47.4739, 8.1925],
    rating: 4.2,
    image: "https://i.imgur.com/sgq1R5n.png"
  },
  {
    name: "Lukas",
    title: "Programmierung lernen",
    description: "Ich biete Programmierkurse für Anfänger an.",
    location: [47.4850, 8.2090],
    rating: 4.9,
    image: "https://i.imgur.com/QVpYhv2.png"
  },
  {
    name: "Anna",
    title: "Kinderbetreuung",
    description: "Betreuung für Kinder nachmittags in der Nähe.",
    location: [47.4800, 8.2000],
    rating: 4.7,
    image: "https://i.imgur.com/pQOrMVw.png"
  },
  {
    name: "Tom",
    title: "Hundespaziergänge",
    description: "Ich gehe mit deinem Hund spazieren, wenn du beschäftigt bist.",
    location: [47.4780, 8.2150],
    rating: 4.3,
    image: "https://i.imgur.com/1P7cwDg.png"
  }
];
const helpRequests = [
  {
    name: "Clara",
    title: "Einkäufe tragen",
    description: "Ich brauche Hilfe, meine Einkäufe vom Supermarkt nach Hause zu bringen.",
    location: [47.4818, 8.2050],
    rating: 4.2
  },
  {
    name: "Peter",
    title: "Möbelaufbau",
    description: "Ich suche Unterstützung beim Aufbau eines neuen Regals.",
    location: [47.4840, 8.2100],
    rating: 3.8
  },
  {
    name: "Eva",
    title: "Hund ausführen",
    description: "Ich brauche jemanden, der meinen Hund ausführt, während ich arbeite.",
    location: [47.4790, 8.2020],
    rating: 4.5
  }
];
const userCreatedHelpRequests = [];
function displayHelpRequests() {
  const helpList = document.getElementById('helpOfferList');
  helpList.innerHTML = '';
  helpRequests.forEach((request) => {
    const li = createHelpElement(request);
    helpList.appendChild(li);
  });
}
function createHelpElement(request) {
  const li = document.createElement('li');
  li.classList.add('help-item');
  li.innerHTML = `
    <div class="help-title">${request.title}</div>
    <div class="help-name">Von: ${request.name}</div>
    <div class="help-description">${request.description}</div>
    <div class="help-rating">${generateStars(request.rating || 0)} (${(request.rating || 0).toFixed(1)} Sterne)</div>
  `;
  return li;
}
function addHelpMarkerToMap(request) {
  const iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png';
  const marker = L.marker(request.location, {
    icon: L.icon({
      iconUrl: iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    })
  }).addTo(map);
  marker.bindPopup(`
    <div class="popup-container">
      <div class="popup-title">${request.title}</div>
      <div class="popup-body">
        <p class="popup-description">${request.description}</p>
        <p class="popup-name"><strong>Von:</strong> ${request.name}</p>
        <p class="popup-rating"><strong>Bewertung:</strong> ${generateStars(request.rating || 0)} (${(request.rating || 0).toFixed(1)} Sterne)</p>
      </div>
      <button class="help-contact-button" onclick="openChat('${request.name}')">Kontakt aufnehmen</button>
    </div>
  `);
}
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '✩'.repeat(emptyStars);
}
let map;
let markers = [];
function initMap() {
  map = L.map('map').setView([47.4820, 8.2116], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  offers.forEach(offer => addMarkerForOffer(offer, 'green'));
  helpRequests.forEach(request => addHelpMarkerToMap(request));
}
function addMarkerForOffer(offer, color) {
  const iconUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`;
  const isBlue = color === 'blue';
  const marker = L.marker(offer.location, {
    icon: L.icon({
      iconUrl: iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    })
  }).addTo(map);
  marker.bindPopup(`
    <div class="popup-container">
      <div class="popup-header">
        <img src="${offer.image}" alt="${offer.title}" class="popup-image">
        <div class="popup-title">${offer.title}</div>
      </div>
      <div class="popup-body">
        <p class="popup-description">${offer.description}</p>
        <p class="popup-name"><strong>Von:</strong> ${offer.name}</p>
        <p class="popup-rating"><strong>Bewertung:</strong> ${generateStars(offer.rating || 0)} (${(offer.rating || 0).toFixed(1)} Sterne)</p>
      </div>
      <button class="popup-chat-button" onclick="openChat('${offer.name}')">Chat starten</button>
    </div>
  `);
  markers.push({ marker, offer, isBlue });
}
function openChat(userName) {
  const chatContainer = document.getElementById('chatContainer');
  chatContainer.innerHTML = `
    <h3>Chat mit ${userName}</h3>
    <div id="chatMessages" style="border: 1px solid #ccc; height: 200px; overflow-y: scroll; padding: 10px; margin-bottom: 10px;">
      <p><em>Chat starten...</em></p>
    </div>
    <input type="text" id="chatInput" placeholder="Nachricht eingeben..." style="width: calc(100% - 90px);">
    <button onclick="sendMessage('${userName}')">Senden</button>
  `;
  chatContainer.style.display = 'block';
}
function sendMessage(userName) {
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  if (chatInput.value.trim() !== "") {
    const userMessage = `<p class="message sent"><strong>Sie:</strong> ${chatInput.value}</p>`;
    chatMessages.innerHTML += userMessage;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = "";
    setTimeout(() => {
      const responseMessage = `<p class="message received"><strong>${userName}:</strong> Vielen Dank für deine Nachricht, ich melde mich später bei dir.</p>`;
      chatMessages.innerHTML += responseMessage;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 2000);
  }
}
document.addEventListener('click', function (event) {
  const chatContainer = document.getElementById('chatContainer');
  if (!chatContainer.contains(event.target) && !event.target.matches('.leaflet-popup-content button')) {
    chatContainer.style.display = 'none';
  }
});
function addCurrentLocationMarker(name, title, description) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const newOffer = {
          name,
          title,
          description,
          location: [lat, lon],
          rating: 0,
          image: "https://via.placeholder.com/100x100?text=New"
        };
        offers.push(newOffer);
        addMarkerForOffer(newOffer, 'blue');
        const offerList = document.getElementById('offerList');
        const newOfferElement = createOfferElement(newOffer);
        offerList.appendChild(newOfferElement);
        map.setView([lat, lon], 14);
      },
      function () {
        const lat = 47.4820;
        const lon = 8.2116;
        const newOffer = {
          name,
          title,
          description,
          location: [lat, lon],
          rating: 0,
          image: "https://via.placeholder.com/100x100?text=New"
        };
        offers.push(newOffer);
        addMarkerForOffer(newOffer, 'blue');
        const offerList = document.getElementById('offerList');
        const newOfferElement = createOfferElement(newOffer);
        offerList.appendChild(newOfferElement);
      }
    );
  } else {
    const lat = 47.4820;
    const lon = 8.2116;
    const newOffer = {
      name,
      title,
      description,
      location: [lat, lon],
      rating: 0,
      image: "https://via.placeholder.com/100x100?text=New"
    };
    offers.push(newOffer);
    addMarkerForOffer(newOffer, 'blue');
    const offerList = document.getElementById('offerList');
    const newOfferElement = createOfferElement(newOffer);
    offerList.appendChild(newOfferElement);
  }
}
document.getElementById('offerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('offerName').value.trim();
  const title = document.getElementById('offerTitle').value.trim();
  const description = document.getElementById('offerDescription').value.trim();
  if (name && title && description) {
    addCurrentLocationMarker(name, title, description);
    document.getElementById('offerForm').reset();
  }
});
function displayOffers() {
  const offerList = document.getElementById('offerList');
  offerList.innerHTML = '';
  offers.forEach((offer) => {
    const li = createOfferElement(offer);
    offerList.appendChild(li);
  });
}
function createOfferElement(offer) {
  const li = document.createElement('li');
  li.classList.add('offer-item');
  li.innerHTML = `
    <img src="${offer.image}" alt="${offer.title}" class="offer-image">
    <div class="offer-title">${offer.title}</div>
    <div class="offer-name">Von: ${offer.name}</div>
    <div class="offer-description">${offer.description}</div>
    <div class="offer-rating">${generateStars(offer.rating || 0)} (${(offer.rating || 0).toFixed(1)} Sterne)</div>
  `;
  return li;
}
function searchOffers() {
  const query = document.getElementById('searchQuery').value.toLowerCase();
  const results = offers.filter(offer =>
    offer.title.toLowerCase().includes(query) ||
    offer.description.toLowerCase().includes(query)
  );
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';
  results.forEach(result => {
    const li = createOfferElement(result);
    searchResults.appendChild(li);
  });
  markers.forEach(({ marker, offer, isBlue }) => {
    if (results.find(result => result.title === offer.title && result.name === offer.name)) {
      marker.setIcon(L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41]
      }));
    } else if (isBlue) {
      marker.setIcon(L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41]
      }));
    } else {
      marker.setIcon(L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41]
      }));
    }
  });
}
generateQRCode();
displayOffers();
initMap();
displayHelpRequests();
