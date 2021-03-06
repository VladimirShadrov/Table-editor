import '../styles/styles.scss';
import '../styles/editor.scss';
import '../styles/modal.scss';
import { defaultData } from './data/data';
import {
  getArrayOfDomItems,
  getDomItem,
  setToLocalStorage,
} from './helpers/helpers';
import { drowCurrentCatalogElements } from './helpers/helpers';
import { createAddOrEditModal } from './helpers/helpers';
import { createProductDemonstrationModal } from './helpers/helpers';
import { openAddOrEditModal } from './helpers/helpers';
import { openProductDemonstrationModal } from './helpers/helpers';
import { closeModalWindow } from './helpers/helpers';
import { deleteCatalogItem } from './helpers/helpers';
import { selectCatalogItem } from './helpers/helpers';
import { selectColorForCatalogItem } from './helpers/helpers';
import { selectColorFormat } from './helpers/helpers';
import { addNewItemToCatalog } from './helpers/helpers';
import { editExistCatalogItem } from './helpers/helpers';
import { getIdModifiedCatalogItem } from './helpers/helpers';

const editor = getDomItem('.editor');
const productsBox = getDomItem('.box');
const modalContainer = getDomItem('.overlay');
let selectedItem;
let selectedColorFormat;

drowCurrentCatalogElements('currentItems', productsBox, defaultData);

editor.addEventListener('mousedown', (event) => {
  // Отмена дефолтного поведения для ссылок
  if (event.target.tagName.toLowerCase() === 'a') {
    event.preventDefault();
  }

  // Открыть модальное окно добавления нового элемента
  if (event.target.dataset.id === 'add-item') {
    openAddOrEditModal(
      createAddOrEditModal,
      'Добавить',
      modalContainer,
      '.modal-change'
    );
  }

  // Открыть модальное окно изменения существующего элемента каталога
  if (event.target.dataset.name === 'change') {
    openAddOrEditModal(
      createAddOrEditModal,
      'Изменить',
      modalContainer,
      '.modal-change'
    );
    getIdModifiedCatalogItem(event);
  }

  // Закрыть модальное окно
  if (
    event.target === modalContainer ||
    event.target.dataset.id === 'close-modal' ||
    event.target.dataset.id === 'cancel' ||
    event.target.dataset.id === 'close'
  ) {
    closeModalWindow(modalContainer, '.modal-change', '.modal-show');
  }

  // Открыть модальное окно демонстрации элемента каталога
  if (
    event.target.dataset.name === 'show' ||
    event.target.classList.contains('box__image')
  ) {
    openProductDemonstrationModal(
      'currentItems',
      event,
      createProductDemonstrationModal,
      modalContainer,
      '.modal-show'
    );
  }

  // Удаление элемента каталога
  if (event.target.dataset.name === 'delete') {
    deleteCatalogItem(event, 'currentItems', productsBox, defaultData);
  }

  // Выбор нового элемента в каталог
  if (event.target.classList.contains('modal-change__item')) {
    selectedItem = selectCatalogItem(
      '.modal-change__item',
      event,
      '.modal-change__title'
    );
  }

  // Выбор цвета для нового элемента
  if (event.target.classList.contains('modal-change__color')) {
    selectColorForCatalogItem(
      '.modal-change__input',
      '.modal-change__colors-value',
      '.modal-change__color'
    );
  }

  // Выбрать формат цвета для нового элемента
  if (event.target.classList.contains('modal-change__colors-value')) {
    selectedColorFormat = selectColorFormat(
      '.modal-change__colors-value',
      event,
      'modal-change__colors-value',
      '.modal-change__color-title',
      '.modal-change__color-format-title'
    );
  }

  // Добавить новый элемент в каталог
  if (event.target.textContent === 'Добавить') {
    addNewItemToCatalog(
      '.modal-change__title',
      '.modal-change__color-title',
      '.modal-change__color-format-title',
      selectedItem,
      selectedColorFormat,
      'currentItems',
      productsBox,
      defaultData,
      modalContainer,
      '.modal-change',
      '.modal-show'
    );
  }

  // Изменить существующий элемент каталога
  if (
    event.target.textContent === 'Изменить' &&
    event.target.classList.contains('modal-change__btn-apply')
  ) {
    editExistCatalogItem(
      'currentItems',
      selectedItem,
      selectedColorFormat,
      productsBox,
      defaultData,
      modalContainer,
      '.modal-change',
      '.modal-show'
    );
  }
});

// Перемещение элементов

productsBox.addEventListener('dragstart', (event) => {
  const item = event.target.closest('.box__item');
  item.classList.add('selected');
});

productsBox.addEventListener('dragend', (event) => {
  const item = event.target.closest('.box__item');
  item.classList.remove('selected');
});

productsBox.addEventListener('dragover', (event) => {
  event.preventDefault();

  const activeElement = productsBox.querySelector('.selected');
  const currentElement = event.target;
  const movableItem =
    activeElement !== currentElement &&
    currentElement.classList.contains('box__item');

  if (!movableItem) return;

  const nextElement =
    currentElement === activeElement.nextElementSibling
      ? currentElement.nextElementSibling
      : currentElement;

  productsBox.insertBefore(activeElement, nextElement);
});
