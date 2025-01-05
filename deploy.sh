#!/bin/bash

# 连接信息
EC2_HOST="hello-nav"
APP_DIR="/home/ec2-user/apps/hello-nav"

# 在 EC2 上执行命令
ssh $EC2_HOST "cd $APP_DIR && \
  git pull && \
  cd packages/server && \
  pnpm install && \
  pnpm run build && \
  pm2 restart hello-nav-backend"

echo "部署完成！"
