const calc = (x) => {
    if (typeof x !== 'number') throw new Error("the argument is not a number")
    const calcExpression = (first, second) => {
        if (typeof second !== 'number') throw new Error("the argument is not a number")
        switch (first) {
            case "+":
                x += second
                break
            case "-":
                x -= second
                break
            case "/":
                x /= second
                break
            case "*":
                x *= second
                break
            case "**":
                x **= second
                break;
            case "%":
                x %= second
                break;
            default:
                throw new Error("unsupported sign")
        }
        calcExpression.valueOf = function () {
            return x;
        }
        return calcExpression
    }
    calcExpression.valueOf = function () {
        return x;
    }

    return calcExpression
}
module.exports = calc;