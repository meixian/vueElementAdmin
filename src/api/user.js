import request from '@/utils/request';

export default class User {
    /**
     * 登录
     * @param data 接口参数
     * @returns {AxiosPromise<any>}
     */
    static login() {
        return request.post('', data);
    }
    /** 获取用户信息 */
    static getInfo() {
        return request.get('');
    }
    /** 退出登录 */
    static logout() {
        return request.get('');
    }
}