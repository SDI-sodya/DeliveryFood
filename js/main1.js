document.addEventListener("DOMContentLoaded", () => {
  const modalAuth = document.querySelector('.modal-auth');
  const closeAuth = document.querySelector('.close-auth');

  const userName = document.querySelector('.user-name');
  const btnAuth = document.querySelector('.button-auth');
  const btnOut = document.querySelector('.button-out');

  const loginForm = document.querySelector('#logInForm');
  const loginInput = document.querySelector('#login');
  const passwordInput = document.querySelector('#password');

  const openModal = () =>
    modalAuth.style.display = 'block';
  
  const closeModal = () =>
    modalAuth.style.display = 'none';
  
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
    if (!loginValue) {
      loginInput.style.border = "2px solid red";
      return;
    }
    loginInput.style.border = "";
    localStorage.setItem('user', JSON.stringify({ userName: loginValue, password: passwordValue }));
    userName.style.display = 'flex';
    userName.textContent = loginValue;
    btnAuth.style.display = 'none';
    btnOut.style.display = 'flex';
    closeModal();
  }
  
  // Check auth
  const checkAuth = () => {
    const user = JSON.parse(localStorage.user).userName;
    if (user) {
      userName.style.display = 'flex';
      userName.textContent = user;
      btnAuth.style.display = 'none';
      btnOut.style.display = 'flex';
    } else {
      btnAuth.style.display = 'flex';
      btnOut.style.display = 'none';
    }
  };
  
  // Button to open the form
  btnAuth.addEventListener('click', openModal);
  // Button to close the form
  closeAuth.addEventListener('click', closeModal);
  // Button for logout
  btnOut.addEventListener('click', logout)

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });


  checkAuth();
});