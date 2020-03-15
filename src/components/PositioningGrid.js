import functions from './functions.js';
const readFile = functions.readFile;
const addCssFile = functions.addCssFile;

addCssFile('components/PositioningGrid.css');

export default async function() {
    return {
        name: 'PositioningGrid',
        template: await readFile('components/PositioningGrid.html'),
        data: function() {
            return {
            }
        },
        methods: {
        }
    }
}
