const AudioCoin = "audio/coin.mp3"; 

function Falling(event){
    playSound(AudioCoin);
    const coinDrop = document.createElement('img');

    coinDrop.classList.add('coins');
    coinDrop.src = 'image/bitcoincoin.png';
    coinDrop.style.animationDuration = Math.random() * 10 + 's';
    var x = event.clientX;
    var y = event.clientY;
    coinDrop.style.left = x + 'px';
    coinDrop.style.top = y + 'px';
    
    document.body.appendChild(coinDrop);

    setTimeout(() => {
        coinDrop.remove();
    }, 3000)

}


