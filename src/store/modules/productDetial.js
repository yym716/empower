const productDetialInfo = {
    namespaced: true,
    state: {
        //存储缩略图当前点击行数据
        rowData: {
            isVisible:false, // 小尺寸产品缩略图
            isMediumVisible:false, // 中尺寸产品缩略图
            proTitle:"", // 产品结果图标题
            urlArr:[],   // 产品结果图地址
            imgLoading: false, // 产品缩略图加载
        }, 
        //存储详情图当前点击行数据
        detialRowData:{
            z_Barcode:"",//产品二维码
            z_DetialBarcode:"",
            isDetialVisible:false, // 小尺寸详情图
            isMediumDetialVisible:false, // 中尺寸详情图
            detailTitle: "", // 产品详情图标题
        } 
    },
    mutations: {
        updateRowData(state, data) {
            state.rowData = data;
        },
        updateDetialRowData(state, data){
            state.detialRowData = data;
        },
    },
    actions: {
        updateRowData({ commit }, data) {
            commit('updateRowData', data);
        },

        updateDetialRowData({ commit }, data){
            commit('updateDetialRowData', data);
        },
    },
    getters: {
        getRowData: state => state.rowData, //获取缩略图当前点击行数据
        getDetialRowData: state => state.detialRowData,//获取详情图当前点击行数据
    },
}

export default productDetialInfo;