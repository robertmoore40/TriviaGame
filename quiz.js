// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Who exiled Caesar from Italy in his Youth?",
        imgSrc : "img/html.png",
        choiceA : "Sulla",
        choiceB : "Marius",
        choiceC : "Cato",
        correct : "A"
    },{
        question : "Which river did Caesar cross to initiate the Great Roman Civil War?",
        imgSrc : "img/html.png",
        choiceA : "Danube",
        choiceB : "Rhine",
        choiceC : "Rubicon",
        correct : "C"
    },{
        question : "Who was Caesar's co-magistrate in his first time as consul?",
        imgSrc : "img/html.png",
        choiceA : "Bibulus",
        choiceB : "Cicero",
        choiceC : "Marius",
        correct : "A"
    },{
        question : "Which province was Caesar appointed to as Proconsul?",
        imgSrc : "img/html.png",
        choiceA : "Syria",
        choiceB : "Gaul",
        choiceC : "Spain",
        correct : "B"
    },{
        question : "Who was Caesar's first wife?",
        imgSrc : "img/html.png",
        choiceA : "Pompey",
        choiceB : "Cornelia",
        choiceC : "Hannibal",
        correct : "A"
    },{
        question : "Who was Caesar's great enemy during his civil war?",
        imgSrc : "img/html.png",
        choiceA : "Pompey",
        choiceB : "Pliny",
        choiceC : "Trajan",
        correct : "A"
    },{
        question : "Where was Caesar's last battle with Pompey?",
        imgSrc : "img/html.png",
        choiceA : "Pharsalus",
        choiceB : "Alesia",
        choiceC : "Zama",
        correct : "A"
    },{
        question : "",
        imgSrc : "img/html.png",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        correct : "A"
    },{
        question : "Who murdered Caesar?",
        imgSrc : "img/html.png",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        correct : "A"
    },{
        question : "After Caesar's death, who was the first to rally his followers?",
        imgSrc : "img/html.png",
        choiceA : "Cleopatra",
        choiceB : "Marc Antony",
        choiceC : "Augustus",
        correct : "B"
    },
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 15s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    // byRob.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// if the answer is correct - change background color to green
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// If the answer is wrong - change background color to red through hex
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
   
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
