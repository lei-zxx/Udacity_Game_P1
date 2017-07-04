// 这是我们的玩家要躲避的敌人
/**
 * @description 敌人对象构造
 * @param x 敌人对象X轴
 * @param y 敌人对象Y轴
 * @param speed 敌人移动的速度
 * @param w 敌人图像的宽度
 * @param h 敌人图像的高度
 * @constructor
 */
var Enemy = function(x,y,speed,w,h) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.w = w;//宽度
    this.h = h;//高度
    this.speed = speed;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x+=dt*this.speed;
    if(this.x>600){//判断虫子的坐标，超过画布 重置虫子的X坐标
        this.x=0;
    }
    this.checkCollision(player);
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    //
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function (player) {

    if(isCollision(player,this)){
       player.__initLocation();
    }


}
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
//渲染界面
var allEnemies = [];
//遍历初始化多个虫子
var __initEnemies = function () {
        //循环创建多个虫子对象   push到数组中
        for(var i = 1;i < 5;i++){
            var random_speed = Math.round(50+Math.random()*200);//产生随机速度 50-200之间随机速度
            var enemy = new Enemy(0, 80*i,random_speed,100,70);
            allEnemies.push(enemy);
        }
}

/**
 * @description 玩家对象
 * @param x 玩家X轴
 * @param y 玩家Y轴
 * @param w 玩家图像的宽度
 * @param h 玩家图像的高度
 * @constructor
 */
var Player = function (x,y,w,h) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //是否能左移
    this.canLeftMove = function () {
        if(this.x>0){
            return true;
        }else{
            return false;
        }
    };
    //是否能右移
    this.canRightMove = function () {
        if(this.x<400){
            return true;
        }else{
            return false;
        }
    };
    //是否能上移
    this.canUpMove = function () {
        if(this.y>0){
            return true;
        }else{
            return false;
        }
    };
    //是否能下移
    this.canDownMove = function () {
        if(this.y<400){
            return true;
        }else{
            return false;
        }
    };
    //是否过关
    this.isPass = function () {
        if(this.y==0){
            return true;
        }else{
            return false;
        }
    };
    //初始化位置
    this.__initLocation = function () {
        this.x = 200;
        this.y = 400;
    };
}
/**
 * @description 玩家左移
 */
Player.prototype.moveLeft = function () {
    this.x-=100;
}
/**
 * @description 玩家右移
 */
Player.prototype.moveRight = function () {
    this.x+=100;//每次右移加上100 移动一格的宽度
}
/**
 * @description 玩家上移
 */
Player.prototype.moveUp = function () {
    this.y-=80;
}
/**
 * @description 玩家下移
 */
Player.prototype.moveDown = function () {
    this.y+=80;
}
/**
 * 更新位置
 */
Player.prototype.update = function () {
    if(player.isPass()){//判断是否到河
        this.__initLocation();
        alert('wow,恭喜你胜利了');
    }
}
/**
 * @description 判断是否碰撞
 * @param player 玩家对象
 * @param enemy  敌人对象
 * @returns {boolean} true 玩家和虫子碰撞了 false没有碰撞
 */
var isCollision = function(player,enemy){
    if(player.x+player.w<enemy.x || enemy.x+enemy.w<player.x || player.y+player.h<enemy.y || enemy.y+enemy.h < player.y){
        return false;
    }else{
        return true;
    }
};
/**
 * 玩家对象渲染
 */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
/**
 * @description 监听键盘方向
 * @param movement  移动的方向
 */
Player.prototype.handleInput = function (movement) {//键盘移动
    switch (movement){
        case 'left':
            //判断左边移动不要超出屏幕
            if(player.canLeftMove())this.moveLeft();break;
        case 'right':
            //400移动x轴的最大宽度
            if(player.canRightMove())this.moveRight();break;
        case 'up':
            if(player.canUpMove()) this.moveUp();break;
        case 'down':
            if(player.canDownMove())this.moveDown();break;
    }
}

//实例化 玩家位置  对象
var player = new Player(200,400,100,70);
//初始化敌人
__initEnemies();

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
