export function setLoadingToSubmitButton(button, standartStatus, isLoading) {
  if(isLoading) {
    button.value = "Сохранение...";
  } else {
    button.value = standartStatus;
  }
}
