# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:latest

# 复制自定义的 nginx 配置文件到容器中
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建的应用文件到 Nginx 的默认静态文件目录
COPY dist /usr/share/nginx/html

# 暴露容器的 8080 端口
EXPOSE 8080

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
