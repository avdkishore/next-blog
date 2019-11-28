function deserializer(data) {
  let json = data;

  try {
    json = JSON.parse(data);
  } catch (e) {
    // console.log(e);
  }

  let html = '';

  json.blocks.forEach(function(block) {
    switch (block.type) {
      case 'header':
        html += `<div class="ce-block"><div class="ce-block__content"><h${block.data.level} class="ce-header">${block.data.text}</h${block.data.level}></div></div>`;
        break;
      case 'paragraph':
        html += `<div class="ce-block"><div class="ce-block__content"><div class="ce-paragraph cdx-block">${block.data.text}</div></div></div>`;
        break;
      case 'delimiter':
        html += `<div class="ce-block"><div class="ce-block__content"><div class="ce-delimiter cdx-block"></div></div></div>`;
        break;
      case 'image':
        html += `<img src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
        break;
      case 'list':
        const listItems = block.data.items.map((li) => {
          return `<li class="cdx-list__item">${li}</li>`;
        }).join('');

        const opening = block.data.style === 'unordered' ? '<ul class="cdx-block cdx-list cdx-list--unordered">' : '<ol class="cdx-block cdx-list cdx-list--ordered">';
        const closing = block.data.style === 'unordered' ? '</ul>': '</ol>';

        html += `<div class="ce-block"><div class="ce-block__content">${opening}${listItems}${closing}</div></div>`
        break;
      case 'code':
        html += `<div class="ce-block"><div class="ce-block__content"><div class="cdx-block ce-code"><textarea class="ce-code__textarea cdx-input">${block.data.code}</textarea></div></div></div>`
        break;
      case 'checklist':
        const checklistItems = block.data.items.map((item) => {
          if (item.checked) return `<div class="cdx-checklist__item cdx-checklist__item--checked"><span class="cdx-checklist__item-checkbox"></span><div class="cdx-checklist__item-text">${item.text}</div></div>`;

          return `<div class="cdx-checklist__item"><span class="cdx-checklist__item-checkbox"></span><div class="cdx-checklist__item-text">${item.text}</div></div>`;
        }).join('');

        html += `<div class="ce-block"><div class="ce-block__content"><div class="cdx-block cdx-checklist">${checklistItems}</div></div></div>`
        break;
      default:
        console.log('Unknown block type', block.type);
        console.log(block);
        break;
    }
  });

  return html;
}

export default deserializer;