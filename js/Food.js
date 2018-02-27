function Food(owner){
    var self =this;
    do{
        this.x=parseInt(Math.random() * owner.rowAmount);
        this.y = parseInt(Math.random() * owner.colAmount);
    }while((function(){
        //防止随机的食物在蛇身上
        for (var i = 0; i < owner.snake.body.length; i++) {
            if(owner.snake.body[i].row == self.x && owner.snake.body[i].col== self.y){
                return true
            }
        };
        //不在身上 返回false
        return false
    })())
}
//渲染食物
Food.prototype.render = function(){
    game.setFood(this.x,this.y,"*")
}