import Category from '../models/categories.model.mjs'
import * as handler from '../common/global.handler.mjs'
import AddCategoryValidator from '../validators/add.category.validator.mjs'
import { isEmpty } from '../common/global.helper.mjs'

export const addCategory = async (req, res) => {
    try {
        const { errors, isValid } = AddCategoryValidator(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        req.body.name = req.body.name.toLowerCase()

        const exists = await handler.findOneByQuery({
            query: {'name': req.body.name },
            model: Category
        })

        if (!isEmpty(exists)) {
            return res.status(400).json({ msg: 'Category already exists!' })
        }

        const category = await handler.create(req.body, Category)

        category ? (
            res.status(200).json({ msg: 'Category added successfully!', category })
        ) : (
            res.status(500).json({ msg: 'Failed to add category!' })
        )

    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error at adding category!', err })
    }
}


export const list = async (req, res) => {
    try {
        const limit = req.query.limit && req.query.limit <= 100 ? req.query.limit : 10
        let page = 0

        if (req.query && req.query.page) {
            req.query.page = parseInt(req.query.page)
            page = Number.isInteger(req.query.page) ? req.query.page : 0
        }

        const categories = await handler.list({
            perPage: limit,
            page,
            model: Category
        })

        categories ? (
            res.status(200).json({categories})
        ) : (
            res.status(404).json({ msg: 'No categories added yet.' })
        )

    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error at listing categories!', err })
    }
}


export const removeCategory = async (req, res) => {
    try {
        const deletedCategory = await handler.remove(req.params.categoryId, Category)

        deletedCategory ? (
            res.status(200).json({ msg: 'Category deleted successfully', deletedCategory })
        ) : (
            res.status(400).json({ msg: 'Failed to delete category! It may not exist.' })
        )

    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error at removing category!', err })
    }
}