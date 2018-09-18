import Articles from './articles';
import Loader from './loader';
import mediator from './../modules/mediator';
import {
    ARTICLES_REQUEST,
    ARTICLES_SUCCESS
} from './../constant/events';

export default class App {
    constructor(rootElement) {
        this.root = rootElement;

        this.articles = new Articles();
        this.loader = new Loader();
        this.loader.hide();

        this.isLoading = false;

        this.onDataDownload();

        document.addEventListener('scroll', this.onDataDownload.bind(this));
        mediator.on(ARTICLES_SUCCESS, this.onSuccessLoadingProcess.bind(this));
    }

    render() {
        const pageElements = [
            this.articles.render(),
            this.loader.render()
        ];

        pageElements.forEach(elem => this.root.appendChild(elem));
    }

    onSuccessLoadingProcess() {
        this.isLoading = false;
    }

    onDataDownload() {
        let maxHeight = this.getScrollHeight();
        let windowHeight = document.documentElement.clientHeight; // видимая часть окна
        let scrollHeight =  window.pageYOffset || document.documentElement.scrollTop; // cross-browser

        if (windowHeight + scrollHeight === maxHeight && !this.isLoading) {
            mediator.emit(ARTICLES_REQUEST);
            this.isLoading = true;
        }
    }

    //document height (cross-browser) https://learn.javascript.ru/metrics-window
    getScrollHeight() {
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
