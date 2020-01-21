let time = 30;
let clockRunning = false;
let intervalID;
let converted = timeConverter(time);
let correct = 0;
let incorrect = 0;
let unanswered = 0;
let quiz = {
    questions: [
        "Who won Best Actor in a Leading Role?",
        "Who won Best Actor in a Supporting Role?",
        "Who won Best Actress in a Leading Role?",
        "Who won Best Actress in a Supporting Role?",
    ],
    q1: [
        "Christian Bale",
        "Bradley Cooper",
        "Rami Malek",
        "Willem Dafoe",
        "Viggo Mortensen",

    ],
    q2: [
        "Mahershala Ali",
        "Adam Driver",
        "Sam Elliott",
        "Richard E. Grant",
        "Sam Rockwell",

    ],
    q3: [
        "Olivia Colman",
        "Yalitza Aparicio",
        "Glenn Close",
        "Lady Gaga",
        "Melissa Mccarthy"

    ],
    q4: [
        "Regina King",
        "Amy Adams",
        "Marina De Tavira",
        "Emma Stone",
        "Rachel Weisz",

    ],
    answer: [
        "Rami Malek",
        "Mahershala Ali",
        "Olivia Colman",
        "Regina King ",
    ]
};

function start() {
    if (!clockRunning) {
        intervalID = setInterval(count, 1000);
        clockRunning = true;
    }
}

function stop() {
    clearInterval(intervalID);
    clockRunning = false;
}

function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

function count() {
    time--;
    let converted = timeConverter(time);
    $("#timer").text(converted);
    if (time == 0) {
        stop(intervalID);
        score();
        $(".questions").css("display", "none");
        $("#timer").css("display", "none");
        $(".main").append("<h2 id='allDone'>All Done!</h2>");
        $(".main").append(`<h3 id='corAnswers'>Correct Answers: ${correct} </h3>`);
        $(".main").append(`<h3 id='incAnswers'>Incorrect Answers: ${incorrect}</h3>`);
        $(".main").append(`<h3 id='unanswered'>Unanswered: ${unanswered}</h3>`);
        $(".main").append("<div onclick='reset()' id='reset'>Reset</div>");
    }
}

function done() {
    score();
    $(".questions").css("display", "none");
    $("#timer").remove();
    $(".main").append("<h2 id='allDone'>All Done!</h2>");
    $(".main").append(`<h3 id='corAnswers'>Correct Answers: ${correct} </h3>`);
    $(".main").append(`<h3 id='incAnswers'>Incorrect Answers: ${incorrect}</h3>`);
    $(".main").append(`<h3 id='unanswered'>Unanswered: ${unanswered}</h3>`);
    $(".main").append("<div onclick='reset()' id='reset'>Reset</div>");
    stop(intervalID);
}

function score() {
    let q1Answer = $("input[name=q1]:checked").val();
    let q2Answer = $("input[name=q2]:checked").val();
    let q3Answer = $("input[name=q3]:checked").val();
    let q4Answer = $("input[name=q4]:checked").val();
    if (q1Answer == "Rami Malek") {
        correct++;
    } else if (q1Answer == undefined) {
        unanswered++;
    } else {
        incorrect++;
    }
    if (q2Answer == "Mahershala Ali") {
        correct++;
    } else if (q2Answer == undefined) {
        unanswered++;
    } else {
        incorrect++;
    }
    if (q3Answer == "Olivia Colman") {
        correct++;
    } else if (q3Answer == undefined) {
        unanswered++;
    } else {
        incorrect++;
    }
    if (q4Answer == "Regina King") {
        correct++;
    } else if (q4Answer == undefined) {
        unanswered++;
    } else {
        incorrect++;
    }
}

function loadQuiz() {
    $("#start").css("display", "none");
    $(".main").append("<div id='timer'>00:30</div>");
    $(".main").append("<div class='questions'>");
    start();
    for (let i = 0; i < quiz.questions.length; i++) {
        let form = `<form id=form${i} class="question">`;
        let question = `<h3>${quiz.questions[i]}`;
        $(".questions").append(form);
        $(`#form${i}`).append(question);
    }
    for (let i = 0; i < quiz.q1.length; i++) {
        let formCheck = `<div class="form-check form-check-inline" id="formCheck${i}">`;
        let input = `<input class="form-check-input" type="radio" id="q1a${i}" name="q1" value="${quiz.q1[i]}">`;
        let label = `<label class="form-check-label" for="q1a${i}">${quiz.q1[i]}`;
        let radioButton = formCheck + input + label;
        $(`#form0`).append(radioButton);
    }
    for (let i = 0; i < quiz.q2.length; i++) {
        let formCheck = `<div class="form-check form-check-inline" id="formCheck${i}">`;
        let input = `<input class="form-check-input" type="radio" id="q2a${i}" name="q2" value="${quiz.q2[i]}">`;
        let label = `<label class="form-check-label" for="q2a${i}">${quiz.q2[i]}`;
        let radioButton = formCheck + input + label;
        $(`#form1`).append(radioButton);
    }
    for (let i = 0; i < quiz.q3.length; i++) {
        let formCheck = `<div class="form-check form-check-inline" id="formCheck${i}">`;
        let input = `<input class="form-check-input" type="radio" id="q3a${i}" name="q3" value="${quiz.q3[i]}">`;
        let label = `<label class="form-check-label" for="q3a${i}">${quiz.q3[i]}`;
        let radioButton = formCheck + input + label;
        $(`#form2`).append(radioButton);
    }
    for (let i = 0; i < quiz.q4.length; i++) {
        let formCheck = `<div class="form-check form-check-inline" id="formCheck${i}">`;
        let input = `<input class="form-check-input" type="radio" id="q4a${i}" name="q4" value="${quiz.q4[i]}">`;
        let label = `<label class="form-check-label" for="q4a${i}">${quiz.q4[i]}`;
        let radioButton = formCheck + input + label;
        $(`#form3`).append(radioButton);
    }
    $(".questions").append("<div onclick='done()' id='done'>Done</div>"); 
    $("#done").css("visibility", "visible");   
}

function reset() {
    $("#start").css("display","block");
    $(".questions").remove();
    $('#allDone').remove();
    $('#corAnswers').remove();
    $('#incAnswers').remove();
    $('#unanswered').remove();
    $('#timer').remove();
    $('#reset').remove();
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    time = 30;
    clockRunning = false;
}