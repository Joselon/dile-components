import { html, css, LitElement } from "lit";

export class DileSelect extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 10px;
      }
      * {
        box-sizing: border-box;
      }
      label {
        display: block;
        margin-bottom: var(--dile-input-label-margin-bottom, 4px);
        font-size: var(--dile-input-label-font-size, 1em);
        color: var(--dile-input-label-color, #59e);
        font-weight: var(--dile-input-label-font-weight, normal);
      }
      ::slotted(select) {
        box-sizing: border-box;
        width: var(--dile-input-width, 100%);
        padding: var(--dile-input-padding,  7px 5px);
        line-height: var(--dile-input-line-height, 1.5em);
        font-size: var(--dile-input-font-size, 1em);
        border-radius: var(--dile-input-border-radius, 5px);
        border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
        background-color: var(--dile-input-background-color, #fff);
        color: var(--dile-input-color, #303030);
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20448%22%20enable-background%3D%22new%200%200%20256%20448%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E.arrow%7Bfill%3A%23303030%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22arrow%22%20d%3D%22M255.9%20168c0-4.2-1.6-7.9-4.8-11.2-3.2-3.2-6.9-4.8-11.2-4.8H16c-4.2%200-7.9%201.6-11.2%204.8S0%20163.8%200%20168c0%204.4%201.6%208.2%204.8%2011.4l112%20112c3.1%203.1%206.8%204.6%2011.2%204.6%204.4%200%208.2-1.5%2011.4-4.6l112-112c3-3.2%204.5-7%204.5-11.4z%22%2F%3E%3C%2Fsvg%3E%0A");
        background-position: right 10px center;
        background-repeat: no-repeat;
        background-size: auto 50%;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
      }
      ::slotted(select.dark) {
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20448%22%20enable-background%3D%22new%200%200%20256%20448%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E.arrow%7Bfill%3A%23ffffff%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22arrow%22%20d%3D%22M255.9%20168c0-4.2-1.6-7.9-4.8-11.2-3.2-3.2-6.9-4.8-11.2-4.8H16c-4.2%200-7.9%201.6-11.2%204.8S0%20163.8%200%20168c0%204.4%201.6%208.2%204.8%2011.4l112%20112c3.1%203.1%206.8%204.6%2011.2%204.6%204.4%200%208.2-1.5%2011.4-4.6l112-112c3-3.2%204.5-7%204.5-11.4z%22%2F%3E%3C%2Fsvg%3E%0A");
      }
      ::slotted(select):focus {
        outline: none;
        border-color: var(--dile-input-focus-border-color, #6af);
      }
      ::slotted(select.errored) {
        border-color: var(--dile-input-error-border-color, #c00);
      }
      ::slotted(select.disabled) {
        background-color: #f5f5f5;
        border-color: var(--dile-input-disabled-border-color, #eee);
      }
    `;
  }

  static get properties() {
    return {
      label: { type: String },
      value: { type: String },
      name: { type: String },
      disabled: { type: Boolean },
      errored: { type: Boolean },
    };
  }

  render() {
    return html`
      <div>
        ${this.label
          ? html`<label for="textField">${this.label}</label>`
          : ""
        }
        <slot name="select"></slot>
      </div>
    `;
  }

  firstUpdated() {
    this.elselect = this.querySelector("select");
    if(!this.elselect) {
      console.log('Please provide a select element in the slot "select"');
    } else {
      this.elselect.addEventListener("change", (e) => {
        this.value = e.target.value;
      });
    }
  }

  updated(changedProperties) {
    if(changedProperties.has("value")) {
      this.elselect.value = this.value;
      this.emmitChange();
    }
    if(changedProperties.has("disabled")) {
      this.elselect.disabled = this.disabled;
      this.elselect.classList.toggle("disabled", this.disabled);
    }
    if(changedProperties.has("errored")) {
      this.elselect.classList.toggle("errored", this.errored);
    }
  }
 
  emmitChange() {
    this.dispatchEvent(new CustomEvent('element-changed', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        value: this.value
      }
    }));
  }
}