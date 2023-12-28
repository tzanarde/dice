let dicesContainer, dice, diceValue, dicesRolled, totalValue, dicesRolledCount, dicesQuantity;
let shakingDicesSound = new Audio('/sounds/shaking-dices-sound.m4a');
let throwingDicesSound = new Audio('/sounds/throwing-dices-sound.m4a');

function rollDice(diceType){
    dicesQuantity = parseInt(document.getElementById('dices-quantity').value);
    for (let i = 0; i < dicesQuantity; i++) {
        createDice(diceType);
        throwDice(diceType);
    }
}

function cleanTable(){
    dicesRolled = document.getElementsByClassName('dice-rolled');
    dicesRolledCount = document.getElementById('dices-rolled');
    dicesQuantity = document.getElementById('dices-quantity');
    totalValue = document.getElementById('total-value');
    if (dicesRolled != null) {
        for (let i = dicesRolled.length; i > 0; i--) {
            dicesRolled[i - 1].remove();
        };
    }
    dicesRolledCount.innerText = 0;
    totalValue.innerText = 0;
    dicesQuantity.value = 1;
}

function createDice(diceType){
    dicesContainer = document.getElementById('dices-container');
    dice = document.createElement('div')
    dice.classList.add('dice-rolled')
    dice.classList.add('dice-stopped')
    diceValue = document.createElement('p');
    diceValue.classList.add('dice-rolled')
    dice.append(diceValue);
    dicesContainer.append(dice);
    diceValue.id = 'dice-value';
    dice.id = 'dice-' + diceType;
}

async function throwDice(diceType){
    dicesRolledCount = document.getElementById('dices-rolled');
    totalValue = document.getElementById('total-value');
    minValue = Math.ceil(1)
    maxValue = Math.floor(diceType)
    changes = rollDiceChanges();
    dicesRolledCount.innerText = parseInt(dicesRolledCount.innerText) + 1;
    rollingState();
    playShakingDicesEffect();
    for (let i = 0; i < changes; i++) {
        diceValue.innerText = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        await timer(60);
    }
    totalValue.innerText = parseInt(totalValue.innerText) + parseInt(diceValue.innerText);
    stopShakingDicesEffect();
    playThrowingDicesEffect();
    stoppedState();
}

function playShakingDicesEffect(){
    shakingDicesSound.currentTime = 0
    shakingDicesSound.play();
}

function stopShakingDicesEffect(){
    shakingDicesSound.pause();
    shakingDicesSound.currentTime = 0
}

function playThrowingDicesEffect(){
    throwingDicesSound.currentTime = 0
    throwingDicesSound.play();
}


function rollingState() {
    dice.classList.add('dice-rolling');
    diceValue.classList.add('number-changing');
}

function stoppedState() {
    dice.classList.remove('dice-rolling');
    diceValue.classList.remove('number-changing');
}

function rollDiceChanges(){
    return Math.floor(Math.random() * (Math.floor(25) - Math.ceil(5) + 5) + Math.ceil(1));
}

const timer = ms => new Promise(res => setTimeout(res, ms))
