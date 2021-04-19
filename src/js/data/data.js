import { setIdCatalogItems } from '../helpers/helpers';

export let defaultData = [
  {
    name: 'square',
    type: 'square',
    color: 'rgba(84, 135, 114, 1)',
    id: 1,
    class: 'box__image box__image-square',
    viewingClass: 'modal-show__square',
  },
  {
    name: 'circle',
    type: 'circle',
    color: 'rgba(141, 41, 143, 1)',
    id: 2,
    class: 'box__image box__image-circle',
    viewingClass: 'modal-show__circle',
  },
  {
    name: 'rectangle',
    type: 'rectangle',
    color: 'rgba(157, 188, 235, 1)',
    id: 3,
    class: 'box__image box__image-rectangle',
    viewingClass: 'modal-show__rectangle',
  },
  {
    name: 'oval',
    type: 'oval',
    color: 'rgba(60, 50, 120, 1)',
    id: 4,
    class: 'box__image box__image-oval',
    viewingClass: 'modal-show__oval',
  },
];

setIdCatalogItems('currentItems', defaultData);
