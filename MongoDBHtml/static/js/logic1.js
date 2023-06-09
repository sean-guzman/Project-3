console.log("logic.js")

d3.json("https://us-east-1.aws.data.mongodb-api.com/app/data-qgrcp/endpoint/types_of_EVs_by_Brand_by_Year").then(function (data) {
  console.log("data")
  console.log(data)

  const top_n = 32;
  const height = 1400;
  const width = 1500;

  const tickDuration = 500; //delay of an animation
  const delayDuration = 1000; //delay between two years

  const yearStart = 1991;
  const yearEnd = 2022;

  const title = `Chronicle Numbers of Vehicle Models with Brands (${yearStart}-${yearEnd})`;
  const subTitle = "(Model #)";

  const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  const margin = {
    top: 80,
    right: 0,
    bottom: 5,
    left: 0
  };

  const barPadding = (height - (margin.bottom + margin.top)) / (top_n * 5);

  svg.append('text')
    .attr('class', 'title')
    .attr('y', 24)
    .html(title);

  svg.append("text")
    .attr("class", "subTitle")
    .attr("y", 55)
    .html(subTitle);

  svg.append('text')
    .attr('class', 'caption')
    .attr('x', width)
    .attr('y', height - 5)
    .style('text-anchor', 'end')
    .html('Source: https://github.com/ytdec');

  let year = yearStart;

  data.forEach(d => {
    d.colour = d3.hsl(Math.random() * 360, 0.75, 0.75);
  });

  let lastValues = {};

  function _normalizeData() {
    const values = {};

    const ret = [];
    data.forEach(d => {
      const name = d["Manufacturer"];
      const lbl = year;
      const txt = d[lbl];
      let val = 0;

      if (txt != '..')
        val = txt;

      // val = Math.round(val * 1e2) / 1e2; //round 2 digits

      let lastValue = lastValues[name];
      if (lastValue == null)
        lastValue = 0;

      ret.push({
        name: name,
        colour: d.colour,
        value: val,
        lastValue: lastValue
      });

      //remember current value of the country
      values[name] = val;
    });

    lastValues = values;

    return ret.sort((a, b) => b.value - a.value).slice(0, top_n);
  }

  let yearSlice = _normalizeData();

  yearSlice.forEach((d, i) => d.rank = i);

  console.log('yearSlice: ', yearSlice)

  let x = d3.scaleLinear()
    .domain([0, d3.max(yearSlice, d => d.value)])
    .range([margin.left, width - margin.right - 65]);

  let y = d3.scaleLinear()
    .domain([top_n, 0])
    .range([height - margin.bottom, margin.top]);

  let xAxis = d3.axisTop()
    .scale(x)
    .ticks(width > 500 ? 5 : 2)
    .tickSize(-(height - margin.top - margin.bottom))
    .tickFormat(d => d3.format(',')(d));

  svg.append('g')
    .attr('class', 'axis xAxis')
    .attr('transform', `translate(0, ${margin.top})`)
    .call(xAxis)
    .selectAll('.tick line')
    .classed('origin', d => d == 0);

  svg.selectAll('rect.bar')
    .data(yearSlice, d => d.name)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', x(0) + 1)
    .attr('width', d => x(d.lastValue) - x(0) + 200)
    .attr('y', d => y(d.rank) + 5)
    .attr('height', y(1) - y(0) - barPadding)
    .style('fill', d => d.colour);

  svg.selectAll('text.label')
    .data(yearSlice, d => d.name)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.lastValue) - 8)
    .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
    .style('text-anchor', 'end')
    .html(d => d.name);

  svg.selectAll('text.valueLabel')
    .data(yearSlice, d => d.name)
    .enter()
    .append('text')
    .attr('class', 'valueLabel')
    .attr('x', d => x(d.lastValue) + 5)
    .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
    .text(d => d.lastValue);

  let yearText = svg.append('text')
    .attr('class', 'yearText')
    .attr('x', 1200)
    .attr('y', 350)
    .style('text-anchor', 'end')
    .html(~~year);

  let ticker = d3.interval(e => {

    yearSlice = _normalizeData();

    yearSlice.forEach((d, i) => d.rank = i);

    //console.log('IntervalYear: ', yearSlice);

    x.domain([0, d3.max(yearSlice, d => d.value)]);

    svg.select('.xAxis')
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .call(xAxis);

    const bars = svg.selectAll('.bar').data(yearSlice, d => d.name);

    bars
      .enter()
      .append('rect')
      .attr('class', d => `bar ${d.name.replace(/\s/g, '_')}`)
      .attr('x', x(0) + 1)
      .attr('width', d => x(d.value) - x(0))
      .attr('y', d => y(top_n + 1) + 5)
      .attr('height', y(1) - y(0) - barPadding)
      .style('fill', d => d.colour)
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', d => y(d.rank) + 5);

    bars
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('width', d => Math.max(0, x(d.value) - x(0)))
      .attr('y', d => y(d.rank) + 5);

    bars
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('width', d => Math.max(0, x(d.value) - x(0)))
      .attr('y', d => y(top_n + 1) + 5)
      .remove();

    const labels = svg.selectAll('.label')
      .data(yearSlice, d => d.name);

    labels
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.value) - 8)
      .attr('y', d => y(top_n + 1) + 5 + ((y(1) - y(0)) / 2))
      .style('text-anchor', 'end')
      .html(d => d.name)
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);


    labels
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', d => x(d.value) - 8)
      .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

    labels
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', d => x(d.value) - 8)
      .attr('y', d => y(top_n + 1) + 5)
      .remove();

    const valueLabels = svg.selectAll('.valueLabel').data(yearSlice, d => d.name);

    valueLabels
      .enter()
      .append('text')
      .attr('class', 'valueLabel')
      .attr('x', d => x(d.value) + 5)
      .attr('y', d => y(top_n + 1) + 5)
      .text(d => d.value)
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1);

    valueLabels
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', d => x(d.value) + 5)
      .attr('y', d => y(d.rank) + 5 + ((y(1) - y(0)) / 2) + 1)
      .tween("text", function (d) {
        const i = d3.interpolateNumber(d.lastValue, d.value);
        //return i(interpolator);
        return function (t) {
          let v = i(t);
          if (v < 0)
            v = 0;
          this.textContent = v.toFixed(2);
        };
      });


    valueLabels
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', d => x(d.value) + 5)
      .attr('y', d => y(top_n + 1) + 5)
      .remove();

    yearText.html(~~year);

    year++;
    if (year > yearEnd) ticker.stop();
  }, delayDuration);
})

// Return back to the homepage
function goToIndex() {
  window.location.href = 'index.html';
}