import {users, adminUser} from './users.js';
import {redirect, storeProducts, isSomeoneLogged, isAdminLogged, parseActiveUser, logOut, deletePaymentInfo} from './utils.js';
import {productos, Product} from './products.js';



deletePaymentInfo();

const temporaryProducts = storeProducts();
console.log(temporaryProducts);
console.log(parseActiveUser());

if (!isSomeoneLogged()) {
  document.body.innerHTML = "";
  redirect("login", 0);
} else if (!isAdminLogged()) {
  document.body.innerHTML = "";
  redirect("unauthorized", 0);
}

console.log(users);

const tableUsers = document.getElementById("table-users");
const tableProducts = document.getElementById("table-products");

let currentProductIndex;

let i = 0;
function usersTable() {
  tableUsers.innerHTML = "";

  users.forEach((user, index) => {
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const actionsTd = document.createElement("td");
    const detailsBtn = document.createElement("button");
    detailsBtn.classList.add('edit-btn', 'detail-usr');

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('delete-btn', 'delete-usr');
    idTd.innerText = index; // Use index for ID
    nameTd.innerText = `${user.name}\n${user.lastName}`;
    emailTd.innerText = user.email;
    detailsBtn.innerText = "Details";
    deleteBtn.innerText = "Delete";


    actionsTd.appendChild(detailsBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(actionsTd);
    tableUsers.appendChild(tr);
    i++;
  });


  if (i < users.length) {
    usersTable();
  }
  addbuttonsDetailsusr();
  addbuttonsDeleteusr();
}


usersTable();


let j = 0
function productsTable() {
  tableProducts.innerHTML = "";

  temporaryProducts.forEach((product, index) => {
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const skuTd = document.createElement("td");
    const nameTd = document.createElement("td");
    const imageTd = document.createElement("img");
    imageTd.classList.add('imgProdCrud');
    const priceTd = document.createElement("td");
    const actionsTd = document.createElement("td");
    const detailsBtn = document.createElement("button");
    detailsBtn.classList.add('edit-btn', 'detail-product');

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add('delete-btn', 'delete-product');
    idTd.innerText = index; // Use index for ID
    skuTd.innerText = product.sku; // Use index for ID
    nameTd.innerText = product.name;
    imageTd.src = product.imgUrl;
    priceTd.innerText = `${product.price}$`;
    detailsBtn.innerText = "Details";
    deleteBtn.innerText = "Delete";


    actionsTd.appendChild(detailsBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(skuTd);
    tr.appendChild(nameTd);
    tr.appendChild(imageTd);
    tr.appendChild(priceTd);
    tr.appendChild(actionsTd);
    tableProducts.appendChild(tr);
    j++;
  });

  if (j < temporaryProducts.length) {
    productsTable();
  }
  addbuttonsDetailsprod();
  addbuttonsDeleteprod();
}


productsTable();



const modal = document.getElementById("myModal");
const prodmodal = document.getElementById("prodModal");
const editProdModal = document.getElementById('editProdModal');
const editMod = document.getElementById('editMod');

const closeBtn = document.querySelector(".close");
const closeBtnP = document.querySelector(".closeMP");
const closeBtnEMP = document.querySelector(".closeEMP");

const editProdcancel = document.getElementById('editProdcancel');
editProdcancel.addEventListener('click', function () {
  redirect("crud", 0);
})

const editprodconfirm = document.getElementById('editprodconfirm');


closeBtn.addEventListener("click", closeModal);
closeBtnP.addEventListener("click", closeProdModal);

closeBtnEMP.addEventListener("click", closeEditProdModal);


function openModal(i) {
  modal.style.display = "block";
  const userName = document.getElementById("user-name");
  const userLastname = document.getElementById("user-lastname");
  const userEmail = document.getElementById("user-email");
  const userDOB = document.getElementById("user-dob");
  const userCountry = document.getElementById("user-country");
  const userCity = document.getElementById("user-city");
  const userAddress = document.getElementById("user-address");

  userName.innerText = users[i].name;
  userLastname.innerText = users[i].lastName;
  userEmail.innerText = users[i].email;
  userDOB.innerText = users[i].birthDate;
  userCountry.innerText = users[i].country;
  userCity.innerText = users[i].city;
  userAddress.innerText = users[i].address;
}


function openProdModal(a) {
  prodmodal.style.display = "block";
  const prodName = document.getElementById("prod-name");
  const prodDesc = document.getElementById("prod-desc");
  const prodSku = document.getElementById('prod-sku');
  const prodPrice = document.getElementById("prod-price");
  const prodDiscPrice = document.getElementById("prod-dprice");
  const prodStock = document.getElementById("prod-stock");
  const prodImg = document.getElementById("prod-img");


  prodName.innerText = temporaryProducts[a].name;
  prodDesc.innerText = temporaryProducts[a].desc;
  prodSku.innerText = temporaryProducts[a].sku;
  prodPrice.innerText = temporaryProducts[a].price;
  prodDiscPrice.innerText = temporaryProducts[a].discountedPrice;
  prodStock.innerText = temporaryProducts[a].stock;
  prodImg.src = temporaryProducts[a].imgUrl;
  prodImg.alt = temporaryProducts[a].name;

  editMod.onclick = function () {
    openEditModal(a);
  };
  editProdConfirm.onclick = function () {
    saveProdinfo(a);
  };



}


function openEditModal(para) {
  prodmodal.style.display = "none";
  editProdModal.style.display = "block";
  const inputProdName = document.getElementById('inputProdName');
  const inputProdDesc = document.getElementById('inputProdDesc');
  const inputProdSKU = document.getElementById('inputProdSKU');
  const inputProdPrice = document.getElementById('inputProdPrice');
  const inputProdDiscPrice = document.getElementById('inputProdDiscPrice');
  const inputProdStock = document.getElementById('inputProdStock');
  const image = document.getElementById('prod-img2');
  image.classList.add('imgProdCrud');
  const inputProdImg = document.getElementById('inputProdImg');

  inputProdName.value = temporaryProducts[para].name;
  inputProdDesc.value = temporaryProducts[para].desc;
  inputProdSKU.value = temporaryProducts[para].sku;
  inputProdPrice.value = temporaryProducts[para].price;
  inputProdDiscPrice.value = temporaryProducts[para].discountedPrice;
  inputProdStock.value = temporaryProducts[para].stock;
  image.src = temporaryProducts[para].imgUrl;
  inputProdImg.value = temporaryProducts[para].imgUrl;
}

function openNewProdModal() {
  editProdModal.style.display = "block";
  const inputProdName = document.getElementById('inputProdName');
  const inputProdDesc = document.getElementById('inputProdDesc');
  const inputProdSKU = document.getElementById('inputProdSKU');
  const inputProdPrice = document.getElementById('inputProdPrice');
  const inputProdDiscPrice = document.getElementById('inputProdDiscPrice');
  const inputProdStock = document.getElementById('inputProdStock');
  const image = document.getElementById('prod-img2');
  image.classList.add('imgProdCrud');
  const inputProdImg = document.getElementById('inputProdImg');

  inputProdName.value = 'Name';
  inputProdDesc.value = 'Description';
  inputProdSKU.value = 'SKU';
  inputProdPrice.value = 'Price';
  inputProdDiscPrice.value = 'Discounted Price';
  inputProdStock.value = 'Stock';
  // image.src = temporaryProducts[para].imgUrl;
  inputProdImg.value = 'Please insert img url';

  editProdConfirm.onclick = function () {
    createNewProd();
  };


}

const addProductBtn = document.getElementById('addProductBtn');
addProductBtn.addEventListener('click', openNewProdModal);

function closeModal() {
  modal.style.display = "none";
}
function closeProdModal() {
  prodmodal.style.display = "none";
}
function closeEditProdModal() {
  editProdModal.style.display = 'none';
}

function addbuttonsDetailsusr() {
  const buttons = document.querySelectorAll('.detail-usr'); // Select all buttons

  buttons.forEach((butto, index) => {
    butto.addEventListener('click', () => {
      const clickedButtonIndex = index;
      openModal(clickedButtonIndex);
    });
  });
}

function addbuttonsDetailsprod() {
  const buttons = document.querySelectorAll('.detail-product'); // Select all buttons

  buttons.forEach((butto, index) => {
    butto.addEventListener('click', () => {
      const clickedButtonIndex = index;
      openProdModal(clickedButtonIndex);
    });
  });
}




function addbuttonsDeleteusr() {
  const buttons = document.querySelectorAll('.delete-usr'); // Select all buttons

  buttons.forEach((butto, index) => {
    butto.addEventListener('click', () => {
      // Access the button's index (0-9) for the current iteration
      const clickedButtonIndex = index;
      deleteUserFromLocalStorage(clickedButtonIndex);
    });
  });
}

function addbuttonsDeleteprod() {
  const buttons = document.querySelectorAll('.delete-product'); // Select all buttons

  buttons.forEach((butto, index) => {
    butto.addEventListener('click', () => {
      // Access the button's index (0-9) for the current iteration
      const clickedButtonIndex = index;
      deleteProdFromLocalStorage(clickedButtonIndex);
    });
  });
}


function deleteUserFromLocalStorage(index) {

  if (!confirm(`Do you want to delete\n${users[index].name} ${users[index].lastName} - ${users[index].email} ?`)) {
    return;
  }

  if (index < 0 || index >= users.length) {
    console.error("Error: Index out of range");
    return;
  }

  users.splice(index, 1);

  localStorage.setItem('users', JSON.stringify(users));

  redirect('crud', 0);
}


function deleteProdFromLocalStorage(index) {

  if (!confirm(`Do you want to delete\n${temporaryProducts[index].name} ?`)) {
    return;
  }

  if (index < 0 || index >= temporaryProducts.length) {
    console.error("Error: Index out of range");
    return;
  }

  temporaryProducts.splice(index, 1);

  localStorage.setItem('myProducts', JSON.stringify(temporaryProducts));

  redirect('crud', 0);
}


function saveProdinfo(para) {
  temporaryProducts[para].name = document.getElementById('inputProdName').value;
  temporaryProducts[para].desc = document.getElementById('inputProdDesc').value;
  temporaryProducts[para].sku = document.getElementById('inputProdSKU').value;
  temporaryProducts[para].price = +document.getElementById('inputProdPrice').value;
  temporaryProducts[para].discountedPrice = +document.getElementById('inputProdDiscPrice').value;
  temporaryProducts[para].stock = +document.getElementById('inputProdStock').value;
  temporaryProducts[para].imgUrl = document.getElementById('inputProdImg').value;
  localStorage.setItem('myProducts', JSON.stringify(temporaryProducts));
  //console.log(temporaryProducts[para]);
  redirect("crud", 0);
}

function createNewProd() {
  const newProduct = new Product(document.getElementById('inputProdSKU').value, document.getElementById('inputProdName').value, document.getElementById('inputProdDesc').value, document.getElementById('inputProdPrice').value, document.getElementById('inputProdDiscPrice').value, document.getElementById('inputProdStock').value, document.getElementById('inputProdImg').value);
  temporaryProducts.push(newProduct)
  localStorage.setItem('myProducts', JSON.stringify(temporaryProducts));
  redirect("crud", 0);
};

document.getElementById('logOut').addEventListener('click', logOut);
