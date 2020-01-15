//Create object to hold character information
const objCharacters = {
    characters: ["obiWan", "yoda", "darthSidious", "darthMaul"],
    images: [
        "./assets/images/obi-wan.jpg",
        "./assets/images/yoda.jpg",
        "./assets/images/darthsidious.jpg",
        "./assets/images/darthmaul.jpg",
    ],
    charHP: [128, 172, 158, 138],
    charPower: [15, 70, 22, 19],
    charName: ["Obi-Wan Kenobi", "Grandmaster Yoda", "Darth Sidious", "Darth Maul"],
};

//Declare global game variables
let isPlayerSelected = false;
let isDefenderSelected = false;
let isFighting = false;
let curCharHP, curCompHP, curAttackPower, curCompAttack;
let attackCounter = 0;
let enemies = 3;
let chosenOne, defender;
let playerHPtext, compHPtext;

//Start reset button hidden
$("#reset").css("visibility", "hidden")


//Create character cards
for (let i = 0; i < objCharacters.characters.length; i++) {
    $(".charSelect").append(`<div data-selected='false' data-vitals='alive' data-fightStatus='unset' id="${objCharacters.characters[i]}" class="card hero d-inline-block"></div>`);
    $(`#${objCharacters.characters[i]}`).append(`<img src='${objCharacters.images[i]}' class='card-img-top' id='${'img' + i}'>`);
    $(`#${objCharacters.characters[i]}`).append(`<div class="card-body" id='${'charName'+i}'><p class='text-center'>${objCharacters.charName[i]}</p><p class=' text-center characterHP'>${objCharacters.charHP[i]}</p></div>`);
}

//Create click event for selecting player character and setting opponents
$(".card").click(function () {
    let charIndex = $(this).attr("id");
    if (enemies < 1) {
        return true;
    }
    if (isPlayerSelected && isDefenderSelected) {
        return true;
    } else if (!isPlayerSelected) {
        $(this).appendTo(".playChar");
        $(this).attr("data-selected", "true");
        isPlayerSelected = true;
        curAttackPower = objCharacters.charPower[objCharacters.characters.indexOf(charIndex)];
        curCharHP = objCharacters.charHP[objCharacters.characters.indexOf(charIndex)];
        $("[data-selected|='false']").appendTo(".enemies");
    } else if (isPlayerSelected && !isDefenderSelected); {
        if ($(this).attr("data-selected") == "true") {
            return true;
        }
        // Let player choose who to attack and move chosen enemy to Fight Section
        $(".chosenOneAttack").text('');
        $(".defenderAttack").text('');
        $(this).attr("data-fightStatus", "inFight");
        $("[data-fightStatus|='inFight']").appendTo(".defender");
        isDefenderSelected = true;
        isFighting = true;
        curCompHP = objCharacters.charHP[objCharacters.characters.indexOf(charIndex)];
        curCompAttack = objCharacters.charPower[objCharacters.characters.indexOf(charIndex)];
    }
    playerHPtext = $("[data-selected|='true']").attr("id");
    compHPtext = $("[data-fightStatus|='inFight']").attr("id");
});


// Create Attack button functionality
function attack() {
    if (!isFighting) {
        $(".chosenOneAttack").text('No character here.');
        $(".defenderAttack").text('');
        return true;
    }
    chosenOne = objCharacters.characters.indexOf($("[data-selected|='true']").attr("id"));
    defender = objCharacters.characters.indexOf($("[data-fightStatus|='inFight']").attr("id"));
    let y = $("[data-fightStatus|='inFight']").attr("id");
    let x = objCharacters.characters.indexOf($("[data-fightStatus|='inFight']").attr("id"));
    let z = $("[data-selected|='true']").attr("id");
    let p = objCharacters.characters.indexOf(z);
    attackCounter++;
    curAttackPower += (Math.floor(curAttackPower * 0.15));
    //Subtract player attack value from opponent's current HP value
    curCompHP -= curAttackPower;
    curCharHP -= curCompAttack;
    $(`div#${playerHPtext} p.characterHP`).text(curCharHP);
    $(`div#${compHPtext} p.characterHP`).text(curCompHP);
    $(".chosenOneAttack").text(objCharacters.charName[chosenOne] + ' hit ' + objCharacters.charName[defender] + ' for ' + curAttackPower + ' points.');
    $(".defenderAttack").text(objCharacters.charName[defender] + ' hit ' + objCharacters.charName[chosenOne] + ' for ' + curCompAttack + ' points.');
    if (curCompHP < 1) {
        console.log("Opponent Defeated");
        $("[data-fightStatus|='inFight']").attr("data-vitals", "dead");
        $("[data-vitals|='dead']").attr("data-fightStatus", "defeated");
        $("[data-fightStatus|='defeated']").css("visibility", "hidden");
        $("[data-fightStatus|='defeated']").appendTo(".charSelect");
        $(`div#${y} p.characterHP`).text(objCharacters.charHP[x]);
        enemies--;
        isDefenderSelected = false;
        isFighting = false;
        curCharHP = Math.floor(curCharHP + (curCharHP * 0.75));
        $(".chosenOneAttack").text('You have defeated ' + objCharacters.charName[defender] + '. You can pick another character to attack.');
        $(".defenderAttack").text('');
        if (enemies == 0) {
            $(`div#${z} p.characterHP`).text(objCharacters.charHP[p]);
            $("#reset").css("visibility", "visible");
            console.log("Game Win");
        }
    } else if (curCharHP < 1) {
        console.log("Player Defeated");
        $(`div#${z} p.characterHP`).text(objCharacters.charHP[p]);
        $(`div#${y} p.characterHP`).text(objCharacters.charHP[x]);
        isFighting = false;
        $("#reset").css("visibility", "visible");
        $(".chosenOneAttack").text("You've been defeated. GAME OVER");
        $(".defenderAttack").text('');
    }
}
//Create reset function
function reset() {
    isPlayerSelected = false;
    isDefenderSelected = false;
    curAttackPower = 0;
    curCompAttack = 0;
    attackCounter = 0;
    enemies = 3;
    isFighting = false;
    $("[data-vitals|='dead']").attr({
        "data-selected": "false",
        "data-vitals": "alive",
        "data-fightStatus": "unset",
    });
    $("[data-vitals|='alive']").attr({
        "data-selected": "false",
        "data-vitals": "alive",
        "data-fightStatus": "unset",
    });
    curCharHP, curCompHP, curAttackPower, curCompAttack;
    $("[data-selected|='false']").appendTo(".charSelect");
    $("[data-selected|='false']").css("visibility", "visible");
    let charX = objCharacters.characters.indexOf($("[data-selected|='false']").attr("id"));
    curCompHP = objCharacters.charHP[objCharacters.characters.indexOf(charX)];
    $("#reset").css("visibility", "hidden");

}