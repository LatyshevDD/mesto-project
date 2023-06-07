export function handleSubmit(request, popupInstance) {
  popupInstance.renderLoading(true);
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}
