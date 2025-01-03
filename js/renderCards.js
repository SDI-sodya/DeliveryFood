export const renderCard = (cardType, cardContainer) => {
  cardContainer.innerHTML = "";
  if (document.querySelector('.cards-restaurants')) {
    cardType.forEach(({ name, image, time, ratting, price, category }) => {
      const card = `
        <a href="restaurant.html" class="card card-restaurant">
          <img src="${image}" alt="image" class="card-image" />
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title">${name}</h3>
              <span class="card-tag tag">${time}</span>
            </div>
            <div class="card-info">
              <div class="rating">
                ${ratting}
              </div>
              <div class="price">${price}</div>
              <div class="category">${category}</div>
            </div>
          </div>
        </a>
      `;
      cardContainer.insertAdjacentHTML("beforeend", card);
    });
  }
  if (document.querySelector('.cards-menu')) {
    cardType.forEach(({name, image, ingredients, price}) => {
      const card = `
        <div class="card">
          <img src="${image}" alt="image" class="card-image" />
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <div class="card-info">
              <div class="ingredients">${ingredients}</div>
            </div>
            <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">У кошик</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price-bold">${price} ₴</strong>
            </div>
          </div>
        </div>
      `;
      cardContainer.insertAdjacentHTML("beforeend", card);
    })
  }
}