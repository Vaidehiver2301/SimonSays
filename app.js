let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let highsc=0;
let btns =["yellow", "red", "purple", "green"];
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("started!");
        started=true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random button choose
    let randIdx=Math.floor(Math.random()*3);
    let randClr=btns[randIdx];
    let randBtn=document.querySelector(`.${randClr}`);
    gameSeq.push(randClr);
    btnFlash(randBtn);
}

function checkAns(idx){
    console.log(`curr level: ${level}`);

    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        h2.innerText=`GAME OVER! Press any key to restart. Current Score:${level-1}0`;
        gameOver();
        setTimeout(reset,1000);
    }
}

function btnPress(){
    // console.log(this);
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(bt of allBtns){
    bt.addEventListener("click", btnPress);
}

let high=document.querySelector("h4");
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    if(level>highsc){
        high.innerText=`Highest Score: ${level}0`;
    }
    level=0;
}

let body=document.querySelector("body");
function gameOver(){
    body.classList.add("over");
    setTimeout(()=>{
        body.classList.remove("over");
    },250);
}

let icon=document.querySelector(".help i");
let info=document.querySelector(".info");
icon.addEventListener("click", function(){
    info.style.display="block";
    setTimeout(()=>{
        info.style.display="none";
    },10000);
});