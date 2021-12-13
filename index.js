// import * as d3 from "https://cdn.skypack.dev/d3@7";
import * as d3 from "d3";
class groupBar {
    constructor(props) {
        const {
            container,
            gapHeight,
            uType,
            width,
            marginL,
            marginT,
            barHeight,
            gapXY,
            barOffset,
            barClickCallback
        } = props
        this.gapHeight = gapHeight
        this.uType = uType
        this.width = width
        this.container = container
        this.marginL = marginL
        this.marginT = marginT
        this.svg
        this.yScale
        this.yAxis
        this.barHeight = barHeight
        this.gapXY = gapXY
        this.barOffset = barOffset
        this.dynamicColor = "blue"
        this.tooltip
        this.barClickCallback = barClickCallback
    }
    init() {
        this.svg = d3.select(this.container)
            .append('svg')
            .style('background', '#eeeeee')
            .attr('width', this.width + 'px')
            .attr('height', this.gapHeight * (this.uType + 1) + 'px')
            .style("border", '1px solid #eee')
    }
    creatAxios() {
        this.yScale = d3.scaleLinear()
            .domain([1, this.uType])
            .range([this.gapHeight * this.uType - 30, 1]);

        this.yAxis = d3.axisLeft().scale(this.yScale)
            .ticks(this.uType)

        this.svg.append('g')
            .attr("class", "axis")
            .call(this.yAxis)
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", this.width - this.marginL - 5))
            .attr('transform', `translate(${this.marginL},${this.marginT})`)
            .selectAll("text")
            .attr("y", "-25")
    }

    creatTooltip() {
        this.tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0.0);
    }

    creatTooltipDom(data) {

    }

    creatRect(barData) {
        let that = this
        let colorArray = ['rgba(25, 77, 249, 0.6)', "rgba(90, 97, 107, 0.6)", "rgba(224, 63, 63, 0.6)"]
        let dataLength = barData.length
        let barW = (this.width - this.marginL - this.barOffset * dataLength) / dataLength
        this.svg.append("g")
            .selectAll('rect')
            .data(barData)
            .join("rect")
            .attr('transform', `translate(${this.marginL},${this.marginT})`)
            .style("fill", function (d, i) {
                switch (d.type) {
                    case 0:
                        return colorArray[0]
                        break;
                    case 1:
                        return colorArray[1]
                        break;
                    case 2:
                        return colorArray[2]
                        break;
                    default:
                        return colorArray[0]
                        break;
                }
            })

            .attr('width', (d, i) => {
                return barW
            })
            .attr('height', (data) => {
                let barNum = data.occupyULength
                return this.barHeight * barNum + (this.gapHeight - this.barHeight) * (barNum - 1)
            })
            .attr('x', (data, i) => {
                return i * barW + this.barOffset * i + this.gapXY;
            })
            .attr('y', (data) => {
                let barHeightNum = data.occupyULength
                return this.yScale(data.beginU) - this.barHeight * barHeightNum - (this.gapHeight - this.barHeight) * (barHeightNum - 1) - this.gapXY;
            })
            .on('mouseover', function (event, data) {
                that.dynamicColor = this.style.fill;
                let newColor = that.dynamicColor.replace(/0.*/, '0.8')
                let tooltipDom = `<div>
                <h3>${data.name}</h3>
                <ul>
                <li>2</li>
                <li>3</li>
                </ul>
                </div>`
                d3.select(this)
                    .style('fill', newColor)
                that.tooltip
                    .html(tooltipDom)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY) + "px")
                    .style("opacity", 1.0)
            })
            .on('mouseout', function (data) {
                d3.select(this)
                    .style('fill', that.dynamicColor)
                that.tooltip.style("opacity", 0.0);
            })
            .on('click', function (event,data) {
                that.dynamicColor = this.style.fill;
                let newColor = that.dynamicColor.replace(/0.*/, '1')
                d3.select(this)
                    .style('fill', newColor)
                that.barClickCallback(data)  
            })
    }

    render(data) {
        data.map(item => {
            this.creatRect(item)
        })
    }
}

export default groupBar