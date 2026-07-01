let cart = [];
let total = 0;

function addToCart(name, price){

    cart.push({
        name:name,
        price:price
    });

    total += price;

    document.getElementById("cart-count").innerText =
    cart.length;

    displayCart();

    alert(name + " Added To Cart");
}

function displayCart(){

    let list =
    document.getElementById("cart-items");

    list.innerHTML = "";

    cart.forEach(item => {

        let li =
        document.createElement("li");

        li.innerHTML =
        `${item.name} - ₹${item.price}`;

        list.appendChild(li);
    });

    document.getElementById("total").innerText =
    total;
}
// Razorpay Payment
function payNow(){
    if(total === 0){

        alert("Cart is Empty");
        return;
    }
    
    let options = {

        key: "rzp_test_T7NrUieYU8QIDe",
        amount: total * 100,
        currency: "INR",
        name: "V Food Hub",
        description: "Food Order Payment",

        handler: function(response){

            alert(
                "🎉 Payment Successful\n\n" +
                "Payment ID : " +
                response.razorpay_payment_id
            );

            cart = [];
            total = 0;

            document.getElementById("cart-count").innerText = 0;

            displayCart();
        },

        theme:{
            color:"#ff5722"
        }

    };

    let rzp = new Razorpay(options);

    rzp.open();
}
