export default (button, isLoggedIn) => {
  while (button.firstChild) button.removeChild(button.firstChild);
  const text = document.createTextNode(isLoggedIn ? 'Logout' : 'IdVPN Login');
  button.appendChild(text);
};
