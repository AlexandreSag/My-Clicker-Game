var golds = 0;
var gps = 0;
var ownedGps = 0;
var clickValue = 1;

var grafCards = [
    { id: 0, name: "RTX MK1", cost: 10, gps: 0.1, owned: 0, img: "image/rtxMK1.png" },
    { id: 1, name: "RTX MK2", cost: 100, gps: 1, owned: 0, img: "image/rtxMK2.png" },
    { id: 2, name: "RTX MK3", cost: 500, gps: 5, owned: 0, img: "image/rtxMK3.png"  },
    { id: 3, name: "RTX MK4", cost: 5000, gps: 50, owned: 0, img: "image/rtxMK4.png"  },
    { id: 4, name: "RTX MK5", cost: 25000, gps: 250, owned: 0, img: "image/rtxMK5.png"  },
    { id: 5, name: "RTX MK6", cost: 250000, gps: 2500, owned: 0, img: "image/rtxMK6.png"  },
    { id: 6, name: "RTX MK7", cost: 1250000, gps: 12500, owned: 0, img: "image/rtxMK7.png"  },
    { id: 7, name: "RTX MK8", cost: 12500000, gps: 125000, owned: 0, img: "image/rtxMK8.png"  },
    { id: 8, name: "RTX ULTRA", cost: 62500000, gps: 625000, owned: 0, img: "image/rtxMK9.png" }
];

//const audio
const AudioBuy = "audio/BuyItem.mp3"; 
const AudioSave = "audio/save.mp3";
const AudioLoad = "audio/load.mp3";

const GpsInterval = setInterval(function(){getGPS()}, 10);
const SaveInterval = setInterval(function(){storeData()}, 60000*4);

function storeData() {
    localStorage.setItem("clickValue", clickValue);
    localStorage.setItem("golds", golds);
    localStorage.setItem("grafCards", JSON.stringify(grafCards));
    playSound(AudioSave);
    displaySave("save");
}

function loadData() {
    clickValue = localStorage.getItem("clickValue");
    clickValue = parseInt(clickValue);
    golds = localStorage.getItem("golds");
    golds = parseInt(golds);
    grafCards = JSON.parse(localStorage.getItem("grafCards"));
    playSound(AudioLoad);
    displaySave("valided");
    displayShop();
}

function displaySave(name){
    var save = document.getElementById(name);
    save.style.display = "block";
    setTimeout(function(){save.style.display = "none";}, 2000);
}

function PopUp(name){
    var PopUp = document.getElementById(name);
    PopUp.style.display = "block";
    window.onclick = function(event) {
        if (event.target == PopUp) {
            PopUp.style.display = "none";
        }
    }
   
}

function addGold(x) {
    golds = golds+x;
    displayGolds();
}

function displayGolds() {
    document.getElementById("ShowGolds").innerHTML = golds.toFixed(0) + "<img src='image/bitcoincoin.png' alt='bitcoincoin' class='showCoin'>" ;
}

function displayGPS() {
    document.getElementById("ShowGps").innerHTML = gps.toFixed(1) + "&nbsp" + "<i class='fas fa-bolt'></i>" ;
    addGold(gps/50);
}

function getGPS() {
    ownedGps = 0;
    for(var i in grafCards){
        ownedGps = ownedGps+(grafCards[i]['gps'] * grafCards[i]['owned']); 
    }

    gps = ownedGps;
    displayGPS();
}


function displayShop(){
    let elem = document.getElementById("Shop");

    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }

    grafCards.forEach(grafCard => {
        let newP = document.createElement('p');
        let btn = document.createElement("button");
        let img = document.createElement("img");
        let line = document.createElement("div");
        newP.setAttribute('style', 'white-space: pre;');
        newP.textContent = 'name : ' + grafCard.name + "\n cost : " + grafCard.cost + "\n gps : " + grafCard.gps + "\n owned : " + grafCard.owned;
        elem.appendChild(newP);
        img.className = "shopImg";
        img.src = grafCard.img;
        elem.appendChild(img);
        btn.className = "shopButton";
        btn.innerHTML = 'Buy';
        btn.onclick = function(){buyMinion(grafCard.id);};
        elem.appendChild(btn);
        line.className = "line";
        elem.appendChild(line);
    })
}


function buyMinion(id) {
    playSound(AudioBuy);
    if(golds >= grafCards[id]['cost']){
        grafCards[id]['owned'] = grafCards[id]['owned']+1;
        golds = golds-grafCards[id]['cost'];
        grafCards[id]['cost'] = (grafCards[id]['cost'] * 1.15).toFixed(1);
        
        var ownedgrafCards = 0;
        for(var i in grafCards){
            ownedgrafCards = ownedgrafCards + grafCards[i]['owned']; 
        }

        var reste = ownedgrafCards % 50;
        if(reste == 0){
            clickValue = clickValue*2;
        }

        if(grafCards[id]['owned'] == 25 || grafCards[id]['owned'] == 50 || grafCards[id]['owned'] == 100 || grafCards[id]['owned'] == 250 || grafCards[id]['owned'] == 1000){
            grafCards[id]['gps'] = grafCards[id]['gps']*2;
        }

        displayShop();
    }
    else{
        PopUp("PopUp")
    }
}

function playSound(AudioSrc) {
    var snd = new Audio();
    snd.src = AudioSrc;
    snd.play();
}

