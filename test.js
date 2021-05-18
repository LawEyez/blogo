const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const myFunc = x => {
    if (x > 5) return true
    return false
}
const myStr = 'hello world'

const salt = crypto.randomBytes(16).toString('base64')
const hash = crypto.createHmac('sha512', salt).update(myStr).digest('base64')

let b = Buffer.from(hash)

const thisFunc = a => b => a*b

func1 = thisFunc(5)(5)
// func2 = func1(6)
const myObj = {
    'NAME': 'alen',
    'age': 20
}


// if (5 & 4101) {
//     console.log(true)
// } else {
//     console.log(false)
// }

const token = jwt.sign({ userId: '12345', email: 'alen@afordia.net', name: 'Alen'}, 'top_s3cr3t')
const payload = jwt.verify(token, 'top_s3cr3t')

// console.log(token)
// console.log(payload)

const user = {
    name: 'Alen',
    age: 25,
    email: 'alen@afordia.net',
    city: 'Nakuru',
    food: 'burger'
}

const clean = user => {
    const {email, name, ...cleanedUser} = {...user}
    return cleanedUser
}

// console.log(clean(user))

// console.log(Boolean(0))
// const changeField = (field, value) => {
//     const query = {
//         [field]: value
//     }

//     console.log(query)
// }

// changeField('email', 'alen@afordia.net')

// const isEmpty = val => {
//     return (
//         val === null ||
//         val === undefined ||
//         (typeof val === 'object' && Object.keys(val).length === 0) ||
//         (typeof val === 'string' && val.trim().length === 0)
//     )
// }

// console.log('empty array', isEmpty([{}]))

// const myArray = [1,2,3,4,5]
// const reducedArray = myArray.reduce((prev, curr) => prev + curr, 0) / myArray.length
// console.log(reducedArray)

// console.log(Object.assign({ name: 'Allen', age: 10 }, { age: 25, sex: 'male'}))

// const wrapped = (10, 20)

// console.log('wrapped: ', wrapped)

const str = 'https://lawtest.blob.core.windows.net/prze-posts/1621331527314_tim-oun-uXCy7ixz30w-unsplash.jpg'
const splitted = str.split('/')
console.log(splitted[splitted.length - 1])