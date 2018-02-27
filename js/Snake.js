function Snake(){
    this.body=[{
        row:2,col:8
    },{
        row:2,col:7
    },{
        row:2,col:6
    },{
        row:2,col:5
    },{
        row:2,col:4
    }];
    this.direction = "R";
    this.willDirection="R";
}
Snake.prototype.render = function(){
    //头部颜色
    game.setColor(this.body[0].row,this.body[0].col,"red");
    //身体颜色
    for (var i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row,this.body[i].col,"green");
    }
//整个地图随便跑
    if(this.body[0].col >= game.colAmount){
        this.body[0].col =0
    }
    if(this.body[0].col <0){
        this.body[0].col= game.colAmount -1;
    }
    if(this.body[0].row> game.rowAmount){
        this.body[0].row= 0
    }
    if(this.body[0].row<0){
        this.body[0].row = game.rowAmount-1;
    }
}
//跑
Snake.prototype.update=function(){
    this.direction = this.willDirection;
    
    switch(this.direction) {
        case "L" :
            var snakeBody ={row:this.body[0].row,col:this.body[0].col-1}
            this.body.unshift(snakeBody);
            break;
        case "R" :
            var snakeBody={row:this.body[0].row,col:this.body[0].col+1}
            this.body.unshift(snakeBody)
            break;
        case "U":
             var snakeBody = {row:this.body[0].row-1,col:this.body[0].col}
            this.body.unshift(snakeBody)
            break;
        case "B":
            var snakeBody={row:this.body[0].row+1,col:this.body[0].col};
            this.body.unshift(snakeBody)
        break;
    }
    //判断吃没吃到食物
    if (snakeBody.col == game.food.y && snakeBody.row==game.food.x) {
        game.food  = new Food(game);
    }else {
        this.body.pop()
    }
    //撞自己的身体判断
    for (var i =1; i < this.body.length; i++) {
        if (snakeBody.col == this.body[i].col && snakeBody.row == this.body[i].row) {
            clearInterval(game.timer);
            alert("GAME OVER  分数 ：" + this.body.length)
        }
    };
}
Snake.prototype.changeDirection = function(str){
        this.willDirection=str;
}