import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

addCssFile('components/Element.css');

export default async function() {
    return {
        name: 'Element',
        template: await readFile('components/Element.html'),
        components: {
            // 'pa-element-label': ElementLabel,
        },
        props: {
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
