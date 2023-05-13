import * as MyModule from './function.js';
import { player } from './player.js';
export { nowHand };

let clickSound = $('#click'), nowHand = 0;
clickSound.volumn = 0.005;
let reloadGameScreen = $('.gameScreen').html();

var timer = setInterval(() => {MyModule.timeDisplay()}, 1000);
    timer;

$('.Start').on('click', () => { //顯示遊戲選擇頁面
    clickSound[0].play();
    MyModule.updateMoney();
    $('.timeDisplay').css('display', 'block');
    MyModule.NowScreenDisplay($('.chooseGameScreen'));
    MyModule.musicPlay();
})

$('.Regular').on('click', () => { //顯示規則頁面
    clickSound[0].play();
    MyModule.NowScreenDisplay($('.regularScreen'));
})

$('.RegularBack').on('click', () => { //顯示主頁面
    clickSound[0].play();
    MyModule.NowScreenDisplay($('.initScreen'));
})

$('.cheat').on('click', () => { //打開作弊模式
    clickSound[0].play();
    cheatOrNot = true;
})

$('.goBack').on('click', () => { //顯示主頁面
    clickSound[0].play();
    $('.timeDisplay').css('display', 'none');
    MyModule.NowScreenDisplay($('.initScreen'));
    cheatOrNot = false;
})

$('.Blackjack').on('click', () => { //開始21點遊玩
    MyModule.resetGame(reloadGameScreen);

    $(".tableContainer .history .tableContent").html("");
    let sessionHistory = sessionStorage.getItem('HistoryData');
    sessionHistory = JSON.parse(sessionHistory);
    if(sessionHistory === null || sessionHistory === undefined){
        sessionHistory = [];
    }
    for(let i = sessionHistory.length > 3 ? (sessionHistory.length - 3) : 0; i < sessionHistory.length; i++){
        let dataTable = "<tr>"
            dataTable += ("<td>" + sessionHistory[i].winOrLose + "</td>");
            dataTable += ("<td>" + sessionHistory[i].totalBet + "</td>");
            dataTable += ("<td>" + sessionHistory[i].minutes + " min : " + sessionHistory[i].seconds + " sec</td>");
            dataTable += ("<td>" + sessionHistory[i].profit + "</td>");
        dataTable += "<tr>"
        $(".tableContainer .history .tableContent").append(dataTable);
    }

    nowHand = 0;
    clickSound[0].play();
    MyModule.NowScreenDisplay($('.gameScreen'));

    let nowTime = new Date();
    MyModule.Information.time = nowTime.getTime();

    MyModule.updateMoney();

    MyModule.splitDetect(0);
    $('.bet img').css('transform', 'translateX(0px)')
    $('.bet img').on('mousedown', (e) => {
        let initx = e.clientX, max = 140, Bet = 0;
        $('body').on('mousemove', (event) => {
            $('.bet img').css('transform', 'translateX(' + (event.clientX - initx) + 'px)');
            $('.betmoney').html('Put in: ' + Math.floor(((event.clientX - initx) / 140) * MyModule.Information.money) + 'K chips');
            Bet = Math.floor(((event.clientX - initx) / 140) * MyModule.Information.money);
            if((event.clientX - initx) / 140 >= 1){
                $('.bet img').css('transform', 'translateX(' + max + 'px)');
                $('.betmoney').html('Put in: ' + MyModule.Information.money + 'K chips');
                Bet = MyModule.Information.money;
                MyModule.Player.bet = Bet;
            }
            if((event.clientX - initx) <= 0){
                $('.betmoney').html('Put in: ' + 1 + 'K chips');
                $('.bet img').css('transform', 'translateX(0px)');
                Bet = 1;
                MyModule.Player.bet = Bet;
            }
        })
        $('body').on('mouseup', (E) => {
            $('body').off();
            $('.bet img').off();
            MyModule.Information.money -= Bet;
            MyModule.Player.bet = Bet;
            MyModule.updateMoney();
            MyModule.Player.state = true;
            $('.gameButton').html('<div class= "Hit button">Hit</div><div class= "Stand button">Stand</div><div class= "Split button">Split</div><div class= "Double button">Double</div><div class= "Surrender button">Surrender</div>')
            $('.gameButton').css('font-size', '18px');
            $('.gameButton').css('font-weight', 'normal');

            MyModule.initCardDisplay(MyModule.Dealer);
            MyModule.initCardDisplay(MyModule.Players[0]);
        })
    })

    $('.tableBTN').on('click', () => {      
        let localHistory = localStorage.getItem('HistoryData');
        localHistory = JSON.parse(localHistory);

        $('.tableCloseBTN').on('click', () => {
            $('.cover').css('display', 'none');
            $('.tableContainer').css('display', 'block');
        })

        $('.tableClearBTN').on('click', () => {
            let sessionHistory = sessionStorage.getItem('HistoryData');
            sessionHistory = JSON.parse(sessionHistory);
            sessionHistory = [];
            sessionHistory = JSON.stringify(sessionHistory);
            sessionStorage.setItem('HistoryData', sessionHistory);
            $(".tableContainer .history .tableContent").html("");
            $('.cover .tableContainerCenter .history .tableContent').html("");
            localHistory = localStorage.getItem('HistoryData');
            localHistory = JSON.parse(localHistory);
            localHistory = [];
            localHistory = JSON.stringify(localHistory);
            localStorage.setItem('HistoryData', localHistory);

            MyModule.displayTable(0, 'tableContainerCenter');

            totalProfit = 0;
            let dataTable = "<tr>";
            dataTable += ("<td>Total Profit</td>");
            dataTable += ("<td>--</td>");
            dataTable += ("<td>--</td>");
            dataTable += ("<td>" + totalProfit + "</td>");
            dataTable += "<tr>";

            $(".tableContainerCenter .tableContent").append(dataTable);  
        })

        $('.cover').css('display', 'block');
        $('.tableContainer').css('display', 'none');
        MyModule.sortTable();
        if(localHistory === undefined || localHistory === null)
            localHistory = [];
        MyModule.displayTable(localHistory.length, 'tableContainerCenter');

        let totalProfit = 0;
        
        for(let i = 0; i < localHistory.length; i++){
            totalProfit += localHistory[i].profit;
        }

        let dataTable = "<tr>";
            dataTable += ("<td>Total Profit</td>");
            dataTable += ("<td>--</td>");
            dataTable += ("<td>--</td>");
            dataTable += ("<td>" + totalProfit + "</td>");
        dataTable += "<tr>";

        $(".tableContainerCenter .tableContent").append(dataTable);     
    })

    $('.gameButton').on('click', (e) => {
        if(e.target.className == 'Hit button'){
            if(MyModule.Players[nowHand].state){
                MyModule.Players[nowHand].surrender = false;
                MyModule.Players[nowHand].double = false;
                MyModule.Players[nowHand].split = false;
                MyModule.addCard(MyModule.Players[nowHand]);
                MyModule.displayCard(MyModule.Players[nowHand]);
                MyModule.calculatePoints(MyModule.Players[nowHand]);
                if(MyModule.Players[nowHand].points > 21){
                    MyModule.Players[nowHand].burst = true;
                    let BURST = MyModule.Players.every((element) => element.burst === true);
                    if(BURST){
                        MyModule.winOrLoseJudge(reloadGameScreen);
                    }
                    else if(nowHand + 1 === MyModule.Players.length){
                        MyModule.dealWithDealerCard();
                        MyModule.winOrLoseJudge(reloadGameScreen);
                    }

                    else if(nowHand + 1 < MyModule.Players.length){
                        nowHand = MyModule.nextHands(nowHand);
                    }
                }
            }
        }
        else if(e.target.className == 'Stand button'){
            if(MyModule.Players[nowHand].state){
                MyModule.Players[nowHand].surrender = false;
                MyModule.Players[nowHand].double = false;
                MyModule.Players[nowHand].state = false;
                MyModule.Players[nowHand].split = false;
                if(nowHand + 1 < MyModule.Players.length){
                    nowHand = MyModule.nextHands(nowHand);  
                }
                else{
                    MyModule.dealWithDealerCard();
                    MyModule.winOrLoseJudge(reloadGameScreen);
                }             
            }
        }
        else if(e.target.className == 'Split button'){
            if(MyModule.Players[nowHand].state && MyModule.Players[nowHand].split && MyModule.Information.money >= MyModule.Players[nowHand].bet){
                MyModule.Players[nowHand].split = false;
                $('.player').append('<div class="pokerPosition"><img src = "assets/images/pokers/poker.png" class="poker"><img src = "assets/images/pokers/poker.png" class="poker"></div>')
                let temp = new player;
                temp.bet = MyModule.Players[nowHand].bet;
                temp.state = true;
                MyModule.Information.money -= MyModule.Players[nowHand].bet;
                MyModule.updateMoney();
                $('.bet img').css('transform', 'translateX(' + (Math.floor(((MyModule.calculateTotalChips()) * 140) / (MyModule.Information.money + MyModule.Players[nowHand].bet))) + 'px)');
                MyModule.Players.push(temp);
                MyModule.splitCardChange(nowHand);
                $('.betmoney').html('Put in: ' + MyModule.calculateTotalChips() + 'K chips');
            }
        }
        else if(e.target.className == 'Double button'){
            if(MyModule.Players[nowHand].state && MyModule.Players[nowHand].double && MyModule.Information.money >= MyModule.Players[nowHand].bet){
                MyModule.Players[nowHand].split = false;

                $('.bet img').css('transform', 'translateX(' + (Math.floor(((MyModule.calculateTotalChips() + MyModule.Players[nowHand].bet) * 140) / (MyModule.Information.money + MyModule.calculateTotalChips() + MyModule.Players[nowHand].bet))) + 'px)');
                MyModule.Information.money -= MyModule.Players[nowHand].bet;
                MyModule.Players[nowHand].bet *= 2;
                MyModule.updateMoney();
                $('.betmoney').html('Put in: ' + MyModule.calculateTotalChips() + 'K chips');

                MyModule.Players[nowHand].state = false;
                MyModule.Players[nowHand].double = false;
                MyModule.Players[nowHand].surrender = false;
                MyModule.addCard(MyModule.Players[nowHand]);
                MyModule.displayCard(MyModule.Players[nowHand]);
                MyModule.calculatePoints(MyModule.Players[nowHand]);      

                if(nowHand + 1 === MyModule.Players.length){
                    if(MyModule.Players[nowHand].points <= 21){
                        MyModule.dealWithDealerCard();
                    }

                    MyModule.winOrLoseJudge(reloadGameScreen);
                }
                else{
                    nowHand = MyModule.nextHands(nowHand);
                }
            }
            
        }
        else if(e.target.className == 'Surrender button'){
            if(MyModule.Players[nowHand].state && MyModule.Players[nowHand].surrender){
                MyModule.Players[nowHand].card.pop();
                MyModule.Players[nowHand].card.pop();
                MyModule.Players[nowHand].surrender = false;
                MyModule.Players[nowHand].double = false;
                MyModule.Players[nowHand].split = false;
                MyModule.Players[nowHand].state = false;

                if(nowHand + 1 < MyModule.Players.length){
                    nowHand = MyModule.nextHands(nowHand);
                }
                else{
                    MyModule.winOrLoseJudge(reloadGameScreen);
                }
            }
        }
        else{
            return;
        }
    })
})