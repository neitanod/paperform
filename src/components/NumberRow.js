import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

addCssFile('components/NumberRow.css');

export default async function() {
    return {
        name: 'NumberRow',
        template: await readFile('components/NumberRow.html'),
        data: function() {
            return {
            }
        },
        methods: {
        }
    }
}
