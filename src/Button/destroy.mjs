export default button => {
  if (!button.client) throw new Error('client missing');
  button.client.destroy();
  button.client = null;
};
