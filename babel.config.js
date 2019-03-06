
module.exports = {
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        ["@babel/plugin-proposal-class-properties", { "loose": true}],
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": false,
                "helpers": false,
                "regenerator": true,
                "useESModules": false
            }
        ],
        [
            "module-resolver",
            {
                "root": [
                    "./"
                ],
                "alias": {}
            }
        ]
    ]
}
