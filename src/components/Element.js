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
            element: { default: {} }
        },
        data: function() {
            return {
                moveable: {
                    draggable: true,
                    throttleDrag: 1,
                    resizable: true,
                    throttleResize: 1,
                    keepRatio: false,
                    scalable: (this.element.type == "image"),
                    throttleScale: 0.01,
                    rotatable: true,
                    throttleRotate: 0.2,
                    pinchable: true,
                    origin: false
                },
            }
        },
        mounted: function() {
        },
        beforeDestroy: function() {
        },
        methods: {
            handleDrag({ target, transform }) {
                console.log("onDrag", transform);
                target.style.transform = transform;
            },
            handleResize({ target, width, height }) {
                console.log("onResize", width, height);
                target.style.width = `${width}px`;
                target.style.height = `${height}px`;
            },
            handleScale({ target, transform }) {
                console.log("onScale", transform);
                target.style.transform = transform;
            },
            handleRotate({ target, transform }) {
                console.log("onRotate", transform);
                target.style.transform = transform;
            },
            handleWarp({ target, transform }) {
                console.log("onWarp", transform);
                target.style.transform = transform;
            },
            clearAllStates() {
                Object.keys(this.states).forEach(key => {
                    this.moveable[key] = false;
                });
            }
        }
    }
}
