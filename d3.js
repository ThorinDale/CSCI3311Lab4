
const margin = ({top: 20, right: 20, bottom: 20, left: 20});

const width = 1000 - margin.left - margin.right;
const height = 1000 - margin.top - margin.bottom;
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
                    .range([0, width]);
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
        .attr('transform', 'translate(0, ${height})')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'axis y-axis')
        .attr('transform', 'translate(${width}, 0)')
        .call(yAxis);

});


