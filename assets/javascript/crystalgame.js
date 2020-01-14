// 1. Create variables for targetScore, currentScore, wins, losses
let targetScore = Math.floor(Math.random() * (100 - 1) + 1);
let currentScore = 0;
let wins = 0;
let losses = 0;
const gemValues = [10, 5, 3, 7];
const INSTRUCTION_MODAL = '#gameInstructions';
$("#statComp").text(targetScore);
$("#statPlayer").text(currentScore);
$("#diamond").attr("data-crystalvalue", gemValues[0]);
$("#ruby").attr("data-crystalvalue", gemValues[1]);
$("#jasper").attr("data-crystalvalue", gemValues[2]);
$("#emerald").attr("data-crystalvalue", gemValues[3]);
$("#winsVal").text(wins);
$("#lossesVal").text(losses);
callModal(INSTRUCTION_MODAL);

// 2. Create click event for gem cards
$("#ruby").click(function () {
    let crystalValue = $(this).attr("data-crystalvalue");
    crystalValue = parseInt(crystalValue);
    currentScore += crystalValue;
    $("#statPlayer").text(currentScore);
    checkScore(targetScore, currentScore);
});

$("#diamond").click(function () {
    let crystalValue = $(this).attr("data-crystalvalue");
    crystalValue = parseInt(crystalValue);
    currentScore += crystalValue;
    $("#statPlayer").text(currentScore);
    checkScore(targetScore, currentScore);
});

$("#jasper").click(function () {
    let crystalValue = $(this).attr("data-crystalvalue");
    crystalValue = parseInt(crystalValue);
    currentScore += crystalValue;
    $("#statPlayer").text(currentScore);
    checkScore(targetScore, currentScore);
});

$("#emerald").click(function () {
    let crystalValue = $(this).attr("data-crystalvalue");
    crystalValue = parseInt(crystalValue);
    currentScore += crystalValue;
    $("#statPlayer").text(currentScore);
    checkScore(targetScore, currentScore);
});

$('#resetBtn').click(function () {
    reset();
});

$(".jewel-img").hover(function () {
        $(this).addClass("shadow-lg bg-white rounded");
        
    }, function () {
        $(this).removeClass("shadow-lg bg-white rounded");
    }
);

function checkScore(target, current) {
    if (current == target) {
        targetScore = Math.floor(Math.random() * (100 - 1) + 1);
        currentScore = 0;
        wins++;
        $("#statComp").text(targetScore);
        $("#statPlayer").text(currentScore);
        $("#winsVal").text(wins);
        console.log("You won!");
    } else if (current > target) {
        targetScore = Math.floor(Math.random() * (100 - 1) + 1);
        currentScore = 0;
        losses++;
        $("#statComp").text(targetScore);
        $("#statPlayer").text(currentScore);
        $("#lossesVal").text(losses);
        console.log("You lost!");
    }
}

function sumScore() {
    let crystalValue = $(this).attr("data-crystalvalue");
    crystalValue = parseInt(crystalValue);
    currentScore += crystalValue;
    $("#statPlayer").text(currentScore);
}
// 5. Create reset function
function reset() {
    targetScore = Math.floor(Math.random() * (100 - 1) + 1);
    currentScore = 0;
    wins = 0;
    losses = 0;
    $("#statComp").text(targetScore);
    $("#statPlayer").text(currentScore);
    $("#winsVal").text(wins);
    $("#lossesVal").text(losses);  
    callModal(INSTRUCTION_MODAL); 
}

function callModal(modal) {
    $(`${modal}`).modal('show');
}