import Article from "../models/article";
import { ArticleServices } from "../services/articleServices";

export class ArticleController {
    // TODO Don't access database from this file you only needs
    async createArticle(req, res, next) {
        try {
            const data = new Article({
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
            })
            const article = await ArticleServices.createArticle(data)
            res.send(article)

        } catch (error) {
            res.status(404)
            res.send({ error: 'Article no created check provided content' })
        }
    }
    async getAllArticles(req, res, next) {
        try {
            const articles = await ArticleServices.getAllArticles()
            res.send(articles)
        } catch (error) {
            res.status(404)
            res.send({ error: 'Something went wrong' })
        }
    }
    async getArticle(req, res, next) {
        try {
            const article = await ArticleServices.getArticle(req.params.id)
            if (article == null || article === undefined) {
                res.status(404).send({
                    error: 'Article not found'
                })
            } else {
                res.send(article)
            }

        } catch (error) {
            res.status(404)
            res.send({ error: 'Something went wrong' })
        }
    }
    async updateArticle(req, res, next) {
        try {

            const data = {}
            if (req.body.title) {
                data['title'] = req.body.title
            }
            if (req.body.content) {
                data['content'] = req.body.content
            }
            if (req.body.image) {
                data['image'] = req.body.image
            }

            if (req.body.likes) {
                data['likes'] = req.body.likes
            }

            const article = await ArticleServices.updateArticle(req.params.id, data)
            res.send(article)
        } catch (error) {
            res.status(404)
            res.send({ error: "Article doesn't exist!" })
        }
    }
    async deleteArticle(req, res, next) {
        try {
            const article = await ArticleServices.getArticle(req.params.id)
            if (article == null || article === undefined) {
                res.status(404).send({
                    error: 'Article not found'
                })
            } else {
                await ArticleServices.deleteArticle(req.params.id)
                res.status(204).send()
            }

        } catch {
            res.status(404)
            res.send({ error: "Article doesn't exist!" })
        }
    }
}