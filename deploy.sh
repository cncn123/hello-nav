#!/bin/bash

# 连接信息
EC2_HOST="ec2-user@api.bobbyspace.com"
APP_DIR="/home/ec2-user/apps/hello-nav"

# 在 EC2 上执行命令
ssh $EC2_HOST "cd $APP_DIR && \
  git pull && \
  cd packages/server && \
  npm install && \
  npm run build && \
  pm2 restart hello-nav-backend"

echo "部署完成！"
