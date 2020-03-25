import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

addCssFile('components/ElementText.css');

export default async function() {
    return {
        name: 'ElementText',
        template: await readFile('components/ElementText.html'),
        props: {
            element: { default: {} }
        },
        data: function() {
            return {
            }
        },
        mounted: function() {
        },
        beforeDestroy: function() {
        },
        methods: {
            handleInput(e) {
                element.text = e.target.innerHtml;
            }
        }
    }
}
