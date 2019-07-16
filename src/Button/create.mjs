import { BUTTON_ID, BUTTON_STYLE } from './constants';

export default (isLoggedIn, client) => {
  const button = document.createElement('BUTTON');
  button.id = BUTTON_ID;
  for (let key in BUTTON_STYLE) button.style[key] = BUTTON_STYLE[key];
  button.addEventListener('click', () => {
    isLoggedIn ? client.logout() : client.login();
  });
  const text = document.createTextNode(isLoggedIn ? 'Logout' : 'IdVPN Login');
  button.appendChild(text);
  return button;
};
