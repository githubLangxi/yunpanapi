
class GKTag {
    constructor() {
        throw '静态业务功能类无法实例化'
    }

    /**
     * Demo接口
     * @param name
     * @returns {Promise<{name: *, age: number}>}
     * @constructor
     */
    static async hello({name}) {
        return {name,age:123}
    }
}

export default GKTag