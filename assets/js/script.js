//Quiz variables
var highScore = document.querySelector("#highscore");
var quizClock = document.querySelector("#quizClock");
var rulesEl = document.querySelector("#rules");
var clockTab = document.querySelector("#shotClock");
var score = 0;
var test = false;
var quiz = [];
var quizDuration = 0;
var quizSecElapsed = 0;
var quizInterval= 0;
var questionArray = [
    {
        Q: "Which one is not a commonly used data type?",
        choices: ["strings", "alerts", "booleans", "numbers"],
        answer: "alerts"
    },
    {
        Q: "What file type is used for JavaScript files?",
        choices: [".html", ".doc", ".js", ".css"],
        answer: ".js"
    },
    {
        Q: "DOM is an abreviation for___?",
        choices: ["Data Object Mode", "Document Only Memory", "Document Object Model", "Digital Object Money"],
        answer: "Document Object Model"
    },
    {
        Q: "What year did JavaScript start?",
        choices: ["1985", "1995", "2005", "2015"],
        answer: "1995"
    },
    {
        Q: "JavaScript is a product of what company?",
        choices: ["IBM", "Apple", "Microsoft", "Netscape"],
        answer: "Netscape"
    }

];

// draw instruction
init();

// function to display instructions
function init() {
  clearDetails();
  reset();
  // creates Heading element for main page
 var heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "This Code Quiz gives you the opportunity to test your knowledge of JavaScript by taking a timed quiz!";

  // creates elements with the instructions for the game
  var instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " You will have 59 seconds to answer the questions. If you answer correctly you will score points. The quicker you answer the more points you will score. If you score incorrectly you will be penalized time."; 

  // adding more question - this should move into loop or function
  // creates button to start the game
  var startJsQuiz = document.createElement("button");
  startJsQuiz.setAttribute("id", "startJSQuiz");
  startJsQuiz.setAttribute("class", "btn btn-secondary");
  startJsQuiz.textContent= "Take the Quiz";

  rulesEl.appendChild(heading);
  rulesEl.appendChild(instructions);
  rulesEl.appendChild(startJsQuiz);

    startJsQuiz.addEventListener("click", function(){
        takeQuiz(questionArray);
    });
}

function clearDetails() {
    rulesEl.innerHTML = "";
}

function reset() {
    score = 0;
    quizDuration = 0;
    quizInterval;
}

function takeQuiz(questionSet){
    if (test){console.log("---takeQuiz---");}
    quiz = getQuestions(questionSet);
    clockTab.setAttribute("style", "visibility: visible;");

    quizDuration = 59;
    if(test){console.log("duration g:", quizDuration);}
    
    startQuizClock();
    renderTime();

    showQuestions();
}

//code used to selection random question from questionArray
function getQuestions(questionArray){
    if(test){console.log("---getQuestions---");}

    var randomQues = [];
    for(i=0; i<questionArray.length; i++){
       randomQues.push(questionArray[i]);
       //randomQues= questionArray[Math.floor(Math.random() * questionArray.length)];
    }
    return randomQues;
} 


function showQuestions() {
    if(test) {console.log("---showQuestions---");}

    //quizSecElapsed = 0;

    if (quiz.length === 0){
        endOfQuiz();
        return;
    }

    currentQuestion = quiz.pop();
    
    clearDetails();

    var question = document.createElement("h1");
    question.setAttribute("question", currentQuestion.Q);
    question.textContent = currentQuestion.Q;
    rulesEl.appendChild(question)

    var options = document.createElement("ul");
    options.setAttribute("id", "options");
    rulesEl.appendChild(options);

    for(let i=0; i<currentQuestion.choices.length; i++){
       let listOptions = document.createElement("li");
        listOptions.setAttribute("option-value", currentQuestion.choices[i]);
        listOptions.setAttribute("id", "questionNum "+i);
        listOptions.textContent = currentQuestion.choices[i];
        options.appendChild(listOptions)
    }
    if(test){console.log("current", currentQuestion);}

    options.addEventListener("click", function(){
        checkAnswer(currentQuestion);
    });
}

function checkAnswer(currentQuestion){
    if(test) {console.log("---checkAnswer---");}
    var c = event.target;
    if(c.matches("li")){
        var selection = c.textContent;
        if(test){console.log("selectedItem quiz " + selection);}
        if(selection === currentQuestion.answer){
            score += quizDuration - quizSecElapsed;
        } else {
            if(test){console.log("wrong answer");}
            quizSecElapsed -= 10;

        }
        if(test){console.log("selected ", selection);}
        showAnswer(currentQuestion);
    }
}

function showAnswer(currentQuestion){
    if(test){console.log("---showAnswer---");}
    if (test) { console.log("sa qanda",currentQuestion);}
  if (test) { console.log("sselected ",selection);}


  for (let i=0; i<currentQuestion.choices.length; i++) {
    if (test) { console.log("sa in for ",i);}

    let questid = "#questionNum-" + i;
    // if (test) { console.log("sa qn", questid );}
    let questrow = document.querySelector(questid);

    // if (test) { console.log("questrow",questrow);}

    if (test) { console.log("saf selected" + selection + "<");}
    if (test) { console.log("saf color test >" +  currentQuestion.choices[i] +"<");}

    if (currentQuestion.choices[i] !== currentQuestion.answer) {
      if (test) { console.log("color test flase");}
     // questrow.setAttribute("style","background-color: red;");
    } else {
      if (test) { console.log("color test true");}
      //questrow.setAttribute("style", "background-color: green;");
    }
  }
  // pause so user can see results
  setTimeout(showQuestions,500);
}


function setQuizTime() {
    if (test) { console.log("--- setQuizTime ---"); }
    if (test) { console.log("quizDuration " + quizDuration); }
    clearInterval(quizInterval);
    quizSeconds = quizDuration;
  }

  function renderTime() {
  
    quizClock.textContent = quizDuration - quizSecElapsed;
  
    if ( (quizDuration - quizSecElapsed) < 1 ) {
     endOfQuiz();
    }
}

function startQuizClock () {
    if (test) { console.log("--- startQuizTimer ---"); }
    setQuizTime();
  
   quizInterval = setInterval(function() {
      quizSecElapsed++; 
      quizSecElapsed++; 
      renderTime();
    }, 1000);
  }

  function stopQuizTime() {
    if (test) { console.log("--- stopQuizTime --- ");}
    quizSeconds = 0;
    clearInterval(quizInterval);
  }

  function endOfQuiz() {
    if (test) { console.log("--- endOfGame ---"); }
    stopQuizTime();
    clearDetails();
  
    clockTab.setAttribute("style", "visibility: hidden;");
  
    var heading = document.createElement("p");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "GAME OVER - Thanks for participating!";
  
    // creates elements with the instructions for the game
    var instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = " Your score is " + score; 
  
    // creates button to start the game
    var tryAgain = document.createElement("button");
    tryAgain.setAttribute("id", "Try Again?");
    tryAgain.setAttribute("class", "btn btn-secondary");
    tryAgain.textContent = "Play again";
  
    // creates input for user to add initials
    var par = document.createElement("p");
  
    var initialsLabel = document.createElement("label");
    initialsLabel.setAttribute("for","userInitials");
    initialsLabel.textContent = "Enter Initials: ";
  
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("id","userInitials");
    initialsInput.setAttribute("name","userInitials");
    initialsInput.setAttribute("minlength","3");
    initialsInput.setAttribute("maxlength","3");
    initialsInput.setAttribute("size","3");
  
  
    rulesEl.appendChild(heading);
    rulesEl.appendChild(instructions);
    rulesEl.appendChild(initialsLabel);
    rulesEl.appendChild(initialsInput);
    rulesEl.appendChild(par);
    rulesEl.appendChild(tryAgain);
  
   tryAgain.addEventListener("click", init);
  
    initialsInput.addEventListener("input", function() {
      initialsInput.value = initialsInput.value.toUpperCase();
      if ( initialsInput.value.length === 3 ) { 
  
        //create object for this score
        let thisScore = [ {name: initialsInput.value, score: score } ]; 
  
        //get highscores from memory
        let storedScores = JSON.parse(localStorage.getItem("highScores")); 
        if (test) { console.log("storedScore",storedScores); }
  
        if (storedScores !== null) { 
          storedScores.push(thisScore[0]); 
        } else {
          storedScores = thisScore;
        }
  
        localStorage.setItem("highScores", JSON.stringify(storedScores));
        highScores();
      }
    });
  }

  function highScores() {
    stopQuizTime();
    clearDetails();
  
   clockTab.setAttribute("style", "visibility: hidden;");
  
    //get scores from storage
    var storedScores = JSON.parse(localStorage.getItem("highScores")); 
  
    // draw heading
    var heading = document.createElement("h2");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "Top 5 High Score List:";
  
    rulesEl.appendChild(heading);
  
    // Render a new li for each score
    // TODO check for this error 
    if ( storedScores !== null ) {
      // sort scores
      storedScores.sort((a,b) => (a.score < b.score) ? 1: -1);
  
      // sets the number of scores to display to 5 or the number of games played. Which ever is less
      var displayScores = 5;
      if ( storedScores.length < 5 ) { 
        displayScores = storedScores.length; 
      }
  
      for (var i = 0; i < displayScores.length; i++) {
        var s = storedScores[i];
  
        var p = document.createElement("p");
        p.textContent = s.name + " " + s.score + " ( " + s.type + " )";
        rulesEl.appendChild(p);

      }
    } else {
      var p = document.createElement("p");
      p.textContent = ("Top 5: ");
      rulesEl.appendChild(p);
    }
  
  
    // creates button to start the game
    var tryAgain = document.createElement("button");
    tryAgain.setAttribute("id", "playAgain");
    tryAgain.setAttribute("class", "btn btn-secondary");
    tryAgain.textContent = "Play!";
  
    rulesEl.appendChild(tryAgain);
  
    tryAgain.addEventListener("click", init);
  }
  
  highScore.addEventListener("click", highScores); 