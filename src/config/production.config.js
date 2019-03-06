/*
 */
export const config = {
    appName:'vlog.api',
    PORT: 8057,
    frontPage:{
        site:'http://vlog.admin.gankao.com'
    },
    redis: {
        host: "10.9.193.140",
        port: 6379,
        password:'gankao123poi',
        cache_prefx:'gk_vlog_',
        defaultExpireSecond:10*60
    },
    site_url: 'http://vlog.api.gankao.com'
}