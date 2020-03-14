import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

addCssFile('components/Window.css');

export default async function() {
    return {
        name: 'Window',
        template: await readFile('components/Window.html'),
        props: {
            'top':    { default: null },
            'left':   { default: null },
            'bottom': { default: null },
            'right':  { default: null },
        },
        data: function() {
            return {
            }
        },
        mounted: function() {
            this.$el.style.top = this.top;
            this.$el.style.left = this.left;
            this.$el.style.bottom = this.bottom;
            this.$el.style.right = this.right;
        },
        methods: {
            dragged: function(x,y) {
                console.log("Dragged!");
                console.log("X:" + x);
                console.log("Y:" + y);
            }
        }
    }
}
