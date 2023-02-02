//PSEUDO-CODE
    //User clicks start button
    //Timer starts counting down & user is presented with a question
    //Incorrect answers reduce the timer
    //Game ends when all questions answered or timer reaches 0
    //User can enter their initials to save score

var timeEl = document.querySelector("#time");
var secondsLeft = 10;

function setTime() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            alert("out of time");
            //create a function called endGame and call it here
        }
    }, 1000);
};


var startButton = document.getElementById('startButton')
var nextButton = document.getElementById('nextButton')
var questionContainerEl = document.getElementById('questionContainer')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answerButtons')

let randomQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setQuestion()
})

function startGame(){
    startButton.classList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setQuestion();
    setTime();
}

function setQuestion() {
    resetAnswers()
    showQuestion(randomQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetAnswers() {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (randomQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

var questions = [

    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            {text: '<script>', correct: true},
            {text: '<javascript>', correct: false},
            {text: '<scripting>', correct: false},
            {text: '<js>', correct: false}
        ]
    },
    {
        question: 'What is the correct syntax for referring to an external script called "script.js"?',
        answers: [
            {text: '<script name="script.js">', correct: false},
            {text: '<script src="script.js">', correct: true},
            {text: '<script href="script.js">', correct: false},
            {text: '<script alt="script.js">', correct: false}
        ]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [
            {text: 'function = myFunction()', correct: false},
            {text: 'function:myFunction()', correct: false},
            {text: 'function myFunction()', correct: true},
            {text: 'function -> myFunction()', correct: false}
        ]
    },
    {
        question: 'How do you call a function named "myFunction"?',
        answers: [
            {text: 'return myFunction()', correct: false},
            {text: 'call myFunction()', correct: false},
            {text: 'call function myFunction()', correct: false},
            {text: 'myFunction()', correct: true}
        ]
    },
]