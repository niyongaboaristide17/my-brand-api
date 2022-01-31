import express from 'express'
import { ArticleController } from '../../controllers/articleController'
import { fileFilter } from '../../helpers/fileFilter.js';
import multer from 'multer'


const route = express.Router()


const storageFile = multer.diskStorage({})
const upload = multer({storage: storageFile, file: fileFilter})

route.get('/',new ArticleController().getAllArticles)

route.post('/',upload.single('image'), new ArticleController().createArticle)


route.get('/:id', new ArticleController().getArticle)

route.patch('/:id', new ArticleController().updateArticle)

route.delete('/:id', new ArticleController().deleteArticle)

export default route