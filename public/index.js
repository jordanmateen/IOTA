const socket = io();
const mainText = document.getElementById('mainText');
const iotaAddress = document.getElementById('address');

socket.on('newAddress', (address) => {
    mainText.innerHTML = "Your New Address is: ";
    iotaAddress.innerHTML = address
})
<<<<<<< HEAD

socket.on('error', (error) => {
    iotaAddress.innerHTML = error.message
})
=======
>>>>>>> 9aa9c769e5d5353df96f4aac55570c4dcff3e6f7
