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
            window.addEventListener('pointerup', this.pointerup);
            window.addEventListener('mousemove', this.dragged);
            window.addEventListener('touchmove', this.dragged);
        },
        beforeDestroy: function() {
            window.removeEventListener('pointerup', this.pointerup);
            window.removeEventListener('mousemove', this.dragged);
            window.removeEventListener('touchmove', this.dragged);
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
            pointerdown: function() {
                this.dragging = true;
            },
            pointerup: function() {
                this.dragging = false;
                this.drag_last_x = null;
                this.drag_last_y = null;
            },
            dragged: function(event) {
                if( this.dragging ) {
                    var deltaX = 0;
                    var pageX = null;
                    var pageY = null;

                    if ( event.changedTouches && event.changedTouches.length ) {
                        if ( event.changedTouches[0].pageX != null ) {
                            pageX = event.changedTouches[0].pageX;
                        }
                        if ( event.changedTouches[0].pageY != null ) {
                            pageY = event.changedTouches[0].pageY;
                        }
                    }

                    if ( event.pageX != null ) {
                        pageX = event.pageX;
                    }
                    if ( event.pageY != null ) {
                        pageY = event.pageY;
                    }


                    if ( this.drag_last_x ) {
                        deltaX = pageX - this.drag_last_x;
                    }
                    var deltaY = 0;
                    if ( this.drag_last_y ) {
                        deltaY = pageY - this.drag_last_y;
                    }
                    this.drag_last_x = pageX;
                    this.drag_last_y = pageY;
                    this.setX(deltaX);
                    this.setY(deltaY);
                }
            },
        }
    }
}
