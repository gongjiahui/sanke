function Game(){
    this.rowAmount = 16;
    this.colAmount = 20;
    this.snake = new Snake();
    this.food = new Food(this);
    this.init()
    this.start();
    this.bindEvent();
}
Game.prototype.init = function(){
    this.$dom = $("<table></table>");
    var tr,td;
    for (var i = 0; i < this.rowAmount; i++) {
         tr=$("<tr></tr>")
           for (var j = 0; j < this.colAmount; j++) {
                td = $("<td></td>")
                tr.append(td)
           };
           this.$dom.append(tr)
      }
      $("#app").append(this.$dom)
}
//提供 颜色渲染
Game.prototype.setColor= function(row,col,color){
    $("tr").eq(row).children("td").eq(col).css("background",color)
    //清屏 食物
    $("tr").eq(row).children("td").eq(col).text("");
}
//提供设置食物的方法
Game.prototype.setFood = function(row,col,text){
    $("tr").eq(row).children("td").eq(col).text(text);
}
//擦除
Game.prototype.clearColor = function(){
    for (var i = 0; i < this.rowAmount; i++) {
        for (var j = 0; j < this.colAmount;j++) {
            $("tr").eq(i).children("td").eq(j).css("background","")
        };
    };
}
//添加监听
Game.prototype.bindEvent = function(){
    var self=this;
    $(document).keydown(function(e){
        if (e.keyCode ==37) {
            if(self.snake.direction == "R") return
            self.snake.changeDirection("L")
        }else if (e.keyCode == 38) {
            if(self.snake.direction == "B") return
            self.snake.changeDirection("U")
        }else if (e.keyCode == 39) {
            if(self.snake.direction == "L") return
            self.snake.changeDirection("R")
        }else if (e.keyCode == 40) {
           if( self.snake.direction == "U" )return
            self.snake.changeDirection("B")
        }
    })
}
//定时器
Game.prototype.start=function(){
    var self = this;
    self.f =0;
    this.timer=setInterval(function(){
            self.f++;
            self.clearColor();
            self.snake.render();
            self.food.render();
            self.f % 30 ==0 && self.snake.update();
            $(".info").text("帧"+self.f)
            $(".score").text("分数："+ self.snake.body.length)
    },20)
}