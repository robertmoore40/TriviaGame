// get all html elements

var start = document.getElementById("start");

var quiz = document.getElementById("quiz");

var counter = document.getElementById("counter");

var timeGauge = document.getElementById("timeGauge");

var progress = document.getElementById("progress");

var scoreDiv = document.getElementById("scoreContainer");

var question = document.getElementById("question");

var choiceA = document.getElementById("A");

var choiceB = document.getElementById("B");

var choiceC = document.getElementById("C");



// create questions and designate answers
var questions = [
    {
        question : "Who exiled Caesar from Italy in his Youth?",
        choiceA : "Sulla",
        choiceB : "Marius",
        choiceC : "Cato",
        correct : "A"
    },{
        question : "Which river did Caesar cross to initiate the Great Roman Civil War?",
        choiceA : "Danube",
        choiceB : "Rhine",
        choiceC : "Rubicon",
        correct : "C"
    },{
        question : "Who was Caesar's co-magistrate in his first time as consul?",
        choiceA : "Bibulus",
        choiceB : "Cicero",
        choiceC : "Marius",
        correct : "A"
    },{
        question : "Who financially backed Caesar in his early political career?",
        choiceA : "Trump",
        choiceB : "Pompey",
        choiceC : "Crassus",
        correct : "C"
    },{
        question : "Which province was Caesar appointed to as Proconsul?",
        choiceA : "Syria",
        choiceB : "Gaul",
        choiceC : "Spain",
        correct : "B"
    },{
        question : "Who was Caesar's first wife?",
        choiceA : "Pompey",
        choiceB : "Cornelia",
        choiceC : "Hannibal",
        correct : "B"
    },{
        question : "Who was Caesar's great enemy during his civil war?",
        choiceA : "Pompey",
        choiceB : "Pliny",
        choiceC : "Trajan",
        correct : "A"
    },{
        question : "Where was Caesar's last battle with Pompey?",
        choiceA : "Pharsalus",
        choiceB : "Alesia",
        choiceC : "Zama",
        correct : "A"
    },{
        question : "When was he appointed dictator in perpetuity?",
        choiceA : "53 B.C.",
        choiceB : "46 B.C",
        choiceC : "44 B.C.",
        correct : "C"
    },{
        question : "After Caesar's death, who was the first to rally his followers?",
        choiceA : "Cleopatra",
        choiceB : "Marc Antony",
        choiceC : "Augustus",
        correct : "B"
    },
];

// create needed variables for running time and progress meter/count

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 15; // 15s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var timer;
var score = 0;

// fill in questions and answers dynamically
function questionFill(){
    var questionList = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ questionList.question +"</p>";
    choiceA.innerHTML = questionList.choiceA;
    choiceB.innerHTML = questionList.choiceB;
    choiceC.innerHTML = questionList.choiceC;
}

// Add event listener to begin the quiz

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    // byRob.style.display = "none";
    questionFill();
    quiz.style.display = "block";
    progressBar();
    scoreFiller();
    timer = setInterval(scoreFiller,1000); // 1000ms = 1s
}

// make a function for the progress bar
function progressBar(){
    for(var qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// make a function for the counter

function scoreFiller(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress circle color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            questionFill();
        }else{
            // end the quiz and show the score
            clearInterval(timer);
            createScore();
        }
    }
}

// checkAnswer Function

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
        questionFill();
    }else{
        // end the quiz and show the score
        clearInterval(timer);
        createScore();
    }
}

// if the answer is correct - change background color to green
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// If the answer is incorrect - change background color to red through hex
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// Create score function
function createScore(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
   
    
    scoreDiv.innerHTML += "<p>"+ "Your score was " + scorePerCent +"%</p>";
}
