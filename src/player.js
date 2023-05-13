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
    let Data = localStorage.getItem('PlayerData'), idleSeconds = 0, advertisementtime = 0;
    let adHTTP = [, "https://sin3-ib.adnxs.com/click?cT0K16NwzT9xPQrXo3DNPwAAAOCjcM0_cT0K16NwzT9xPQrXo3DNP72Pb5Ug_LNLWSFG7RAvkw8iK19kAAAAAFAnDQEYAQAAvwgAADQAAADnYOYNcoUTAAAAAABVU0QAVVNEAAEAAQAZ0AAAAAABAgUCAAAAALIAHCInSwAAAAA./bcr=AAAAAAAA8D8=/pp=0.23/cnd=S8Uk1SIvgNg7YKITLr5PWimtTHFRjH1HftVtVNrAZrkLM22dfXOL9KyB1b19YXduMeVN4hJCTsgVT0Xa2bzpf5tkgP8BYPykB5nb0g9L1ORx1ktz_6QHrYED9dM15N0uQufZWZfUA4HA-dc4NfH5LFqUMJBd-sDhdQmk_VroE2Pj2XMqTVjK7AldHE8KXD_WBnXjdCrtbksn-Q7HMvdjFJpfuzrizk-HYjTSjObWW_qmojhGajuFgGIWGzYOylDqmd7CcHOTTu1TGxc4nCEjEIUiAeDScrZPR7D0IZAR0OHg2au9oSw8EnKORoFg5AR_wNRsCsGl8OEcOQDYkpwFhTAn1hedInPuclYDCoiqi0lZY1yEhLhlDgyf5m6cv91eRoFUqMMTbQU1cHPlY8PZl21diRMTf90xRF_4A7Xsy9GrwJF8jLfn0vhf40D6LUKBWjTOJLR9KX-oG69_7CWP2XTnLDdR8HBDADcPwUOqc1gWe0brXsgamXZkNXG8aQsIjBFjTlkqOMC66JWFbnYaYxOs5pHhzT8L6b79MTFMDkwTAHi6FwRt-nBzJxsNpikQlzWYooi3f37jnwfNEUpFkdKQtsIOz1bAaiYEcznh8TB2qJ10yMCOR31UwotyClIZrI8-TYRATyZF-jBDlwlmefy0Hm6sCy5oHMFO0bL7-Zqci7HMmrzvVLnb7X5dlJFL7h2nKEK9t5tQs-zHKDugIdhmDLjNSQhMZv8eO16k50yAm2L-_pv2xDvrZJd-MCZrsAf98ekP_f8gmcqnPinYEA/bn=92702/clickenc=https%3A%2F%2Fcat.sg1.as.criteo.com%2Fdelivery%2Fckn.php%3Fcppv%3D3%26cpp%3DeJpb6WlQ-VHOY8DB15xUmEvCKkcCIddwlQNXwUWrrXERFLVP_CRc0OVhWQ9cS47gGFQz6fqRfdX5HrNDOqXhr2ZnDajTguscVOvDa6_o5rATLkWuzO0n2saPNVORbWZ3mWjoEBm4sbx_i65kJFHAxWMMAhnWkZm8GjpXH8gcU1x7BWxV3eYLIf_NKoybMtE-LacDVFZNp2EhYqQenSB5jzzzbqKMk-bjfQSSRaQIdqpKrUz63YEuaahBo5ucJ343pHXhVVtl-vH6FLfepmSuZKo9vSKoWiq4G1OManhRz4V-0yJ1KB3kEO5hAJBZYsNfAXCPIjmiAK5JOLbZzcXKpP0yRXCn7zGMYSfWi-cTzQ2q6nzveXwpeemPOXBE3H71r1uOtoLiLzj72_4X3QC7sGBj3ZN3nRyzOsFl8ZFoAbi9L6xj3DXIpkE84nWok0wlvBCztg%26maxdest%3Dhttps%253A%252F%252Fhahow.in%252Fcourses%252F56189df9df7b3d0b005c6639%253Futm_source%253Dcriteo%2526utm_medium%253Dlowerfunnel_visitors%2526utm_campaign%253Dlowerfunnel_visitors%2526mts_s%253Dcriteo%2526mts_m%253Dcriteo"
    , "https://www.em-edu.com.tw/course_detail170.htm?matchtype=e&msclkid=871040d196931c023f3a248ebc3e73d8"
    , "https://a.mbobi.com/CPC/Brands/paidtrial_SCH/CID179/CP1/VT1/LP1.aspx?utm_source=T&utm_medium=BF&utm_campaign=BF&utm_content=B1&BannerID=10221&BCID=23884507&NID=39&PushID=10221&CCID=5776&AG=GH&CID=179&utm_source=taboola&utm_medium=referral&tblci=GiB2VGdXzEpFHCXku_ygf9WnP4yqgmXQEZkaQUXQ9BEV3iCfk1oorOP6mIeY8vHvAQ&GNo=32075932344A00B94C1F#23884507&26825434"
    , "https://hahow.in/courses/60c5ce16962ad61a86c7865b?utm_source=criteo&utm_medium=lowerfunnel_visitors&utm_campaign=lowerfunnel_visitors&mts_s=criteo&mts_m=criteo&rc=1"
    , "https://api.taboola.com/2.0/json/msn-anaheim-taiwan/recommendations.notify-click?app.type=bidder&app.apikey=69629143827c91b118c7e0dc9f2a4eb0059feae9&response.id=__8723262c38439b1b35fcc61e2585deb7__75d7a05ff4841219b54f7dda254cdc05&response.session=v2_97d0663e1b818cf6384741b82b407906_0CFC6E869F81624D19737C999EFC6352_1683958564_1683958564_CNawjgYQquRKGJCvntjc467TVSABKAUw3AE44NsNQIOfEEjYiNcDUP___________wFYAGC_AWj2gqvOvInG7XpwAQ&item.id=%7E%7EV1%7E%7E8923220172750585997%7E%7E1yD9pRVCcdiSvSQK37z_X-uZJP8wHukQ5Ptl6v5DdBv6nH0OabNJtzzP-ddPU2nvK8Bm7FKD2NW1M1BCiW1-kuMDMqg65-jJbi04eURsbtqeHe1S9jo_X4timp5pCZhQQas41f4COFvufOf52grWNe487k0pvO_9ezrwRupEiSMB7CKWDYR-vkpxcdUUzOgEqMBBvkdfag99mRDkZdH7GZIABZnE6iw0vZgovqPMyoCY6eD5jnG1QLwcl4nkEOHw5CoWLlX1uzG9gUBqYmKqk08KJRZ9mwaEcwcGgiTaJHWsUaZak2AcDXKoRwoERbO2FyiLwZye9AVW0mobyZXy8-m_ynqovu6XwEVTT8fPVn8XLd3zhjgRpxalfjS43RRHo6is4VAHncQqKrt7_RKATKV9WkZkqlbAxzUSVcDbY6YgliktLVd6Fqj__o9WEyI-GhN4iu3mzH_J0OL2fZJPMebQoSlTUdjwxbQzyd-hi4s&item.type=text&sig=48277abe291ffc309b5a9d3e8a1980f8e0ba41d8ba7c&redir=https%3A%2F%2Flensed-hompire.com%2F50590ace-fde3-407f-9608-01efae3e8c6d%3Fsite%3Dmsn-anaheim-taiwan%26site_id%3D1225258%26title%3D%25E5%25BC%25B5%25E5%258F%25A3%25E8%2596%25B0%25E4%25BA%25BA%25E5%25A5%25BD%25E5%258F%25AF%25E6%2580%2595%25EF%25BC%2581%25E5%258F%25A3%25E8%2587%25AD%25E6%2598%25AF%25E5%2581%25A5%25E5%25BA%25B7%25E5%259C%25A8%25E6%258B%2589%25E8%25AD%25A6%25E5%25A0%25B1%26platform%3DDesktop%26campaign_id%3D12336395%26campaign_item_id%3D3028552099%26thumbnail%3Dhttp%253A%252F%252Fcdn.taboola.com%252Flibtrc%252Fstatic%252Fthumbnails%252Fe63b9fea501d82872740d5ea841f644b.jpg%26click_id%3DGiB2VGdXzEpFHCXku_ygf9WnP4yqgmXQEZkaQUXQ9BEV3iDdpUUonKqMgp3Bp-ejAQ%26utm_source%3Dtaboola%26utm_medium%3Dreferral%23tblciGiB2VGdXzEpFHCXku_ygf9WnP4yqgmXQEZkaQUXQ9BEV3iDdpUUonKqMgp3Bp-ejAQ&ui=0CFC6E869F81624D19737C999EFC6352&cpb=GAEgnP__________ASoZc2cudGFib29sYXN5bmRpY2F0aW9uLmNvbTIIdHJjMzAxNDU4gITS4whA4NsNSIOfEFDYiNcDWP___________wFjCJNCELlXGDBkYwjXFhDVHxgjZGMI7f__________ARDt__________8BGBNkYwjSAxDgBhgIZGMIlhQQlxwYGGRjCPY6EJZOGDlkYwjvAxCKBxgJZGMI9BQQnh0YH2RjCKQnEIM1GC9kaiAxOGI4NzMyYzFhMzE0YzYwOTc5YWU5YTllMzFkOGI4M3gBgAHiI4gB54T97AGQARiYAb2Ngp6BMQ&viperAppType=SCONMSFT"
    , "https://api.taboola.com/2.0/json/msn-anaheim-taiwan/recommendations.notify-click?app.type=bidder&app.apikey=69629143827c91b118c7e0dc9f2a4eb0059feae9&response.id=__8723262c38439b1b35fcc61e2585deb7__05e45c20fe0a41ccc39b5825a1e88380&response.session=v2_26e5f668a4930e3422b1ef4ce3615845_0CFC6E869F81624D19737C999EFC6352_1683958778_1683958778_CNawjgYQquRKGJCvntjc467TVSABKAUw3AE44NsNQIOfEEjYiNcDUP___________wFYAGDBAWj2gqvOvInG7XpwAQ&item.id=%7E%7EV1%7E%7E7192145992835548089%7E%7E-K_qEyxNcEWnNEY-S0IsW1423PNocPBqII4K9VOhSLv6nH0OabNJtzzP-ddPU2nvK8Bm7FKD2NW1M1BCiW1-kuMDMqg65-jJbi04eURsbtqeHe1S9jo_X4timp5pCZhQQas41f4COFvufOf52grWNe487k0pvO_9ezrwRupEiSMB7CKWDYR-vkpxcdUUzOgEqMBBvkdfag99mRDkZdH7GZIABZnE6iw0vZgovqPMyoCY6eD5jnG1QLwcl4nkEOHw5CoWLlX1uzG9gUBqYmKqk08KJRZ9mwaEcwcGgiTaJHWsUaZak2AcDXKoRwoERbO2m9cynEsWO3LJZDLNO6h5A-m_ynqovu6XwEVTT8fPVn8XLd3zhjgRpxalfjS43RRHrf-y6fbaBN3gJWEVglIg8d-nQxkndnb48pHJIPRN_vZZkuZNczmgkoscwxwA7Jskq5ccyCrUeVae0bnlRK3SsN02CwhTQ8JwBqChEzcFb78&item.type=text&sig=4ad884568ab47235215531d764f6eacdf904e3067feb&redir=https%3A%2F%2Fm.mbobi.com%2FIncentiveDSP.aspx%3FBannerID%3D10790%26NID%3D39%26CID%3D235%26utm_source%3DT%26utm_medium%3DAL_P%26tblci%3DGiB2VGdXzEpFHCXku_ygf9WnP4yqgmXQEZkaQUXQ9BEV3iDx3loom9DirpDhvZa-AQ%23tblciGiB2VGdXzEpFHCXku_ygf9WnP4yqgmXQEZkaQUXQ9BEV3iDx3loom9DirpDhvZa-AQ&ui=0CFC6E869F81624D19737C999EFC6352&cpb=GAEgnP__________ASoZc2cudGFib29sYXN5bmRpY2F0aW9uLmNvbTIIdHJjMzAxNDM4gITS4whA4NsNSIOfEFDYiNcDWP___________wFjCJNCELlXGDBkYwjt__________8BEO3__________wEYE2RjCNcWENUfGCNkYwiWFBCXHBgYZGMI0gMQ4AYYCGRjCO8DEIoHGAlkYwj2OhCWThg5ZGMIpCcQgzUYL2RjCPQUEJ4dGB9kaiAxOGI4NzMyYzFhMzE0YzYwOTc5YWU5YTllMzFkOGI4M3gBgAHiI4gB54T97AGQARiYAbyRj56BMQ&viperAppType=SCONMSFT"]

    let idleTimeCalculation = setInterval(() => {
        idleSeconds += 1;
        $("html").on('mousemove', () => {
            idleSeconds = 0;
        })

        if(idleSeconds === 60){
            alert("Please do not idle for too long, please click OK to continue the game.")
        }
    }, 1000)

    let advertisementDisplay = setInterval(() => {
        advertisementtime += 1;

        if(advertisementtime === 20){
            advertisementtime = 0;
            let advertisementTarget = Math.floor(Math.random() * 6 + 1);
            $('.advertisement').css("display", "block");
            $('.advertisementClose').css("display", "block");

            $('.advertisementClose').on('click', () => {
                $('.advertisement').css("display", "none");
                $('.advertisementClose').css("display", "none");
                $('.advertisementClose').off();
            })
            $('.advertisement').css("background-image", 'url("/assets/images/background/advertisement' + advertisementTarget + '.png")');
            $('.advertisement').attr("href", adHTTP[advertisementTarget]);
        }
    }, 1000)

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
