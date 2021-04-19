import { defaultData } from '../data/data';

export function getDomItem(selector) {
  const domItem = document.querySelector(selector);

  return domItem;
}

export function getArrayOfDomItems(selector) {
  const arrayOfDomItes = document.querySelectorAll(selector);

  return arrayOfDomItes;
}

export function setToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));

  return data;
}

export function insertHtmlIntoContainer(container, html) {
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', html);
}

export function createEmptyBlock(container) {
  const html =
    '<div class="box__empty">Вы не добавили ни одного элемента</div>';

  insertHtmlIntoContainer(container, html);
}

// Задать идентификаторы элементам каталога
export function setIdCatalogItems(key, data) {
  for (let i = 0; i < data.length; i++) {
    data[i].id = i + 1;
  }

  setToLocalStorage(key, data);
}

// Отрисовка элементов каталога
export function drowCurrentCatalogElements(key, container, defaultValue) {
  const currentData = getFromLocalStorage(key) || defaultValue;

  let html = '';

  currentData.forEach((item) => {
    html += `
    <div class="box__item">
      <div class="box__image-container">
        <div class="${item.class}" data-id="${item.id}" data-type="${item.type}"></div>
      </div>
      <div class="box__controls">
        <a href="#" class="box__show" data-name="show" data-type="${item.type}" data-id="${item.id}">Увеличить</a>
        <a href="#" class="box__change" data-name="change" data-id="${item.id}">Изменить</a>
        <a href="#" class="box__delete" data-name="delete" data-id="${item.id}">Удалить</a>
      </div>
    </div>
`;
  });

  insertHtmlIntoContainer(container, html);

  if (!currentData.length) {
    showMessageEmpyCatalog(container);
  }
}

// HTML Модального окна добавления/изменения элемента каталога
export function createAddOrEditModal(container) {
  const html = `
  <div class="modal-change">
    <span class="modal-change__close" data-id="close-modal"></span>
    <div class="modal-change__figure-container">
      <h3 class="modal-change__title">Выберите элемент:</h3>
      <div class="modal-change__items-wrapper">
        <div class="modal-change__item-squere"></div>
        <div class="modal-change__item-circle"></div>
        <div class="modal-change__item-rectangle"></div>
        <div class="modal-change__item-oval"></div>
      </div>
    </div>
    <div class="modal-change__color-container">
      <h3 class="modal-change__color-title">Выберите цвет:</h3>
      <label>
        <input
          name="Background"
          type="color"
          class="modal-change__input"
        />
        <div class="modal-change__color"></div>
      </label>
    </div>
    <div class="modal-change__color-result-container">
      <h3 class="modal-change__color-title">Ваш цвет:</h3>
      <div class="modal-change__color-result"></div>
    </div>
    <div class="modal-change__colors-wrapper">
      <div class="modal-change__colors-item">
        <div class="modal-change__colors-value">105, 101, 120</div>
        <p class="modal-change__colors-format">RGB</p>
      </div>
      <div class="modal-change__colors-item">
        <div class="modal-change__colors-value">#696578a2</div>
        <p class="modal-change__colors-format">HEX</p>
      </div>
      <div class="modal-change__colors-item">
        <div class="modal-change__colors-value">252, 16, 47, 0.64</div>
        <p class="modal-change__colors-format">HSV</p>
      </div>
    </div>
    <div class="modal-change__buttons-wrapper">
      <a href="#" class="modal-change__btn-apply" data-id="add"
        >Добавить</a
      >
      <a href="#" class="modal-change__btn-cancel" data-id="cancel"
        >Отмена</a
      >
    </div>
  </div>
  `;

  insertHtmlIntoContainer(container, html);
}

// HTML Модального окна просмотра элемента каталога
export function createProductDemonstrationModal(container) {
  const html = `
  <div class="modal-show">
    <span class="modal-change__close" data-id="close-modal"></span>
    <div class="modal-show__item-container">
    </div>
    <a href="#" class="modal-show__btn-close" data-id="close">Закрыть</a>
  </div>
`;

  insertHtmlIntoContainer(container, html);
}

// Открыть модальное окно добавления или изменения товара
export function openAddOrEditModal(createModalFunc, container, modalSelector) {
  createModalFunc(container);
  const modal = getDomItem(modalSelector);

  container.style.zIndex = '1';
  setTimeout(() => (modal.style.transform = 'scale(1)'), 100);
}

// Открыть модальное окно демонстрации товара
export function openProductDemonstrationModal(
  key,
  event,
  createModalFunc,
  container,
  modalSelector
) {
  const data = getFromLocalStorage(key);
  const id = event.target.dataset.id;
  const selectedItem = data.find((item) => item.id === +id);
  createModalFunc(container);
  const modal = getDomItem(modalSelector);
  const productContainer = modal.querySelector('.modal-show__item-container');
  const product = `<div class="${selectedItem.viewingClass}"></div>`;

  insertHtmlIntoContainer(productContainer, product);
  productContainer.firstElementChild.style.backgroundColor = `${selectedItem.color}`;
  container.style.zIndex = '1';
  setTimeout(() => (modal.style.transform = 'scale(1)'), 100);
}

// Закрыть модальное окно
export function closeModalWindow(
  container,
  modalAddProductSelector,
  modalShowProductSelector
) {
  let modal = getDomItem(modalAddProductSelector);

  if (!modal) {
    modal = getDomItem(modalShowProductSelector);
  }

  modal.style.transform = 'scale(0)';
  container.style.zIndex = '-1';
  setTimeout(() => (container.innerHTML = ''), 500);
}

// Удалить элемент каталога
export function deleteCatalogItem(event, key, container, defaultValue) {
  const catalog = getFromLocalStorage(key);
  const catalogItemIndex = catalog.findIndex(
    (item) => item.id === +event.target.dataset.id
  );

  catalog.splice(catalogItemIndex, 1);
  setIdCatalogItems(key, catalog);
  setToLocalStorage(key, catalog);
  drowCurrentCatalogElements(key, container, defaultValue);
}

// Добавить сообщение, что товары в каталоге отсутствуют
export function showMessageEmpyCatalog(container) {
  const message =
    '<div class="box__empty">Вы не добавили в каталог ни одного элемента</div>';
  insertHtmlIntoContainer(container, message);
}
