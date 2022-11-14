const loginInfo = {
    namespaced: true,
    state: {
        typeList: [], //型号列表数据
        currentType: "",  //选中的当前型号
    },
    mutations: {
        updateTypeList(state, data) {
            state.typeList = data;
        },

        updateCurrentType(state, data) {
            state.currentType = data;
        }
    },
    actions: {
        updateTypeList({ commit }, data) {
            commit('updateTypeList', data);
        },

        updateCurrentType({ commit }, data) {
            commit('updateCurrentType', data);
        }
    },
    getters: {
        getTypeList: state => state.typeList, //获取型号列表数据
        getCurrentType: state => state.currentType, //获取当前选中的型号值
    }
}

export default loginInfo;