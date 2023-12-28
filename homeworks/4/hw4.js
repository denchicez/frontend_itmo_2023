// 1
const getNewObjWithPrototype = (obj) => {
    let newObj = {}
    Object.setPrototypeOf(newObj, obj)
    return newObj
}
// 2
const getEmptyObj = () => {
    let newObj = {}
    Object.setPrototypeOf(newObj, null)
    return newObj
}

// 3
const setPrototypeChain = ({ programmer, student, teacher, person }) => {
    Object.setPrototypeOf(programmer, student)
    Object.setPrototypeOf(student, teacher)
    Object.setPrototypeOf(teacher, person)
}

// 4
const getObjWithEnumerableProperty = () => {
    return Object.create({}, {
        name: {
            value: 'Alex',
        },
        age: {
            value: 18,
            enumerable: true,
        },
        work: {
            value: 'empty'
        }
    })
}

// 5
const getWelcomeObject = (person) => {
    let obj = {
        voice: function () {return `Hello, my name is ${person.name}. I am ${person.age}.`}
    }
    Object.setPrototypeOf(obj, person)
    return obj
}

// 6
class Singleton {
    constructor(x) {
        if (Singleton.exampleClass) {
            Singleton.exampleClass.id = x
            return Singleton.exampleClass
        }
        this.id = x
        Singleton.exampleClass = this
    }
}

// 7
const defineTimes = () => {
    Number.prototype.times = function (callback) {
        for (let index = 1; index <= this.valueOf(); index++) {
            callback(index, this.valueOf())
        }
    }
}

// 8
const defineUniq = () => {
    Object.defineProperty(Array.prototype, 'uniq', {
        get: function () {
            return Array.from(new Set(this))
        }
    })
}

// 9
const defineUniqSelf = () => {
    Object.defineProperty(Array.prototype, 'uniqSelf', {
        get: function () {
            let newArray = Array.from(new Set(this))
            this.splice(0, this.length)
            for(let element of newArray) {
                this.push(element)
            }
            return newArray
        }
    })
}

module.exports = {
    getNewObjWithPrototype,
    getEmptyObj,
    setPrototypeChain,
    getObjWithEnumerableProperty,
    getWelcomeObject,
    Singleton,
    defineTimes,
    defineUniq,
    defineUniqSelf,
}