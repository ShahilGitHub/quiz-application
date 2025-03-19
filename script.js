const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"], answer: "Shakespeare" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { question: "Which gas do plants use for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], answer: "Da Vinci" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "India", "Japan", "South Korea"], answer: "Japan" },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" },
    { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Silver", "Osmium"], answer: "Oxygen" },
    { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
    { question: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], answer: "Mercury" },
    { question: "How many legs does a spider have?", options: ["4", "6", "8", "10"], answer: "8" },
    { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: "Blue Whale" }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 900; // 15 minutes (900 seconds)

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const progressElement = document.getElementById("progress");
const timeElement = document.getElementById("time");

function startQuiz() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    showQuestion();
    startTimer();
}

function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
    optionsElement.innerHTML = "";

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "block w-full bg-gray-200 p-2 rounded hover:bg-gray-300";
        button.onclick = () => selectAnswer(option);
        optionsElement.appendChild(button);
    });

    updateProgress();
    document.getElementById("prev-btn").classList.toggle("hidden", currentQuestionIndex === 0);
}

function selectAnswer(selected) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selected === correctAnswer) {
        score++;
    }
    document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById("next-btn").classList.add("hidden");
    } else {
        endQuiz();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function updateProgress() {
    progressElement.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        } else {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    document.getElementById("score").textContent = `You scored ${score}/${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 900;
    document.getElementById("result-screen").classList.add("hidden");
    startQuiz();
}
