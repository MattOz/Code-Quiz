//PSEUDO-CODE
    //User clicks start button
    //Timer starts counting down & user is presented with questions
    //Incorrect answers reduce the timer
    //Game ends when all questions answered or timer reaches 0
    //User can enter their initials to save score on highscore page

//selector to specify time element 
var timeEl = document.querySelector("#time");
//sets initial time
var secondsLeft = 60;

//function to countdown time
function setTime() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            alert("out of time");
            //create a function called endGame and call it here
        }
        //create if statement where incorrect answer reduces time
    }, 1000);
};

//selecting elements that will be used
var startButton = document.getElementById('startButton')
var nextButton = document.getElementById('nextButton')
var questionContainerEl = document.getElementById('questionContainer')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answerButtons')

//index variable to determine which question within random questions it is on
//returns undefined which will be changed later
var randomQuestions, currentQuestionIndex

//event listeners to start game when start button clicked
//event listener to switch to next question with next button, initially hidden
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setQuestion()
})

//hides start button and randomizes questions
function startGame(){
    startButton.classList.add('hide');
    //Math.random here returns a number either above or below zero
    //sorts negative and positive numbers to give random array of questions
    randomQuestions = questions.sort(() => Math.random() - .5);
    //starting on first question in random question array
    currentQuestionIndex = 0;
    //shows question container
    questionContainerEl.classList.remove('hide');
    //call functions to set first question and start timer
    setQuestion();
    setTime();
}

//shows question and creates individual button for each answer
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        //assigns the correct answer to the correct button
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

//resets answers and shows next question, which is in a random position in an array
function setQuestion() {
    resetAnswers()
    showQuestion(randomQuestions[currentQuestionIndex])
}

//when answer selected, checks if correct
function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    //converts returned data into array, sets status for each button based on if correct or not
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    //checks if there are more questions, shows next button if so
    if (randomQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    //restart button appears when all questions have been answered
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }   
}

//clears answers when new question is set
function resetAnswers() {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

//sets button class based on correct or incorrect answer to show if user is correct or not
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}

//clears button classes so they all look the same on next question
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

// array of potential questions and answers
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