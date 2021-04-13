export const isEmpty = val => (
    val === null ||
    val === undefined ||
    (typeof val === 'string' && val.length === 0) ||
    (typeof val === 'object' && Object.keys(val).length === 0)
)

export const host = 'http://localhost:8000'