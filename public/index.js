const socket = io();
const mainText = document.getElementById('mainText');
const iotaAddress = document.getElementById('address');

socket.on('newAddress', (address) => {
    mainText.innerHTML = "Your New Address is: ";
    iotaAddress.innerHTML = address
})
