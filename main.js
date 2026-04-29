// Elementlarni tanlab olish
const btn = document.querySelector(".btn");
const logincontainer = document.querySelector(".login-container");
const messege = document.querySelector(".messege");
const h4 = document.querySelector("h4");
const span = document.querySelector("span");
const tbody = document.querySelector("tbody");
const x = document.querySelector(".x");
const myform = document.querySelector(".myform");


let settimer; 
const users = JSON.parse(localStorage.getItem("users")) || [];

btn.addEventListener('click', () => {
    logincontainer.classList.remove("hide");
});

x.addEventListener('click', () => {
    logincontainer.classList.add("hide");
});

const messegefunc = (msg, type) => {
    clearInterval(settimer);

    h4.textContent = msg;
    messege.classList.remove("hide");


    if (type === "success") {
        messege.style.backgroundColor = "green";
    } else {
        messege.style.backgroundColor = "red";
    }

    let count = 3;
    span.textContent = count;
    

    settimer = setInterval(() => {
        count--;
        span.textContent = count;

        if (count === 0) {
            clearInterval(settimer);
            messege.classList.add("hide");
        }
    }, 1000);
};


const render = () => {
    tbody.innerHTML = ""; 
    const htmlRows = users.map((item, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${item.user}</td>
                <td>${item.email}</td>
                <td>${item.password}</td>
                <td><button class="delete-btn" onclick="deletef(${index})">Delete</button></td>
            </tr>
        `;
    }).join("");

    tbody.innerHTML = htmlRows;
};


myform.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = myform.user.value;
    const email = myform.email.value;``
    const password = myform.password.value;
    const password2 = myform.password2.value;

    if (password === password2) {
        const newUser = {
            user: user,
            email: email,
            password: password
        };


        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        myform.reset();
        logincontainer.classList.add("hide");


        messegefunc("Muvaffaqiyatli ro'yxatdan o'tildi", "success");


        render();
    } else {

        messegefunc("Parollar mos emas", "error");
    }
});

render();

function deletef(index) {
    users.splice(index, 1)
    localStorage.setItem("users", JSON.stringify(users))
    render()
}
