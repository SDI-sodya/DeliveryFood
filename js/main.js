import { renderCard } from './renderCards.js'

document.addEventListener("DOMContentLoaded", () => {
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

  const cardRestInfo = [
    {
      id: 0,
      name: 'Піца плюс',
      image: 'img/pizza-plus/preview.jpg',
      time: '50 хвилин',
      ratting: 4.5,
      price: 'від 200 ₴',
      category: 'Піца'
    },
    {
      id: 1,
      name: 'Танукі',
      image: 'img/tanuki/preview.jpg',
      time: '60 хвилин',
      ratting: 4.5,
      price: 'від 1 200 ₴',
      category: 'Суші, роли'
    },
    {
      id: 2,
      name: 'FoodBand',
      image: 'img/food-band/preview.jpg',
      time: '40 хвилин',
      ratting: 4.5,
      price: 'від 150 ₴',
      category: 'Піца'
    },
  ];

  const cardPizzaInfo = [
    {
      id: 0,
      name: 'Піца Везувій',
      image: 'img/pizza-plus/pizza-vesuvius.jpg',
      ingredients: 'Соус томатний, сир «Моцарелла», шинка, пепероні, перець «Халапіння», соус «Тобаско», томати.',
      price: 545
    },
    {
      id: 1,
      name: 'Піца BBQ',
      image: 'img/pizza-plus/pizza-girls.jpg',
      ingredients: 'Соус томатний, пісне тісто, нежирний сир, кукурудза, цибуля, маслини, гриби, помідори, болгарський перець',
      price: 150,
    },
    {
      id: 2,
      name: 'Піца Оле-Оле',
      image: 'img/pizza-plus/pizza-oleole.jpg',
      ingredients: 'Соус томатний, сир «Моцарелла», черрі, маслини, зелень, майонез',
      price: 440,
    },
  ]

  const openModal = () => {
    modalAuth.style.display = 'block';
    document.body.style.overflow = 'hidden';
    resetInputBorders();
  }
  
  const closeModal = () => {
    modalAuth.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  const resetInputBorders = () => {
    loginInput.style.border = "";
    passwordInput.style.border = "";
  };

  // Button for logout
  const logout = () => {
    localStorage.removeItem('user');
    userName.textContent = "";
    btnAuth.style.display = 'flex';
    btnOut.style.display = 'none';
  }

  // Button for login
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
    
    localStorage.setItem('user', JSON.stringify({ userName: loginValue, password: passwordValue }));
    loginInput.value = "";
    passwordInput.value = "";
    userName.style.display = 'flex';
    userName.textContent = loginValue;
    btnAuth.style.display = 'none';
    btnOut.style.display = 'flex';
    closeModal();
  }
  
  // Check auth
  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      userName.style.display = 'flex';
      userName.textContent = user.userName;
      btnAuth.style.display = 'none';
      btnOut.style.display = 'flex';
    } else {
      btnAuth.style.display = 'flex';
      btnOut.style.display = 'none';
    }
  };

  // const renderCard = (cardType, cardContainer) => {
  //   cardContainer.innerHTML = "";
  //   cardType.forEach(({ name, image, time, ratting, price, category }) => {
  //     const card = `
  //       <a href="restaurant.html" class="card card-restaurant">
  //         <img src="${image}" alt="image" class="card-image" />
  //         <div class="card-text">
  //           <div class="card-heading">
  //             <h3 class="card-title">${name}</h3>
  //             <span class="card-tag tag">${time}</span>
  //           </div>
  //           <div class="card-info">
  //             <div class="rating">
  //               ${ratting}
  //             </div>
  //             <div class="price">${price}</div>
  //             <div class="category">${category}</div>
  //           </div>
  //         </div>
  //       </a>
  //     `;
  //     cardContainer.insertAdjacentHTML("beforeend", card);
  //   });
  // }

  const handleCardClick = (event) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const card = event.target.closest('.card-restaurant');

    if(card) {
      if (!user) {
        event.preventDefault();
        openModal();
      } else {
        window.location.href = card.getAttribute('href');
      }
    }
  }

  window.addEventListener('click', (event) => {
    if (event.target === modalAuth) {
      closeModal();
    }
  });

  // Button to open the form
  btnAuth.addEventListener('click', openModal);
  // Button to close the form
  closeAuth.addEventListener('click', closeModal);
  // Button for logout
  btnOut.addEventListener('click', logout)

  if (cardsRestaurants) {
    renderCard(cardRestInfo, cardsRestaurants); // Для index.html
    cardsRestaurants.addEventListener('click', handleCardClick);
  }

  if (cardsMenu) {
    renderCard(cardPizzaInfo, cardsMenu); // Для restaurant.html
    cardsMenu.addEventListener('click', handleCardClick);
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });
  

  checkAuth();
});