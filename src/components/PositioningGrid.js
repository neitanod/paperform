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
            charlabel: function(i) {
                var n = i%36;
                return String.fromCharCode(n+(n<10?48:55));
            }
        }
    }
}
