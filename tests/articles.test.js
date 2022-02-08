import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'
import 'dotenv/config';
import Article from '../src/models/article';
import { ArticleServices } from '../src/services/articleServices';
import mongoose from 'mongoose'

use(chaiHttp)


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


    describe('END-POINTS TEST', function () {
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
    });

    describe('END-POINTS TEST', function () {
        it('(GET ALL ARTICLES)', (done) => {
            request(app)
                .get("/api/v1/articles")
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });

    describe('END-POINTS TEST', function () {
        it('(GET ONE ARTICLES)', async () => {
            const article = await Article.findOne({ title: 'article 2' })
            request(app)
                .get(`/api/v1/articles/${article._id}`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                });
        });
    });

    describe('END-POINTS TEST', function () {
        it('(GET NOT ONE ARTICLE)', async () => {
            request(app)
                .get(`/api/v1/articles/1`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                });
        });
    });

    describe('END-POINTS TEST', function () {
        it('(INVALID PATH)', async () => {
            request(app)
                .get(`/api/v1/arti`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                });
        });
    });

    describe('TEST ARTICLE SERVICE', function () {
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

    });

    describe('END-POINTS TEST', function () {
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
    });

    describe('END-POINTS TEST', function () {
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
                    expect(res.statusCode).to.equal(404);
                    // done();
                });
        });
    });

    describe('END-POINTS TEST', function () {
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
    });


});