import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

addCssFile('components/ElementBox.css');

export default async function() {
    return {
        name: 'ElementBox',
        template: await readFile('components/ElementBox.html'),
        props: {
            element: { default: {} }
        },
        data: function() {
            return {
                styles: {
                    top: 100,
                    left: 100
                }
            }
        },
        mounted: function() {
            this.updateStyles();
        },
        beforeDestroy: function() {
        },
        methods: {
            updateStyles() {
                this.$set(this.styles,"top",    this.element.top);
                this.$set(this.styles,"left",   this.element.left);
                this.$set(this.styles,"width",  this.element.width);
                this.$set(this.styles,"height", this.element.height);
            }
        }
    }
}
