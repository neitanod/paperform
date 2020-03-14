import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

addCssFile('components/Window.css');

export default async function() {
    return {
        name: 'Window',
        template: await readFile('components/Window.html'),
        data: function() {
            return {
            }
        },
        methods: {
        }
    }
}
