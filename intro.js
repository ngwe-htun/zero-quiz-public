import { 
    elementTypes,
    mapAttributes,
    createElements, 
    introElementsData,
} from "./element.js";

export const showIntro = (start) => {
    /** get section */
    const section = document.querySelector('#intro');

    const attrs = introElementsData;

    /** create elements */
    const [p, div, logo, button] = createElements([
        elementTypes.p,
        elementTypes.div,
        elementTypes.img,
        elementTypes.button,
    ]);

    /** map attributes */
    mapAttributes(attrs.text, p);
    mapAttributes(attrs.div, div);
    mapAttributes(attrs.logo, logo);
    mapAttributes(attrs.button, button);

    button.addEventListener('click', function(event) {
        section.removeChild(div);
        start();
    });

    /** append */
    div.append(logo, p, button);
    section.appendChild(div);
}