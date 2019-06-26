# 古战场出警脚本 ~~go version~~ 我再也不用go写啦，换成nodejs版本

## Server环境部署 ## 
1. install npm
2. install node  version >= 10.0
3. git clone this project && cd gbfpolice && npm install
4. modify the config (/app/src/config/config) 
5. add a file in app/miscs/members , fill in ids

## 启动 ## 
    npm start

## 未做事项
[x] 加入团队比较，提醒小助手
[x] 和qqbot联动


## 更新日志 ##
2019-06-26  改为定时任务同步本地redis, 接口直接读取redis数据