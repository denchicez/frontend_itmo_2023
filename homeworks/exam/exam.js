function randomInteger(left = 0, right = 1) {
    left = Math.ceil(left)
    right = Math.floor(right)
    return Math.floor(left + (right - left + 1) * Math.random());
}

function isCorrect(values, left, right, attempts) {
    const unique = new Set(values);
    let need_unique = attempts / (Math.floor(2000 / (right - left + 1)) + 1)
    let flag = unique.size >= (need_unique / 3)
    if (right - left + 1 < values.length / 1000) {
        return Math.min(values) === left && Math.max(values) === right && flag
    }
    return flag
}

function assertMessage(flag) {
    console.assert(flag, "Не проходит тесты(")
}
function run_test(...args) {
    let attempts = 1000
    let answers = []
    for (let i = 0; i < attempts; i++) {
        answers.push(randomInteger(...args))
    }
    let flag = false
    if (args.length === 0) { // 0...1
        flag = isCorrect(answers, 0, 1, attempts)
    } else if (args.length === 1) {
        flag = isCorrect(answers, 0, args[0], attempts)
    } else if (args.length === 2) {
        flag = isCorrect(answers, ...args, attempts)
    }
    assertMessage(flag)

}

function run_tests() {
    run_test(1, 100000)
    run_test(1, 2)
    run_test(1, 3)
    run_test(1)
    run_test(1, 100000)
    run_test(1, 100000)
    run_test(1, 100000)

    return run_test(1, 100000)
}
run_tests()
// console.log(run_tests())
