
const email = document.getElementById('email');
const password = document.getElementById('password');
const signIn = document.getElementById('signIn');
const logMessage = document.getElementById('message');
const box = document.getElementById('box');
const loader = document.getElementById('loader');


signIn.addEventListener('click', hook);



import {users, adminUser} from './users.js';
import {redirect, deletePaymentInfo} from './utils.js';

deletePaymentInfo();

console.log(users);
console.log(adminUser);

function showUsers() {
    alert(JSON.stringify(users));
};


//document.getElementById('Hala').addEventListener('click', showUsers);


function hook() {
    loginVerification(email.value, password.value);
}



function loginVerification(email, password) {
    let isValid = false;
    let activeUser = null;
    for (const user of users) {
        if (user.email === email && user.password === password) {
            console.log(`Successful login`);
            isValid = true;
            activeUser = user;
            message(true);
            showloader();
            localStorage.setItem('activeUser', JSON.stringify(activeUser));
            redirect("index", 3000);
            break;
        }
    }

    if (adminUser.email === email && adminUser.password === password) {
        console.log(`Successful login`);
        isValid = true;
        activeUser = adminUser;
        message(true);
        showloader();
        localStorage.setItem('activeUser', JSON.stringify(activeUser));
        redirect("crud", 1000);
    }

    if (!isValid) {
        console.log(`invalid email or password`);
        message(false);
    }
    return console.log(isValid, activeUser);
};

function message(boolean) {
    if (boolean) {
        logMessage.innerText = 'Successful Login, redirecting...';
        logMessage.classList.remove('hidden');
        logMessage.classList.add('text-green-600');
    } else {
        logMessage.innerText = 'Invalid email or password, please try again.';
        logMessage.classList.remove('hidden');
        logMessage.classList.add('text-red-600');
    }
}

function showloader() {
    box.classList.add('hidden');
    loader.classList.remove('hidden');

}



/*
if (email.value != '' && password.value != '') {
    alert(`successfully logged in`);
    window.location.href = "../index.html";
} else {
    alert(`please fill out all fields`);
}
    */

/*
address: "sdfsd23fsdf"
birthDate: "2432-02-04"
city: "sdf"
country: "sdf"
email: "lul@lul.com"
lastName: "sdfsd"
name: "sdfsdf"
password: "Hello123."
refCode: "f3sdfsdf333



address
: 
"123 Hllee3"
birthDate
: 
"6666-06-06"
city
: 
"Tojo"
country
: 
"Joto"
email
: 
"John@Salchichon.com"
lastName
: 
"Salchichon"
name
: 
"John"
password
: 
"Hello123."
refCode
: 
""

address: "Netherrealm"
birthDate: "1996-10-30"
city: "Maracaibo"
country: "Venezuela"
email: "luismiguelromero3096@gmail.com"
lastName: "Romero"
name: "Luis"
password: "kekPasswordsecure123."
refCode: "GodCode"
*/
