/*!
 * Author:        Pierre-Henry Soria <hi@ph7.me>
 * Copyright:     (c) 2020, Pierre-Henry Soria. All Rights Reserved.
 */

const localKeyName = 'agreed18';
const strings = {
    welcome: 'Welcome!',
    site_contains_adult_materials: '',
    acknowledge_confirm_majority: 'To continue, please acknowledge and confirm you are over the age of <span class="underline">18</span>.',
    button_over18: 'I am over 18',
    button_under18: 'I am under 18',
    footer_imprint_paragraph: '',
};

class Disclaimer {
    constructor() {
        this.backgroundElement = document.getElementById('disclaimer-background');
        this.dialogElement = document.getElementById('disclaimer-dialog');

        this.dialogStatus = 0;
    }

    loadDialog() {
        if (this.dialogStatus === 0) {
            this.backgroundElement.style.opacity = '0.95';
            this.backgroundElement.style.display = 'block';
            this.dialogElement.style.display = 'block';

            this.centerDialog(); // Call centerDialog when loading the dialog

            // Attach the centerDialog method to the window resize event
            window.addEventListener('resize', () => {
                this.centerDialog();
            });

            this.dialogStatus = 1;
        }
    }

    disableDialog() {
        if (this.dialogStatus === 1) {
            this.dialogElement.style.display = 'none';
            this.backgroundElement.style.display = 'none';

            this.dialogStatus = 0;
        }
    }

centerDialog() {
    const windowHeight = document.documentElement.clientHeight;
    const windowWidth = document.documentElement.clientWidth;
    const dialogHeight = parseInt(window.getComputedStyle(this.dialogElement).height);
    const dialogWidth = parseInt(window.getComputedStyle(this.dialogElement).width);

    this.dialogElement.style.position = 'fixed';
    this.dialogElement.style.top = '50%';
    this.dialogElement.style.left = '50%';
    this.dialogElement.style.transform = 'translate(-50%, -50%)';
    this.backgroundElement.style.height = windowHeight;
}

    isAccepted() {
        try {
            return sessionStorage.getItem(localKeyName);
        } catch (e) {
            console.log('Cannot use sessionStorage', e);
        }

        return null;
    }

    setAccepted() {
        try {
            sessionStorage.setItem(localKeyName, '1');
        } catch (e) {
            console.log('Cannot use sessionStorage', e);
        }
    }

    static generateDialog() {
        const code = `<div id="disclaimer-dialog">
      <div class="center age-gate">
      <h2>${strings.welcome}</h2>
      <p class="italic" style="display:none;">${strings.site_contains_adult_materials}</p>
      <p class="bold">${strings.acknowledge_confirm_majority}</p>
      <p><button id="agree-over18" class="agree">${strings.button_over18}</button>
      <button id="disagree-under18" class="disagree">${strings.button_under18}</button></p>
      <p><small>${strings.footer_imprint_paragraph}</small></p>
      </div></div>
      <div id="disclaimer-background"></div>`;

        document.write(code);
    }
}