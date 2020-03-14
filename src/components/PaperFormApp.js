import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

import NumberRow from './NumberRow.js';
import Window from './Window.js';

addCssFile('./components/PaperFormApp.css');

export default {
    name: 'App',
    template: document.getElementById("paperform-app-template").outerHTML,
    components: {
        // A VUE no le gustó que use el caracter ":" en el nombre del elemento
        // (aunque haya funcionado).  Me mandó a leer esto:
        // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
        'pa-number-row': NumberRow,
        'pa-window': Window
    },
    data: function() {
        return {
            greeting: "Hi there!",
            controls: {
                options: true
            },
            border: true,
            landscape: false,
            grid: false,
            numbers: false
        }
    },
    methods: {
        cssClassesMain: function() {
            return {
                border: this.border,
                portrait: this.landscape-2,
                landscape: this.landscape-1,
                grid:this.grid
            }
        }
    }
}
