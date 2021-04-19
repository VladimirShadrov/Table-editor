import '../styles/styles.scss';
import '../styles/editor.scss';
import '../styles/modal.scss';
import { getDomItem } from './helpers/helpers';
import { getArrayOfDomItems } from './helpers/helpers';
import { drowCurrentCatalogElements } from './helpers/helpers';
import { createAddOrEditModal } from './helpers/helpers';
import { createProductDemonstrationModal } from './helpers/helpers';
import { openAddOrEditModal } from './helpers/helpers';
import { openProductDemonstrationModal } from './helpers/helpers';
import { closeModalWindow } from './helpers/helpers';

const editor = getDomItem('.editor');
const productsBox = getDomItem('.box');
const modalContainer = getDomItem('.overlay');

drowCurrentCatalogElements('currentItems', productsBox);

editor.addEventListener('click', (event) => {
  event.preventDefault();

  if (
    event.target.dataset.id === 'add-item' ||
    event.target.dataset.name === 'change'
  ) {
    openAddOrEditModal(createAddOrEditModal, modalContainer, '.modal-change');
  }

  if (
    event.target === modalContainer ||
    event.target.dataset.id === 'close-modal' ||
    event.target.dataset.id === 'cancel' ||
    event.target.dataset.id === 'close'
  ) {
    closeModalWindow(modalContainer, '.modal-change', '.modal-show');
  }

  if (event.target.dataset.name === 'show') {
    openProductDemonstrationModal(
      'currentItems',
      event,
      createProductDemonstrationModal,
      modalContainer,
      '.modal-show'
    );
  }
});
