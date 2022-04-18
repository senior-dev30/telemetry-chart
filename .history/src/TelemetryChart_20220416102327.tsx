import React, { FC, useEffect } from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import useWindowDimensions from './utils/useWindowDimensions';

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        '& .view': {
            fill: 'url(#gradient)',
            stroke: '#000',
        },
        '& .g-line': {
            clipPath: 'url(#clip)',
        },
    },
    tooltip: {
        position: 'absolute',
        padding: '3px 6px',
        font: '14px sans-serif',
        background: '#ffffff80',
        borderRadius: 8,
        pointerEvents: 'none',
        border: '1px solid #2047b0',
        '& .title': {
            marginRight: 7,
        },
        '& div': {
            textAlign: 'left',
        },
    },
}));

interface InputType {
    time: string | Date;
    value: number;
}

type Props = {
    graphIndex: number;
    inputs: InputType[];
};

const toTimestamp = (strDate: string | Date) => {
    const dt = moment(strDate).unix();
    console.log(dt, strDate);
    return dt;
};

export const TelemetryChart: FC<Props> = ({ graphIndex, inputs }) => {
    const classes = useStyles();
    const windowDimension = useWindowDimensions();

    useEffect(() => {
        d3.selectAll(`#telemetry-chart${graphIndex} > *`).remove();
        const widthBase = windowDimension.width;
        const heightBase = 590;
        let datumVal: [number, number][] = [];
        let yValues: number[] = [];
        let xValues: number[] = [];
        inputs.sort(
            (prev: InputType, next: InputType) =>
                toTimestamp(prev.time) - toTimestamp(next.time)
        );
        inputs.map((input: InputType) => {
            datumVal.push([toTimestamp(input.time) || 0, input.value || 0]);
            xValues.push(toTimestamp(input.time) || 0);
            yValues.push(input.value || 0);
            return true;
        });

        const margin = { top: 20, right: 20, bottom: 100, left: 50 },
            width = (widthBase * 3) / 4 - margin.left - margin.right,
            height = (heightBase * 3) / 4 - margin.top - margin.bottom;

        const x = d3
            .scaleLinear()
            .domain([
                d3.max(xValues, val => (val ? val + 50000 : 50000)) as number,
                d3.min(xValues, val => (val ? val - 50000 : 0)) as number,
            ])
            .range([width, 0]);

        const x0 = d3
            .scaleLinear()
            .domain([
                d3.max(xValues, val => (val ? val + 50000 : 50000)) as number,
                d3.min(xValues, val => (val ? val - 50000 : 0)) as number,
            ])
            .range([width, 0]);

        const y = d3
            .scaleLinear()
            .domain([
                d3.min(yValues, val => (val ? val - 10 : 0)) as number,
                d3.max(yValues, val => (val ? val + 50 : 200)) as number,
            ])
            .range([height, 0]);

        const y0 = d3
            .scaleLinear()
            .domain([
                d3.min(yValues, val => (val ? val - 10 : 0)) as number,
                d3.max(yValues, val => (val ? val + 50 : 100)) as number,
            ])
            .range([height, 0]);

        const line = d3
            .line()
            .x((d: any) => x(d[0]) || 0)
            .y((d: any) => y(d[1]) || 0);

        let path: any;

        const zoomed = () => {
            const t = d3.event.transform;
            x.domain(t.rescaleX(x0).domain());
            y.domain(t.rescaleY(y0).domain());
            path.attr('d', line);
            dots.attr('cx', (d: InputType) => {
                return x(toTimestamp(d.time));
            }).attr('cy', (d: InputType) => {
                return y(d.value);
            });

            svg.select('.axis--x')
                .call(xAsix as any)
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('dx', '-0.8em')
                .attr('dy', '0.15em')
                .style(
                    'transform',
                    'rotate(-45deg) translateX(10px) translateY(10px)'
                );

            svg.select('.axis--y').call(d3.axisLeft(y) as any);
        };
        const zoom: any = d3.zoom().scaleExtent([1, 30]).on('zoom', zoomed);

        const container = d3
            .select(`#telemetry-chart${graphIndex}`)
            .append('svg')
            .attr('width', '100%')
            .attr('height', height + margin.top + margin.bottom)
            .call(zoom);

        const svg = container
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xAsix = d3.axisBottom(x).tickFormat(function (d: any) {
            return moment.unix(d).format('hh:mm yyyy-MM-DD');
        });

        svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(0,${height})`)
            .call(xAsix);

        svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end');

        svg.append('defs')
            .append('clipPath')
            .attr('id', 'clip')
            .append('rect')
            .attr('width', width)
            .attr('height', height);

        path = svg
            .append('path')
            .attr('class', 'g-line')
            .datum(datumVal)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', line);

        const div = d3
            .select(`body`)
            .append('div')
            .attr('class', classes.tooltip)
            .style('opacity', 0);

        let dots: any;

        svg.select('.axis--x')
            .call(xAsix as any)
            .selectAll('text')
            .style('text-anchor', 'end')
            .style('font-weight', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '0.15em')
            .style(
                'transform',
                'rotate(-45deg) translateX(10px) translateY(10px)'
            );
        dots = svg
            .append('g')
            .attr('class', 'g-line')
            .selectAll('dot')
            .data(inputs)
            .enter()
            .append('circle')
            .attr('cx', (d: InputType) => {
                return x(toTimestamp(d.time)) || 0;
            })
            .attr('cy', (d: InputType) => {
                return y(d.value) || 0;
            })
            .attr('r', 3)
            .style('fill', '#111111')
            .on('mouseover', (d: InputType, i, nodes) => {
                div.transition().duration(200).style('opacity', 0.9);

                div.html(
                    `<div><span class="title">x:</span> ${moment(d.time).format(
                        'LLLL'
                    )}</div><div><span class="title">y:</span>${d.value}</div>`
                )
                    .style('left', d3.event.pageX + 'px')
                    .style('top', d3.event.pageY - 58 + 'px');

                d3.select(nodes[i]).attr('r', 5);
            })
            .on('mouseout', (d, i, nodes) => {
                div.transition().duration(500).style('opacity', 0);

                d3.select(nodes[i]).attr('r', 3);
            });

        svg.append('rect')
            .attr('width', width)
            .style('fill', 'none')
            .attr('height', height);
    }, [graphIndex, classes, windowDimension, inputs]);

    return <div id={`telemetry-chart${graphIndex}`} className={classes.root} />;
};
