module.exports = {
    "semi": false,
    "singleQuote": true,
    "withNodeModules": true,
    "printWidth": 140,
    "vueIndentScriptAndStyle": true,
    "tabWidth":4,
    "useTabs": false,
    "jsxSingleQuote": true, //jsx中使用单引号
    "bracketSpacing": true,//在对象前后添加空格-eg: { foo: bar }
    "embeddedLanguageFormatting": "auto",//在对象前后添加空格-eg: { foo: bar }
    "arrowParens": "always", //单参数箭头函数参数周围使用圆括号-eg: (x) => x
    "trailingComma": "none", //是否使用尾逗号，有三个可选值"<none|es5|all>"
    "parser": "babylon" //代码的解析引擎，默认为babylon，与babel相同。
}
