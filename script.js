document.addEventListener("DOMContentLoaded", function () {
    // NEWSLETTER FORM
    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");
    const newsletterMessage = document.getElementById("newsletterMessage");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = newsletterEmail.value.trim();

            if (email === "") {
                newsletterMessage.textContent = "Please enter your email.";
                return;
            }
            fetch("subscribe.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "email=" + encodeURIComponent(email)
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                newsletterMessage.textContent = data;
                if (data === "Subscribed successfully!") {
                    newsletterEmail.value = "";
                }
            })
            .catch(error => {
                console.log(error);
                newsletterMessage.textContent = "Something went wrong!";
            });
        });
    }

    // ADD TO CART
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelectorAll(".product-card").forEach(function (card) {
        let addButton = card.querySelector(".add-cart-btn");
        if (addButton) {
            addButton.addEventListener("click", function () {
                let productName = card.querySelector("h3").innerText;
                let productPrice = card.querySelector("span").innerText;
                let productImage = card.querySelector("img").src;
                let product = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
                // show professional popup
                showCartPopup(product);
            });
        }
    });

    // FAVORITE BUTTON
    document.querySelectorAll(".favorite-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            if (button.innerText === "♡") {
                button.innerText = "♥";
                button.style.color = "#b8860b";
            } 
            else {
                button.innerText = "♡";
                button.style.color = "";
            }
        });
    });

    // POPUP ELEMENTS
    const cartPopup = document.getElementById("cartPopup");
    const popupClose = document.getElementById("popupClose");
    const continueShopping = document.getElementById("continueShopping");
    const viewCart = document.getElementById("viewCart");

    // CLOSE POPUP
    if (popupClose) {
        popupClose.addEventListener("click", function () {
            cartPopup.style.display = "none";
        });
    }

    // CONTINUE SHOPPING
    if (continueShopping) {
        continueShopping.addEventListener("click", function () {
            cartPopup.style.display = "none";
        });
    }

    // VIEW CART
    if (viewCart) {
        viewCart.addEventListener("click", function () {
            window.location.href = "cart.html";
        });
    }

    // SHOW CART POPUP FUNCTION
    function showCartPopup(product) {
        if (!cartPopup) {
            return;
        }
        const popupImage = document.getElementById("popupProductImage");
        const popupName = document.getElementById("popupProductName");
        const popupPrice = document.getElementById("popupProductPrice");

        popupImage.src = product.image;
        popupName.textContent = product.name;
        popupPrice.textContent = product.price;

        cartPopup.style.display = "flex";
    }

    // CART ITEMS AND TOTAL
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
// SHOW CART ITEMS
if (cartItems) {
    // CLEAR OLD ITEMS
    cartItems.innerHTML = "";

    // CHECK IF CART IS EMPTY
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <p>You have not added any products yet.</p>
                <a href="shop.html">Continue Shopping</a>
            </div>
        `;
    } 
    // SHOW PRODUCTS IF CART IS NOT EMPTY
    else {
        cart.forEach(function (product, index) {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="cart-item-info">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                    <div class="quantity">
                        <button class="minus-btn" data-index="${index}">-</button>
                        <span>${product.quantity || 1}</span>                        
                        <button class="plus-btn" data-index="${index}">+</button>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
        });
    }
}
// UPDATE CART TOTAL
function updateCartTotal() {
    let total = 0;
    document.querySelectorAll(".cart-item").forEach(function (item) {
        let priceText = item.querySelector(".cart-item-info p").innerText;
        let price = parseInt(priceText.replace(/[^0-9]/g, ""));
        let quantity = parseInt(item.querySelector(".quantity span").innerText);

        total += price * quantity;
    });
    if (cartTotal) {
        cartTotal.textContent = "Rs. " + total.toLocaleString();
    }
}
// SHOW INITIAL CART TOTAL
updateCartTotal();
// REMOVE BTN
document.querySelectorAll(".remove-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        let index = button.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    });
});
// PLUS MINUS BUTTONS
document.querySelectorAll(".cart-item").forEach(function (item) {
    const minusBtn = item.querySelector(".minus-btn");
    const plusBtn = item.querySelector(".plus-btn");
    const quantityNumber = item.querySelector(".quantity span");

    // PLUS BUTTON
    plusBtn.addEventListener("click", function () {
        let index = plusBtn.getAttribute("data-index");
        let quantity = parseInt(quantityNumber.innerText);
        quantity++;
        quantityNumber.textContent = quantity;
        cart[index].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartTotal();
    });
    // MINUS BUTTON
    minusBtn.addEventListener("click", function () {
        let index = minusBtn.getAttribute("data-index");
        let quantity = parseInt(quantityNumber.innerText);
        if (quantity > 1) {
            quantity--;
            quantityNumber.textContent = quantity;
            cart[index].quantity = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartTotal();
        }
    });
});

// CHECKOUT BUTTON
const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            // CHECK IF CART IS EMPTY
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            // OPEN CHECKOUT PAGE
            window.location.href = "checkout.html";
        });
    }
});
// CHECKOUT PAGE
document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const checkoutItems = document.getElementById("checkoutItems");
    const checkoutSubtotal = document.getElementById("checkoutSubtotal");
    const deliveryCharges = document.getElementById("deliveryCharges");
    const finalTotal = document.getElementById("finalTotal");
    const placeOrderBtn = document.getElementById("placeOrderBtn");
    // SHOW CART ITEMS
    if (checkoutItems) {
        checkoutItems.innerHTML = "";
        let subtotal = 0;
        let delivery = 250;
        if (cart.length === 0) {
            checkoutItems.innerHTML = `
                <p>Your cart is empty.</p>
            `;
        } else {
            cart.forEach(function (product) {
                let price = parseInt(product.price.replace(/[^0-9]/g, ""));
                let quantity = product.quantity || 1;
                subtotal += price * quantity;
                checkoutItems.innerHTML += `
                    <div class="checkout-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                            <h3>${product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: ${quantity}</p>
                        </div>

                    </div>
                `;
            });
        }
        // SHOW BILL
        if (checkoutSubtotal) {
            checkoutSubtotal.textContent =
                "Rs. " + subtotal.toLocaleString();
        }
        if (deliveryCharges) {
            deliveryCharges.textContent =
                "Rs. " + delivery.toLocaleString();
        }
        let total = subtotal + delivery;
        if (finalTotal) {
            finalTotal.textContent =
                "Rs. " + total.toLocaleString();
        }
    }
   // PLACE ORDER BUTTON
if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", function () {

        let name = document.getElementById("customerName").value;
        let phone = document.getElementById("customerPhone").value;
        let email = document.getElementById("customerEmail").value;
        let address = document.getElementById("customerAddress").value;
        let city = document.getElementById("customerCity").value;

        let payment = document.querySelector('input[name="payment"]:checked').value;

        if (
            name === "" ||
            phone === "" ||
            email === "" ||
            address === "" ||
            city === ""
        ) {
            alert("Please fill all the required information.");
            return;
        }

        let subtotal = 0;

        cart.forEach(function (product) {

            let price = parseInt(product.price.replace(/[^0-9]/g, ""));
            let quantity = product.quantity || 1;

            subtotal += price * quantity;

        });

        let delivery = 250;
        let total = subtotal + delivery;


        // SEND ORDER TO PHP

        let formData = new FormData();

        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("payment", payment);
        formData.append("subtotal", subtotal);
        formData.append("delivery", delivery);
        formData.append("total", total);
        formData.append("cart", JSON.stringify(cart));


        fetch("placeorder.php", {

            method: "POST",
            body: formData

        })

        .then(response => response.text())

        .then(data => {

            if (data === "success") {

                showOrderPopup();

            } else {

                alert("Order could not be placed.");

            }

        });

    });
}
});
// ORDER SUCCESS POPUP
function showOrderPopup() {
    let popup = document.createElement("div");
    popup.className = "order-popup";
    popup.innerHTML = `
        <div class="order-popup-box">
        <div class="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for shopping with Aura & Co.</p>
            <button id="orderPopupBtn" type="button">
                Continue Shopping
            </button>
            </div>
    `;
    document.body.appendChild(popup);
    // CONTINUE SHOPPING BUTTON
    const orderPopupBtn = popup.querySelector("#orderPopupBtn");
    orderPopupBtn.addEventListener("click", function () {
        localStorage.removeItem("cart");
        window.location.href = "shop.html";
    });
}
// SIGNUP FORM
const signupForm = document.getElementById("signupForm");
if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let name = document.getElementById("signupName").value;
        let email = document.getElementById("signupEmail").value;
        let password = document.getElementById("signupPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Please fill all the fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        fetch("signup.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data === "success") {
                alert("Account created successfully!");
                window.location.href = "login.html";

            } 
            else if (data === "email_exists") {
                alert("This email is already registered.");

            } 
            else {
                alert("Signup failed.");
            }
        });
    });
}
// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value.trim();
        if (email === "" || password === "") {
            alert("Please enter email and password.");
            return;
        }
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        fetch("login.php", {
            method: "POST",
            body: formData
        })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = data.trim();
            if (data === "success") {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "index.html";
            }
            else if (data === "invalid") {
                alert("Invalid email or password.");
            }
            else {
                alert("Login failed. Please try again.");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Something went wrong. Please try again.");
        });
    });
}
// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        window.location.href = "login.html";
    });
}
// CONTACT FORM
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.getElementById("contactName").value.trim();
        let email = document.getElementById("contactEmail").value.trim();
        let subject = document.getElementById("contactSubject").value.trim();
        let message = document.getElementById("contactMessage").value.trim();
        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {

            alert("Please fill all the fields.");
            return;

        }
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);
        fetch("contact.php", {
            method: "POST",
            body: formData
        })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = data.trim();
            if (data === "success") {
                document.getElementById("contactPopup").style.display = "flex";
                contactForm.reset();
            }
             else {
                alert("Message could not be sent. Please try again.");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Something went wrong. Please try again.");
        });
    });
}
// CLOSE CONTACT POPUP
const closeContactPopup = document.getElementById("closeContactPopup");
if (closeContactPopup) {
    closeContactPopup.addEventListener("click", function () {
        document.getElementById("contactPopup").style.display = "none";

    });
}