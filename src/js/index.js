import '../styles/styles.scss';
import '../styles/editor.scss';
import '../styles/modal.scss';
import { drowCurrentProductsElements } from './helpers/helpers';

const editor = document.querySelector('.editor');
const productsBox = document.querySelector('.box');

drowCurrentProductsElements('currentItems', productsBox);
