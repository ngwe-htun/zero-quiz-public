import { showIntro } from './intro.js';
import {clearQuizSection, displayPossibleAnswers, displayQuestionText, highlightCorrectAnswer, showLoading, showStats, showUserCorrect, showUserWrong} from './ui.js';
import { calcuatePercentage } from './utils.js';

/** variables */
let quizzies;
let score = 0;
let maxQuiz = 10;
let currentIndex;
let randomIndices;
let percentage = 0;
let currentStatusIndex = 0;

/** fetch the data */
const fetchData = async () => {
    const response = await fetch('data.json');
    if (!response.status == 200) {
        return [];
    }
    return response.json();
}

/** Get random 3 quiz */
const getRandomQuiz = (data) => {
    const randomIndices = new Set();
    while (randomIndices.size < maxQuiz) {
        randomIndices.add(
            Math.floor(
                Math.random() * data.length
            )
        );
    }
    return randomIndices;
}

/** increase index */
const increaseIndex = () => {
    currentStatusIndex++;
    currentIndex = randomIndices[currentStatusIndex];
}

/** display */
const display = () => {
    if (currentStatusIndex >= maxQuiz) {
        showStats({
            max: maxQuiz,
            score: score,
        });
        return;
    }
    const funcs = {
        next: display,
        validate: validateAnswer,
        increaseIndex: increaseIndex
    };

    /** clear */
    clearQuizSection();

    /** show question */
    displayQuestionText(
        quizzies[currentIndex], 
        currentStatusIndex
    );
    /** show possible answer and let answer */
    displayPossibleAnswers(
        quizzies[currentIndex]?.possible_answers, 
        funcs
    );
}

/** preparing */ 
const prepare = async () => {
    const quizzies = await fetchData();
    const randomIndices = getRandomQuiz(quizzies);
    return {
        data: quizzies,
        random: randomIndices
    };
}

/** validate answer */
const validateAnswer = (selected) => {
    const correctAnswer = quizzies[currentIndex].correct_answer;
    if (selected.value === correctAnswer) {
        score ++;
        showUserCorrect();
    } else {
        showUserWrong();
    }
    highlightCorrectAnswer(correctAnswer);
}

/** start running */
const start = async () => {
    showLoading(true);
    const data = await prepare();
    if (data) {
        quizzies = data.data;
        randomIndices = Array.from(data.random);
        currentIndex = randomIndices[currentStatusIndex]
        setTimeout(() => {
            showLoading(false);
            display()
        }, 1000);
    }
}

/** main func */
const main = async () => {
    showIntro(start);
}

/** running */
main();