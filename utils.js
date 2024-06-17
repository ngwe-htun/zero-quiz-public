
export const calcuatePercentage = (score, maxQuiz) => {
    const percent = (score / maxQuiz) * 100;
    return Math.ceil(percent);
}

const enToMmNums = {
    0: '၀',
    1: '၁',
    2: '၂',
    3: '၃',
    4: '၄',
    5: '၅',
    6: '၆',
    7: '၇',
    8: '၈',
    9: '၉'
};

export const statsTitles = (stats) => {
    return [
        `မေးခွန်းအရေအတွက် - ${stats.max}`,
        `မှန်ကန်သောအရေအတွက် - ${stats.score}`,
        `မှားသောအရေအတွက် -  ${stats.max - stats.score}`,
    ];
}