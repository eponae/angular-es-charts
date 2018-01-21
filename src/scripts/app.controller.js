class AppController {
  constructor(tmhDynamicLocale, $translate) {
    this.tmhDynamicLocale = tmhDynamicLocale;
    this.$translate = $translate;
  }

  setLocale(languageKey) {
    this.tmhDynamicLocale.set(languageKey);
    this.$translate.use(languageKey);
  }
}
AppController.$inject = ['tmhDynamicLocale', '$translate'];

export { AppController };
