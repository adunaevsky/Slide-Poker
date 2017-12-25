
var d3 = Object.assign({}, require('d3-selection'));

var opts = {
    width: 105,
    height: 155,
    margins: { top: 0, right: 0, bottom: 0, left: 0 }
};

function table(value) {

    var chartW = Math.max(opts.width - opts.margins.left - opts.margins.right, 0.1);
    var chartH = Math.max(opts.height - opts.margins.top - opts.margins.bottom, 0.1);

    var parentDiv = d3.select('#myGraph').html('');

    var svg = parentDiv.append('svg').attr('width', '100%').attr("viewBox", "0 0 " + opts.width + ' ' + opts.height)
        .attr("preserveAspectRatio", "xMinYMin meet");

    var visSvg = svg.append('g').attr('class', 'vis-group');

    var row = visSvg.selectAll('g.row')
        .data(value);

    row.enter().append('rect')
        .attr('class', 'cell row')
        .attr('width', 100)
        .attr('height', 15)
        .attr('x', 4)
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('y', (y, i) => {
            return ((17 * i) + 1);
        })
        .style('fill', (c) => {
            return c.clr;
        })
        .style('stroke', 'silver')
        .style('opacity', 1)
        .attr('id', 'rsltRow');

    row.enter().append('text')
        .attr('y', (y, i) => {
            return (17 * (i + 1) - 5)
        })
        .attr('x', 10)
        .attr('class', 'payTableText')
        .attr('font-size', 8)
        .text(d => d.text);

    row.enter().append('text')
        .attr('y', (y, i) => {
            return (17 * (i + 1) - 5)
        })
        .attr('x', 99)
        .attr('class', 'payTableText')
        .attr('font-size', 11)
        .attr('text-anchor', 'end')
        .text(d => d.reward);

}

export { table as default }