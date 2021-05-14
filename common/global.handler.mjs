// Create new instance.
export const create = async (data, model) => {
    try {
        const newInstance = new model(data)
        const result = await newInstance.save()
        
        return result

    } catch (err) {
        console.log(err)
    }
}


// Find one by id.
export const findOneById = async (args) => {
    try {
        let result;

        if (args.populate) {
            if (typeof args.populate.field === 'object') {
                result = await args.model.findById(args.id)
                                    .populate(args.populate.field[0], args.populate.sub_fields[0])
                                    .populate(args.populate.field[1], args.populate.sub_fields[1])
            } else {
                result = await args.model.findById(args.id)
                                    .populate(args.populate.field, args.populate.sub_fields)
            }
        } else {
            result = await args.model.findById(args.id)
        }
        return result

    } catch (err) {
        console.log(err)
    }
}

export const findByField = async (args) => {
    try {
        args.query_field = args.query_field.toLowerCase().trim()

        const query = {
            [args.query_field]: args.value
        }

        let result;

        if (args.populate) {
            if (typeof args.populate.field === 'object') {
                result = await args.model.find(query)
                                    .populate(args.populate.field[0], args.populate.sub_fields[0])
                                    .populate(args.populate.field[1], args.populate.sub_fields[1])
            } else {
                result = await args.model.find(query)
                                    .populate(args.populate.field, args.populate.sub_fields)
            }
        } else {
            result = await args.model.find(query)
        }
        
        if (result.length === 1) {
            return result[0]
        }

        return result

    } catch (err) {
        console.log(err)
    }
}


// Find one by query
export const findOneByQuery = async (args) => {
    try {
        
        let result;

        if (args.populate) {
            if (typeof args.populate.field === 'object') {
                result = await args.model.findOne(args.query)
                                    .populate(args.populate.field[0], args.populate.sub_fields[0])
                                    .populate(args.populate.field[1], args.populate.sub_fields[1])
            } else {
                result = await args.model.findOne(args.query)
                                    .populate(args.populate.field, args.populate.sub_fields)
            }
        } else {
            result = await args.model.findOne(args.query)
        }

        return result

    } catch (err) {
        console.log(err)
    }
}


// Find by query
export const findByQuery = async (args) => {
    try {
        
        let result;

        if (args.populate) {
            if (typeof args.populate.field === 'object') {
                result = await args.model.find(args.query).limit(args.perPage)
                                    .skip(args.perPage * args.page)
                                    .populate(args.populate.field[0], args.populate.sub_fields[0])
                                    .populate(args.populate.field[1], args.populate.sub_fields[1])
            } else {
                result = await args.model.find(args.query).limit(args.perPage)
                                    .skip(args.perPage * args.page)
                                    .populate(args.populate.field, args.populate.sub_fields)
            }

        } else {
            result = await args.model.find(args.query).limit(args.perPage).skip(args.perPage * args.page)
        }

        return result

    } catch (err) {
        console.log(err)
    }
}


// List
export const list = async (args) => {
    try {
        let result;

        if (args.populate) {
            if (typeof args.populate.field === 'object') {
                result = await args.model.find().limit(args.perPage)
                                    .skip(args.perPage * args.page)
                                    .populate(args.populate.field[0], args.populate.sub_fields[0])
                                    .populate(args.populate.field[1], args.populate.sub_fields[1])
            } else {
                result = await args.model.find().limit(args.perPage)
                                    .skip(args.perPage * args.page)
                                    .populate(args.populate.field, args.populate.sub_fields)
            }

        } else {
            result = await args.model.find().limit(args.perPage).skip(args.perPage * args.page)
        }

        return result

    } catch (err) {
        console.log(err)
    }
}


// Update
export const update = async (id, data, model) => {
    try {
        const result = await model.findByIdAndUpdate(id, data)
        return result

    } catch (err) {
        console.log(err)
    }
}


// Remove
export const remove = async (id, model) => {
    try {
        const result = await model.findByIdAndRemove(id)
        return result
        
    } catch (err) {
        console.log(err)
    }
}


// Remove one by query
export const removeOneByQuery = async (args) => {
    try {
        const result = await args.model.findOneAndRemove(args.query)
        return result
        
    } catch (err) {
        console.log(err)
    }
}


// Remove all by query
export const removeAllByQuery = async (args) => {
    try {
        const result = await args.model.deleteMany(args.query)
        return result

    } catch (err) {
        console.log(err)
    }
}


// Get count
export const getCount = async (args) => {
    try {
        const count = await args.model.find(args.query).countDocuments()
        return count

    } catch (err) {
        console.log(err)
        throw err
    }
}