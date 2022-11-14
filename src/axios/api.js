//处理api接口js
import {
    get,
    post
} from './request'

//获取复判数据的缺陷等级数量
export const getConfig = params => get("/admin/getConfig", params);

export const setConfig = params => post("/admin/setConfig", params);

export const killBrowser = params => get("/admin/killBrowser", params);