import mediator from './../modules/mediator';
import {
    ARTICLES_REQUEST,
    ARTICLES_SUCCESS
} from './../constant/events';

export default class Loader {
    constructor() {
        this.loader = document.createElement('div');
        this.loader.classList.add('loader');

        mediator.on(ARTICLES_REQUEST, this.onShowLoader.bind(this));
        mediator.on(ARTICLES_SUCCESS, this.onHideLoader.bind(this));
    }

    /**
     * отрисовка лоадера(используем createElement)
     * @returns {HTMLElement | *}
     */
    render() {
        ['_left', '_middle', '_right'].forEach((block) => {
            let circle = document.createElement('div');
            circle.classList.add('loader__circle', block);

            this.loader.appendChild(circle);
        });

        return this.loader;
    }

    show() {
        this.loader.classList.remove('_hidden');
    }

    hide() {
        this.loader.classList.add('_hidden');
    }

    onShowLoader() {
        this.show();
    }

    onHideLoader() {
        this.hide();
    }

    destroy() {
        mediator.off(ARTICLES_REQUEST);
        mediator.off(ARTICLES_SUCCESS);
    }
}
