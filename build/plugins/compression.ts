import compression from 'vite-plugin-compression'

export const createCompression = (isBuild: boolean) => {
  return compression({
    algorithm: 'gzip', // 指定压缩算法,[ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
    ext: '.gz', // 指定压缩后的文件扩展名
    threshold: 10240, // 仅对文件大小大于threshold的文件进行压缩，默认为10KB
    deleteOriginFile: isBuild, // 是否删除原始文件，设置了没反应
    filter: /\.(js|css|json|html|ico|svg)(\?.*)?$/i, // 匹配要压缩的文件
    compressionOptions: { level: 9 }, // 指定gzip压缩级别，默认为9（最高级别）
    verbose: true, //是否在控制台输出压缩结果
    disable: false, //是否禁用插件
  })
}