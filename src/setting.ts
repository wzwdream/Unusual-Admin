export const setting = {
  /**
   * @description 网站标题
   */
  title: 'Naive Admin',
  /**
   * @description 是否只保持一个子菜单的展开(手风琴)
   */
  accordion: true,
  /**
   * @description token key
   */
  TokenKey: 'EL-ADMIN-TOEKN',
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000,
  /**
   * @description 是否显示logo
   */
  sidebarLogo: true,
  /**
   * @description 是否显示 tagsView
   */
  tagsView: true,
  /**
   * 是否显示设置的底部信息
   */
  showFooter: true,
  /**
   * 底部文字
   */
  footerTxt: 'xxxx有限公司 xxxx系统',
  /**
   * 备案号
   */
  caseNumber: 'xxxICP备xxxxxxxxx',
  /**
   * 主题颜色
   */
  naiveThemeOverrides: {
    common: {
      primaryColor: '#18a058',
      primaryColorHover: '#36ad6a',
      primaryColorPressed: '#0c7a43',
      primaryColorSuppl: '#36ad6a',

      infoColor: '#2080f0',
      infoColorHover: '#4098fc',
      infoColorPressed: '#1060c9',
      infoColorSuppl: '#4098fc',

      successColor: '#18a058',
      successColorHover: '#36ad6a',
      successColorPressed: '#0c7a43',
      successColorSuppl: '#36ad6a',

      warningColor: '#f0a020',
      warningColorHover: '#fcb040',
      warningColorPressed: '#c97c10',
      warningColorSuppl: '#fcb040',

      errorColor: '#d03050',
      errorColorHover: '#de576d',
      errorColorPressed: '#ab1f3f',
      errorColorSuppl: '#de576d'
    }
  }
}
