import Articles from './articles';
import Loader from './loader';
import mediator from './../modules/mediator';
import {ARTICLES_REQUEST} from './../constant/events';

export default class App {
    constructor(rootElement) {
        this.root = rootElement;

        this.articles = new Articles();
        this.loader = new Loader();
        this.loader.hide();

        this.onDataDownload();
        document.addEventListener('scroll', this.onDataDownload.bind(this));
    }

    render() {
        const pageElements = [
            this.articles.render(),
            this.loader.render()
        ];

        pageElements.forEach(elem => this.root.appendChild(elem));
    }

    onDataDownload() {
        let maxHeight = this._getScrollHeight();
        let windowHeight = document.documentElement.clientHeight;
        let scrollHeight = window.pageYOffset;

        if (windowHeight + scrollHeight === maxHeight) {
            mediator.emit(ARTICLES_REQUEST);
        }
    }

    _getScrollHeight() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    destroy() {
        this.loader.destroy();
        this.articles.destroy();
        document.removeEventListener('scroll', this.onDataDownload.bind(this));
    }
}