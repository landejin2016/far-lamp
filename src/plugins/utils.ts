import axios from 'axios';
import apiConfig from '@/config/api';
import { Config } from '@/interface/index';

export default class Utils {
    private apiConfig: Config = apiConfig;
    private instance = axios.create({
        baseURL: apiConfig.baseUrl,
        timeout: 6000
    });

    /* 记录、查看或清空某个localStorage值 */
    public localData(name: string, data?: any): any {
        if (data === null) {
            localStorage.setItem(`june-${name}`, data);
        } else if (data) {
            localStorage.setItem(`june-${name}`, JSON.stringify(data));
        } else {
            const result = localStorage.getItem(`june-${name}`);
            return result ? JSON.parse(result) : null;
        }
    }

    /* 记录、查看或清空某个sessionStorage值 */
    public sessionData(name: string, data?: any): any {
        if (data === null) {
            sessionStorage.setItem(`june-${name}`, data);
        } else if (data) {
            sessionStorage.setItem(`june-${name}`, JSON.stringify(data));
        } else {
            const result = sessionStorage.getItem(`june-${name}`);
            return result ? JSON.parse(result) : null;
        }
    }

    /* 记录、查看或清空token值 */
    public accessToken(token?: string, isRemeber: boolean = false): any {
        if (token === null) {
            this.localData('accessToken', null);
            return null;
        }

        if (token) {
            if (isRemeber) {
                return this.localData('accessToken', token);
            } else {
                return this.sessionData('accessToken', token);
            }
        }
        return this.localData('accessToken') || this.sessionData('accessToken');
    }

    /* 请求接口 */
    public api(url: string, params: Config = {}, isFile: boolean = false): Config {
        return new Promise((resolve, reject): void => {
            if (this.apiConfig[url]) {
                const token = this.accessToken();
                if (isFile) {
                    const formData = new FormData();
                    for (const key in params) {
                        if (params.hasOwnProperty(key)) {
                            formData.append(key, params[key]);
                        }
                    }
                    params = formData;
                }

                this.instance.post(this.apiConfig[url], params, { headers: { 'Access-Token': token } })
                    .then((res: Config): void => {
                        if (res.data.code === 200) {
                            resolve(res.data.data);
                        } else {
                            // 跳转登录，并传递当前路由;
                            // if (res.code === 1011 || res.code === 1012 || res.code === 1013) {}
                            reject(res.data);
                        }
                    }).catch((err: Config): void => {
                        reject({
                            code: 10001,
                            msg: '请求失败'
                        });
                    });
            } else {
                reject({
                    code: 10001,
                    msg: '接口不存在'
                });
            }
        });
    }

    public deepClone(obj: Config): Config {
        if (obj === null) {
            return obj;
        }

        let copyObj: any = null;
        if (obj.constructor === Object) {
            copyObj = {};
        }

        if (obj.constructor === Array) {
            copyObj = [];
        }

        if (copyObj) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    copyObj[key] = this.deepClone(obj[key]);
                }
            }
            return copyObj;
        } else {
            return obj;
        }
    }

    public formatDate(date: any, format: string): string {
        if (!date.getTime && !(new Date(date).getTime)) {
            return format;
        }
        let month = date.getMonth();
        month += 1;
        date = format.replace(/(YYYY|MM|mm|DD|dd|HH|hh|M|m|SS|ss)/g, ($): string => {
            switch ($) {
                case 'YYYY':
                    return date.getFullYear();
                case 'MM':
                    return date.getMonth() >= 9 ? month : `0(${month})`;
                case 'mm':
                    return month;
                case 'DD':
                    return date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                case 'dd':
                    return date.getDate();
                case 'HH':
                    return date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
                case 'hh':
                    return date.getHours();
                case 'M':
                    return date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
                case 'm':
                    return date.getMinutes();
                case 'SS':
                    return date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
                case 'ss':
                    return date.getSeconds();
                default:
                    return $;
            }
        });
        return date;
    }

}
