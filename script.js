const questions = [
    {
        question: 'Which is the fastest animal on the planet?',
        answers:[
            { text: "eagle", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Antelope", correct: false },
            { text: "Zebra", correct: false },
        ]
    },
    {
        question: 'Which is the smallest continent in the world?',
        answers:[
            { text: "Africa", correct: false },
            { text: "Europe", correct: false },
            { text: "Antartica", correct: false },
            { text: "Australia", correct: true },
        ]
    },
    {
        question: 'What is the name of the highest mountain in the world?',
        answers:[
            { text: "Kilimonjaro", correct: false },
            { text: "Kvukiki", correct: false },
            { text: "Everest", correct: true},
            { text: "Zola", correct: false },
        ]
    },
    {
        question: 'What is the name of the largest planet?',
        answers:[
            { text: "Jupital", correct: true },
            { text: "Pluto", correct: false },
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;}
            button.addEventListener("click", selectAnswer);
    });
    
}

function resetState(){
     nextButton.style.display = "none";
     while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
     }
}


function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    // questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    
    if(score <= 2){
        questionElement.innerHTML = "Olodo rabata"
    }
    else{
        questionElement.innerHTML = "Omo Akin"
    }

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      showQuestion();  
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
handleNextButton();
  }  else{
    startQuiz();
  }
});

startQuiz();

