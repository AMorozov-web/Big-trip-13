const SHOW_TIME = 3000;

const toast = (text) => {
  const container = document.createElement(`div`);
  const headline = document.createElement(`h2`);

  container.classList.add(`toast`);
  headline.classList.add(`toast__title`);
  headline.textContent = text;

  container.append(headline);
  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, SHOW_TIME);
};

export {
  toast,
};
