// 注意，不能用 CSS 設定 width, height, 否則繪圖會有扭曲放大的效果。
var gOptions = {
    font: '30px Arial',
    lineWidth: 2,
    lineCap: 'round',
    fillStyle: '#336699',
    strokeStyle: '#336699'
}

export function canvas2D(path, options = gOptions) {
    var canvas = document.querySelector(path)
    var ctx = canvas.getContext('2d')
    Object.assign(ctx, options) // 設定 font, lineWidth, ...
    let g = { ctx }
    let width = g.width = g.ctx.canvas.width
    let height = g.height = g.ctx.canvas.height
    g.window = { left:0, down:0, right:width, top:height }
    g.scale = 1
    return g
}

function width(window) {
    return window.right-window.left
}

function height(window) {
    return window.down-window.top
}

export function setWindow(g, left, right, down, top) {
    g.window = { left, down, right, top }
    let xscale = g.width/width(g.window)
    let yscale = g.height/height(g.window)
    g.scale = Math.max(xscale, yscale)
}

function rescale(v, min, scale) {
    return Math.round((v - min) * scale)
}

function px(g, x) {
    return rescale(x, g.window.left, g.scale)
}

function py(g, y) {
    return g.height-rescale(y, g.window.down, g.scale)
}

export function drawPath(g, x, y) {
    g.ctx.beginPath()
    for (var i = 0; i < x.length; i++) {
        var tx = px(g, x[i])
        var ty = py(g, y[i])
        g.ctx.lineTo(tx, ty)
    }
    g.ctx.stroke()
    g.ctx.closePath()
}

// --------- Draw Vector Field -----------------
// Code derived from : view-source:http://deepliquid.com/projects/blog/arrows.html
var arrow = [[ 2, 0 ], [ -10, -4 ], [-10, 4]]

function drawFilledPolygon (ctx, shape) {
  ctx.beginPath()
  ctx.moveTo(shape[0][0], shape[0][1])
  for (let p in shape) {
    if (p > 0) ctx.lineTo(shape[p][0], shape[p][1])
  }
  ctx.lineTo(shape[0][0], shape[0][1])
  ctx.fill()
}

function translateShape (shape, x, y) {
  var rv = []
  for (let p in shape) {
    rv.push([ shape[p][0] + x, shape[p][1] + y ])
  }
  return rv
}

function rotateShape (shape, ang) {
  var rv = []
  for (let p in shape) {
    rv.push(rotatePoint(ang, shape[p][0], shape[p][1]))
  }
  return rv
}

function rotatePoint (ang, x, y) {
  return [
    (x * Math.cos(ang)) - (y * Math.sin(ang)),
    (x * Math.sin(ang)) + (y * Math.cos(ang))
  ]
}

function drawLineArrow (ctx, x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  var ang = Math.atan2(y2 - y1, x2 - x1)
  drawFilledPolygon(ctx, translateShape(rotateShape(arrow, ang), x2, y2))
}

// 更強的 field 動畫請參考： http://bl.ocks.org/newby-jay/767c5ffdbbe43b65902f
export function drawField(g, xy) {
  for (var i = 0; i < xy.length; i++) {
    var tx = px(g, xy[i].x)
    var ty = py(g, xy[i].y)
    var dx = xy[i].dx * g.width / width(g.window)
    var dy = xy[i].dy * g.height / height(g.window)
    drawLineArrow(g.ctx, tx, ty, tx + dx, ty + dy)
  }
}
