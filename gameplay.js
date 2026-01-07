var previousDicePicture;
var previousDice;
var lastTokenMove = false;

var opening = false;

function colorSelected(e){
    e.target.classList.toggle("selected");
    document.getElementById(e.target.id[0]+"Win").classList.toggle("won");
}

document.getElementById("rSelect").addEventListener("click", colorSelected);

document.getElementById("gSelect").addEventListener("click", colorSelected);

document.getElementById("bSelect").addEventListener("click", colorSelected);

document.getElementById("ySelect").addEventListener("click", colorSelected);

var playerColors;

var playerNo;

var moveCtr=0;

var mapLocker=new Map();

var winners = new Array;

var mapTally = new Map();

var mapExtraRoll = new Map();

document.getElementById("dialogueStart").querySelector(".select button").addEventListener("click", function() {
    playerColors = document.querySelectorAll(".playerSelection .colors .holder.selected");
    playerColors = Array.from(playerColors);
    playerNo=playerColors.length;
    document.getElementById("dialogueStart").style.display="none";
    playerColors.forEach(element => {
        let temp = element.id[0];
        let tempIndex = playerColors.indexOf(element);
        playerColors[tempIndex] = temp;
        mapLocker.set(temp, 0);
        mapTally.set(temp, 0);
        mapExtraRoll.set(temp, 0);
    });
    initialiseGame(playerColors);
} )

var next=function (p) {
    switch(p) {
        case 'r': return 'g';
        case 'g': return 'y';
        case 'y': return 'b';
        case 'b': return 'r';
        default: alert("Error in cycling through colors"); return;
    }
}

var  chkToken=function(a) {
    if(document.getElementById(a).innerHTML) return 1;
    else return 0;
}

// ---------- UPDATED ----------
var removeToken = function(a, t) {
    var id = document.getElementById(a);
    if (!id) return;

    let token = id.querySelector("#" + t);
    if (token) token.remove();
};

var killToken = function(a, p) {
    console.log("killToken");
    console.log(`a: ${a}, p: ${p}, lastTokenMove: ${lastTokenMove}`);
    var temp=document.getElementById(a).firstElementChild;
    if(temp && !(temp.parentElement.classList.contains("dark")) && lastTokenMove){
        var targetId=temp.id;
        var target;
        var holderSelector = function() {
            Array.from(document.querySelectorAll("."+targetId[0]+"Locker .holder")).every(element => {
                if(element.childElementCount==0){    
                    target = element.id;
                    return false;
                }
                return true;
            });
        }
        console.log(`target: ${target}`);
        holderSelector();
        console.log(`target.length-1 : ${target.length-1}`);
        if(target[target.length-1]<='4'){
            lastTokenMove = false;
            addToken(target, targetId[0]+'Token');
            mapLocker.set(targetId[0], mapLocker.get(targetId[0])+1);
            mapExtraRoll.set(p,mapExtraRoll.get(p)+1);
            removeToken(a, targetId[0]+"Token");
        } else {
            alert("some error in returning token back to locker!");
        }

    }
    return;
}

var addToken = function(a, t, p) {
    console.log(`addToken with data a: ${a}, t:${t}, p:${p}`);
    killToken(a, p);

    var token=('<svg id="token" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><style type="text/css"> .st0{stroke:#FFFFFF;stroke-width:20;stroke-miterlimit:10;}</style><path class="st0" fill="currentColor" d="M256,8C119,8,8,119,8,256s111,248,248,248s248-111,248-248S393,8,256,8z M336,256c0,44.1-35.9,80-80,80s-80-35.9-80-80s35.9-80,80-80S336,211.9,336,256z"/></svg>');
    var rToken=('<svg id="rToken" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><style type="text/css"> .st0{stroke:#FFFFFF;stroke-width:20;stroke-miterlimit:10;}</style><path class="st0" fill="#cc444bff" d="M256,8C119,8,8,119,8,256s111,248,248,248s248-111,248-248S393,8,256,8z M336,256c0,44.1-35.9,80-80,80s-80-35.9-80-80s35.9-80,80-80S336,211.9,336,256z"/></svg>');
    var gToken=('<svg id="gToken" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><style type="text/css"> .st0{stroke:#FFFFFF;stroke-width:20;stroke-miterlimit:10;}</style><path class="st0" fill="#054a29ff" d="M256,8C119,8,8,119,8,256s111,248,248,248s248-111,248-248S393,8,256,8z M336,256c0,44.1-35.9,80-80,80s-80-35.9-80-80s35.9-80,80-80S336,211.9,336,256z"/></svg>');
    var yToken=('<svg id="yToken" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><style type="text/css"> .st0{stroke:#FFFFFF;stroke-width:20;stroke-miterlimit:10;}</style><path class="st0" fill="#ffaa00ff" d="M256,8C119,8,8,119,8,256s111,248,248,248s248-111,248-248S393,8,256,8z M336,256c0,44.1-35.9,80-80,80s-80-35.9-80-80s35.9-80,80-80S336,211.9,336,256z"/></svg>');
    var bToken=('<svg id="bToken" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><style type="text/css"> .st0{stroke:#FFFFFF;stroke-width:20;stroke-miterlimit:10;}</style><path class="st0" fill="#0f3375ff" d="M256,8C119,8,8,119,8,256s111,248,248,248s248-111,248-248S393,8,256,8z M336,256c0,44.1-35.9,80-80,80s-80-35.9-80-80s35.9-80,80-80S336,211.9,336,256z"/></svg>');    

    function returnToken(temp) {
        if(temp=="token")  return token;
        else if(temp=="rToken") return rToken;
        else if(temp=="gToken") return gToken;
        else if(temp=="yToken") return yToken;
        else if(temp=="bToken") return bToken;
        else alert("Error in returning token");
    }
    document.getElementById(a).insertAdjacentHTML("beforeend", returnToken(t));
    return;
}

function splitString(str,what) { 
    let alpha = ""; 
    let num = ""; 
    let special = ""; 
    for (let i=0; i<str.length; i++) 
    { 
        if (!isNaN(String(str[i]) * 1)) 
            num+=str[i]; 
        else if((str[i] >= 'A' && str[i] <= 'Z') || 
        (str[i] >= 'a' && str[i] <= 'z')) 
            alpha+=str[i]; 
        else
            special+=str[i]; 
    } 

    if(what == "num"){
        return num;
    }else if(what == "string"){
        return alpha;
    }else if(what == "special"){
        return special;
    }else{
        return "kuch toh bta kya chahiye!";
    }
} 

var newa = "";
var newb = "";
var enteringInWinning = false;

var move = function (a, b, t, p, diceValue) {

    console.log(`MOVE → a:${a}, b:${b}, t:${t}, p:${p}, dice:${diceValue}`);

    let newa = "";
    let newb = "";
    let enteringInWinning = false;
    lastTokenMove = false;

    const destBlock = document.getElementById(b);

    // -------- BLOCKED BY OWN TOKEN --------
    if (
        destBlock &&
        destBlock.childElementCount &&
        !destBlock.classList.contains("dark") &&
        destBlock.firstChild.id[0] === p
    ) {
        alert("The destination block contains your token! Select a different token");
        playerTurn(p, diceValue);
        return;
    }

    // -------- OPENING MOVE --------
    if (opening) {
        removeToken(a, t);
        addToken(b, t, p);
        opening = false;
        play(playerCycle(p, diceValue));
        return;
    }

    const startColor = splitString(a, "string");
    const destColor = splitString(b, "string");
    const startNum   = Number(splitString(a, "num"));

    const farAwayFromNewColorPath = 7 - startNum; // ✅ FIXED

    // -------- STEP BY STEP MOVE --------
    for (let ii = 1; ii <= diceValue; ii++) {

        if (ii === diceValue) lastTokenMove = true;

        // ---------- DECIDE FROM ----------
        if (ii === 1) {
            newa = a;
        } else {
            newa = newb;
        }

        // ---------- SAME COLOR PATH ----------
        if (startColor === destColor.toLowerCase()) {

            // ----- CHECK WINNING ENTRY -----
            if (["R", "G", "Y", "B"].includes(destColor)) {
                const farFromWin = 7 - Number(splitString(newa, "num"));
                if (farFromWin === 0) enteringInWinning = true;
            }

            // ----- DECIDE TO -----
            if (enteringInWinning) {
                newb = destColor + "1";
                enteringInWinning = false;
            } else {
                newb =
                    splitString(newa, "string") +
                    (Number(splitString(newa, "num")) + 1);
            }

        }
        // ---------- DIFFERENT COLOR PATH ----------
        else {

            if (ii <= farAwayFromNewColorPath) {
                newb =
                    splitString(newa, "string") +
                    (Number(splitString(newa, "num")) + 1);
            } else {
                newb =
                    destColor +
                    (ii - farAwayFromNewColorPath);
            }
        }

        console.log(`STEP ${ii}: ${newa} → ${newb}`);

        // ---------- SAFE MOVE ----------
        removeToken(newa, t);
        addToken(newb, t, p);
    }

    // -------- HARD RESET (ANTI-STUCK) --------
    newa = "";
    newb = "";
    enteringInWinning = false;
    lastTokenMove = false;

    play(playerCycle(p, diceValue));
};


// var move= function(a, b, t, p, diceValue){
//     console.log("a: "+a+", b: "+b+", t: "+t+" p: "+p+", diceValue: "+diceValue);
//     let dicetotalValue = diceValue;
//     var temp = document.getElementById(b);
//     if(temp.childElementCount){
//         if((!temp.classList.contains("dark"))&&(temp.firstChild.id[0] == p)){
//             alert("The destination block contains your token! Select a different token");
//             console.log("moving here first if");
//             playerTurn(p, dicetotalValue);
//             return;
//         } else {
//             console.log("moving here first else");

//             // Now getting how much token is far away from that new color path
//             let farAwayFromNewColorPath = 13 - Number(splitString(a, "num"));

//             if(opening){
//                 removeToken(a,t);
//                 addToken(b, t, p);
    
//                 opening = false;
//             }else{

//             for (let ii=1; ii<=diceValue; ii++){

//                 console.log(`ii: ${ii}`);
    
//                 if(ii === diceValue){
//                     console.log("true kar diya last move");
//                     lastTokenMove = true;
//                 }
    
                
                
//                     // Before deciding b check if token moving from one color path to another color path
//                     if(splitString(a, "string") == splitString(b, "string").toLowerCase()){
//                         // in same color path
//                         console.log("same color path");
    
//                             console.log(String(splitString(b, "string")));
    
//                             // Check if the token is entering in the wining path
//                             if(String(splitString(b, "string")) == "R" || String(splitString(b, "string")) == "G" || String(splitString(b, "string")) == "Y" || String(splitString(b, "string")) == "B"){
    
//                                 // var enteringInWinning  = true;
    
//                                 var farFromEnteringInWinningPath = 7 - Number(splitString(a,"num"));
    
//                                 console.log(farFromEnteringInWinningPath);
    
//                                 // Deciding a Position individually
//                                 if(ii == 1 && farFromEnteringInWinningPath != 0){
//                                     console.log("first single move same color path");
//                                     newa = a;
//                                 }else if(ii == 1 && farFromEnteringInWinningPath == 0){
//                                     newa = a;
//                                     enteringInWinning = true;
    
//                                 }else if(ii <= farFromEnteringInWinningPath){
//                                     newa = newb;
//                                 }else if(ii == Number(farFromEnteringInWinningPath)+1){
//                                     newa = newb;
//                                     enteringInWinning = true;
//                                 }else{
//                                     console.log("single move same color path");
//                                     console.log(a);
//                                     newa = newb;
//                                 }
    
    
    
    
    
//                             }else{
//                                 // Deciding a Position individually
//                                 if(ii == 1){
//                                     console.log("first single move same color path");
//                                     newa = a;
//                                 }else{
//                                     console.log("single move same color path");
//                                     newa = String(splitString(a, "string")) + String(Number(splitString(a, "num")) + ii -1);
//                                 }
    
    
//                             }
    
                            
    
//                                 //Deciding b Position Individually
    
//                                 if(enteringInWinning){
    
//                                     console.log(enteringInWinning);
                                    
//                                     newb = String(splitString(b, "string")) + String(1);
    
//                                     console.log("entering in the winning path and newb: " + newb);
//                                     enteringInWinning = false;
    
//                                 }else{
//                                     newb = String(splitString(newa, "string")) + String(Number(splitString(newa, "num")) + 1);
//                                 }
    
//                                 console.log("newa: "+newa+", newb: "+newb);
    
//                                 // Now Movin the token Individually in single step
                                
//                                 removeToken(newa,t);
//                                 addToken(newb, t, p);
                                
//                     }else{
//                         // in different color path
//                                     // Deciding a Position individually
//                                     if(ii == 1 && farAwayFromNewColorPath != 0){
//                                         newa = a;
    
//                                         //Deciding b Position Individually
//                                         newb = String(splitString(newa, "string")) + String((Number(splitString(newa, "num")))+1);  
                                        
                                        
//                                         console.log("newa: "+newa+", newb: "+newb);
//                                         // Now Movin the token Individually in single step
//                                         removeToken(newa,t);
//                                         addToken(newb, t, p);
    
    
//                                     }else if (ii <= farAwayFromNewColorPath){
//                                         newa = String(splitString(a, "string")) + String((Number(splitString(a, "num")))+ii-1);
    
//                                         //Deciding b Position Individually
//                                         newb = String(splitString(newa, "string")) + String((Number(splitString(newa, "num")))+1);  
                                        
                                        
//                                         console.log("newa: "+newa+", newb: "+newb);
//                                         // Now Movin the token Individually in single step
//                                         removeToken(newa,t);
//                                         addToken(newb, t, p);
//                                     }else if(ii == farAwayFromNewColorPath+1){
//                                         newa = String(splitString(a, "string")) + String((Number(splitString(a, "num")))+ii-1);
    
//                                         //Deciding b Position Individually
//                                         newb = String(splitString(b, "string")) + String((ii-farAwayFromNewColorPath));  
                                        
//                                         console.log("newa: "+newa+", newb: "+newb);
//                                         // Now Movin the token Individually in single step
//                                         removeToken(newa,t);
//                                         addToken(newb, t, p);
//                                     }else{
//                                         newa = newb;
    
//                                         //Deciding b Position Individually
//                                         newb = String(splitString(newa, "string")) + String((Number(splitString(newa, "num")))+1);  
    
//                                         console.log("newa: "+newa+", newb: "+newb);
//                                         // Now Movin the token Individually in single step
//                                         removeToken(newa,t);
//                                         addToken(newb, t, p);
//                                     }
    
//                     }
     
//             }

//         }

//             // JAB B PAR KOE TOKEN HOGA TOH YEHA PE RUN HOGA,,, YEHA PAR SINGLE MOVE KARWANA HAI PAHLE THEN SEE WHY TOKEN CUTTING MIDDLE TOKENS
//             // removeToken(a,t);
//             // addToken(b, t, p);

//             play(playerCycle(p, diceValue));
            
//         }
//     } else {
//         console.log("moving here second else");

//         // Now getting how much token is far away from that new color path
//         let farAwayFromNewColorPath = 13 - Number(splitString(a, "num"));

//         if(opening){
//             removeToken(a,t);
//             addToken(b, t, p);

//             opening = false;
//         }else{
    

//         for (let ii=1; ii<=diceValue; ii++){

//             console.log(`ii: ${ii}`);

//             if(ii === diceValue){
//                 console.log("true kar diya last move");
//                 lastTokenMove = true;
//             }

            
            
//                 // Before deciding b check if token moving from one color path to another color path
//                 if(splitString(a, "string") == splitString(b, "string").toLowerCase()){
//                     // in same color path
//                     console.log("same color path");

//                         console.log(String(splitString(b, "string")));

//                         // Check if the token is entering in the wining path
//                         if(String(splitString(b, "string")) == "R" || String(splitString(b, "string")) == "G" || String(splitString(b, "string")) == "Y" || String(splitString(b, "string")) == "B"){

//                             // var enteringInWinning  = true;

//                             var farFromEnteringInWinningPath = 7 - Number(splitString(a,"num"));

//                             console.log(farFromEnteringInWinningPath);

//                             // Deciding a Position individually
//                             if(ii == 1 && farFromEnteringInWinningPath != 0){
//                                 console.log("first single move same color path");
//                                 newa = a;
//                             }else if(ii == 1 && farFromEnteringInWinningPath == 0){
//                                 newa = a;
//                                 enteringInWinning = true;

//                             }else if(ii <= farFromEnteringInWinningPath){
//                                 newa = newb;
//                             }else if(ii == Number(farFromEnteringInWinningPath)+1){
//                                 newa = newb;
//                                 enteringInWinning = true;
//                             }else{
//                                 console.log("single move same color path");
//                                 console.log(a);
//                                 newa = newb;
//                             }





//                         }else{
//                             // Deciding a Position individually
//                             if(ii == 1){
//                                 console.log("first single move same color path");
//                                 newa = a;
//                             }else{
//                                 console.log("single move same color path");
//                                 newa = String(splitString(a, "string")) + String(Number(splitString(a, "num")) + ii -1);
//                             }


//                         }

                        

//                             //Deciding b Position Individually

//                             if(enteringInWinning){

//                                 console.log(enteringInWinning);
                                
//                                 newb = String(splitString(b, "string")) + String(1);

//                                 console.log("entering in the winning path and newb: " + newb);
//                                 enteringInWinning = false;

//                             }else{
//                                 newb = String(splitString(newa, "string")) + String(Number(splitString(newa, "num")) + 1);
//                             }

//                             console.log("newa: "+newa+", newb: "+newb);

//                             // Now Movin the token Individually in single step
                            
//                             removeToken(newa,t);
//                             addToken(newb, t, p);
                            
//                 }else{
//                     // in different color path
//                                 // Deciding a Position individually
//                                 if(ii == 1 && farAwayFromNewColorPath != 0){
//                                     newa = a;

//                                     //Deciding b Position Individually
//                                     newb = String(splitString(newa, "string")) + String((Number(splitString(newa, "num")))+1);  
                                    
                                    
//                                     console.log("newa: "+newa+", newb: "+newb);
//                                     // Now Movin the token Individually in single step
//                                     removeToken(newa,t);
//                                     addToken(newb, t, p);


//                                 }else if (ii <= farAwayFromNewColorPath){
//                                     newa = String(splitString(a, "string")) + String((Number(splitString(a, "num")))+ii-1);

//                                     //Deciding b Position Individually
//                                     newb = String(splitString(newa, "string")) + String((Number(splitString(newa, "num")))+1);  
                                    
                                    
//                                     console.log("newa: "+newa+", newb: "+newb);
//                                     // Now Movin the token Individually in single step
//                                     removeToken(newa,t);
//                                     addToken(newb, t, p);
//                                 }else if(ii == farAwayFromNewColorPath+1){
//                                     newa = String(splitString(a, "string")) + String((Number(splitString(a, "num")))+ii-1);

//                                     //Deciding b Position Individually
//                                     newb = String(splitString(b, "string")) + String((ii-farAwayFromNewColorPath));  
                                    
//                                     console.log("newa: "+newa+", newb: "+newb);
//                                     // Now Movin the token Individually in single step
//                                     removeToken(newa,t);
//                                     addToken(newb, t, p);
//                                 }else{
//                                     newa = newb;

//                                     //Deciding b Position Individually
//                                     newb = String(splitString(newa, "string")) + String((Number(splitString(newa, "num")))+1);  

//                                     console.log("newa: "+newa+", newb: "+newb);
//                                     // Now Movin the token Individually in single step
//                                     removeToken(newa,t);
//                                     addToken(newb, t, p);
//                                 }

//                 }
 
//         }

//         }

        
//         play(playerCycle(p, diceValue));
//     }
// }

var endGame = function() {
    console.log("Game finished in " +moveCtr +" moves with players in position: "+ winners);
    
    var temp = document.getElementById("dialogueFinish");
    winners.forEach(w => {
        temp.querySelector("#"+ w +"Win").innerHTML = winners.indexOf(w) + 1;
    });

    function reload() {
        reload = location.reload();
    }
    temp.querySelector(".select button").addEventListener("click", reload, false);

    temp.style.display = "flex";
}

var finishToken=function (a, t, diceValue) {
    removeToken(a, t);
    mapTally.set(t[0], mapTally.get(t[0])+1);
    mapExtraRoll.set(t[0],mapExtraRoll.get(t[0])+1);
    var temp = document.getElementById(t[0]+'Score');
    temp.innerHTML = mapTally.get(t[0]);
    if(mapTally.get(t[0])==4) {
        winners.push(t[0]);
        temp.classList.add("win");
        let index = playerColors.indexOf(t[0]);
        playerColors.splice(index, 1);
        if(winners.length>=(playerNo-1)){
            playerColors.every(element => {
                if(!winners.includes(element)){    
                    winners.push(element);
                    return false;
                }
                return true;
            });
            endGame();
            return;
        } else{
            let p=t[0];
            do{
                p=next(p);
            }while(!playerColors.includes(p));
            play(p);
        }
    }
    play(playerCycle(t[0], diceValue));
}

var checkMove = function (n, p) {
    var total = 0, truth = 0;
    Array.from(document.querySelectorAll(".block #"+p+"Token")).forEach(element => {
        let temp = element.parentElement.id;
        total++;
        if(temp[0]===temp[0].toLowerCase()) truth++;
        else if((parseInt(temp.slice(1))+n)<=6) truth++;
        else if((n==6) && mapLocker.get(p)>0) truth++;
    })
    if(truth)   return true;
    else return false;
}

var calculateMove = function (a, n, p) {
    console.log("calculateMove me hu");
    var tempToken=p+"Token";

    // getting old position number of token
    var srcNo=Number(a.slice(1));


    // making new position number
    var destNo=srcNo+n;

    //starting move
    if(a.includes("Holder",1)){
        if(n==6) {
            // opening
            opening = true;
            move(a, p+'9', tempToken, p, n);
            mapLocker.set(p, mapLocker.get(p)-1);
        } else {
            alert("Choose a token in play! New token only opens with a six.");
            playerTurn(p, n);
        }
    }

    //in last leg of game
    else if(a[0]==p && destNo>7 && srcNo<8){
        if(destNo<=12){
            move(a, p.toUpperCase()+(destNo-7), tempToken, p, n);
        }
        else if(destNo==13){
            finishToken(a, tempToken, n);
        }
        else {
            alert("Error in calculating moves. Returning to next player.");
            play(playerCycle(p, n));
        }
    }
    //before endgame
    else if(a[0]==p.toUpperCase()){
        if(destNo==6){
            finishToken(a, tempToken, n);
        } else if(destNo<6){
            move(a, p.toUpperCase()+destNo, tempToken, p, n);
        } else if(destNo>6){
            if(checkMove(n, p)) {
                alert("Not enough blocks left to traverse! Select a different token.");
                playerTurn(p, n);
            } else {
                alert("Not enough blocks left to traverse! Next player's turn.");
                play(playerCycle(p, n));
            }
        }
    }
    //normal movement

    else{
        if(destNo<=13){
            move(a, a[0]+destNo, tempToken, p, n);
        } else {
            move(a, next(a[0])+(destNo-13), tempToken, p, n);
        }
    }
}


var changeDicePicture = function(diceColor, diceValue) {
    var diceColor = diceColor;
    var previousDice = diceColor;
    
    var temp2 = diceColor + "dice";

    var temp3 = diceColor + "dice";
    previousDicePicture = document.getElementById(temp3);

    switch(diceColor){
        case 'r': diceColor="red"; break;
        case 'g': diceColor="green"; break;
        case 'y': diceColor="#ffd000"; break;
        case 'b': diceColor="blue"; break;
    }
    // console.log(diceColor);
    var dice1='<svg id="dice1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-one" class="svg-inline--fa fa-dice-one fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="'+diceColor+'" d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM224 288c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>';
    var dice2='<svg id="dice2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-two" class="svg-inline--fa fa-dice-two fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="'+diceColor+'" d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm192 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>';
    var dice3='<svg id="dice3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-three" class="svg-inline--fa fa-dice-three fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="'+diceColor+'" d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>';
    var dice4='<svg id="dice4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-four" class="svg-inline--fa fa-dice-four fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="'+diceColor+'" d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm192 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>';
    var dice5='<svg id="dice5" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-five" class="svg-inline--fa fa-dice-five fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="'+diceColor+'" d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm96 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>';
    var dice6='<svg id="dice6" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice-six" class="svg-inline--fa fa-dice-six fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="'+diceColor+'" d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.65-64-64-64zM128 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm192 192c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>';
    
    // console.log(temp2);


    var dicePicture = document.getElementById(temp2);

    switch(diceValue) {
        case 1: dicePicture.innerHTML = dice1; break;
        case 2: dicePicture.innerHTML = dice2; break;
        case 3: dicePicture.innerHTML = dice3; break;
        case 4: dicePicture.innerHTML = dice4; break;
        case 5: dicePicture.innerHTML = dice5; break;
        case 6: dicePicture.innerHTML = dice6; break;
    }

    console.log("dice picture changed!");

}

var playerTurn = function(p, diceValue) {
    console.log("in the playerTurn Function");
    if(((mapLocker.get(p)+mapTally.get(p)) == 4) && diceValue!=6 ){

        // first time no six
        setTimeout(() => {
            
            play(playerCycle(p, diceValue));
    
        }, 1000);

        
        
    } else {
        console.log("Player not runned his goti.");
        var isMoved = false;
        var returnId = function (e) {
            if(isMoved === false){
                let temp=e.target;
                console.log("not moved yet.. temp ki value hai: " + temp);
                while((!temp.classList.contains("block"))&&(!temp.classList.contains("holder"))){
                    temp=temp.parentElement;
                    console.log("Right goti clicked, parent element: "+temp);
                }
                var ele=temp.querySelector("#"+p+"Token");
                console.log("token selected: #" + p +"Token")
                if(ele){
                    isMoved = true;
                    console.log("ab move karo, isko"+temp.id + " itne value se " + diceValue + " and p is equal to " + p);
                    calculateMove(temp.id, diceValue, p);

                }
            } else return;
        }
        let collection = document.getElementsByClassName("block");
        for(item of collection){
            item.onclick = returnId;
        }
        for(var i=1; i<5; i++) {
            document.getElementById(p+"Holder"+i).onclick = returnId;
        }
    }
}

var rollDice = function(p) {
    var temp4 = p+"dice";
    var randomButton = document.getElementById(temp4);
    var diceValue;
    var isDiceRolled = false;

    randomButton.onclick = function () {
        if(isDiceRolled === false){
            isDiceRolled = true;

            function getRandomNumber(min, max){
                return Math.floor(Math.random()* (max - min +1)) + min;
            }

            diceValue= getRandomNumber(1,6);
            console.log("dice rolled, value is "+diceValue);
            lastTokenMove = false;
            changeDicePicture(p, diceValue);
            playerTurn(p, diceValue);
            return;
        }
    }

    if(isDiceRolled === true){
        pnext = playerCycle(p, diceValue);
    }
}

var playerCycle = function(p, dice) {
    if(dice==6){
        console.log("player cycle first if me hu");
        return p;

    } else if(mapExtraRoll.get(p)>0 && checkMove(dice, p)){
        mapExtraRoll.set(p, mapExtraRoll.get(p)-1);
        console.log("player cycle first else if me hu");
        
        return p;
    } else {
        mapExtraRoll.set(p, 0);
        console.log("player cycle first else me hu");


        do{
            p=next(p);
        }while(!playerColors.includes(p))
        
        
        return p;
    }
}

var setPlayer = function(p){
    if(p != previousDice){
        previousDicePicture.innerHTML = "";
    }
    
    console.log("isme toh aata hi hu");
    changeDicePicture(p, 1);
}

var play=function(p) {
    moveCtr++;
    setPlayer(p);
    rollDice(p);
}

var initialiseGame = function(){
    playerColors.forEach(element1 => {
        [1,2,3,4].forEach(element2 => {
            var id=element1+"Holder"+element2;
            addToken(id, element1+'Token');
            if(mapLocker.has(element1)) mapLocker.set(element1, mapLocker.get(element1)+1);
            else    alert("Error during initialisation! Token mismatch.");
        });
        // document.getElementById(element1+"Score").classList.add("selected");
        var temp1 = "r";
        changeDicePicture(temp1, 1);
    });
    var p=playerColors[0];
    play(p);
}
