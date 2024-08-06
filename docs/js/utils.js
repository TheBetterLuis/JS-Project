import {productos, cart} from './products.js';
import {adminUser} from './users.js';

//simple redirect, with delay function using ms
function redirect(page, delay = 0) {
  setTimeout(() => {
    window.location.href = `./${page}.html`;
  }, delay);

};

//saves default products in localstorage if they don't exist and returns the array of objects containting products to work with.
function storeProducts() {
  if (!localStorage.getItem('myProducts')) {
    const productosJSON = JSON.stringify(productos);
    localStorage.setItem('myProducts', productosJSON);
    const storedProducts = JSON.parse(localStorage.getItem('myProducts'));
    return storedProducts;
  } else {
    console.log('Products already exist in localStorage');
    const storedProducts = JSON.parse(localStorage.getItem('myProducts'));
    return storedProducts;
  }
};

function storeCart() {
  if (!localStorage.getItem('myCart')) {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem('myCart', cartJSON);
    const storedCart = JSON.parse(localStorage.getItem('myCart'));
    return storedCart;
  } else {
    console.log('Cart already exists in localStorage');
    const storedCart = JSON.parse(localStorage.getItem('myCart'));
    return storedCart;
  }
};


//returns true or false if there's an active user saved in Local Storage
function isSomeoneLogged() {
  if (localStorage.getItem('activeUser')) {
    return true;
  } else {
    return false;
  }
};

//true or false for adming being logged in
function isAdminLogged() {
  const activeUser = parseActiveUser();
  if (!activeUser) {
    return false; // User not logged in
  }
  return activeUser.email === adminUser.email; // Check if active user email matches admin email
};

//returns the active user for use if there's an active one, returns null otherwise
function parseActiveUser() {
  const userString = localStorage.getItem('activeUser');
  if (!userString) {
    return null; // User not logged in
  }
  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error("Error parsing active user data:", error);
    return null; // Handle parsing errors gracefully
  }
};

function logOut() {
  localStorage.removeItem('activeUser');
  redirect("login", 0);
};

//simple clear paymentInfo key from localStorage
function deletePaymentInfo() {
  localStorage.removeItem('paymentInfo');
};

export {redirect, storeProducts, isSomeoneLogged, isAdminLogged, parseActiveUser, storeCart, logOut, deletePaymentInfo};
