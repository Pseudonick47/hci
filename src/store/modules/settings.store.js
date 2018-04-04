
const state = {
    draggable: true,
    resizable: true,
};

const getters = {
    draggable: (state) => {
        return state.draggable;
    },
    resizable: (state) => {
        return state.resizable;
    }
};

const mutations = {
    changeDraggable(state) {
        state.draggable = !state.draggable;
    },
    changeResizable(state) {
        state.resizable = !state.resizable;
    },
};

export {
    state,
    getters,
    mutations,
};
