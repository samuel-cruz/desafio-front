function showToast(message, classes) {
  M.toast({
    html: message,
    displayLength: 10000,
    classes: classes,
  });
}

export const showError = (message) => {
  showToast(message, "red");
};

export const showSuccess = (message) => {
  showToast(message, "card-panel teal lighten-2");
};
