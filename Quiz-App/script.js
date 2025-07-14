const question = document.querySelector(".question");
const options = document.querySelector("#options");
const result = document.querySelector("#result");
const nextButton = document.querySelector("#next-button");
const restart = document.querySelector("#restart");

let score = 0;
let currentQuizIndex = 0;

const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Mark Language"
        ],
        answer: "HyperText Markup Language"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Colorful Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What does JS stand for?",
        options: [
            "JavaStyle",
            "JavaScript",
            "JustScript",
            "JScript"
        ],
        answer: "JavaScript"
    }
];

function showQuestion() {
    // Clear previous options
    options.innerHTML = "";
    result.classList.remove("correct", "wrong", "final");
    result.textContent = "";

    // Set current question text
    question.textContent = quizQuestions[currentQuizIndex].question;

    // Create option buttons
    quizQuestions[currentQuizIndex].options.forEach(optionText => {
        const button = document.createElement("button");
        button.textContent = optionText;
        button.classList.add("option-button");
        options.appendChild(button);

        button.addEventListener("click", () => {
            const correctAnswer = quizQuestions[currentQuizIndex].answer;

            if (optionText === correctAnswer) {
                score++;
                result.classList.add("correct");
                result.textContent = "✅ Correct answer!";
            } else {
                result.classList.add("wrong");
                result.textContent = `❌ Wrong answer. Correct answer is: ${correctAnswer}`;
            }

            // Disable all option buttons
            const allButtons = document.querySelectorAll(".option-button");
            allButtons.forEach(btn => btn.disabled = true);
        });
    });
}

// Next Button Logic
nextButton.addEventListener("click", () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
        currentQuizIndex++;
        showQuestion();
    } else {
        question.textContent = "Quiz Completed!";
        options.innerHTML = "";
        result.className = "final";
        result.textContent = `🎉 Your final score is ${score}/${quizQuestions.length}`;
        nextButton.disabled = true;
        restart.style.display = "inline-block";
    }
});

// Restart Button Logic
restart.addEventListener("click", () => {
    currentQuizIndex = 0;
    score = 0;
    nextButton.disabled = false;
    restart.style.display = "none";
    showQuestion();
});

// Start the quiz
showQuestion();