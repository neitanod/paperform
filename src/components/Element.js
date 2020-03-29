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
            keepAspect: { default: false },
            snapRotate: { default: false }
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

                if ( this.snapRotate ) {
                    let angle = /rotate\((.+)deg\)/g.exec(transform);
                    if (angle[1]) {
                        const angle_float = parseFloat(angle[1]) % 360 ;
                        let snapTo = angle_float;
                        const snapToDegrees = [0, 45, 90, 135, 180, 225, 270, 315, 360];
                        const closeness = 5;
                        for (let i in snapToDegrees) {
                            if (
                                angle_float > snapToDegrees[i]-closeness &&
                                angle_float < snapToDegrees[i]+closeness
                            ) {
                                snapTo = snapToDegrees[i];
                            }
                        }
                        transform = transform.replace('rotate('+angle[1]+'deg)','rotate('+snapTo+'deg)')
                    }
                }
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
