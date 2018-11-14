// Loads JS when window is ready
$(document).ready(function(){

    // Bind win variable to track wins
    var wins = 0;
    // Bind losses variable to track losses
    var losses = 0;
    // Set playGame to true to use as validation for disabling butons once player wins or loses
    var playGame = true;
    // Sets playerNumber to 0 to update the sum of diamonds pressed later
    var playerNumber = 0;
    // Sets goalNumber to 0 later updated to a random # between 19-120
    var goalNumber = 0;
    // Later updated with a random # between 1-12 to be assigned to the specific diamond
    var diamondOne = 0;
    // Later updated with a random # between 1-12 to be assigned to the specific diamond
    var diamondTwo = 0;
    // Later updated with a random # between 1-12 to be assigned to the specific diamond
    var diamondThree = 0;
    // Later updated with a random # between 1-12 to be assigned to the specific diamond
    var diamondFour = 0;
    
    console.log ("Before keypress " + wins);
    console.log ("Before keypress " + losses);

    // Invokes gameStart function
    gameStart();

    // gameStart function generates random goalNumber, invokes randomDiamondNum 
    //function to generate random number from 1-12 for daimonds #1-4, 
    //then displays wins, losses, and goalNumber in the html
    function gameStart (){
         
        // Hides Play Again? button when gameStart function called
        $("#playAgain").css("display", "none");
        $("#winAlert").css("display", "none");
        $("#loseAlert").css("display", "none");
        
        // Generates random number to reach from 19-120
        goalNumber = Math.floor(Math.random() * 101 + 19);
        console.log (goalNumber);

        diamondOne = randomDiamondNum ();
        console.log (diamondOne);

        diamondTwo = randomDiamondNum ();
        console.log (diamondTwo);

        diamondThree = randomDiamondNum ();
        console.log (diamondThree);

        diamondFour = randomDiamondNum ();
        console.log (diamondFour);

        // wins, losses, goalNumber, and playerNumber are updated in the HTML
        $('#wins').html("Wins: " + wins);

        $('#losses').html("Losses: " + losses);

        $('#goalNumber').html("Goal: " + goalNumber);

        $('#playerNumber').html("Your total: " + playerNumber);
    };
       
        $('#diamondOne').click(function (){
            console.log ("Im in diamond one click")
            diamondClick (diamondOne);
        });
        $('#diamondTwo').click(function (){
            diamondClick (diamondTwo);
        });
        $('#diamondThree').click(function (){
            diamondClick (diamondThree);
        });
        $('#diamondFour').click(function () {
            diamondClick (diamondFour);
        });
       

        // randomDiamondNumb function generates a random number between 1-12 to assign to each diamond
        function randomDiamondNum (){
            return Math.floor(Math.random() * 12 + 1);
            }

        // diamondClick function is invoked when a diamond is pressed:
        // Random value of the diamond is set to diamondNumber as the parameter to be added to playerNumber
        // HTML is updated to reflect the new playerNumber
        function diamondClick (diamondNumber) {
            console.log ("Im in diamondclick before if");
            if (playGame == true) {
                playerNumber = playerNumber + diamondNumber;
                console.log (playerNumber);
                $('#playerNumber').html("Your total: " + playerNumber);

                // If playerNumber equals the goalNumber then the player wins:
                // Wins go up by 1 and are then updated in the HTML
                // The Play Again? button appears
                // playerNumber is set back to zero, but is not updated in the HTML so the player can see that it matches the goalNumber
                // winAlert is displayed
                // playGame is set to false so that until the player clicks the Play Again button the diamonds cannot be clicked
                if (playerNumber == goalNumber) {
                    wins++;
                    $("#playAgain").css("display", "block");
                    $('#wins').html("Wins: " + wins);
                    $("#winAlert").css("display", "block");
                    playGame = false;
                    } 

                // If playerNumber is greater than the goalNumber it means the player has lost:
                // Losses increase by 1 and then updated in the HTML
                // Play Again? button appears
                // loseAlert is displayed
                // playerNumber reset to 0 and playGame is set to false
                if (playerNumber > goalNumber) {
                   
                    losses++;
                    $('#playAgain').css("display", "block");
                    $('#losses').html("Losses: " + losses);
                    $("#loseAlert").css("display", "block");
                    playGame = false;
                }
            };
        };
        // When Play Again? button is clicked:
        // playGame is set to true so the Diamonds can be clicked
        // HTML is updated to the playerNumber which has been reset to 0
        // gameStart function called to restart the game
        $('#playAgain').click(function (){
            playGame = true;
            playerNumber = 0;
            $('#playerNumber').html("Your total: " + playerNumber);
            gameStart();
        });
});