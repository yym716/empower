const settingInfo = {
    namespaced: true,
    state: {
        settingData: {
            checkLinename: "", //线体名选择
            pickerInfo: "00:00", //选择的时间
        },
        defectNums: 0,
        proNums: 0,
    },
    mutations: {
        updateSettingData(state, data) {
            state.settingData = data;
        },
        updateDefectNumsData(state, data) {
            state.defectNums = data;
        },
        updateProNumsData(state, data) {
            state.proNums = data;
        },

    },
    actions: {
        updateSettingData({ commit }, data) {
            commit('updateSettingData', data);
        },
        updateDefectNumsData({ commit }, data) {
            commit('updateDefectNumsData', data);
        },
        updateProNumsData({ commit }, data) {
            commit('updateProNumsData', data);
        },

    },
    getters: {
        getSettingData: state => state.settingData,// 获取设置数据
        getDefectNumsData: state => state.defectNums,// 获取设置数据
        getProNumsData: state => state.proNums,// 获取设置数据
    }
}

export default settingInfo;