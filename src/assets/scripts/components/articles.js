import ArticlesModel from '../model/articles';
import mediator from './../modules/mediator';
import {ARTICLES_SUCCESS} from '../constant/events';


export default class Articles {
    constructor() {
        this.articles = document.createElement('section');
        this.articles.classList.add('article__wrapper');

        this.model = new ArticlesModel();
        this._data = this.model.getArticles();

        mediator.on(ARTICLES_SUCCESS, this.onShowArticles.bind(this));
    }

    /**
     * отрисовка статей(используем innerHTML)
     * @returns {HTMLElement | *}
     */
    render() {
        if (!this._data) {
            return;
        }

        this.articles.innerHTML = this._data.map(elem => {
            let isWide = elem.wide ? '_wide' : '';

            return `
                    <div class="article ${isWide}">
                        <div class="article__title">
                            ${elem.title}                      
                        </div>
                        <div class="article__text">
                            ${elem.text}
                        </div>
                    </div>
            `;

        }).join('\n');

        return this.articles;
    }

    onShowArticles() {
        this._data = this.model.getArticles();
        this.render();
    }

    destroy() {
        mediator.off(ARTICLES_SUCCESS);
    }
}

