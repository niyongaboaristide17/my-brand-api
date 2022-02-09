import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'
import 'dotenv/config';
import Comment from '../src/models/comment';
import Article from '../src/models/article';
import { ArticleServices } from '../src/services/articleServices';
import { CommentServices } from '../src/services/commentServices';

use(chaiHttp)

describe('COMMENT END-POINT-TEST', () => {

    it('SHOULD GET ALL COMMENT', (done) => {
        request(app)
            .get("/api/v1/comments")
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                done()
            })
    });

    it('SHOULD NOT GET ONE QUERY', (done) => {
        request(app)
            .get("/api/v1/comments/1")
            .end((err, res) => {
                expect(res.statusCode).to.equal(404)
                done()
            })
    });

    it('SHOULD  GET ONE COMMENT', async () => {
        const article = await ArticleServices.createArticle(new Article({
            title: 'article service testing',
            content: 'article test content',
            image: 'https://picsum.photos/id/237/200/300'
        }))
        request(app)
            .get(`/api/v1/comments/${article._id}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                // done()
            })
    });


    it('SHOULD GET ALL COMMENT FAIL', (done) => {
        
        request(app)
            .get(`/api/v1/comment`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404)
                done()
            })
    });

});

