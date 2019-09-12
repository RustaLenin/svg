import { svgMap } from './map.js';

class NiceSvg extends HTMLElement {

    constructor() {
        super();
        this.defaultIcon = 'cog';
    }

    updateElem() {
        let 
            icon = this.getAttribute('icon'),
            tooltip = this.getAttribute('tooltip')
        ;

        if ( !svgMap[icon] ) {
            icon = this.defaultIcon;
        }

        this.innerHTML = svgMap[icon];
        if ( tooltip ) {
            this.insertAdjacentHTML('afterbegin', `<span class="icon_tooltip">${tooltip}</span>`);
        }
    }

    static get observedAttributes() {
        return ['icon', 'tooltip'];
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        this.updateElem();
    }

    setLoading() {
        if ( this.getAttribute('loading') !== 'true' ) {
            this.setAttribute('loading', 'true');
            this.prevIcon = this.getAttribute('icon');
            this.prevTooltip = this.getAttribute('tooltip');
            this.setAttribute('icon', 'loader');
            this.setAttribute('tooltip', 'Loading...');
            this.classList.add('spin');
        }
    }

    removeLoading() {
        if ( this.getAttribute('loading') === 'true' ) {
            this.classList.remove('spin');
            this.setAttribute('icon', this.prevIcon );
            this.setAttribute('tooltip', this.prevTooltip );
            this.removeAttribute('loading');
        }
    }

}

customElements.define('nice-svg', NiceSvg );