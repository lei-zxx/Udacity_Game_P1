## 运行游戏
- 打开工程
- 选择根目录下的index.html
- 双击在浏览器中打开
- 操作键盘上的up、left、right、down方向键控制玩家移动
## 游戏规则
- 玩家顺利躲过敌人到达河流，游戏胜利
- 玩家碰撞到敌人，恢复初始位置，重新开始
- 胜利后会弹框提示，告诉玩家胜利

## 初始化对象

```
//初始化玩家
var player = new Player(200,400,100,70);
//左移
player.moveLeft();
//右移
player.moveRight();
//上移
player.moveUp();
//下移
player.moveDown();
```
```
//初始化敌人
__initEnemies();
```
## 缺陷
- 目前还只是简单的在移动时计算是否与敌人碰撞和是否到达河流，需要丰富游戏的玩法
- 玩家胜利提示过于简单

## 问题(issue)
如在运行中，遇到任何问题，欢迎在issue模块提出

## 联系我
######  QQ邮箱:1098769275@qq.com
###### 微信 :1098769275


