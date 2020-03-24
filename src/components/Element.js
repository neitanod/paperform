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
        },
        props: {
            element: { default: {} }
        },
        data: function() {
            return {
            }
        },
        mounted: function() {
        },
        beforeDestroy: function() {
        },
        methods: {
        }
    }
}
