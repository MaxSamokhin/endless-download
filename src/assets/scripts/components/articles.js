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
                            ${elem.wide ? this._getTruncateText(elem.text, 400) :  this._getTruncateText(elem.text, 200)}
                        </div>
                    </div>
            `;

        }).join('\n');

        return this.articles;
    }

    _getTruncateText(text, length) {
        return text.length > length ?
            text.slice(0, length - 3) + '...' :
            text;
    }

    onShowArticles() {
        this._data = this.model.getArticles();
        this.render();
    }

    destroy() {
        this.model.destroy();
        mediator.off(ARTICLES_SUCCESS);
    }
}

