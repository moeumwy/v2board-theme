# v2board-theme

# 为V2board提供的前后端分离主题。
此套主题是按照开源主题Mantis二次开发所得，此项目代码已修改所有bug，后续有bug或新功能会持续修改更新。\
演示站：https://moeu02.com  
演示站的部分功能例如：签到、充值、礼品卡等定制功能均不在源码内，如有需要请前往TG频道联系开发。\
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

## 关于提交BUG
可在上方频道中或Issues提问

## 关于部署完成后刷新页面出现404
如果aapanel部署可在网站URL Rewrite中填入
```
location / {  
    try_files $uri $uri/ /index.html$is_args$query_string;  
}
```

## 友情捐赠
TRC-20 TSLZs2cJorBgMDrWLaTA2dBxWqLCLJbY3o\
Polygon 0xB578cb7F5A47a9856BC20C083E9c47b5d932522E


## 更新日志
2024.08.30\
添加进入仪表盘页面最新公告弹框，以及修改公告图片自适应\
修复注册发送验证码按钮的显示与按钮的禁用问题\
2024.08.27\
修复流量统计页面中低倍率节点流量记录的显示问题\
2024.08.25\
修复仪表盘页面未识别到设备类型导致的无法正常复制订阅链接的问题\
2024.08.06\
将Google Recaptcha更换为Cloudflare Turnstile
