export default val => {
    return (
        val === null ||
        val === undefined ||
        (typeof val === 'object' && Object.keys(val).length === 0) ||
        (typeof val === 'string' && val.trim().length === 0)
    )
}