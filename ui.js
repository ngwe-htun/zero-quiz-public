import { calcuatePercentage, statsTitles } from "./utils.js";
import { 
    buttonsData, 
    createElements, 
    elementTypes, 
    loadingElementsData, 
    mapAttributes, 
    quizAnswerElementsData, 
    quizElementsData, 
    resultData
} from "./element.js";


let isAlreadyAnswer = false;

/** create radion button */
export const checkBox = (name, id) => {

    const attrs = quizAnswerElementsData({
        id: id,
        value: name
    });

    /** create elements */
    const [div, input, label] = createElements([
        elementTypes.div,
        elementTypes.input,
        elementTypes.label

    ]);

    /** map attributes */
    mapAttributes(attrs.label, label);
    mapAttributes(attrs.radioDiv, div);
    mapAttributes(attrs.checkbox, input);

    input.addEventListener('click', function() {
        singleSelectCheckbox(this)
    });


    /** append */
    div.append(input, label);
    
    return div;
}

/** question */
export const displayQuestionText = (data, index) => {

    const attrs = quizElementsData(index, data?.question);
    const quizSection = document.querySelector('#quiz');

    /** create elements */
    const [quizNumber, quizParagraph] = createElements([
        elementTypes.h1,
        elementTypes.p
    ]);

    /** map attributes */
    mapAttributes(attrs.no, quizNumber);
    mapAttributes(attrs.sec, quizSection);
    mapAttributes(attrs.que, quizParagraph);

    quizSection.append(
        quizNumber, 
        quizParagraph
    );
}

/** display possible answers */
export const displayPossibleAnswers = (answers, funcs) => {

    const div = document.createElement('div');
    const answerSection = document.querySelector('#quiz');

    /** map attributes */
    mapAttributes(quizAnswerElementsData().div, div);

    /** looping possible answers */
    answers.forEach((answer, index) => {
        const radio = checkBox(answer, index);
        div.appendChild(radio);
    });

    /** append */
    answerSection.appendChild(div);
    selectButton(funcs)
}

/** select */
const selectButton = (funcs) => {

    const attrs = buttonsData;
    const section = document.getElementById('quiz');

    /** create element */
    const [div, button, nextButton] = createElements([
        elementTypes.div,
        elementTypes.button,
        elementTypes.button
    ]);

    /** map attributes */
    mapAttributes(attrs.div, div);
    mapAttributes(attrs.check, button);
    mapAttributes(attrs.next, nextButton);

    nextButton.addEventListener('click', () => funcs.next());

    
    button.addEventListener('click', (e) => {
        const checkedBoxes = document.getElementsByName('answer-check-option');
        checkedBoxes.forEach(checkbox => {
            if (checkbox.checked) {
                funcs.validate(checkbox);
                funcs.increaseIndex();
                
                /** disable checkbox */
                disableCheck();

                /** disabled select */
                button.disabled = true;
                button.classList.add('disabled-button');
                
                /** enable next */
                nextButton.disabled = false;
                nextButton.classList.remove('disabled-button');
            }
        });
    });


    /** append */
    div.append(button, nextButton)
    section.appendChild(div);
}

const disableCheck = () => {
    const checkedBoxes = document.getElementsByName('answer-check-option');
    checkedBoxes.forEach(checkbox => {
        checkbox.disabled = true;
    } );
}


/** toggle selection */
const singleSelectCheckbox = (clickedCheckbox) => {
    let isSelect = false;
    const select = document.getElementById(buttonsData.check.id);
    const checkboxes = document.getElementsByName('answer-check-option');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            isSelect = true;
        }
        if (checkbox !== clickedCheckbox) {
            checkbox.checked = false;
        }
    });
    if (isSelect) {
        select.disabled = false;
        select.classList.remove('disabled-button');
    } else {
        select.disabled = true;
        select.classList.add('disabled-button');
    }
}

/** loader */
export const showLoading = (isShow) => {

    const attrs = loadingElementsData;
    const body = document.querySelector('body');

    /** toggle loading */
    if (!isShow) {
        const section = document.getElementById(attrs.section.id);
        section.remove();
        return;
    }

    /** prepare elements */
    const [div, span, section, spinnerDiv] = createElements([
        elementTypes.div,
        elementTypes.span,
        elementTypes.section,
        elementTypes.div
    ]);

    /** map attributes */
    mapAttributes(attrs.span, span);
    mapAttributes(attrs.conDiv, div);
    mapAttributes(attrs.section, section);
    mapAttributes(attrs.spinDiv, spinnerDiv);

    /** Append */
    div.append(spinnerDiv, span);
    section.append(div);
    body.appendChild(section);
}


/** show result */
export const showStats = (stats) => {

    clearQuizSection();

    const atrs = resultData(stats);
    const data = statsTitles(stats);
    const body = document.querySelector('body');
    const statSection = document.getElementById('stats');

    /** create elements */
    const [div, h1, p, button] = createElements([
        elementTypes.div,
        elementTypes.h1,
        elementTypes.p,
        elementTypes.button
    ]);

    /** map attributes */
    mapAttributes(atrs.con, div);
    mapAttributes(atrs.title, h1);
    mapAttributes(atrs.button, button);
    mapAttributes(atrs.sec, statSection);
        
    
    button.addEventListener('click', () => {
        location.reload();
    });

    data.forEach(text => {
        const [title, answer] = createElements([
            elementTypes.p,
            elementTypes.span
        ]);

        const splitted = text.split('-');
        
        title.textContent = `${splitted[0]} - `;
        answer.textContent = splitted[1];
        answer.classList.add('stats-answer');
        
        title.appendChild(answer);
        p.appendChild(title);
    });
    
    div.append(h1, p, button);
    statSection.appendChild(div);
    body.appendChild(statSection);
}

/** clean quiz section */
export const clearQuizSection = () => {
    const section = document.getElementById('quiz');
    section.classList.remove('quiz');
    if (section.childNodes.length > 0) {
        section.innerHTML = null;
    }
}

/** highlight the correct answer */
export const highlightCorrectAnswer = (answer) => {
    const checkboxes = document.getElementsByName('answer-check-option');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.value == answer) {
            checkbox.parentElement.style.borderWidth = '3px';
            checkbox.parentElement.style.borderStyle = 'solid';
            checkbox.parentElement.style.borderColor = '#28a745';
        } 
    });
}

/** show user correct */
export const showUserCorrect = () => {
    const quizCard = document.querySelector('.quiz-card');
    const quizNumber = document.querySelector('#quiz-number');

    quizCard.classList.add('quiz-correct');
    quizNumber.classList.add('quiz-number-correct');
}

/** show user wrong */
export const showUserWrong = () => {
    const quizCard = document.querySelector('.quiz-card');
    const quizNumber = document.querySelector('#quiz-number');

    quizCard.classList.add('quiz-wrong');
    quizNumber.classList.add('quiz-number-wrong');
}