
const margin = ({top: 40, right: 40, bottom: 40, left: 40});

const width = 700 - margin.left - margin.right;
const height = 700 - margin.top - margin.bottom;
const svg = d3.select('.chart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{
    console.log(data);
    const xScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d=>d.Income)])
                    .range([2, width+2]);
    // console.log(xScale(d3.max(data, d=>d.Income)));

    const yScale = d3.scaleLinear()
                    .domain([d3.max(data, d=>d.LifeExpectancy), 0])
                    .range([0, height]);
    // console.log(yScale(d3.max(data, d=>d.LifeExpectancy)));

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d=>xScale(d.Income))
        .attr('cy', d=>yScale(d.LifeExpectancy))
        .attr('r', '4px')
        .attr('fill', 'blue');

    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .ticks(5, 's');

    const yAxis = d3.axisLeft()
                    .scale(yScale);

    svg.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', 'translate(0,' + (height) + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'axis y-axis')
        .attr('transform', 'translate(0, ${height})')
        .call(yAxis);

    svg.append('text')
        .attr('x', width - margin.right)
        .attr('y', height + margin.top)
        .text('Income');
    console.log(height);

    svg.append('text')
        .attr('x', -30)
        .attr('y', height/2 - margin.top)
        .text('Life Expectancy')
        .attr('writing-mode', 'vertical-lr');

});


