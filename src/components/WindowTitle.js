import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

export default async function() {
    return {
        name: 'Window',
        template: await readFile('components/WindowTitle.html'),
        data: function() {
            return {
            }
        },
        methods: {
        }
    }
}
