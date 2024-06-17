/** All element data */

import { buttonText, introText, loadingText, statText } from "./text.js";
import { calcuatePercentage } from "./utils.js";

/**
 * --------------------------------------
 * - Element attribute data      --------
 * --------------------------------------
 */
export const introElementsData = {
    div: {
        id: 'intro-div',
        class: 'intro-div'
    },
    logo: {
        id: 'logo',
        src: './logo.png',
        class: 'logo',
    },
    text: {
        id: 'intro-text',
        class: 'intro',
        textContent: introText.title
    },
    button: {
        id: 'kickoff-button',
        class: 'start-button',
        textContent: introText.buttonTitle
    }
}

/** loading */
export const loadingElementsData = {
    span: {
        id: 'loading-title',
        class: 'loading-title',
        textContent: loadingText.msg
    },
    conDiv: {
        id: 'spinner-container',
        class: 'spinner-container'
    },
    section: {
        id: 'spinner-section',
        class: 'loading-container'
    },
    spinDiv: {
        id: 'spinner-div',
        class: 'spinner'
    }
};

/** quiz */
export const quizElementsData = (index, que) => {
    return {
        no: {
            id: 'quiz-number',
            class: 'quiz-number',
            textContent: `${index + 1}`
        },
        sec: {
            class: 'quiz'
        },
        que: {
            id: 'quiz-id',
            class: 'quiz-card',
            textContent: que
        }
    }   
};

/** quiz-answer */
export const quizAnswerElementsData = (checkbox = {}) => { 
    return {
        div: {
            id: 'quiz-answer-div',
            class: 'quiz-answer'
        },
        radioDiv: {
            id: 'answer-check-div',
            class: 'answer-div'
        },
        checkbox: {
            id: checkbox.id,
            name: 'answer-check-option',
            type: 'checkbox',
            value: checkbox.value,
            class: 'answer-radio'
        },
        label: {
            class: 'radio-label',
            textContent: checkbox.value,
        }
    };
}

/** button */
export const buttonsData = {
    div: {
        id: 'answer-button-div',
        class: 'answer-button-div'
    },
    next: {
        id: 'next-button',
        class: 'select-button base-button disabled-button',
        disabled: true,
        textContent: buttonText.next.title
    },
    check: {
        id: 'check-it-button',
        disabled: true,
        class: 'select-button base-button disabled-button',
        textContent: buttonText.check
    }
};

/** result */
export const resultData = (stats) => {
    const percentage = calcuatePercentage(stats.score, stats.max);
    return {
        sec: {
            id: 'stat-section',
            class: 'stats-container'
        },
        con: {
            id: 'stat-card',
            class: 'stats-card'
        },
        title: {
            textContent: `${statText.title} - ${percentage}%`
        },
        button: {
            class: 'base-button refresh-button',
            textContent: statText.button,

        }
}}











/**
 * --------------------------------------
 * - Element related section ------------
 * --------------------------------------
 */
/** elements types */
export const elementTypes = {
    p: 'p',
    h1: 'h1',
    div: 'div',
    img: 'img',
    span: 'span',
    input: 'input',
    label: 'label',
    button: 'button',
    section: 'section'
};

/** Map element attributes */
export const mapAttributes = (data, element) => {
    Object.keys(data).forEach(key => {
        if (key == 'textContent') {
            element.textContent = data[key];
            return;
        }
        element.setAttribute(key, data[key]);
    });
}

/** Create elements */
export const createElements = (elements) => {
    let result = [];
    elements.forEach(element => {
        let el = document.createElement(element);
        result.push(
            el
        );
    });
    return [...result];
}