const nameId = document.getElementById('name');
const lastNameId = document.getElementById('lastName');
const birthDateId = document.getElementById('birthDate');
const refCodeId = document.getElementById('refCode');
const countryId = document.getElementById('country');
const cityId = document.getElementById('city');
const addressId = document.getElementById('address');
const emailId = document.getElementById('email');
const emailConfirmId = document.getElementById('confirmEmail');
const passwordId = document.getElementById('password');
const passwordConfirm = document.getElementById('confirmPassword');
const registerId = document.getElementById('register');
const termsOfServiceId = document.getElementById('termsOfService');

const tester = document.getElementById('tester');

//let users = [];

import {users, adminUser} from './users.js';
import {redirect, deletePaymentInfo} from './utils.js';

deletePaymentInfo();

console.log(users);


class User {
    constructor(name, lastName, birthDate, refCode, country, city, address, email, password) {
        this.name = name;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.refCode = refCode;
        this.country = country;
        this.city = city;
        this.address = address;
        this.email = email;
        this.password = password;
    }
}


//Regex
function emailVal() {
    let expEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (expEmail.test(emailId.value)) {
        emailId.classList.remove('ring-red-600');
        emailId.classList.add('ring-green-600', 'ring-2');

    } else {
        emailId.classList.remove('ring-green-600');
        emailId.classList.add('ring-red-600', 'ring-2');
    }
}

function emailConfirm() {
    if (emailConfirmId.value === emailId.value) {
        emailConfirmId.classList.remove('ring-red-600');
        emailConfirmId.classList.add('ring-green-600', 'ring-2');
    } else {
        emailConfirmId.classList.remove('ring-green-600');
        emailConfirmId.classList.add('ring-red-600', 'ring-2');
    }
};


emailId.addEventListener('input', emailVal);
emailId.addEventListener('input', emailConfirm);
emailConfirmId.addEventListener('input', emailConfirm);



function nameVal() {
    let expName = /^[a-zA-Z\s]{2,}$/;

    if (expName.test(nameId.value)) {
        nameId.classList.remove('ring-red-600');
        nameId.classList.add('ring-green-600', 'ring-2');
    } else {
        nameId.classList.remove('ring-green-600');
        nameId.classList.add('ring-red-600', 'ring-2');
    }
}

function lastNameVal() {
    let explastName = /^[a-zA-Z\s]{2,}$/;

    if (explastName.test(lastNameId.value)) {
        lastNameId.classList.remove('ring-red-600');
        lastNameId.classList.add('ring-green-600', 'ring-2');
    } else {
        lastNameId.classList.remove('ring-green-600');
        lastNameId.classList.add('ring-red-600', 'ring-2');
    }
}

function countryVal() {
    let expCountry = /^[a-zA-Z\s]{2,}$/;

    if (expCountry.test(countryId.value)) {
        countryId.classList.remove('ring-red-600');
        countryId.classList.add('ring-green-600', 'ring-2');
    } else {
        countryId.classList.remove('ring-green-600');
        countryId.classList.add('ring-red-600', 'ring-2');
    }
}
function cityVal() {
    let expCity = /^[a-zA-Z\s]{2,}$/;

    if (expCity.test(cityId.value)) {
        cityId.classList.remove('ring-red-600');
        cityId.classList.add('ring-green-600', 'ring-2');
    } else {
        cityId.classList.remove('ring-green-600');
        cityId.classList.add('ring-red-600', 'ring-2');
    }
}
function referralVal() {
    let expReferralCode = /^[a-z0-9]{10,}$/;
    if (expReferralCode.test(refCodeId.value)) {
        refCodeId.classList.remove('ring-red-600');
        refCodeId.classList.add('ring-green-600', 'ring-2');
    } else {
        refCodeId.classList.remove('ring-green-600');
        refCodeId.classList.add('ring-red-600', 'ring-2');
    }
}


function passwordVal() {
    let expPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*\W)(.{8,})$/;
    if (expPassword.test(passwordId.value)) {
        passwordId.classList.remove('ring-red-600');
        passwordId.classList.add('ring-green-600', 'ring-2');
    } else {
        passwordId.classList.remove('ring-green-600');
        passwordId.classList.add('ring-red-600', 'ring-2');
    }
}

function passwordMatch() {

    if (passwordId.value === passwordConfirm.value) {
        passwordConfirm.classList.remove('ring-red-600');
        passwordConfirm.classList.add('ring-green-600', 'ring-2');
    } else {
        passwordConfirm.classList.remove('ring-green-600');
        passwordConfirm.classList.add('ring-red-600', 'ring-2');
    }

}

function addressVal() {
    let expAddress = /^\s*[a-zA-ZÁÉÍÓÚñ0-9\-_.# ]{10,}\s*$/;
    if (expAddress.test(addressId.value)) {
        addressId.classList.remove('ring-red-600');
        addressId.classList.add('ring-green-600', 'ring-2');
    } else {
        addressId.classList.remove('ring-green-600');
        addressId.classList.add('ring-red-600', 'ring-2');
    }

}

function birthdateVal() {
    let expDate = /^\d{4}-\d{2}-\d{2}$/;
    if (expDate.test(birthDateId.value)) {
        birthDateId.classList.remove('ring-red-600');
        birthDateId.classList.add('ring-green-600', 'ring-2');
    } else {
        birthDateId.classList.remove('ring-green-600');
        birthDateId.classList.add('ring-red-600', 'ring-2');
    }
}

tester.addEventListener('click', registerUser);

nameId.addEventListener('input', nameVal);
lastNameId.addEventListener('input', lastNameVal);
countryId.addEventListener('input', countryVal);
cityId.addEventListener('input', cityVal);
refCodeId.addEventListener('input', referralVal);
passwordId.addEventListener('input', passwordVal);
passwordId.addEventListener('input', passwordMatch);
passwordConfirm.addEventListener('input', passwordMatch);
addressId.addEventListener('input', addressVal);
birthDateId.addEventListener('input', birthdateVal);



function registerUser(name, lastName, birthDate, refCode, country, city, address, email, password) {

    const newUser = new User(name, lastName, birthDate, refCode, country, city, address, email, password);


    users.push(newUser);

    const usersJSON = JSON.stringify(users);

    localStorage.setItem('users', usersJSON);

};

register.addEventListener('click', function (event) {
    event.preventDefault();

    let isValid = true;

    let expName = /^[a-zA-Z\s]{2,}$/;
    let explastName = /^[a-zA-Z\s]{2,}$/;
    let expDate = /^\d{4}-\d{2}-\d{2}$/;
    let expCountry = /^[a-zA-Z\s]{2,}$/;
    let expCity = /^[a-zA-Z\s]{2,}$/;
    let expAddress = /^\s*[a-zA-ZÁÉÍÓÚñ0-9\-_.# ]{10,}\s*$/;
    let expEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //let expPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,})$/;
    let expPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(.{8,})$/;


    if (!expName.test(nameId.value)) {
        isValid = false;
        console.error("Name error: Please enter a valid name (minimum 2 characters).");
    }

    if (!explastName.test(lastNameId.value)) {
        isValid = false;
        console.error("Last Name error: Please enter a valid last name (minimum 2 characters).");
    }

    if (!expDate.test(birthDateId.value)) {
        isValid = false;
        console.error("Date of Birth error: Please enter a valid date.");
    }

    if (!expCountry.test(countryId.value)) {
        isValid = false;
        console.error("Country error: Please enter a valid country name (minimum 2 characters).");
    }

    if (!expCity.test(cityId.value)) {
        isValid = false;
        console.error("City error: Please enter a valid city name (minimum 2 characters).");
    }

    if (!expAddress.test(addressId.value)) {
        isValid = false;
        console.error("Address error: Please enter a valid address (minimum 10 characters, including letters, numbers, spaces, and some special characters).");
    }

    if (!expEmail.test(emailId.value)) {
        isValid = false;
        console.error("Email error: Please enter a valid email address (e.g., username@domain.com).");
    } else if (emailId.value !== emailConfirmId.value) {
        isValid = false;
        console.error("Email confirmation error: Email addresses do not match.");
    } else {
        const email = emailId.value;
        let emailExists = false;

        if (email === adminUser.email) {
            emailExists = true;
        }

        for (const user of users) {
            if (user.email === email) {
                emailExists = true;
                break;
            }
        }

        if (emailExists) {
            isValid = false;
            console.error("Registration failed! Email already exists.");
            emailId.classList.remove('ring-green-600');
            emailId.classList.add('ring-red-600', 'ring-2');
            emailConfirmId.classList.remove('ring-green-600');
            emailConfirmId.classList.add('ring-red-600', 'ring-2');
        }
    }

    if (!expPassword.test(passwordId.value)) {
        isValid = false;
        console.error("Password error: Password must be at least 8 characters and include a lowercase letter, an uppercase letter, a number, and a special character.");
    } else if (passwordId.value !== passwordConfirm.value) {
        isValid = false;
        console.error("Password confirmation error: Passwords do not match.");
    }

    if (!termsOfServiceId.checked) {
        isValid = false;
        alert("Please agree to the terms of service before registering.");
        console.error("Terms of service error: Please agree to the terms of service before registering.");
    }
    if (isValid) {
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const birthDate = document.getElementById('birthDate').value;
        const refCode = document.getElementById('refCode').value;
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        registerUser(name, lastName, birthDate, refCode, country, city, address, email, password);
        alert("Registration successful! (data saved in localStorage)");
        redirect("login", 3000);
    } else {
        alert("Please fix the errors in the form before submitting. (check console for more info)");
    }
});


const termsLink = document.getElementById('termsLink');
const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");

termsLink.addEventListener('click', termsModal);
closeBtn.addEventListener("click", closeModal);


termsLink.addEventListener("click", function (event) {
    event.preventDefault();
    termsModal();
});

function termsModal() {
    modal.style.display = "block";

}


function closeModal() {
    modal.style.display = "none";
}


