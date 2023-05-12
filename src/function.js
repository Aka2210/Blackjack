import { player, pokers, dealer, information} from "./player.js";
export {Player, Players, Dealer, PokerStatus, Information, NowScreenDisplay, musicPlay, closeImgDraggable
    , random, randomAdjustment, addCard, calculatePoints, displayCard, resetGame, initCardDisplay
    , winOrLoseJudge, dealWithAce, dealWithDealerCard, splitCardChange, nextHands, splitDetect
    , updateMoney, calculateTotalChips, timeDisplay, displayTable, sortTable};

function musicPlay(){
    let backGroundMusic = $('#backGroundMusic')[0];
    backGroundMusic.play();//背景音樂是朋友寫的歌，spotify搜尋:"村莊"
    backGroundMusic.volume = 0.002; //調整音效聲音避免助教耳朵炸裂
}

function NowScreenDisplay(who){
    $('.Screen').each((index, element) => {
        $(element).css('display', 'none')
    })

    who.css('display', 'flex');
}

function closeImgDraggable(){
    $('img').each((index, element) => {
        $(element).attr('draggable', 'false')
    })
}

function random(amount){
    let value = Math.floor(Math.random() * amount + 1);
    PokerStatus.pokerRecord.push(value);
    PokerStatus.pokerAmount--;      
    return value;
}

function randomAdjustment(value){
    for(let i = 0; i < PokerStatus.pokerRecord.length; i++){
        if(value >= PokerStatus.pokerRecord[i])
            value++;
    }

    while(value > 52)
        value -= 52;
    return value;
}

function addCard(who){
    who.card.push(randomAdjustment(random(PokerStatus.maxPokers)));
}

function displayCard(who){
    let Img = PokerStatus.pokers[who.card[who.card.length - 1]];

    if(who === Dealer){
        $('.dealer').append(Img);
    }
    else{
        $('.active').append(Img);
    }
}

function calculatePoints(who){
    who.points = 0;
    who.ace = 0;
    for(let i =0; i < who.card.length; i++){
        let value = 0;
        let temp = who.card[i];
        while(who.card[i] > 0){
            who.card[i] -= 4;
            value++;
        }
        if(value === 1){
            who.points += 11;
            who.ace += 1;
        }
        else if(value >= 10)
            who.points += 10
        else
            who.points += value;

        who.card[i] = temp;
    }
    dealWithAce(who)
}

function resetGame(reloadGameScreen){
    $('.gameScreen').html(reloadGameScreen);
    Dealer.reset();
    Player.reset();
    while(Players.length)
        Players.pop();
    Players.push(Player);
    PokerStatus.reset();
    Information.reset();
    NowScreenDisplay($('.chooseGameScreen'));
}

function initCardDisplay(who){
    addCard(who);
    addCard(who);

    if(who === Dealer){
        $('.dealer .poker').eq(1).attr('src', 'assets/images/pokers/poke_' + who.card[1] + '.jpg');
    }
    else{
        $('.active .poker').each((index, element) => {
            $(element).attr('src', 'assets/images/pokers/poke_' + who.card[index] + '.jpg');
        })
    }
}

function winOrLoseJudge(reloadGameScreen){
    $('.dealer .poker').eq(0).attr('src', 'assets/images/pokers/poke_' + Dealer.card[0] + '.jpg');
    
    $('.tableBTN').off();

    calculatePoints(Dealer);
    let initMoney = Information.money;

    for(let i = 0; i < Players.length; i++){
        calculatePoints(Players[i]);
        initMoney += Players[i].bet;
        Information.totalBet += Players[i].bet;

        console.log('player:', Players[i].points, 'dealer:', Dealer.points);
        Players[i].state = false;

        if(Players[i].points === 0){
            console.log('Dealer Win', i + 1);
            Information.money += (Players[i].bet / 2);
        }
        else if((Dealer.points <= 21 && Dealer.points > Players[i].points) || (Players[i].points > 21) || (Dealer.points === Players[i].points && Dealer.points === 21)){
            console.log('Dealer Win', i + 1);
            
        }
        else if(Dealer.points < 21 && Dealer.points === Players[i].points){
            console.log('Tie', i + 1);
            Information.money += Players[i].bet;
            
        }
        else if((Dealer.points <= 21 && Dealer.points < Players[i].points) || (Dealer.points > 21 && Players[i].points <= 21)){
            console.log('Player Win', i + 1);
            Information.money += (Players[i].bet * 2);
        }
    }

    let EndTime = new Date();
    Information.time = - (Information.time - EndTime.getTime());
    timeCalculator();

    if(initMoney > Information.money){
        $('.WINORLOSE').html('LOSE');
        historyDataStore('LOSE', Information.money - initMoney);
    }
    else if(initMoney < Information.money){
        $('.WINORLOSE').html('WIN');
        historyDataStore('WIN', Information.money - initMoney);
    }
    else{
        $('.WINORLOSE').html('TIE');
        historyDataStore('TIE', Information.money - initMoney);
    }

    updateMoney();
    playerDataStore();

    if(Information.money > 0){
        let temp = setTimeout(() => {resetGame(reloadGameScreen);$('.endScreen .game .Blackjack').off()}, 8000);
        $('.endScreen').css('display', 'block');
        $('.endScreen .game .Blackjack').on('click', () => {
            $('.Blackjack').click();
            clearTimeout(temp);
        })
    }
    else{
        let temp = setTimeout(() => {
        alert('You are LOSE and the money goes to zero, the game restart');
        localStorage.clear();location.reload();}, 1000);
        temp;
    }
}

function dealWithAce(who){
    if(who.points > 21 && who.ace > 0){
        for(; who.ace > 0; who.ace--){
            who.points -= 10;
            if(who.points <= 21)
                break;
        }
    }
    else
        return;
}

function dealWithDealerCard(){
    calculatePoints(Dealer);
    while(Dealer.points < 17){
        addCard(Dealer);
        displayCard(Dealer);
        calculatePoints(Dealer);
    }
}

function splitCardChange(nowHand){
    Players[nowHand + 1].card[0] = Players[nowHand].card[1];
    Players[nowHand].card.pop();
    addCard(Players[nowHand]);
    addCard(Players[nowHand + 1]);

    $($('.pokerPosition .poker')[0]).attr('src', 'assets/images/pokers/poke_' + Players[nowHand].card[0] + '.jpg');
    $($('.pokerPosition .poker')[1]).attr('src', 'assets/images/pokers/poke_' + Players[nowHand].card[1] + '.jpg');
    $($('.pokerPosition .poker')[2]).attr('src', 'assets/images/pokers/poke_' + Players[nowHand + 1].card[0] + '.jpg');
    $($('.pokerPosition .poker')[3]).attr('src', 'assets/images/pokers/poke_' + Players[nowHand + 1].card[1] + '.jpg');
}

function nextHands(nowHand){
    $('.player .pokerPosition').eq(nowHand).removeClass('active');
    nowHand++;
    $('.player .pokerPosition').eq(nowHand).addClass('active');
    return nowHand;
}

function splitDetect(nowHand){
    let temp0 = Players[nowHand].card[0], temp1 = Players[nowHand].card[1], record0 = 0, record1 = 0;
    while(temp0 > 0){
        temp0 -= 4;
        record0++;
    }

    while(temp1 > 0){
        temp1 -= 4;
        record1++;
    }

    if(record0 === record1){
        Players[nowHand].split = true;
    }   
}

function updateMoney(){
    $('.money').each((index, element) => {
        $(element).html('Money:' + Information.money + 'K');
    })
}

function calculateTotalChips(){
    let value = 0;
    for(let i = 0; i < Players.length; i++){
        value += Players[i].bet;
    }
    return value;
}

function timeDisplay(){
    let timer = new Date();
    $('.timeDisplay').text(timer.toString());
}

function playerDataStore(){
    let localData = JSON.parse(localStorage.getItem('PlayerData'));
    localData.money = Information.money;
    localStorage.setItem('PlayerData', JSON.stringify(localData));
}

function historyDataStore(winOrLose, profit){
    let historyData = {
        'winOrLose' : '',
        'totalBet' : 0,
        'minutes' : 0,
        'seconds' : 0, 
        'profit' : 0
    }
    let totalBet = 0

    for(let i = 0; i < Players.length; i++){
        totalBet += Players[i].bet;
    }

    historyData.totalBet = totalBet;
    historyData.winOrLose = winOrLose;
    historyData.minutes = Math.floor(Information.minutes);
    historyData.seconds = Math.floor(Information.seconds);
    historyData.profit = profit;

    let localHistory = localStorage.getItem('HistoryData');
    let sessionHistory = sessionStorage.getItem('HistoryData');

    if(localHistory === null || localHistory === undefined)
        localHistory = '[]';
    if(sessionHistory === null || sessionHistory === undefined)
        sessionHistory = '[]';

    let historyL = JSON.parse(localHistory);
    let historyS = JSON.parse(sessionHistory);

    historyL.push(historyData);
    historyS.push(historyData);

    localHistory = JSON.stringify(historyL);
    sessionHistory = JSON.stringify(historyS);

    localStorage.setItem('HistoryData', localHistory);
    sessionStorage.setItem('HistoryData', sessionHistory);
}

function timeCalculator(){
    Information.seconds = ((Information.time % 60000) / 1000);
    Information.minutes = (Information.time / 60000);
}

function displayTable(amount, who){
    let localHistory = localStorage.getItem('HistoryData');
    if(localHistory === null || localHistory === undefined){
        return;
    }
    else{
        $("." + who + " .history .tableContent").html("");
        let dataTable = "";
        localHistory = JSON.parse(localHistory);
        if(localHistory.length < 3)
            amount = localHistory.length;

        for(let i = 0; i < amount; i++){
            dataTable = "<tr>"
                dataTable += ("<td>" + localHistory[i].winOrLose + "</td>");
                dataTable += ("<td>" + localHistory[i].totalBet + "</td>");
                dataTable += ("<td>" + localHistory[i].minutes + " min : " + localHistory[i].seconds + " sec</td>");
                dataTable += ("<td>" + localHistory[i].profit + "</td>");
            dataTable += "<tr>"
            $("." + who + " .history .tableContent").append(dataTable);
        }
    }
}

function sortTable(){
    let localHistory = localStorage.getItem('HistoryData');
    if(localHistory === null || localHistory === undefined)
        return;
    localHistory = JSON.parse(localHistory);

    localHistory.sort((a, b) => {
        return b.profit - a.profit;
    })
    
    localHistory = JSON.stringify(localHistory);

    localStorage.setItem('HistoryData', localHistory);
}

const Players = [];
const Player = new player;
Players.push(Player);
const PokerStatus = new pokers;
const Dealer = new dealer;
const Information = new information;
