// ================== 3D chart by Vis.js ==================
export function chart3D(path) {
    return {
        target: document.querySelector(path),
        dataSet: new vis.DataSet(),
        options: {
            width: '100%',
            height: '100%',
            style: 'surface',
            showPerspective: true,
            showGrid: true,
            showShadow: false,
            keepAspectRatio: true,
            verticalRatio: 0.5
        }
    }
}

// style : surface, grid, bar, bar-color, bar-size, dot, dot-line, dot-color, dot-size, line

export function curveChart3D(g, style, f) { // , from = -10, to = 10, step = 0.1
    // create some nice looking data with sin/cos
    var counter = 0
    var steps = 50  // number of datapoints will be steps*steps
    var axisMax = 314
    var axisStep = axisMax / steps
    for (var x = 0; x < axisMax; x += axisStep) {
        for (var y = 0; y < axisMax; y += axisStep) {
            var value = f(x, y)
            g.dataSet.add({ id: counter++, x: x, y: y, z: value, style: value })
        }
    }
    g.options.style = style
}

export function showChart3D(g) {
    return new vis.Graph3d(g.target, g.dataSet, g.options)
}
