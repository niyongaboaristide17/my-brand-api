import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'
import 'dotenv/config';
import Article from '../src/models/article';
import { ArticleServices } from '../src/services/articleServices';
import mongoose from 'mongoose'

use(chaiHttp)

var tokenAuth = process.env.JWT_TOKEN

describe('ARTICLE TEST', function () {

    var article1 = {
        title: 'article 1',
        content: 'article test content',
        image: 'https://picsum.photos/id/237/200/300'
    }

    var article2 = {
        title: 'article 2',
        content: 'article test content',
        image: 'https://picsum.photos/id/237/200/300'
    }

    before('BEFORE ALL TEST', (done) => {
        Article.insertMany([article1, article2], function (err) {
            console.log('ARTICLE POPULATED SUCCESSFULLY');
            done()
        })
    })

    it('SHOULD CREATE ARTICLE', (done) => {
        const article = {
            title: 'title',
            content: 'content'
        }
        request(app)
            .post('/api/v1/articles')
            .set('Authorization', `Bearer ${tokenAuth}`)
            .attach('image', './public/Screenshot from 2022-02-02 11-51-57.png', 'status.png')
            .field(article)
            .end((err, res)=>{
                expect(res.statusCode).to.equal(200)
                done()
            })
    });


    it('SHOULD UPDATE ARTICLE', async() => {
        const article1 = {
            title: 'title1',
            content: 'content'
        }
        const article = await Article.findOne({ title: 'article 2' })
        request(app)
            .patch(`/api/v1/articles/${article._id}`)
            .set('Authorization', `Bearer ${tokenAuth}`)
            .send(article1)
            .end((err, res)=>{
                expect(res.statusCode).to.equal(200)

            })
    });

    it('SHOULD DELETE ARTICLE', async() => {

        const article = await Article.findOne({ title: 'article 1' })
        request(app)
            .delete(`/api/v1/articles/${article._id}`)
            .set('Authorization', `Bearer ${tokenAuth}`)
            .end((err, res)=>{
                expect(res.statusCode).to.equal(204)

            })
    });

    it('(NOT CREATE ARTICLE NOT LOGIN)', (done) => {
        request(app)
            .post("/api/v1/articles")
            .send(
                {
                    title: 'article 5',
                    content: 'article test content',
                    image: 'https://picsum.photos/id/237/200/300'
                }
            )
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });

    it('(GET ALL ARTICLES)', (done) => {
        request(app)
            .get("/api/v1/articles")
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('(GET ONE ARTICLES)', async () => {
        const article = await Article.findOne({ title: 'article 2' })
        request(app)
            .get(`/api/v1/articles/${article._id}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
            });
    });

    it('(GET NOT ONE ARTICLE)', async () => {
        request(app)
            .get(`/api/v1/articles/1`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
            });
    });

    it('(INVALID PATH)', async () => {
        request(app)
            .get(`/api/v1/arti`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
            });
    });

    it('SAVE ARTICLE', async () => {
        const article = await ArticleServices.createArticle(new Article({
            title: 'article service test',
            content: 'article test content',
            image: 'https://picsum.photos/id/237/200/300'
        }))
        expect(article.title).to.equal('article service test')
    })

    it('GET ALL ARTICLE', async () => {
        const articles = await ArticleServices.getAllArticles()
        expect(articles.length).to.greaterThan(0)
    })


    it('(COMMENT NOT AN ARTICLE)', async () => {
        const article = await ArticleServices.createArticle(new Article({
            title: 'article service testing',
            content: 'article test content',
            image: 'https://picsum.photos/id/237/200/300'
        }))
        request(app)
            .post(`/api/v1/articles/${article._id}/comments`)
            .send(
                {
                    sender: 'tester',
                    comment: 'yes yes',
                }
            )
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                // done();
            });
    });

    it('(COMMENT AN ARTICLE)', async () => {
        const article = await ArticleServices.createArticle(new Article({
            title: 'article service testing',
            content: 'article test content',
            image: 'https://picsum.photos/id/237/200/300'
        }))
        request(app)
            .post(`/api/v1/articles/1/comments`)
            .send(
                {
                    sender: 'tester',
                    comment: 'yes yes',
                }
            )
            .end((err, res) => {
                expect(res.statusCode).to.equal(406);
                // done();
            });
    });


    it('(GET AN ARTICLE COMMENTS)', async () => {
        const article = await ArticleServices.createArticle(new Article({
            title: 'article service testing',
            content: 'article test content',
            image: 'https://picsum.photos/id/237/200/300'
        }))
        request(app)
            .get(`/api/v1/articles/${article._id}/comments`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                // done();
            });
    });

    // it('SHOULD CREATE COMMENT', async() => {

    //     const article = await Article.findOne({ title: 'article 2' })
    //     request(app)
    //         .patch(`/api/v1/coments`)
    //         .send({
    //             article: article,
    //             sender: 'Eli',
    //             comment: 'Thanks'
    //         })
    //         .end((err, res)=>{
    //             expect(res.statusCode).to.equal(200)
    //         })
    // });

});