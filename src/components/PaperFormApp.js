import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

// La positioning grid es una grilla que sirve para imprimir sobre el formulario
// o papel de igual tamaño, y usar como guia para ubicar los "slots" o etiquetas
// en la pantalla.
// Una vez ubicadas las etiquetas podemos ocultar la grilla e imprimir sólo los
// valores, posicionados en los lugares correctos para que rellenen el
// formulario correctamente.
import PositioningGrid from './PositioningGrid.js';
import Window from './Window.js';

addCssFile('./components/PaperFormApp.css');

export default async function() {
    return {
        name: 'App',
        template: await readFile("components/PaperformApp.html"),
        components: {
            'pa-positioning-grid':   PositioningGrid,
            'pa-window':       Window,
        },
        data: function() {
            return {
                greeting: "Hi there!",
                controls: {
                    options: true,
                    tools: true,
                    help: false
                },
                border: true,
                grid: false,
                form_document: {
                    config: {
                        orientation: 'portrait',
                        locked: false
                    },
                    elements: {}
                }
            }
        },
        methods: {
            cssClassesMain: function() {
                return {
                    border: this.border,
                    portrait: this.form_document.config.orientation=='portrait',
                    landscape: !(this.form_document.config.orientation=='portrait'),
                }
            }
        }
    }
}
