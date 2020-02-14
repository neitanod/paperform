export default {
    name: 'App',
    template: document.getElementById("paperform-app").outerHTML,
    data: function() {
        return {
            greeting: "Hi there!",
            controls: {
                options: true
            },
            border: true,
            landscape: false,
            grid: false,
            numbers: false
        }
    },
    methods: {
        cssClassesMain: function() {
            return {
                border: this.border,
                portrait: this.landscape-2,
                landscape: this.landscape-1,
                grid:this.grid
            }
        }
    }
}
