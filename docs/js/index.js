import {redirect, storeProducts, isSomeoneLogged, isAdminLogged, parseActiveUser, storeCart, logOut, deletePaymentInfo} from './utils.js';

deletePaymentInfo();

const activeUser = parseActiveUser();
const logOutBtn = document.getElementById('logOut');
logOutBtn.addEventListener('click', logOut);
const loginBtn = document.getElementById('logIn');
const options = document.getElementById('options');
const welcome = document.getElementById('welcome');
const message = document.getElementById('message');
const eraseCartBtn = document.getElementById('eraseCart');

function nameChanging() {
    if (isSomeoneLogged()) {
        welcome.innerText = `Welcome, ${activeUser.name}`;
        message.innerText = 'Get ready for your next adventure :D';
    } else {
        welcome.innerText = 'Welcome, visitor';
        message.innerText = 'Consider signing in to purchase products:)';
    }
};

nameChanging();

if (isSomeoneLogged()) {
    logOutBtn.classList.remove('hidden');
    options.classList.remove('hidden');
    loginBtn.classList.add('hidden');
}

let cart = storeCart();

const purchaseBtn = document.getElementById('purchaseBtn');
function paymentBtn() {
    if (cart.length === 0) {
        purchaseBtn.classList.add('hidden');
        eraseCartBtn.classList.add('hidden');
    } else {
        purchaseBtn.classList.remove('hidden');
        eraseCartBtn.classList.remove('hidden');
    }
}
paymentBtn();
console.table(cart);
class CartItem {
    constructor(name, desc, sku, imgUrl, price, discountedPrice, stock, quantity = 1) {
        this.name = name;
        this.desc = desc;
        this.sku = sku;
        this.imgUrl = imgUrl;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.stock = stock;
        this.quantity = quantity;
    }
}

const temporaryProducts = storeProducts();

console.log(temporaryProducts);

showProducts();


function showProducts() {
    if (temporaryProducts) {

        const cuadricula = document.getElementById("productsBox");
        temporaryProducts.forEach(product => {
            if (product.stock > 0) {
                let productCard = document.createElement('div');
                productCard.classList.add('pb-6', 'mb-8', 'overflow-hidden', 'bg-white', 'rounded-lg', 'shadow-md', 'product-card');
                productCard.id = `product-${product.id}`;
                let img = document.createElement('img');
                img.classList.add('object-cover', 'w-full', 'h-auto', 'p-4');
                img.src = product.imgUrl;
                productCard.appendChild(img);

                let div1 = document.createElement('div');
                div1.classList.add('flex', 'flex-col', 'justify-between', 'p-4');

                let div11 = document.createElement('div');
                let h3 = document.createElement('h3');
                h3.classList.add('text-lg', 'font-medium', 'text-gray-900');
                h3.innerText = product.name;
                div11.appendChild(h3);

                let p = document.createElement('p');
                p.classList.add('mt-2', 'text-gray-700');
                p.innerText = product.desc;
                div11.appendChild(p);

                let div111 = document.createElement('div');
                div111.classList.add('flex', 'items-center', 'mt-4');

                if (product.discountedPrice != null && product.discountedPrice != "null" && product.discountedPrice != 0 && product.discountedPrice != "") {
                    let span1 = document.createElement('span');
                    span1.classList.add('mr-2', 'text-gray-800', 'line-through');
                    span1.innerText = `${product.price}$`;
                    div111.appendChild(span1);

                    let span2 = document.createElement('span');
                    span2.classList.add('font-bold', 'text-red-500');
                    span2.innerText = `${product.discountedPrice}$`;
                    div111.appendChild(span2);
                } else {
                    let span1 = document.createElement('span');
                    span1.classList.add('mr-2', 'text-gray-800');
                    span1.innerText = `${product.price}$`;
                    div111.appendChild(span1);

                }

                div11.appendChild(div111);
                div1.appendChild(div11);

                let div12 = document.createElement('div');
                div12.classList.add('flex', 'items-center', 'justify-between', 'mt-4');

                let div121 = document.createElement('div');
                div121.classList.add('flex', 'items-center', 'text-gray-700');

                let svg = document.createElement('svg');
                svg.classList.add('w-4', 'h-4', 'mr-2');
                svg.setAttribute("fill", "none");
                svg.setAttribute("stroke-linecap", "round");
                svg.setAttribute("stroke-linejoin", "round");
                svg.setAttribute("stroke-width", "2");
                svg.setAttribute("stroke", "currentColor");
                svg.setAttribute("viewBox", "0 0 24 24");

                let path1 = document.createElement('path');
                path1.setAttribute("d", "M5 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2z");

                svg.appendChild(path1);

                let path2 = document.createElement('path');
                path2.setAttribute("d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z");

                svg.appendChild(path2);

                div121.appendChild(svg);

                let span3 = document.createElement('span');
                span3.innerText = `In Stock (${product.stock})`;

                div121.appendChild(span3);

                div12.appendChild(div121);

                let button = document.createElement('button');
                button.classList.add('px-4', 'py-2', 'text-white', 'bg-blue-500', 'rounded-md', 'hover:bg-blue-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-blue-500', 'cartClass');
                button.innerText = "Add to Cart";

                if (isSomeoneLogged()) {div12.appendChild(button);}
                div1.appendChild(div12);

                productCard.appendChild(div1);
                cuadricula.appendChild(productCard);
            }
        });
    } else {
        console.log('error fetching data');
    }
    addCartButtons()
}

function addCartButtons() {
    const buttons = document.querySelectorAll('.cartClass');

    buttons.forEach((butto, index) => {
        butto.addEventListener('click', () => {
            const clickedButtonIndex = index;
            addCartItem(clickedButtonIndex);
        });
    });
}

function addADDButtons() {
    const buttons = document.querySelectorAll('.add-product');

    buttons.forEach((butto, index) => {
        butto.addEventListener('click', () => {
            const clickedButtonIndex = index;
            increaseCartItem(cart[clickedButtonIndex].sku);
        });
    });
}

function addREMOVEButtons() {
    const buttons = document.querySelectorAll('.remove-product');

    buttons.forEach((butto, index) => {
        butto.addEventListener('click', () => {
            const clickedButtonIndex = index;
            decreaseCartItem(cart[clickedButtonIndex].sku);
        });
    });
}

function decreaseCartItem(sku) {
    const existingItem = cart.find(item => item.sku === sku);

    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity--;
        } else {
            cart = cart.filter(item => item.sku !== sku);
        }

        localStorage.setItem('myCart', JSON.stringify(cart));
        renderCart();
        updateCartTotal();
    }
    paymentBtn();

}

function increaseCartItem(sku) {
    const existingItem = cart.find(item => item.sku === sku);
    if (existingItem.quantity == existingItem.stock) {
        alert(`Can't add any more of this item, our stock is only (${existingItem.stock}) , we're sorry`);
        return;
    } if (existingItem) {
        existingItem.quantity++;
    }
    localStorage.setItem('myCart', JSON.stringify(cart));
    renderCart();
    updateCartTotal();
    paymentBtn();
}


function addCartItem(a) {
    const existingItem = cart.find(item => item.sku === temporaryProducts[a].sku)
    if (existingItem) {
        if (existingItem.quantity === temporaryProducts[a].stock) {
            alert(`Can't add any more of this item, our stock is only (${temporaryProducts[a].stock}), we're sorry`);
            return;
        }
        existingItem.quantity++;
        localStorage.setItem('myCart', JSON.stringify(cart));
        console.clear()
        console.table(cart);
        // redirect("index", 0);
    } else {
        cart.push(new CartItem(temporaryProducts[a].name, temporaryProducts[a].desc, temporaryProducts[a].sku, temporaryProducts[a].imgUrl, temporaryProducts[a].price, temporaryProducts[a].discountedPrice, temporaryProducts[a].stock, 1));
        localStorage.setItem('myCart', JSON.stringify(cart));
        console.clear()
        console.table(cart);
        // redirect("index", 0);
    }
    console.log(calculateTotal());
    paymentBtn();
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

function logCart() {
    console.log(calculateTotal())
}
function eraseCart() {
    if (confirm("Are you sure you want to empty the cart?")) {
        cart = [];
        localStorage.removeItem('myCart');
    }
    paymentBtn();
}

const tableProducts = document.getElementById("table-products");

function openModal() {
    modal.style.display = "block";
}
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
            const detailsBtn = document.createElement("button");
            detailsBtn.classList.add('edit-btn', 'add-product', 'text-white');

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add('delete-btn', 'remove-product', 'text-white');
            nameTd.innerText = cartItem.name;
            imageTd.src = cartItem.imgUrl;
            quantityTd.innerText = cartItem.quantity;
            if (cartItem.discountedPrice != null && cartItem.discountedPrice != "null" && cartItem.discountedPrice != 0 && cartItem.discountedPrice != "") {
                priceTd.innerText = `${(cartItem.discountedPrice * cartItem.quantity).toFixed(2)}$`;
            } else {
                priceTd.innerText = `${(cartItem.price * cartItem.quantity).toFixed(2)}$`;
            }
            detailsBtn.innerText = "Add";
            deleteBtn.innerText = "Remove";

            actionsTd.appendChild(detailsBtn);
            actionsTd.appendChild(deleteBtn);
            tr.appendChild(imageTd);
            tr.appendChild(nameTd);
            tr.appendChild(quantityTd);
            tr.appendChild(actionsTd);
            tr.appendChild(priceTd);
            tableProducts.appendChild(tr);


        })
        updateCartTotal();
        addADDButtons();
        addREMOVEButtons();
    }
}

function viewCart() {
    openModal();
    renderCart();
};

function updateCartTotal() {
    const totalElement = document.getElementById('total');
    totalElement.innerText = `Total: ${calculateTotal()}$`;
}

function closeModal() {
    modal.style.display = "none";
}

const modal = document.getElementById("cartModal");

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);
document.getElementById('logCart').addEventListener('click', viewCart);
eraseCartBtn.addEventListener('click', eraseCart);
document.getElementById('viewCartBtn').addEventListener('click', viewCart)

function redirectPayment() {
    if (cart.length === 0) {
        alert(`try adding something to your cart :)`);
    } else {
        const paymentInfo = JSON.stringify(cart);
        localStorage.setItem('paymentInfo', paymentInfo);
        redirect("payment", 0);
    }
}

purchaseBtn.addEventListener('click', redirectPayment);
