export{player, pokers, dealer, information};
import * as MyModule from './function.js';

MyModule.closeImgDraggable();

class information{
    constructor(){
        this.money = 1000;
        this.totalBet = 0;
        this.time = 0;
        this.seconds = 0;
        this.minutes = 0;
    }

    reset(){
        this.totalBet = 0;
    }
}

class pokers{
    constructor(){
        this.maxPokers = 208;
        this.pokerRecord = [];
        this.pokerAmount = 208;
        this.pokers = []
    }

    reset(){
        this.pokerRecord = [];
        this.pokerAmount = 208;
    }
}

class dealer{
    constructor(){
        this.card = [];
        this.ace = 0;
        this.points = 0;
    }

    reset(){
        this.card = [];
        this.ace = 0;
        this.points = 0;
    }
}

class player{
    constructor(){
        this.bet = 1;
        this.card = [];
        this.ace = 0;
        this.state = false;
        this.split = false;
        this.surrender = true;
        this.double = true;
        this.points = 0;
        this.burst = false;
    }

    reset(){
        this.card = [];
        this.ace = 0;
        this.state = false;
        this.split = false;
        this.surrender = true;
        this.double = true;
        this.points = 0;
    }

}

window.addEventListener('DOMContentLoaded', () => {
    let Data = localStorage.getItem('PlayerData');

    for(let i = 1; i <= 52; i++){
        let Img = $('<img>');
        Img.attr('src', 'assets/images/pokers/poke_' + i + '.jpg');
        Img.attr('class', 'poker');
        MyModule.PokerStatus.pokers[i] = Img;
    }

    if(Data === null || Data === undefined){
        let PlayerData = {
            'money' : 1000,
        }

        localStorage.setItem('PlayerData', JSON.stringify(PlayerData));
        MyModule.Information.money = 1000;
    }
    else{
        if(JSON.parse(localStorage.getItem('PlayerData') != undefined)){
            Data = JSON.parse(localStorage.getItem('PlayerData'))
            MyModule.Information.money = Data.money;
        }
    }

    window.onbeforeunload = function() {
        sessionStorage.clear();
    }
    
})
