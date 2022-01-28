import express from 'express'
import { ArticleController } from '../../controllers/articleController'

const route = express.Router()

route.get('/', new ArticleController().getAllArticles)

route.post('/', new ArticleController().createArticle)

route.get('/:id', new ArticleController().getArticle)

route.patch('/:id', new ArticleController().updateArticle)

route.delete('/:id', new ArticleController().deleteArticle)

export default route