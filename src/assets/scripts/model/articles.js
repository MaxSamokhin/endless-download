import Http from './../modules/http';
import mediator from './../modules/mediator';

import {URL} from './../constant/api';
import {
    ARTICLES_REQUEST,
    ARTICLES_SUCCESS,
    ARTICLES_ERROR_SERVER
} from '../constant/events';


export default class ArticlesModel {
    constructor() {
        this.articles = [];

        mediator.on(ARTICLES_REQUEST, this.onRequestArticle.bind(this));
    }

    onRequestArticle() {
        this.loadList();
    }

    getArticles() {
        return this.articles;
    }

    loadList() {
        Http.get(URL)
            .then(res => {

                setTimeout(() => { // эмуляция работы сети
                    this._setArticles(res.articles);
                    mediator.emit(ARTICLES_SUCCESS);
                }, 500);

            })
            .catch(err => mediator.emit(ARTICLES_ERROR_SERVER, {err}));
    }

    _setArticles(article) {
        this.articles = this.articles.concat(article);
    }

    destroy() {
        mediator.off(ARTICLES_REQUEST);
    }
}
