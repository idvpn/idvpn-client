import Client from '../Client';
import { BUTTON_ID, BUTTON_STYLE } from './constants';
import updateText from './updateText';
import destroy from './destroy';

export default options => {
  const client = options.client || new Client(options);

  // create and style the buttons
  const button = document.createElement('BUTTON');
  button.id = BUTTON_ID;
  for (let key in BUTTON_STYLE) button.style[key] = BUTTON_STYLE[key];

  // sync button to the client
  button.client = client;
  button.addEventListener('click', () => (client.isLoggedIn ? client.logout() : client.login()));
  updateText(button, client.isLoggedIn);
  client.on('userLoaded', user => {
    updateText(button, client.isLoggedIn);
    !options.onLogin || options.onLogin(user);
  });
  client.on('userUnloaded', () => {
    updateText(button, client.isLoggedIn);
    !options.onLogout || options.onLogout();
  });

  button.destroy = () => destroy(button);
  return button;
};
