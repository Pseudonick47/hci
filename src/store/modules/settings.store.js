
const state = {
    draggable: true,
    resizable: true,
    currencyValue: 'EUR',
    currencyDialog: false
};

const getters = {
    draggable: (state) => state.draggable,
    resizable: (state) => state.resizable,
    currencyValue: (state) => state.currencyValue,
    currencyDialog: (state) => state.currencyDialog
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
        if (value === true || value === false) {
            state.currencyDialog = value;
        }
    }
};

export {
    state,
    getters,
    mutations,
};
