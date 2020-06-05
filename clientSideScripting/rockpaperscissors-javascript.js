/* Front-end scripting for the rock, paper, scissors web app */

let userScore = 0;
let computerScore = 0;
const userScore_spanElement = document.getElementById("user-score");
const computerScore_spanElement = document.getElementById("computer-score");
const scoreBoard = document.getElementById("score-board");
const resultsDiv = document.getElementById("result");
const optionRock = document.getElementById("rock");
const optionPaper = document.getElementById("paper");
const optionScissors = document.getElementById("scissors");
const closingButton = document.getElementById("closing-button");
const modalBox = document.getElementById("modal-1");
const imageModalBox = document.getElementById("image-result");
const titleModalBox = document.getElementById("modal-box-title");

// functions to apply to acommodate the styling of the page 

function smallMobileDevices() {
    var browserWidth = document.documentElement.clientWidth;
    var browserHeight = document.documentElement.clientHeight;

    if (browserWidth < 350) {
        modalBox.style.minWidth = "300px";
        closingButton.style.marginTop = "5px";
        closingButton.style.height = "10%";
        imageModalBox.style.width = "120px";
        imageModalBox.style.height = "120px";
    }
}

// Functions related to the game 

function getComputerChoice() {
    var choices = ["rock", "paper", "scissors"];
    var numberChoice = Math.floor(Math.random() * 3);
    var choiceComputer = choices[numberChoice];
    return choiceComputer;
}

// Function that shows the images

function showImageWinners(winningHand) {
    var rockUrl = "images/rock.png";
    var paperUrl = "images/paper.png";
    var scissorsUrl = "images/scissors.png";
    switch (winningHand) {
        case "rock":
            imageModalBox.src = rockUrl;
            break;
        case "paper":
            imageModalBox.src = paperUrl;
            break;
        case "scissors":
            imageModalBox.src = scissorsUrl;
            break;
    }
}

function anotherAjaxRequestDifferent() {
    var rockPaperScissorsDataObject = {
        namewinner: "User",
        winningHand: "rock",
        scoreUser: 3,
        scoreCpu: 2,
   };
   var rockPaperScissorsDataString = JSON.stringify(rockPaperScissorsDataObject);
   var rockPaperScissorsJavascriptObject = JSON.parse(rockPaperScissorsDataString);
    $.ajax({
               url: "backEndScripting/rockpaperscissorsbackend.php",
               type: "POST",
               dataType: "text",
               contentType: "application/json",
               data: rockPaperScissorsDataObject,
               success: function(data) {
                   console.log("The data was sent successfully!");
                   console.log(data);
               },
               error: function (xhr, textStatus, error) {
                   console.log(xhr.statusText);
                   console.log(textStatus);
                   console.log(error);
               }
          });
}

function ajaxGetProtocol() {
  var rockPaperScissorsDataObject = {
        namewinner: "User",
        winningHand: "rock",
        scoreUser: 3,
        scoreCpu: 2,
   };
   var rockPaperScissorsDataString = JSON.stringify(rockPaperScissorsDataObject);
   var rockPaperScissorsJavascriptObject = JSON.parse(rockPaperScissorsDataString);
  
   $.ajax({
   type: "GET",
   dataType: "text",
   url: "backEndScripting/rockpaperscissorsbackend.php",
   data: ({'information': rockPaperScissorsDataString}),
   success: function(data) {
       console.log("The request was successful!");
       console.log(data); 
    },
   error: function (xhr, textStatus, error) {
       console.log(xhr.statusText);
       console.log(textStatus);
       console.log(error);
    }
  });
}

function ajaxRequestResults(winnerEvent, winningHand, userScore, computerScore) {

        // Variables for the request 
        var done = 4;
        var success = 200;
        var phpUrl = "backEndScripting/rockpaperscissorsbackend.php";

        function response() {
            console.log(newXHR.responseText);
        }

        var newXHR = new XMLHttpRequest();

        newXHR.open( 'POST', phpUrl, true );

        newXHR.onreadystatechange = function () {
            if (newXHR.readyState == done && newXHR.status == success) {
                   response();               
                   //alert(newXHR.responseText);
                } else {
                   console.log('Error: ' + newXHR.status); // An error occurred during the request.
            }
        }

        // Sending the data as form 
        var data = new FormData();

        data.append('namewinner', 'user');
        data.append('winningHand', 'rock');
        data.append('scoreUser', '3');
        data.append('computerscore', '4');

        //Sending the data as object

        var rockPaperScissorsDataObject =  {
            namewinner: "User",
            winningHand: "rock",
            scoreUser: 3,
            scoreCpu: 2,
        };

        var rockPaperScissorsDataToPhp = JSON.stringify(rockPaperScissorsDataObject);

        // Sending data as URL parameters 

        var nameWinnerSent = winnerEvent;
        var winningHandSent = winningHand;
        var scoreUserSent = userScore;
        var scoreCpuSent = computerScore;

        var dataAsUrl = "nameWinner=" + nameWinnerSent + "&winningHand=" + winningHandSent + "&scoreUser=" + scoreUserSent + "&scoreCpu=" + scoreCpuSent;

        newXHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //newXHR.setRequestHeader('Content-type', 'application/json');

        //newXHR.setRequestHeader('Content-type', 'text/plain');

        // newXHR.send( rockPaperScissorsDataToPhp );

        // newXHR.send(data); // Actually send the data 
        newXHR.send(dataAsUrl);


        //var somethingplusurl = url + "Algo aqui";
        //var dataSend = data + " sending right now";
        //var successAfter = "if it worked then: " + success;
        //console.log(somethingplusurl + datasend + success);
}

function userWin(winningHand) {
   userScore++;
   userScore_spanElement.innerHTML = userScore;
   titleModalBox.innerText = "The winner is... User!"
   showImageWinners(winningHand);
   var rockPaperScissorsDataObjectUserWin = {
        namewinner: "User",
        winningHand: winningHand,
        scoreUser: userScore,
        scoreCpu: computerScore,
   };
   var winnerEvent = rockPaperScissorsDataObjectUserWin["namewinner"];
   var rockPaperScissorsDataString = JSON.stringify(rockPaperScissorsDataObjectUserWin);
   var rockPaperScissorsJavascriptObjectAgain = JSON.parse(rockPaperScissorsDataString);
   //console.log(rockPaperScissorsJavascriptObject);
   alert(winningHand);
//    $.ajax({
//        url: "rockpaperscissorsbackend.php",
//        type: "POST",
//        dataType: "text",
//        contentType: "application/json",
//        data: ({'information': rockPaperScissorsDataString}),
//        success: function(data) {
//            console.log("The data was sent successfully!");
//            console.log(data);
//        },
//        error: function (xhr, textStatus, error) {
//            console.log(xhr.statusText);
//            console.log(textStatus);
//            console.log(error);
//        }
//   });
   //anotherAjaxRequestDifferent();
   //ajaxGetProtocol();
   ajaxRequestResults(winnerEvent, winningHand, userScore, computerScore);
   modalBox.style.visibility = "visible";
   //setTimeout(function() {
       //window.location.href = "rockpaperscissorsbackend.php" 
   //}, 5000);
}

function userLose(winningHand) {
    computerScore++;
    computerScore_spanElement.innerHTML = computerScore;
    titleModalBox.innerText = "The winner is... Computer!";
    showImageWinners(winningHand);
    var rockPaperScissorsDataObjectUserLose = {
        namewinner: "Computer",
        winningHand: winningHand,
        scoreUser: userScore,
        scoreCpu: computerScore,
    };
    var winnerEvent = rockPaperScissorsDataObjectUserLose["namewinner"];
    var rockPaperScissorsDataString = JSON.stringify(rockPaperScissorsDataObjectUserLose);
    var rockPaperScissorsJavascriptObjectAgain = JSON.parse(rockPaperScissorsDataString);
    //console.log(rockPaperScissorsJavascriptObject);
    alert(winningHand);
    // $.ajax({
    //     url: "rockpaperscissorsbackend.php",
    //     type: "POST",
    //     dataType: "text",
    //     data: ({'information': rockPaperScissorsDataString}),
    //     success: function(data) {
    //         console.log("The data was sent successfully!");
    //         console.log(data);
    //     },
    //     error: function (xhr, textStatus, error) {
    //         console.log(xhr.statusText);
    //         console.log(textStatus);
    //         console.log(error);
    //     }
    // });
    //anotherAjaxRequestDifferent();
    //ajaxGetProtocol();
    ajaxRequestResults(winnerEvent, winningHand, userScore, computerScore);
    modalBox.style.visibility = "visible";
    //setTimeout(function() {
        //window.location.href = "rockpaperscissorsbackend.php" 
    //}, 5000);
}

function draw(onlyhandpick) {

    var rockPaperScissorsDataObjectTie = {
        namewinner: "Draw",
        winningHand: onlyhandpick,
        scoreUser: userScore,
        scoreCpu: computerScore,
    };

    var winnerEvent = rockPaperScissorsDataObjectTie["namewinner"];

    titleModalBox.innerText = "The winner is... its a draw!";
    
    showImageWinners(onlyhandpick);

    alert(onlyhandpick);

    //anotherAjaxRequestDifferent();

    //ajaxGetProtocol();

    ajaxRequestResults(winnerEvent, onlyhandpick, userScore, computerScore);

    modalBox.style.visibility = "visible";

}


function game(userChoice) {
    var computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rockscissors":
        case "paperrock":
        case "scissorspaper":
            userWin(userChoice);
            break;
        case "scissorsrock":
        case "rockpaper":
        case "paperscissors":
            userLose(computerChoice);
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            draw(userChoice);
            break;
    }
}

function main() {

    optionRock.addEventListener("click", function() {
        game("rock");
    });

    optionPaper.addEventListener("click", function() {
        game("paper");
    });

    optionScissors.addEventListener("click", function() {
        game("scissors");
    });

    closingButton.addEventListener("click", function() {
        /* eliminate transition for the button */
        closingButton.style.transition = "all 0s";
        /* close modal box */
        modalBox.style.visibility = "hidden";
    });

    smallMobileDevices();

}

main();



