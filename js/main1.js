document.addEventListener("DOMContentLoaded", () => {
  const modalAuth = document.querySelector('.modal-auth');
  const closeAuth = document.querySelector('.close-auth');

  const userName = document.querySelector('.user-name');
  const btnAuth = document.querySelector('.button-auth');
  const btnOut = document.querySelector('.button-out');

  const loginForm = document.querySelector('#logInForm');
  const loginInput = document.querySelector('#login');
  const passwordInput = document.querySelector('#password');

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
    const { userName: storedUserName } = JSON.parse(user);
    if (user) {
      userName.style.display = 'flex';
      userName.textContent = storedUserName;
      btnAuth.style.display = 'none';
      btnOut.style.display = 'flex';
    } else {
      btnAuth.style.display = 'flex';
      btnOut.style.display = 'none';
    }
  };
  
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

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
  });

  checkAuth();
});