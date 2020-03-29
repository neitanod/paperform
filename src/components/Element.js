import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

addCssFile('components/Element.css');

import ElementText  from './ElementText.js';
import ElementBox   from './ElementBox.js';
import ElementImage from './ElementImage.js';

export default async function() {
    return {
        name: 'Element',
        template: await readFile('components/Element.html'),
        components: {
            'pa-element-text':   ElementText,
            'pa-element-box':    ElementBox,
            'pa-element-image':  ElementImage,
            'moveable':          VueMoveable
        },
        props: {
            element: { default: {} },
            keepAspect: { default: false }
        },
        data: function() {
            return {
                moveable: {
                    draggable: true,
                    throttleDrag: 1,
                    resizable: true,
                    keepRatio: this.keepAspect,
                    scalable: (this.element.type == "image"),
                    //throttleResize: 1,
                    //throttleScale: 0.1,
                    //throttleRotate: 0.2,
                    rotatable: true,
                    pinchable: true,
                    renderDirections: ["s", "se", "e"],
                },
            }
        },
        mounted: function() {
            this.$el.style.cssText = this.element.style;
            this.$el.addEventListener('keydown', this.handleKeydown);

            this.$refs.moveable.updateRect();
            setTimeout( () => this.$refs.moveable.updateRect(), 100);
        },
        beforeDestroy: function() {
            this.$el.removeEventListener('keydown', e => console.log(e));
        },
        watch: {
            keepAspect() {
                this.moveable.keepRatio = this.keepAspect;
            }
        },
        methods: {
            handleKeydown: e => console.log(e),
            handleClick(ev) {
                this.$refs.component.click(ev);
            },
            handleDrag({ target, transform }) {
                //console.log("onDrag", transform);
                target.style.transform = transform;
                this.publishStyles(target);
            },
            handleResize({ target, width, height }) {
                //console.log("onResize", width, height);
                target.style.width = `${width}px`;
                target.style.height = `${height}px`;
                this.publishStyles(target);
            },
            handleScale({ target, transform }) {
                //console.log("onScale", transform);
                target.style.transform = transform;
                this.publishStyles(target);
            },
            handleRotate({ target, transform }) {
                //console.log("onRotate", transform);
                target.style.transform = transform;
                this.publishStyles(target);
            },
            handleWarp({ target, transform }) {
                //console.log("onWarp", transform);
                target.style.transform = transform;
                this.publishStyles(target);
            },
            clearAllStates() {
                Object.keys(this.states).forEach(key => {
                    this.moveable[key] = false;
                });
            },
            publishStyles(target) {
                this.$emit('cssInput', target.style.cssText);
            },
            handleTextInput(text) {
                this.$emit("textInput", text);
            }
        }
    }
}
