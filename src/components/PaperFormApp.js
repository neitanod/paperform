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
            'pa-window':         Window,
            'pa-element':        Element,
        },
        data: function() {
            return {
                greeting: "Hi there!",
                controls: {
                    options: true,
                    help: false,
                    tools: true,
                    commands: true,
                },
                border: true,
                grid_visible: false,
                content_visible: true,
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
            printContent: function() {
                return this.print('content');
            },
            printGrid: function() {
                return this.print('grid');
            },
            print: function(what) {
                var self = this;
                var grid_was_visible = this.grid_visible;
                var content_was_visible = this.content_visible;

                this.grid_visible = (what == 'grid');
                this.content_visible = (what == 'content');

                setTimeout(
                    () => {
                        window.print();
                        this.grid_visible = grid_was_visible;
                        this.content_visible = content_was_visible;
                    }
                    , 1000);
            },
            loadFromUrl: function() {
                var self = this;
                if(window.location.hash) {
                    axios.get("https://publish.ip1.cc/storage/uploads/"+window.location.hash.substr(1)+".json")
                        .then( function(r) {
                            self.form_document = r.data;
                        } )
                        .catch( function(r) {
                            // alert("No se pudo cargar el documento.");
                            console.log("No se pudo cargar el documento.");
                        } )
                };
            },
            save: function() {
                var self = this;
                var form_data = new FormData();
                form_data.append('data', JSON.stringify(self.form_document));
                axios({
                    method: 'post',
                    url: "https://publish.ip1.cc",
                    data: form_data,
                    headers: {'Content-Type': 'multipart/form-data' }
                })
                .then( function(r) {
                    window.location.hash = r.data.key;
                    alert("Current form was saved under current URL.\nYou can bookmark it for future use.\nYou can also share it.");
                } )
                ;
            },
            addTextElement: function() {
                this.form_document.elements.push({ type: "text", text: "Text" , style: ""});
            },
            addBoxElement: function() {
                this.form_document.elements.push({ type: "box", style: "" });
            },
            addImageElement: function() {
                this.form_document.elements.push({ type: "image", url: "no_image.png", style: ""});
            }
        }
    }
}
