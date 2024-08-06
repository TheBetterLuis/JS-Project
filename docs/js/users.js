const usersJSON = localStorage.getItem('users');
let users;
if (usersJSON) {
    users = JSON.parse(usersJSON);
} else {
    users = [];
}

const adminUser = {
    name: "Luis",
    lastName: "Romero",
    birthDate: "1996-10-30",
    refCode: "GodCode",
    country: "Venezuela",
    city: "Maracaibo",
    address: "Netherrealm",
    email: "luismiguelromero3096@gmail.com",
    password: "kekPasswordsecure123."
};

export { users, adminUser };

