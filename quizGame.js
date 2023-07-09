
//Quiz game
let vrae = [
    {
        question: "How many capital cities does South Africa have?",
        answers: [
            {text:"1", correct: false},
            {text:"2", correct: false},
            {text:"3", correct: true},
            {text:"4", correct: false}
        ]
    },
    {
        question: "What is the colour of Maths?",
        answers: [
            {text:"Red", correct: true},
            {text:"Blue", correct: false},
            {text:"Yellow", correct: false},
            {text:"Purple", correct: false}
        ]
    },
    {
        question: "In English how many letter are there?",
        answers: [
            {text:"1", correct: false},
            {text:"25", correct: false},
            {text:"26", correct: true},
            {text:"49", correct: false}
        ]
    }

];

//
const answerButton = document.getElementById('answer-btn');
const nextButton = document.getElementById('nxt-btn');
const questionElement = document.getElementById('question-text');

let quesCount = 0;
let score = 0;

function startQuiz(){
    quesCount = 0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion(){
    resetState(); // reset previous Q&As

    let currentQuestion = vrae[quesCount];
    let quesNum = quesCount + 1;
    questionElement.innerHTML = quesNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        //When clicked
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
};

function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }

    // for each button, it will check the dataset if true
    // then will add the classname correct
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "Your score is " + score + " out of " + vrae.length;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function  handleNxtButton(){
    quesCount++;
    if (quesCount < vrae.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (quesCount < vrae.length){
        handleNxtButton();
    }
    else{
        startQuiz();
    }
});

//console.log(answerButton.innerHTML);
startQuiz();
