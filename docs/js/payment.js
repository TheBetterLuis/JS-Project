import {redirect, storeCart, parseActiveUser} from "./utils.js";

const currentUser = parseActiveUser();

if (localStorage.getItem('paymentInfo') === null || currentUser === null) {
  document.body.innerHTML = '';
  redirect("index", 0);
};

const cardName = document.getElementById('cardName');
const cardNumber = document.getElementById('cardNumber');
const cvv = document.getElementById('cvv');
const expiryDate = document.getElementById('expiryDate');

cardName.value = `${currentUser.name} ${currentUser.lastName}`;
console.log(storeCart());

function storepayInfo() {
  if (localStorage.getItem('paymentInfo')) {
    console.log('Purchase info found');
    const storedPayInfo = JSON.parse(localStorage.getItem('paymentInfo'));
    return storedPayInfo;
  }
};

const cart = storepayInfo();

function nameVal() {
  let expName = /^[a-zA-Z\s]{2,}\s[a-zA-Z]{2,}$/;

  if (expName.test(cardName.value)) {
    cardName.classList.remove('ring-red-600');
    cardName.classList.add('ring-green-600', 'ring-2');
  } else {
    cardName.classList.remove('ring-green-600');
    cardName.classList.add('ring-red-600', 'ring-2');
  }
}
cardName.addEventListener('input', nameVal);

function cardNumVal() {
  let expCardNum = /^(\d{4}\s?){4}$/;

  if (expCardNum.test(cardNumber.value)) {
    cardNumber.classList.remove('ring-red-600');
    cardNumber.classList.add('ring-green-600', 'ring-2');
  } else {
    cardNumber.classList.remove('ring-green-600');
    cardNumber.classList.add('ring-red-600', 'ring-2');
  }
}

cardNumber.addEventListener('input', cardNumVal);

function cvvVal() {
  let expCVV = /^[0-9]{3}$/;
  if (expCVV.test(cvv.value)) {
    cvv.classList.remove('ring-red-600');
    cvv.classList.add('ring-green-600', 'ring-2');
  } else {
    cvv.classList.remove('ring-green-600');
    cvv.classList.add('ring-red-600', 'ring-2');
  }
}

cvv.addEventListener('input', cvvVal);

function expDateVal() {
  let expDate = /^(0[1-9]|1[0-2])\/(2[4-9]|3[0-9])$/;
  if (expDate.test(expiryDate.value)) {
    expiryDate.classList.remove('ring-red-600');
    expiryDate.classList.add('ring-green-600', 'ring-2');
  } else {
    expiryDate.classList.remove('ring-green-600');
    expiryDate.classList.add('ring-red-600', 'ring-2');
  }
}
expiryDate.addEventListener('input', expDateVal);

const finishPurchase = document.getElementById('finishPurchase');

function cardChecker() {
  let isValid = true;

  let expName = /^[a-zA-Z\s]{2,}\s[a-zA-Z]{2,}$/;
  let expCardNum = /^(\d{4}\s?){4}$/;
  let expCVV = /^[0-9]{3}$/;
  let expDate = /^(0[1-9]|1[0-2])\/(2[4-9]|3[0-9])$/;

  if (!expName.test(cardName.value)) {
    isValid = false;
  }

  if (!expCardNum.test(cardNumber.value)) {
    isValid = false;
  }

  if (!expDate.test(expiryDate.value)) {
    isValid = false;
  }

  if (!expCVV.test(cvv.value)) {
    isValid = false;
  }

  if (isValid) {
    finishPurchase.classList.remove('hidden');
  } else {
    finishPurchase.classList.add('hidden');
  }
};

cardName.addEventListener('input', cardChecker);
cardNumber.addEventListener('input', cardChecker);
cvv.addEventListener('input', cardChecker);
expiryDate.addEventListener('input', cardChecker);


function processPurchase() {
  const divCard = document.getElementById('divCard');
  divCard.classList.add('hidden');
  viewCart.classList.add('hidden');
  const lastTable = document.getElementById('lastTable-products');

  receiptData();

  if (cart.length === 0) {
    lastTable.innerHTML = "";
    const Cartless = document.createElement('h1');
    Cartless.innerText += "Your cart is empty";
    lastTable.appendChild(Cartless)
  } else {
    lastTable.innerHTML = "";
    cart.forEach((cartItem, index) => {
      updateProductStock(cartItem.sku, cartItem.quantity);
      removeProductsWithZeroStock();
      const Cartless = document.createElement('h1');
      Cartless.innerText += `${cartItem.name} ${cartItem.quantity}\n`;
      const tr = document.createElement("tr");
      const nameTd = document.createElement("td");
      const imageTd = document.createElement("img");
      imageTd.classList.add('imgProdCrud');
      const priceTd = document.createElement("td");
      const quantityTd = document.createElement("td");
      const actionsTd = document.createElement("td");

      nameTd.innerText = cartItem.name;
      imageTd.src = cartItem.imgUrl;
      quantityTd.innerText = cartItem.quantity;
      if (cartItem.discountedPrice != null && cartItem.discountedPrice != "null" && cartItem.discountedPrice != 0 && cartItem.discountedPrice != "") {
        priceTd.innerText = `${(cartItem.discountedPrice * cartItem.quantity).toFixed(2)}$`;
      } else {
        priceTd.innerText = `${(cartItem.price * cartItem.quantity).toFixed(2)}$`;
      }
      tr.appendChild(imageTd);
      tr.appendChild(nameTd);
      tr.appendChild(quantityTd);
      tr.appendChild(actionsTd);
      tr.appendChild(priceTd);
      lastTable.appendChild(tr);
    })
    updateCartTotalFinal();
    finishModal.style.display = "block";
    eraseKeys();
  }

}

finishPurchase.addEventListener('click', processPurchase);
const tableProducts = document.getElementById("table-products");

function renderCart() {
  if (cart.length === 0) {
    tableProducts.innerHTML = "";
    const Cartless = document.createElement('h1');
    Cartless.innerText += "Your cart is empty";
    tableProducts.appendChild(Cartless)
  } else {
    tableProducts.innerHTML = "";
    cart.forEach((cartItem, index) => {
      const Cartless = document.createElement('h1');
      Cartless.innerText += `${cartItem.name} ${cartItem.quantity}\n`;
      const tr = document.createElement("tr");
      const nameTd = document.createElement("td");
      const imageTd = document.createElement("img");
      imageTd.classList.add('imgProdCrud');
      const priceTd = document.createElement("td");
      const quantityTd = document.createElement("td");
      const actionsTd = document.createElement("td");

      nameTd.innerText = cartItem.name;
      imageTd.src = cartItem.imgUrl;
      quantityTd.innerText = cartItem.quantity;
      if (cartItem.discountedPrice != null && cartItem.discountedPrice != "null" && cartItem.discountedPrice != 0 && cartItem.discountedPrice != "") {
        priceTd.innerText = `${(cartItem.discountedPrice * cartItem.quantity).toFixed(2)}$`;
      } else {
        priceTd.innerText = `${(cartItem.price * cartItem.quantity).toFixed(2)}$`;
      }
      tr.appendChild(imageTd);
      tr.appendChild(nameTd);
      tr.appendChild(quantityTd);
      tr.appendChild(actionsTd);
      tr.appendChild(priceTd);
      tableProducts.appendChild(tr);
    })
    updateCartTotal();
  }
};
renderCart();

const modal = document.getElementById("cartModal");
const viewCart = document.getElementById('viewCart');
const finishModal = document.getElementById('finishModal');
const exitFinally = document.getElementById('exitFinally');
exitFinally.addEventListener('click', backToHome);

function backToHome() {
  redirect('index', 0);
}

function openModal() {
  modal.style.display = "block";
}

function openLastModal() {
  finishModal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function calculateTotal() {
  const total = cart.reduce((accumulator, item) => {
    if (item.discountedPrice != null && item.discountedPrice != "null" && item.discountedPrice != 0 && item.discountedPrice != "") {
      return accumulator + (item.quantity * item.discountedPrice);
    } else {
      return accumulator + (item.quantity * item.price);
    }
  }, 0);
  return total.toFixed(2);
}

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);
viewCart.addEventListener('click', openModal);

function updateCartTotal() {
  const totalElement = document.getElementById('total');
  totalElement.innerText = `Total: ${calculateTotal()}$`;
}

function updateCartTotalFinal() {
  const totalElement = document.getElementById('totalF');
  totalElement.innerText = `Total: ${calculateTotal()}$`;
}

function eraseKeys() {
  localStorage.removeItem('paymentInfo');
  localStorage.removeItem('myCart');
}

function updateProductStock(sku, quantityPurchased) {
  const productData = JSON.parse(localStorage.getItem('myProducts'));

  const productIndex = productData.findIndex(item => item.sku === sku);

  if (productIndex !== -1 && productData[productIndex].stock >= quantityPurchased) {
    productData[productIndex].stock -= quantityPurchased;
    localStorage.setItem('myProducts', JSON.stringify(productData));
    console.log('Stock updated successfully!');
  } else {
    console.error('Product not found or insufficient stock.');
  }
}

function removeProductsWithZeroStock() {
  const productData = JSON.parse(localStorage.getItem('myProducts'));

  const updatedProductData = productData.filter(product => product.stock > 0);
  localStorage.setItem('myProducts', JSON.stringify(updatedProductData));
}

function generateAlphanumericCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}


function receiptData() {
  const receiptName = document.getElementById('receiptName');
  const receiptAddress = document.getElementById('receiptAddress');
  const receiptEmail = document.getElementById('receiptEmail');
  const purchaseDate = document.getElementById('purchaseDate');
  const transID = document.getElementById('transID');

  receiptName.innerText = `Full Name: ${currentUser.name} ${currentUser.lastName}`;
  receiptAddress.innerText = `Address: ${currentUser.address}, ${currentUser.city}, ${currentUser.country}.`;
  receiptEmail.innerText = `Email: ${currentUser.email}`;
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  purchaseDate.innerText = `Purchase Date: ${new Date().toLocaleString('en-US', options)}`;
  transID.innerText = `\n${generateAlphanumericCode(10)}\n\n\n`;
}


