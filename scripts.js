        let playerScore = 0;
        let computerScore = 0;
        function computerPlay() {
            let plays = ["rock" , "paper" , "scissors"];
            let play = plays[Math.floor(Math.random()*3)];
            let buttonToChange = document.querySelector(`.computerArea>.btn-area>#${play}-btn`);
            buttonToChange.classList.toggle('selected');
            return play;
        }

        function playRound(playerSelection, computerSelection){
            const para = document.querySelector(".resultPara");
            if(playerSelection===computerSelection){
                para.textContent= "Nobody won! " + computerSelection + " equals " + playerSelection;  
            }else if(playerSelection == "scissors" && computerSelection == "rock" 
            || playerSelection == "rock" && computerSelection == "paper"
            || playerSelection == "paper" && computerSelection == "scissors"){
                para.textContent= "You lose! " + computerSelection + " beats " + playerSelection;
                increaseScore("computer");
            }else{
                para.textContent= "You won! " + playerSelection + " beats " + computerSelection;
                increaseScore("player");
            }
            
        }

        function increaseScore(entity){
            const scoreBoard = document.querySelector(`.${entity}Area>.scoreBoard`);
            let score = entity=="player"? ++playerScore : ++computerScore;
            scoreBoard.innerHTML="Score: "+ score;
            if (score==5){
                determineOverallWinner();
            }
        }

        function determineOverallWinner(){
            const para = document.querySelector(".resultPara");
            const breakLine= document.createElement("br");
            const resetBtn = document.createElement("button");
            resetBtn.addEventListener('click', ()=>{
                playerScore=0;
                computerScore=0;
                const scoreBoards = document.querySelectorAll(`.scoreBoard`);
                scoreBoards.forEach((board)=>{
                    board.innerHTML="Score: 0";
                });
                enablePlayButtons();
                para.textContent="";
            });
            resetBtn.textContent="RESET";
            resetBtn.style.width="10%"
            if(playerScore>computerScore){
                para.textContent= "You win the Game";
            }else{
                para.textContent= "The computer wins the Game";
            }  
            para.appendChild(breakLine);
            para.appendChild(resetBtn);
            disablePlayButtons();
        }

        function disablePlayButtons(){
            const buttons = document.querySelectorAll(".playerArea button");
            buttons.forEach((button) => {
                button.style.curser="not allowed";
                button.style.pointerEvents= "none";
            });
        }
    
        function enablePlayButtons(){
            const buttons = document.querySelectorAll(".playerArea button");
            buttons.forEach((button) => {
                button.style.curser="allowed";
                button.style.pointerEvents= "all";
                button.classList.remove('selected');
            });
        }

        const playerButtons = document.querySelectorAll(".playerArea>.btn-area button");
        playerButtons.forEach((button) => {
            button.addEventListener('click', function(e){
                const buttons = document.querySelectorAll("button");
                buttons.forEach((button) => {
                    button.classList.remove('selected');
                });
                button.classList.toggle("selected");
                playRound(e.target.value,computerPlay());
            });
        });