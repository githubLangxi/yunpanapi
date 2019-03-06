import path from 'path'

/*
 获取package中的系统名
 */
const load_package_name = ()=> {
    try {
        let {name} = require(path.join(process.cwd(), 'package.json'));
        return name
    } catch (err) {
        return ""
    }
}

const validUrl = process.env.NODE_ENV === 'production' ? 'http://rulecenter.api.gankao.com' : 'http://rulecenter-test.api.gankao.com'

exports.config = {
    /**
     * 系统名称,默认读取package.json中的name
     */
    name: 'vlog' || load_package_name(),
    /**
     * 权限认证中心
     */
    admin_rule_center: {
        /**
         * 用户身份验证接口
         */
        auth: validUrl + "/gkauth/authAdminAccount",
        /**
         * 权限验证接口
         */
        validator: validUrl + "/gkrulemanager/validate",
        /**
         * 权限配置表的注册接口
         */
        register: validUrl + "/gkrulemanager/register",
    },
    account_center:{

    }
}