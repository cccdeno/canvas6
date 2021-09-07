import * as L from './lib.js'

export function chart2d(path) {
    var g = {
        bindto:path, 
        data: { 
            types:{}, 
            xs:{}, 
            columns:[] 
        }
    }
    return g
}

function curveData(f, from = -10, to = 10, step = 0.1) {
    var x = L.steps(from, to, step)
    var y = x.map(f)
    return { type: 'curve', x: x, y: y }
}

// type : line, spline, step, area, area-spline, area-step, bar, scatter, pie, donut, gauge
function draw(g, name, x, y, type) {
    /*
    g.data.x = 'x'
    g.data.columns.push(['x'].concat(x))
    g.data.columns.push([name].concat(y))
    */
    g.data.types[name] = type
    g.data.xs[name] = name + 'x'
    g.data.columns.push([name + 'x'].concat(x))
    g.data.columns.push([name].concat(y))
}

export function curveChart(g, name, f, from = -10, to = 10, step = 0.1) {
    var rg = curveData(f, from, to, step)
    draw(g, name, rg.x, rg.y, 'line')
}

export function showChart2d(g) {
    // console.log('g=', JSON.stringify(g, null, 2))
    return c3.generate(g)
}
