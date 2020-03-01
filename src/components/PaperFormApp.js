import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

import NumberRow from './NumberRow.js';

addCssFile('./components/PaperFormApp.css');

export default {
    name: 'App',
    template: document.getElementById("paperform-app-template").outerHTML,
    components: {
        'number-row': NumberRow
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
