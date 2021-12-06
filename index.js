import * as d3 from "https://cdn.skypack.dev/d3@7";
class groupBar {
    constructor(props) {
        const {
            container,
            gapHeight,
            uType,
            width
        } = props
        console.log('container', container)
        this.gapHeight = gapHeight
        this.uType = uType
        this.width = width
        this.container = container
    }
    init() {
        var svg = d3.select(this.container)
            .append('svg')
            .style('background', '#eeeeee')
            .attr('width', this.width + 'px')
            .attr('height', this.gapHeight * (this.uType + 1) + 'px')
            .style("border", '1px solid #eee')
    }
}

export default groupBar