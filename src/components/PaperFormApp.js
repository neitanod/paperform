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
import Element from './Element.js';

addCssFile('./components/PaperFormApp.css');

export default async function() {
    return {
        name: 'App',
        template: await readFile("components/PaperformApp.html"),
        components: {
            'pa-positioning-grid':   PositioningGrid,
            'pa-window':       Window,
            'pa-element':      Element,
        },
        data: function() {
            return {
                greeting: "Hi there!",
                controls: {
                    options: true,
                    help: false,
                    tools: true,
                },
                border: true,
                grid: false,
                form_document: {
                    config: {
                        orientation: 'portrait',
                        locked: false
                    },
                    elements: []
                }
            }
        },
        mounted: function() {
            this.loadFromUrl();
        },
        methods: {
            cssClassesMain: function() {
                return {
                    border: this.border,
                    portrait: this.form_document.config.orientation=='portrait',
                    landscape: !(this.form_document.config.orientation=='portrait'),
                }
            },
            print: function() {
                window.print();
            },
            loadFromUrl: function() {
                var self = this;
                if(window.location.hash) {
                    axios.get("https://publish.ip1.cc/storage/uploads/"+window.location.hash.substr(1)+".json")
                        .then( function(r) {
                            self.form_document = JSON.parse(r);
                            console.log(r);
                        } )
                        .catch( function(r) {
                            // alert("No se pudo cargar el documento.");
                            console.log("No se pudo cargar el documento.");
                        } )
                };
            },
            save: function() {
                var self = this;
                axios.post(
                    "https://publish.ip1.cc",
                    {data: self.form_document}
                )
                .then( function(r) { window.location.hash = r.key; } )
                ;
            },
            addElement: function() {
                this.form_document.elements.push({});
            }
        }
    }
}
