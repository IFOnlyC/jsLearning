import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered
   * @param {boolean} [render = true] if false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render is false
   * @this {Object} View instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMsg();

    this._data = data;
    const newMarkUp = this._renderMarkup();

    if (!render) return newMarkUp;
    this._clearup();
    this._parentElement.insertAdjacentHTML('afterbegin', newMarkUp);
  }

  update(data) {
    this._data = data;
    const updatedEl = this._renderMarkup();
    const newDOM = document.createRange().createContextualFragment(updatedEl);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, indx) => {
      const curEl = curElements[indx];
      // update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clearup() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const spinner = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clearup();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }

  renderErrorMsg(message = this._errMsg) {
    const errMsg = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clearup();
    this._parentElement.insertAdjacentHTML('afterbegin', errMsg);
  }

  renderMessage(message = this._message) {
    const errMsg = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clearup();
    this._parentElement.insertAdjacentHTML('afterbegin', errMsg);
  }
}
