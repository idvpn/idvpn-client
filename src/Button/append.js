const createButton = require('./create');
const { BUTTON_ID } = require('./constants');

module.exports = (parent, isLoggedIn, client) => {
  const button = createButton(isLoggedIn, client);

  for (let i = 0; i < parent.children.length; i++) {
    let child = parent.children[i];
    if (child.id === BUTTON_ID) {
      parent.replaceChild(button, child);
      return button;
    }
  }
  parent.appendChild(button);
  return button;
};
