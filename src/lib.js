export const EPSILON = 0.000000001

export function steps(from, to, step = 1) {
    var a = []
    for (var t = from; t <= to; t += step) {
        a.push(t)
    }
    return a
}
