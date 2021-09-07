import * as L from './lib.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.js'
import 'https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.18/c3.js'

export function chart(path) {
    var g = {
        bindto: path,
        data: {
            type: 'line',
            types: {},
            xs: {},
            columns: []
        }
    }
    return g
}

export function curveChart(g, name, f, from = -10, to = 10, step = 0.1) {
    var x = L.steps(from, to, step)
    var y = x.map(f)
    g.data.types[name] = 'line'
    g.data.xs[name] = name + 'x'
    g.data.columns.push([name + 'x'].concat(x))
    g.data.columns.push([name].concat(y))
}

export function addChart(g, name, style, x, y) {
    g.data.types[name] = style
    g.data.xs[name] = name + 'x'
    g.data.columns.push([name + 'x'].concat(x))
    g.data.columns.push([name].concat(y))
}

export function pieChart(g, countMap) {
    g.data.type = 'pie'
    for (var name in countMap) {
        var count = countMap[name]
        g.data.columns.push([name, count])
    }
}

export function timeChart(g, x, timeSeries) {
    g.data.x = 'x'
    g.axis = {}
    g.axis.x = { type: 'timeseries', tick: { format: '%Y-%m-%d' } }
    g.data.columns = [ ['x', ...x], ...timeSeries]
}

export function showChart(g) {
    return c3.generate(g)
}
