/*
 */
export const config = {
    appName: 'vlog.api',
    PORT: 8057,
    frontPage: {
        site: 'http://local.gankao.com:8009'
    },
    DB_URL:'mongodb://panlog:panlog1221@localhost:27018/panLog',
    redis: {
        host: "127.0.0.1",
        port: 6379,
        cache_prefx: 'gk_vlog_',
        defaultExpireSecond: 10 * 60
    },
    site_url: 'http://local.gankao.com:8057'
}