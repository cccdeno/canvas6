const EPSILON = 0.000000001

var gOptions = {
    font: '30px Arial',
    lineWidth: 2,
    lineCap: 'round',
    fillStyle: '#336699',
    strokeStyle: '#336699'
}

export function steps(from, to, step = 1) {
    var a = []
    for (var t = from; t <= to; t += step) {
        a.push(t)
    }
    return a
}

export function canvas2d(id, options = gOptions) {
    var canvas = document.getElementById(id)
    var {width, height} = canvas.getBoundingClientRect()
    console.log('width=', width, 'height=', height)
    var ctx = canvas.getContext('2d')
    console.log('ctx=', ctx)
    Object.assign(ctx, options) // 設定 font, lineWidth, ...
    return { ctx, size:{width, height} }
}

// 注意，不能用 CSS 設定 width, height, 否則繪圖會有扭曲放大的效果。
function px(x, size, bound) {
    return Math.round(((x - bound.x) / bound.width) * size.width)
}

function py(y, size, bound) {
    return Math.round(((y - bound.y) / bound.height) * size.height)
}

function range(v) {
    return {min:Math.min(...v), max:Math.max(...v)}
}

export function xbound(v) {
    var {min,max} = range(v)
    return {x:min, y:min, width:max-min, height:max-min }
}

export function drawPath(g, x, y) {
    console.log('drawPath0() start')
    g.ctx.beginPath()
    for (var i = 0; i < x.length; i++) {
        var tx = x[i]
        var ty = y[i]  
        // console.log('tx=', tx, 'ty=', ty)
        g.ctx.lineTo(tx, ty)
    }
    g.ctx.stroke()
    g.ctx.closePath()
}

export function drawPathBound(g, x, y, bound) {
    console.log('drawPath() start')
    g.ctx.beginPath()
    for (var i = 0; i < x.length; i++) {
        var tx = px(x[i], g.size, bound)
        var ty = py(y[i], g.size, bound)
        console.log('tx=', tx, 'ty=', ty)
        g.ctx.lineTo(tx, ty)
    }
    g.ctx.stroke()
    g.ctx.closePath()
}
