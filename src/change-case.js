/**
* @file Change Case Tool for the Editor.js - Allows to change selected text case in the block.
* @author Bakhtiar Amaludin <github.com/maziyank>
*/

import { upperCase, lowerCase, titleCase, sentenceCase, toggleCase, localeLowerCase, localeUpperCase } from "./change-case-util";
import './change-case.css';

export default class ChangeCase {

    static get isInline() {
        return true;
    }

    get state() {
        return this._state;
    }

    constructor({ config, api }) {
        this.api = api;
        this.button = null;
        this.optionButtons = [];
        this._state = true;
        this.selectedText = null;
        this.range = null;
        this._settings = config;

        this.CSS = {
            actions: 'change-case-action',
            toolbarLabel: 'change-case-toolbar__label',
            tool: 'change-case-tool',
            toolbarBtnActive: this.api.styles.settingsButtonActive,
            inlineButton: this.api.styles.inlineToolButton
        };

        this.caseOptions = {
            'titleCase': 'Title Case',
            'lowerCase': 'lower case',
            'upperCase': 'UPPER CASE',
            'localeLowerCase': 'localé lower casé',
            'localeUpperCase': 'LöCALE UPPER CASE',
            'sentenceCase': 'Sentence case',
            'toggleCase': 'tOOGLE cASE'
        }
    }

    set state(state) {
        this._state = state;
        this.button.classList.toggle(this.CSS.toolbarBtnActive, state);
    }

    get title() {
        return 'Change Case';
    }

    render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 100 100" stroke="currentColor">
            <path d="m46.099 74.271-3.6868-13.686h-18.523l-3.6868 13.686h-11.605l17.934-57.653h13.17l18.001 57.653zm-6.2632-23.813q-5.0972-18.612-5.7524-21.056c-0.42199-1.6168-0.73293-2.9077-0.91061-3.8477q-1.1105 5.0133-6.5741 24.828z" stroke-width="1.1797"/>
            <path d="m87.355 74.271-2.4938-8.4556h-12.529l-2.4938 8.4556h-7.8496l12.131-35.619h8.9087l12.176 35.619zm-4.2365-14.712q-3.4478-11.499-3.891-13.009c-0.28544-0.99887-0.49576-1.7964-0.61595-2.3772q-0.75116 3.0973-4.4469 15.339z" stroke-width=".76265"/>
            </svg>`;
        this.button.classList.add(this.CSS.inlineButton);

        return this.button;
    }

    checkState(selection) {
        const text = selection.anchorNode;
        if (!text) return;
    }

    convertCase(range, option) {
        if (!range) return
        const clone = range.cloneContents();
        if (!clone) return
        clone.childNodes.forEach(node => {
            if (node.nodeName !== '#text') return;

            switch (option) {
                case 'titleCase':
                    node.textContent = titleCase(node.textContent);
                    break;

                case 'lowerCase':
                    node.textContent = lowerCase(node.textContent);
                    break;

                case 'upperCase':
                    node.textContent = upperCase(node.textContent);
                    break;

                case 'localeLowerCase':
                    node.textContent = localeLowerCase(node.textContent, this._settings.locale);
                    break;

                case 'localeUpperCase':
                    node.textContent = localeUpperCase(node.textContent, this._settings.locale);
                    break;

                case 'sentenceCase':
                    node.textContent = sentenceCase(node.textContent);
                    break;

                case 'toggleCase':
                    node.textContent = toggleCase(node.textContent);
                    break;

                default:
                    break;
            }
        });

        range.extractContents();
        range.insertNode(clone);
        this.api.inlineToolbar.close();
    }

    surround(range) {
        this.selectedText = range.cloneContents();
        this.actions.hidden = !this.actions.hidden;
        this.range = !this.actions.hidden ? range : null;
        this.state = !this.actions.hidden;
    }

    renderActions() {
        this.actions = document.createElement('div');
        this.actions.classList.add(this.CSS.actions);
        const actionsToolbar = document.createElement('div');
        actionsToolbar.classList.add(this.CSS.toolbarLabel);
        actionsToolbar.innerHTML = 'Change Case';

        this.actions.appendChild(actionsToolbar);

        if (!this._settings.showLocaleOption) {
            delete this.caseOptions.localeLowerCase;
            delete this.caseOptions.localeUpperCase;
        }        
        
        this.optionButtons = Object.keys(this.caseOptions).map(option => {
            const btnOption = document.createElement('div');
            btnOption.classList.add(this.CSS.tool);
            btnOption.dataset.mode = option;
            btnOption.innerHTML = this.caseOptions[option];
            return btnOption
        })

        for (const btnOption of this.optionButtons) {
            this.actions.appendChild(btnOption);
            this.api.listeners.on(btnOption, 'click', () => {
                this.convertCase(this.range, btnOption.dataset.mode)
            });
        }

        this.actions.hidden = true;
        return this.actions;
    }

    destroy() {
        for (const btnOption of this.optionButtons) {
            this.api.listeners.off(btnOption, 'click');
        }
    }
}

