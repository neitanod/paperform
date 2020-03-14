import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

import NumberRow from './NumberRow.js';
import Window from './Window.js';
import WindowTitle from './WindowTitle.js';

addCssFile('./components/PaperFormApp.css');

// Convertimos el export en una función async, que Vue también acepta y nos
// permite cargar el template con `await readFile()`

export default async function() {
    return {
        name: 'App',
        template: await readFile("components/PaperformApp.html"),
        components: {
            'pa-number-row':   NumberRow,
            'pa-window':       Window,
            'pa-window-title': WindowTitle,
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
}
