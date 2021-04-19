import { defaultData } from '../data/data';

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

export function drowCurrentProductsElements(key, container) {
  const currentData = getFromLocalStorage(key) || defaultData;
  let html = '';

  currentData.forEach((item) => {
    html += `
    <div class="box__item">
      <div class="box__image-container">
        <div class="${item.class}" data-id="${item.id}"></div>
      </div>
      <div class="box__controls">
        <a href="#" class="box__show" data-id="show">Увеличить</a>
        <a href="#" class="box__change" data-id="change">Изменить</a>
        <a href="#" class="box__delete" data-id="delete">Удалить</a>
      </div>
    </div>
`;
  });

  insertHtmlIntoContainer(container, html);
}
