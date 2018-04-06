import * as _ from 'lodash';

const state = {
  draggable: true,
  resizable: true,
  currencyValue: 'EUR',
  currencyDialog: false,
  darkTheme: true,
  defaultWindowHeight: 100
};

const getters = {
  draggable: (state) => state.draggable,
  resizable: (state) => state.resizable,
  currencyValue: (state) => state.currencyValue,
  currencyDialog: (state) => state.currencyDialog,
  darkTheme: (state) => state.darkTheme,
  defaultWindowHeight: (state) => state.defaultWindowHeight
};

const mutations = {
  setSettings(state, data) {
    _.assign(state, data);
  },
  updateSettingsStorage() {
    localStorage.setItem('settings', JSON.stringify(state));
  },
  changeDraggable(state) {
    state.draggable = !state.draggable;
  },
  changeResizable(state) {
    state.resizable = !state.resizable;
  },
  changeCurrency(state, value) {
    state.currencyValue = value;
  },
  changeVisibilityCurrencyDialog(state, value) {
    state.currencyDialog = value;
  },
  changeTheme(state) {
    state.darkTheme = !state.darkTheme;
  },
  changeDefaultWindowHeight(state, value) {
    state.defaultWindowHeight = value;
  }
};

export {
  state,
  getters,
  mutations
};
