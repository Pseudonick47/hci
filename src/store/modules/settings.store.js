
const state = {
    draggable: true,
    resizable: true,
};

const getters = {
    draggable: (state) => state.draggable,
    resizable: (state) => state.resizable
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
