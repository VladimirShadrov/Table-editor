import { defaultData } from '../data/data';

export function getDomItem(selector) {
  const domItem = document.querySelector(selector);

  return domItem;
}

export function getArrayOfDomItems(selector) {
  const arrayOfDomItes = Array.from(document.querySelectorAll(selector));

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
        <div class="${item.class}" style="background-color: ${item.color}" data-id="${item.id}" data-type="${item.type}"></div>
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
export function createAddOrEditModal(buttonName, container) {
  const html = `
  <div class="modal-change">
    <span class="modal-change__close" data-id="close-modal"></span>
    <div class="modal-change__figure-container">
      <h3 class="modal-change__title">Выберите элемент:</h3>
      <div class="modal-change__items-wrapper">
        <div class="modal-change__item modal-change__item-squere" data-name="squere"></div>
        <div class="modal-change__item modal-change__item-circle" data-name="circle"></div>
        <div class="modal-change__item modal-change__item-rectangle" data-name="rectangle"></div>
        <div class="modal-change__item modal-change__item-oval" data-name="oval"></div>
      </div>
    </div>
    <div class="modal-change__color-container">
      <h3 class="modal-change__color-title">Выберите цвет:</h3>
      <label>
        <input
          id="1"
          name="Background"
          type="color"
          class="modal-change__input"
        />
        <div class="modal-change__color"></div>
      </label>
    </div>
    <div class="modal-change__color-result-container">
      <h3 class="modal-change__color-format-title">Выберите формат цвета:</h3>
      <div class="modal-change__colors-wrapper">
        <div class="modal-change__colors-item">
          <p class="modal-change__colors-format">RGB</p>
          <div class="modal-change__colors-value" data-name="rgb"></div>
        </div>
        <div class="modal-change__colors-item">
          <p class="modal-change__colors-format">HEX</p>
          <div class="modal-change__colors-value" data-name="hex"></div>
        </div>
        <div class="modal-change__colors-item">
          <p class="modal-change__colors-format">HSL</p>
          <div class="modal-change__colors-value" data-name="hsl"></div>
        </div>
      </div>
    </div>
    <div class="modal-change__buttons-wrapper">
      <a href="#" class="modal-change__btn-apply" data-id="add"
        >${buttonName}</a
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
export function openAddOrEditModal(
  createModalFunc,
  buttonName,
  container,
  modalSelector
) {
  createModalFunc(buttonName, container);
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

// Функционал добавления / изменения нового элемента в каталог
function removeClassActive(selector) {
  const avalibleItems = getArrayOfDomItems(selector);

  avalibleItems.forEach((item) => {
    item.style.opacity = '1';
  });
}

// Добавить новый элемент
export function selectCatalogItem(selector, target, titleClassName) {
  let selectedItem = target.target.dataset.name;
  const boxTitle = getDomItem(titleClassName);
  let newItemClassName;
  let classItemToView;
  let itemName;
  let itemType;

  boxTitle.style.color = 'rgba(60, 60, 60, 1)';
  removeClassActive(selector);
  target.target.style.opacity = '0.5';

  switch (selectedItem) {
    case 'squere':
      newItemClassName = 'box__image box__image-square';
      classItemToView = 'modal-show__square';
      itemName = 'square';
      itemType = 'square';
      break;
    case 'circle':
      newItemClassName = 'box__image box__image-circle';
      classItemToView = 'modal-show__circle';
      itemName = 'circle';
      itemType = 'circle';
      break;
    case 'rectangle':
      newItemClassName = 'box__image box__image-rectangle';
      classItemToView = 'modal-show__rectangle';
      itemName = 'rectangle';
      itemType = 'rectangle';
      break;
    default:
      newItemClassName = 'box__image box__image-oval';
      classItemToView = 'modal-show__oval';
      itemName = 'oval';
      itemType = 'oval';
  }

  return {
    class: newItemClassName,
    viewingClass: classItemToView,
    name: itemName,
    type: itemType,
    id: 5,
  };
}

// Выбрать цвет нового элемента, конвертировать его в форматы rgb, hsl
// Добавить коды выбранного цвета в соответствующие поля формы

export function selectColorForCatalogItem(
  selector,
  colorFields,
  changeColorButton
) {
  const input = getDomItem(selector);
  const button = getDomItem(changeColorButton);
  let hexFormat;
  let rgbFormat;
  let hslFormat;

  input.addEventListener('change', () => {
    hexFormat = input.value;
    rgbFormat = convertHexToRgb(hexFormat);
    hslFormat = convertHexToHsl(hexFormat);

    const colorBoxesContainer = getArrayOfDomItems(colorFields);
    let hex = colorBoxesContainer.find((box) => box.dataset.name === 'hex');
    let rgb = colorBoxesContainer.find((box) => box.dataset.name === 'rgb');
    let hsl = colorBoxesContainer.find((box) => box.dataset.name === 'hsl');

    button.style.backgroundColor = `rgb(${rgbFormat})`;
    hex.textContent = hexFormat;
    rgb.textContent = rgbFormat;
    hsl.textContent = hslFormat;
  });
}

function convertHexToRgb(hex) {
  if (hex.substring(0, 1) === '#') {
    hex = hex.substring(1);
  }

  const rgbColor = {};

  rgbColor.r = parseInt(hex.substring(0, 2), 16);
  rgbColor.g = parseInt(hex.substring(2, 4), 16);
  rgbColor.b = parseInt(hex.substring(4), 16);

  return `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
}

function convertHexToHsl(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return `${h}, ${s}%, ${l}%`;
}

export function selectColorFormat(
  selector,
  target,
  className,
  colorTitleSelector,
  colorFormatTitleSelector
) {
  const colorFormatBoxes = getArrayOfDomItems(selector);
  const colorTitle = getDomItem(colorTitleSelector);
  const colorFormatTitle = getDomItem(colorFormatTitleSelector);
  let color;

  colorTitle.style.color = 'rgba(60, 60, 60, 1)';
  colorFormatTitle.style.color = 'rgba(60, 60, 60, 1)';

  colorFormatBoxes.forEach((box) => {
    box.classList.remove('modal-change__colors-value-active');
  });

  if (target.target.classList.contains(className)) {
    target.target.classList.add('modal-change__colors-value-active');
    color = target.target.textContent;
  }

  switch (target.target.dataset.name) {
    case 'rgb':
      color = `rgb(${color})`;
      break;
    case 'hex':
      color = `${color}`;
      break;
    default:
      color = `hsl(${color})`;
  }

  return color;
}

// Добавить новый элемент в каталог
export function addNewItemToCatalog(
  newItemTitleSelector,
  colorTitleSelector,
  colorFormatTitleSelector,
  itemData,
  colorData,
  key,
  container,
  defaultValue,
  modalContainer,
  modalAddProductSelector,
  modalShowProductSelector
) {
  const newItemTitle = getDomItem(newItemTitleSelector);
  const colorTitle = getDomItem(colorTitleSelector);
  const colorFormatTitle = getDomItem(colorFormatTitleSelector);
  const catalogItems = getFromLocalStorage(key);

  if (!itemData) {
    newItemTitle.style.color = 'red';
  }

  if (!colorData) {
    colorTitle.style.color = 'red';
    colorFormatTitle.style.color = 'red';
  }

  if (!itemData || !colorData) {
    return;
  } else {
    const newElement = {
      name: itemData.name,
      type: itemData.type,
      color: colorData,
      id: itemData.id,
      class: itemData.class,
      viewingClass: itemData.viewingClass,
    };

    catalogItems.push(newElement);
    setIdCatalogItems(key, catalogItems);
    drowCurrentCatalogElements(key, container, defaultValue);
    setToLocalStorage(key, catalogItems);
    closeModalWindow(
      modalContainer,
      modalAddProductSelector,
      modalShowProductSelector
    );

    console.log(catalogItems);
  }
}
