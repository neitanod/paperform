import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

import WindowTitle from './WindowTitle.js';

addCssFile('components/Window.css');

export default async function() {
    return {
        name: 'Window',
        template: await readFile('components/Window.html'),
        components: {
            'pa-window-title': WindowTitle,
        },
        props: {
            'top':    { default: null },
            'left':   { default: null },
            'bottom': { default: null },
            'right':  { default: null },
        },
        data: function() {
            return {
                dragging: false,
                offset_x: 0,
                offset_y: 0,
                drag_last_x: null,
                drag_last_y: null,
            }
        },
        mounted: function() {
            this.setX(0);
            this.setY(0);
            window.addEventListener('mouseup',   this.mouseup);
            window.addEventListener('mousemove', this.dragged);
        },
        beforeDestroy: function() {
            window.removeEventListener('mouseup',   this.mouseup);
            window.removeEventListener('mousemove', this.dragged);
        },
        methods: {
            setY: function(X) {
                this.offset_x += X;
                if (this.top) {
                    this.$el.style.top = parseInt(this.top, 10) + this.offset_x;
                }
                if (this.bottom) {
                    this.$el.style.bottom = parseInt(this.bottom, 10) - this.offset_x;
                }
            },
            setX: function(Y) {
                this.offset_y += Y;
                if (this.left) {
                    this.$el.style.left = parseInt(this.left, 10) + this.offset_y;
                }
                if (this.right) {
                    this.$el.style.right = parseInt(this.right, 10) - this.offset_y;
                }
            },
            hasSlot: function(name = 'default') {
                return (
                       !!this.$slots[ name ]
                    || !!this.$scopedSlots[ name ]
                );
            },
            mousedown: function() {
                this.dragging = true;
            },
            mouseup: function() {
                this.dragging = false;
                this.drag_last_x = null;
                this.drag_last_y = null;
            },
            dragged: function(event) {
                if( this.dragging ) {
                    var deltaX = 0;
                    if ( this.drag_last_x ) {
                        deltaX = event.pageX - this.drag_last_x;
                    }
                    var deltaY = 0;
                    if ( this.drag_last_y ) {
                        deltaY = event.pageY - this.drag_last_y;
                    }
                    this.drag_last_x = event.pageX;
                    this.drag_last_y = event.pageY;
                    this.setX(deltaX);
                    this.setY(deltaY);
                }
            },
        }
    }
}
