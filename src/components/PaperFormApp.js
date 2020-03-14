import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

import NumberRow from './NumberRow.js';
import Window from './Window.js';

addCssFile('./components/PaperFormApp.css');

export default async function() {
    return {
        name: 'App',
        template: await readFile("components/PaperformApp.html"),
        components: {
            'pa-number-row':   NumberRow,
            'pa-window':       Window,
        },
        data: function() {
            return {
                greeting: "Hi there!",
                controls: {
                    options: true,
                    help: false
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
