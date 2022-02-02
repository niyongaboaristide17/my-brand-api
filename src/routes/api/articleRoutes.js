import express from 'express'
import { ArticleController } from '../../controllers/articleController'
import { fileFilter } from '../../helpers/fileFilter.js';
import multer from 'multer'
import { articleValidation } from '../../validations/articleValidation/article.validations.js';



const route = express.Router()

const storageFile = multer.diskStorage({})
const upload = multer({storage: storageFile, file: fileFilter})

route.get('/',new ArticleController().getAllArticles)

route.post('/', upload.single('image'), articleValidation, new ArticleController().createArticle)

route.get('/',new ArticleController().getAllArticles)

route.post('/',upload.single('image'), new ArticleController().createArticle)


route.get('/:id', new ArticleController().getArticle)

route.patch('/:id',articleValidation, new ArticleController().updateArticle)

route.delete('/:id', new ArticleController().deleteArticle)

export default route