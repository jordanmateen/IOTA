const socket = io();
const mainText = document.getElementById('mainText');
const iotaAddress = document.getElementById('address');

// addressNode.innerHTML = 

socket.on('newAddress', (address) => {
    mainText.innerHTML = "Your New Address is: ";
    iotaAddress.innerHTML = address
})

socket.on('error', (error) => {
    iotaAddress.innerHTML = error.message
})