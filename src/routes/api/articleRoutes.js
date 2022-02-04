import express from 'express'
import { ArticleController } from '../../controllers/articleController'
import { fileFilter } from '../../helpers/fileFilter.js';
import multer from 'multer'
import { articleValidation } from '../../validations/articleValidation/article.validations.js';
import { authenticate } from '../../middlewares/authenticate';


const route = express.Router()

const storageFile = multer.diskStorage({})
const upload = multer({storage: storageFile, file: fileFilter})

route.get('/',new ArticleController().getAllArticles)

route.post('/', authenticate, upload.single('image'), articleValidation, new ArticleController().createArticle)

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *  get:
 *    summary: This route returns the details of a specfic post
 *    description: The response should be formated in Json object
 *    tags:
 *      - Blog
 *    parameters:
 *      - in: id
 *        name: id
 *        required: true
 *        description: This should be a valid post Id
 *    responses:
 *      200:
 *        description: a post Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      500:
 *        description: Internal Server Error
 *      404:
 *        description: Not found!
 */
route.get('/:id', new ArticleController().getArticle)

route.patch('/:id',authenticate, articleValidation, new ArticleController().updateArticle)

route.delete('/:id',authenticate, new ArticleController().deleteArticle)

export default route