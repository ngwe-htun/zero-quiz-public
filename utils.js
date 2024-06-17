
export const calcuatePercentage = (score, maxQuiz) => {
    const percent = (score / maxQuiz) * 100;
    return Math.ceil(percent);
}

export const statsTitles = (stats) => {
    return [
        `မေးခွန်းအရေအတွက် - ${stats.max}`,
        `မှန်ကန်သောအရေအတွက် - ${stats.score}`,
        `မှားသောအရေအတွက် -  ${stats.max - stats.score}`,
    ];
}