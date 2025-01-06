import { renderCard } from './renderCards.js'

const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const userName = document.querySelector('.user-name');
const btnAuth = document.querySelector('.button-auth');
const btnOut = document.querySelector('.button-out');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const cardsMenu = document.querySelector('.cards-menu');


const getData = async function (url) {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Помилка за адресою ${url}, статус помилки ${response.status}`);
  }
  return await response.json();
}

function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function removeUser() {
  localStorage.removeItem("user");
}

function updateUI(user) {
  if (user) {
    userName.style.display = 'flex';
    userName.textContent = user.userName;
    btnAuth.style.display = 'none';
    btnOut.style.display = 'flex';
  } else {
    userName.textContent = "";
    btnAuth.style.display = 'flex';
    btnOut.style.display = 'none';
  }
}

const openModal = () => {
  modalAuth.style.display = 'block';
  document.body.style.overflow = 'hidden';
  resetForm();
}

const closeModal = () => {
  modalAuth.style.display = 'none';
  document.body.style.overflow = '';
}

const resetForm = () => {
  loginInput.style.border = "";
  passwordInput.style.border = "";
  loginInput.value = "";
  passwordInput.value = "";
};

const logout = () => {
  removeUser();
  updateUI(null);
  closeModal();
  resetForm();
}

const login = () => {
  const loginValue = loginInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  let isValid = true;
  if(!loginValue) {
    loginInput.style.border = "2px solid red";
    isValid = false;
  }
  if(!passwordValue) {
    passwordInput.style.border = "2px solid red";
    isValid = false;
  }
  if(!isValid) return;
  
  const user = { userName: loginValue, password: passwordValue };
  saveUser(user);
  updateUI(user);
  closeModal();
}

// Check auth
const checkAuth = () => {
  const user = getUser();
  updateUI(user);
};

const handleCardClick = (event) => {
  const user = getUser();
  const card = event.target.closest('.card-restaurant');

  if(card) {
    if (!user) {
      event.preventDefault();
      openModal();
    } else {
      localStorage.setItem('restaurant', JSON.stringify({
        name: card.querySelector('.card-title').textContent,
        kitchen: card.querySelector('.category').textContent,
        price: card.querySelector('.price').textContent,
        stars: card.querySelector('.rating').textContent,
        products: card.dataset.products,
      }));
      window.location.href = card.getAttribute('href');
    }
  }
}

function createCardRestaurant(restaurantData) {
  const {image, kitchen, name, price, products, stars, time_of_delivery:timeOfDelivery} = restaurantData;
  const card = `<a href="restaurant.html" class="card card-restaurant" data-products="${products}">
    <img src="${image}" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${timeOfDelivery}</span>
      </div>
      <div class="card-info">
        <div class="rating">
          ${stars}
        </div>
        <div class="price">${price}</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  </a>
  `;
  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

function createMenuItemCard(product) {
  const {name, description, price, image} = product;
  const card = `<div class="card">
      <img src="${image}" alt="${name}" class="card-image" />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">${description}</div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">У кошик</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">${price} &#8372;</strong>
        </div>
      </div>
    </div>`;
  const cardsMenu = document.querySelector(".cards-menu");
  cardsMenu.insertAdjacentHTML("beforeend", card);
}

if (cardsRestaurants) {
  getData('./db/partners.json').then((data) => {
    if (Array.isArray(data)) {
      data.forEach(createCardRestaurant);
    } else {
      console.error('Очікувано масив, але отримано:', data);
    }
  }).catch((error) => {
    console.error('Помилка завантаження ресторанів', error);
  });
  cardsRestaurants.addEventListener('click', handleCardClick);
}

// var swiper = new Swiper(".swiper", {
//   navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//   },
//   loop: true,
// });

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

window.addEventListener('click', (event) => {
  if (event.target === modalAuth) {
    closeModal();
  }
});

btnAuth.addEventListener('click', openModal);
closeAuth.addEventListener('click', closeModal);
btnOut.addEventListener('click', logout)

function initRestaurantPage() {
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));

  if (!restaurant) {
    window.location.href = "index.html";
    return;
  }

  const restaurantTitle = document.querySelector(".restaurant-title");
  const rating = document.querySelector(".rating");
  const price = document.querySelector(".price");
  const category = document.querySelector(".category");

  restaurantTitle.textContent = restaurant.name;
  rating.textContent = restaurant.stars;
  price.textContent = restaurant.price;
  category.textContent = restaurant.kitchen;

  getData(`./db/${restaurant.products}`)
    .then((products) => {
      products.forEach(createMenuItemCard);
    })
    .catch((error) => {
      console.error("Помилка завантаження меню:", error);
    });
}

function loadMenuForRestaurant() {
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));
  if (restaurant) {
    getData(`./db/${restaurant.products}`)
    .then((menu) => {
      menu.forEach(createMenuItemCard);
    })
    .catch((error) => {
      console.error("Помилка завантаженя меню:", error);
    });
  }
}




document.addEventListener("DOMContentLoaded", () => {
  // if (cardsRestaurants) {
  //   renderCard(cardRestInfo, cardsRestaurants); // Для index.html
  //   cardsRestaurants.addEventListener('click', handleCardClick);
  // }

  // if (cardsMenu) {
  //   // renderCard(cardPizzaInfo, cardsMenu); // Для restaurant.html
  //   getData('./db/partners.json').then(function(data) {
  //     data.forEach(renderCard())
  //   })
  //   cardsMenu.addEventListener('click', handleCardClick);
  // }

  // var swiper = new Swiper(".swiper", {
  //   navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //   },
  //   loop: true,
  // });
  if (window.location.pathname.endsWith("restaurant.html")) {
    initRestaurantPage();
    loadMenuForRestaurant();
  }

  checkAuth();
});