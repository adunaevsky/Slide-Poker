
var d3 = Object.assign({}, require('d3-selection'));

var opts = {
    width: 105,
    height: 222,
    margins: { top: 0, right: 0, bottom: 0, left: 0 }
};

function table(value,coinValue, adjustFactor) {

  
    var chartW = Math.max(opts.width - opts.margins.left - opts.margins.right, 0.1);
    var chartH = Math.max(opts.height - opts.margins.top - opts.margins.bottom, 0.1);

    var parentDiv = d3.select('#myGraph').html('');

    var svg = parentDiv.append('svg').attr('width', '100%').attr("viewBox", "0 0 " + opts.width + ' ' + opts.height)
        .attr("preserveAspectRatio", "xMinYMin meet");

    var visSvg = svg.append('g').attr('class', 'vis-group');

    var row = visSvg.selectAll('g.row')
        .data(value);
    var sf = 0.8; //scale factor

    row.enter().append('rect')
        .attr('class', 'cell row')
        .attr('width', 110 * sf)
        .attr('height', 15 * sf)
        .attr('x', 7 * sf)
        .attr('rx', 4 * sf)
        .attr('ry', 4)
        .attr('y', (y, i) => {
            return (((17 * i) + 1) * sf);
        })
        .style('fill', (c) => {
            return c.clr;
        })
        .style('stroke', 'silver')
        .style('opacity', 1)
        .attr('id', 'rsltRow');

    row.enter().append('text')
        .attr('y', (y, i) => {
            return ((17 * (i + 1) - 5) * sf)
        })
        .attr('x', 10 * sf)
        .attr('class', 'payTableText')
        .attr('font-size', 8  * sf)
        .text(d => d.text);

    row.enter().append('text')
        .attr('y', (y, i) => {
            return ((17 * (i + 1) - 5) * sf)
        })
        .attr('x', 114 * sf)
        .attr('class', 'payTableText')
        .attr('font-size', 11 * sf)
        .attr('text-anchor', 'end')
        .text(d => commaValue(d.reward * coinValue / adjustFactor));

}

function commaValue(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { table as default }