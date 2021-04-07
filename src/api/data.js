import request from '@/utils/request';

export default class Data {
    /**
     * 模拟获取接口
     * @param data 接口参数
     * @returns {AxiosPromise<any>}
     */
    static getData() {
        return request.get('/data.json');
    }
}