// Wrapper around body data attributes for settings;
export class Settings {
  get baseSocketUrl() {
    return this.dataSet.settingsBaseSocketUrl;
  }

  get dataSet() {
    return document.body.dataset;
  }
}

