import { expect, request, use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app'
import 'dotenv/config';
import Article from '../src/models/article';

use(chaiHttp)

let articleTest

describe('ARTICLE END-POINT-TEST', () => {

    before('POPULATE ARTICLES', (done) => {
        
        const populate = async function(){
            const article1 = new Article({
                title: 'article test title',
                content: 'article test content',
                image: 'https://picsum.photos/id/237/200/300'
            })
    
            article1.save()
    
            const article2 = new Article({
                title: 'article2 test title',
                content: 'article test content',
                image: 'https://picsum.photos/id/237/200/300'
            })
            
            const setArticleTest = async function(){
                
                articleTest = await article2.save()
            }
    
            await setArticleTest()
        }

        done()
    });

    it('SHOULD GET ALL ARTICLE', (done) => {
        request(app)
            .get("/api/v1/articles")
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                done()
            })
    });

    it('SHOULD GET ONE ARTICLE', (done) => {
        request(app)
            .get(`/api/v1/articles/${articleTest._id}`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                done()
            })
    });

    after('AFTER EACH ARTICLE TEST', (done) => {
        Article.deleteMany({}, (err) => {
            console.log("success");
            done()
        });
    });

});

