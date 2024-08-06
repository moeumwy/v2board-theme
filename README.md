# v2board-theme

# 为V2board提供的前后端分离主题。
此套主题是按照开源主题Mantis二次开发所得，此项目代码已修改所有bug，后续有bug或新功能会持续修改更新。\
演示站：https://moeu02.com  
TG频道：https://t.me/maimai778

## 环境配置：
nodejs v18.12.1\
pnpm v9.6.0

## 打包部署：
对接修改\
/src/config.ts\
Logo修改\
/src/components/logo/LogoMain.tsx\
服务协议/隐私协议链接修改\
/src/sections/auth/auth-forms/AuthRegister.tsx\
/src/layout/MainLayout/Footer.tsx\
如需添加crisp客服请在index.html中head标签内添加script\
其余修改请自行search

## 打包命令
```
pnpm install
pnpm build
```
打包完成后得到dist文件夹，丢到网站根目录即可。
