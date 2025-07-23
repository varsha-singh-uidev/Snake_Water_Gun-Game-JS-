// all the element get from the dom
let head2 = document.querySelector(".head2");//that change dynamiclly after the user choice
let snake = document.querySelector(".snake");
let water = document.querySelector(".water");
let gun = document.querySelector(".gun");
let computerImg = document.querySelector("#computer-choice");
let message = document.querySelector(".message");
let display_container = document.querySelector(".display_container");
let user_score_display = document.querySelector(".user_score_display");
let comp_score_display = document.querySelector(".comp_score_display");
let both_container = document.querySelector(".both_container")//container that apply the style when the user chose its move
let head3 = document.querySelector(".head3");
let button = document.querySelector(".button");
let start = document.querySelector(".start");
let ruleText = document.querySelector(".rule");
let sound = new Audio("sound.mp3");
let win_msg = document.querySelector(".win_msg");

// globall variable
let user_choice;
let user_score = 0;
let comp_choice;
let comp_score = 0;

// array of the image for the random function
let array = ["photos/snake.png", "photos/Gun.png", "photos/Water.png"];

// restart function logic
function restart(){
    head2.textContent = "Choose Your Move";//1
    both_container.classList.remove("both_container_style");//2
    user_choice = "";
    comp_choice = "";
    head3.textContent = "";
    computerImg.src = "";
    button.style.display = "none";
    display_container.style.display = "none";
    user_score = 0;
    comp_score = 0;
    message.textContent = "";
    user_score_display.textContent = "";
    comp_score_display.textContent = "";
};

function effect(){
    const glow = document.createElement("div");
    glow.classList.add("glow-effect");
    document.body.appendChild(glow);
    setTimeout(() => {
        document.body.removeChild(glow);
        document.querySelector(".hidden_container").style.opacity = 1;
        restart();
    },1500)
};

// restart button logic that call the function restart()
button.addEventListener("click", function() {
    restart();
});

// it was the main logic of game that shoows the score and message who wins
function game_start(){
    button.style.display = "block";
    display_container.style.display = "flex";
    if(user_choice === comp_choice){
        message.textContent = "OOh😮 the match is tie";
    }
    if(user_choice === "snake"){
        if(comp_choice === "water"){
            message.textContent = "🥳You win this round";
            user_score += 1;
        }
        else if(comp_choice === "gun"){
            message.textContent = "💻Computer win this round";
            comp_score += 1;
        }
    }
    if(user_choice === "water"){
        if(comp_choice === "gun"){
            message.textContent = "🥳You win this round";
            user_score += 1; 
        }
        else if(comp_choice === "snake"){
            message.textContent = "💻Computer win this round";
            comp_score += 1; 
        }
    }
    if(user_choice === "gun"){
        if(comp_choice === "snake"){
            message.textContent = "🥳You win this round";
            user_score += 1; 
        }
        else if(comp_choice === "water"){
            message.textContent = "💻Computer win this round";
            comp_score += 1; 
        }
    }
    // dispaly the messages 
    user_score_display.textContent = user_score;
    comp_score_display.textContent = comp_score;  
    
    // winning condition for the user
    if(user_score === 10){
        document.querySelector(".hidden_container").style.opacity = '0.3';
        sound.play();
        sound.volume = 0.2;
        win_msg.textContent = "You Win 🎉";
        confetti({
            particleCount : 300,
            spread : 150,
            ticks: 200,
        });
        setTimeout(() => {
            confetti();
            win_msg.innerHTML += `<br>
                                  <button class="yes">Play Again</button> 
                                  <button class="no">Exit</button>`;
        
            document.querySelector(".yes").addEventListener("click", () => {
                sound.pause();
                win_msg.textContent = ""; // clear message
                effect();
            });
        
            document.querySelector(".no").addEventListener("click", () => {
                sound.pause();
                win_msg.textContent = "Thanks for playing! 👋";
                // code to display the front screen again
                setTimeout(() => {
                win_msg.textContent = "";
                document.querySelector(".hidden_container").style.opacity = '1';
                restart();
                ruleText.classList.remove("hidden");
                start.classList.remove("hidden");
                ruleText.style.display = "block";
                start.style.display = "inline-block";
                both_container.style.display = "none";
            }, 1500);
            });
        }, 2000);
    }

    // code if the computer score == 10
    if(comp_score === 10){
        document.querySelector(".hidden_container").style.opacity = '0.3';
        sound.play();
        sound.volume = 0.2;
        win_msg.textContent = "Computer Win 🎉";
        setTimeout(() => {
            win_msg.innerHTML += `<br>
                                  <button class="yes">Play Again</button> 
                                  <button class="no">Exit</button>`;
            document.querySelector('.yes').addEventListener("click", function() {
                sound.pause();
                win_msg.textContent = "";
                effect();
            });
            document.querySelector('.no').addEventListener("click", function() {
                sound.pause();
                win_msg.textContent = "Thanks for playing! 👋";
                setTimeout(() => {
                  win_msg.textContent = "";
                  document.querySelector(".hidden_container").style.opacity = "1";
                  restart();
                  ruleText.classList.remove("hidden");
                  start.classList.remove("hidden");
                  ruleText.style.display = "block";
                  start.style.display = "inline-block";
                  both_container.style.display = "none";
                }, 1500);
            });
        },2000);
    }
};

// used random function and globall declared array to select the computer choice
function computer_turn(){
    let a = Math.floor(Math.random() * 3);
    if(a == 0){
        comp_choice = "snake";
    }
    else if(a == 1){
        comp_choice = "gun";
    }
    else{
        comp_choice = "water";
    }
    head3.textContent = "Computer Choice";
    computerImg.src = array[a];
    game_start();
};

// this function stores the repeative code that call each time when the user select any option
function second_step(){
    computer_turn();
    both_container.classList.add("both_container_style");
    head2.textContent = "Your weapon";
};

// snake function code
snake.addEventListener("click", function() {
    user_choice = "snake";
    second_step();
});

// water buuton code
water.addEventListener("click", function() {
    user_choice = "water";
    second_step();
});

// gun button code
gun.addEventListener("click", function() {
    user_choice = "gun";
    second_step();
});

// only runs at onces when the window is load to tell the user about the rule of the game
start.addEventListener("click", function() {
    ruleText.classList.add("hidden");
    start.classList.add("hidden");
    setTimeout(() => {
        ruleText.style.display = "none";
        start.style.display = "none";
        both_container.style.display = "flex";
    }, 500); // Match transition time according to the css
});



