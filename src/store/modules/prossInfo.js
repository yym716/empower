const prossInfo = {
    namespaced: true,
    state: {
        prossData: {
            stationData: [], // 工位
            defectArea: [],  // 不良区域
            detectImage: [], // 检测画面
            defectTypeData: [],  // 所有缺陷类型
        },
    },
    mutations: {
        updateProssData(state, data) {
            state.prossData = data;
        },
    },
    actions: {
        updateProssData({ commit }, data) {
            commit('updateProssData', data);
        },
    },
    getters: {
        getProssData:state=>state.prossData,// 获取首页看板数据状态
    }
}

export default prossInfo;