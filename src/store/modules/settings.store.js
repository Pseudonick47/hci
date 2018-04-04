
const state = {
    draggable: true,
    resizable: true,
    currencyValue: 'EUR',
    currencyDialog: false,
    darkTheme: true
};

const getters = {
    draggable: (state) => state.draggable,
    resizable: (state) => state.resizable,
    currencyValue: (state) => state.currencyValue,
    currencyDialog: (state) => state.currencyDialog,
    darkTheme: (state) => state.darkTheme
};

const mutations = {
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
    }
};

export {
    state,
    getters,
    mutations,
};
