export default {
    title: '欢迎', // 标签名
    description: 'Just playing around.', // 描述
    lastUpdated: true, // 最后更新时间
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
    ],
    themeConfig: {
        siteTitle: 'vue3-grid-layout', // 导航栏名称
        logo: '/logo.svg', // 导航栏logo
        // 导航栏
        nav: [
            { text: '指南', link: '/guide/one' },
            { text: 'api参考', link: '/guide/' },
            { text: '更新日志', link: '/guide/' },
            {
                text: '相关链接',
                items: [
                    { text: 'vitepress', link: '/item-1' },
                    { text: 'vue3', link: '/item-2' }
                ]
            }
        ],
        socialLinks: [{ icon: "github", link: "" }],
        // 侧边栏
        sidebar: {
            // guide下的菜单
            '/guide/': [
                {
                    text: 'Guide',
                    collapsible: true, // 是否可折叠
                    collapsed: true, // 是否默认打开
                    items: [
                        { text: 'One', link: '/guide/one' }, // /guide/one.md
                        { text: 'Two', link: '/guide/two' }, // /guide/two.md
                        { text: 'Three', link: '/guide/three' } // /guide/three.md
                    ]
                }
            ],
        },
        // 搜索框
        algolia: {
            apiKey: 'your_api_key',
            indexName: 'index_name',
            searchParameters: {
                facetFilters: ['tags:guide,api']
            }
        },
        // 编辑链接
        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页面 '
        },
        // 页脚
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Evan You'
        }
    },
}