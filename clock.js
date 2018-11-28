var dom=document.getElementById('clock');//获取当前的canvas
var ctx =dom.getContext('2d');//设置canvas
var width=ctx.canvas.width;//获取canvas的宽度
var height=ctx.canvas.height;//获取canvas的长度
var r=width/2;//得到半径
var rem=width/300;//为了调节大小设置比例
 
function drawBackground(argument) {//设置背景
	// body...
	// 
	ctx.save();//保存当前环境的状态
	ctx.translate(r,r);//重新映射画布的（0,0）位置设置为（r，r）
	ctx.beginPath();//重置当前路径
	ctx.lineWidth=10*rem;//设置当前的线条宽度
	ctx.arc(0, 0, r-ctx.lineWidth/2, 0, 2*Math.PI, false);//创建圆0 0是圆心的坐标r-ctx.lineWidth/2是圆的半径，0是起始角按弧度计算，2π是结束角 false是按照顺时针画圆
	ctx.stroke();//绘制已定义的路径默认颜色是黑色
 
 
	ctx.font=18*rem + 'px Arial';//设置当前画布上的字体的属性
	ctx.textAlign='center';//设置字体对齐方式为居中
	ctx.textBaseline='middle';//设置或返回在绘制文本时的当前文本基线是em文本方框的正中。
 
	var hourNumbers=[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];//12个小时画圆时使用的数组，圆形是从3的位置为起始位置开始顺时针来画的
	hourNumbers.forEach(function (number,i) {
		// body...
		var rad =2 * Math.PI /12 *i;//先求出每个点的弧度 sin和cos使用的是弧度的值
		var x=Math.cos(rad) * (r-30*rem);
		var y=Math.sin(rad) * (r-30*rem);
 
		ctx.fillText(number, x, y);//方法在画布上绘制填色的文本。文本的默认颜色是黑色。为每个坐标x和y上的设置数值number
 
 
	});
	//画分钟的小圆点
	for(var i=0; i<60; i++)
	{
		var rad=2*Math.PI /60 *i;//求出每个点所对应的弧度值
		var x=Math.cos(rad)*(r-18*rem);//求出所对应的坐标
		var y=Math.sin(rad)*(r-18*rem);
		ctx.beginPath();//重置路径
		if(i%5==0)//如果是小时的点时，设置字体为黑色的
		{
			ctx.fillStyle='#000';
			ctx.arc(x, y, 2*rem, 0, 2*Math.PI, false );
		}else//其他的设置字体为灰色的
		{
			ctx.fillStyle='#ccc';
			ctx.arc(x, y, 2*rem, 0, 2*Math.PI, false);//求出要绘制的面积区域
		} 
		ctx.fill();//以填充的方式画圆
	}
}
<!--背景绘制结束-->
 
function drawHour(hour, minute) {//画时针
	// body...
	// 
	ctx.save();//保存当前环境的状态
	ctx.beginPath();//重置当前路径
	var rad=2*Math.PI / 12 *hour;//求出每小时所对应的弧长
	var mrad=2*Math.PI /12/ 60 *minute;//求出每分钟对应的弧长
	ctx.rotate(rad+mrad);//旋转当前的绘图
	ctx.lineWidth=6*rem;//设置当前的线条宽度
	ctx.lineCap="round";//设置或返回线条末端线帽的样式为圆形
	ctx.moveTo(0, 10*rem);//设置要画的开始位置
	ctx.lineTo(0, -r/2);//设置结束的位置  因为设置坐标原点为（r，r），所以向上为负值
	ctx.stroke();//绘制图形
	ctx.restore();//返回之前保存过的路径状态和属性
}
 
 
function drawMintue(minute) {//画分针  和时针画法相同
	// body...
	// 
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI / 60 *minute;
	ctx.rotate(rad);
	ctx.lineWidth=3*rem;
	ctx.lineCap="round";
	ctx.moveTo(0, 10*rem);
	ctx.lineTo(0, -r+30*rem);
	ctx.stroke();
	ctx.restore();
}	
function drawSecond(second) {//画秒针
	// body...
	// 
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle='#c14543';
	var rad=2*Math.PI / 60 *second;
	ctx.rotate(rad);
	ctx.moveTo(-2*rem, 20*rem);
	ctx.lineTo(2*rem, 20*rem);
	ctx.lineTo(1, -r+18*rem);
	ctx.lineTo(-1, -r+18*rem);
	ctx.fill();
	ctx.restore();
}	
function drawDot() {//画出中间的小圆点相当于设置一个让三个针固定的螺丝
	// body...
	ctx.beginPath();
	ctx.fillStyle='#fff';//设置填充颜色为白色
 
	ctx.arc(0, 0, 3*rem, 0, 2*Math.PI, false);
	ctx.fill();
}
 
 
 
function draw(argument) {//把三个指针放在这个函数中
	ctx.clearRect(0, 0, width, height);//清除指针运动时留下的轨迹
	var now=new Date();
	var hour= now.getHours();//获取当前小时
	var minute=now.getMinutes();//获取分钟
	var second=now.getSeconds();//获取秒
	drawBackground();	//调用函数
	drawHour(hour, minute);
	drawMintue(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();//返回之前保存过的路径状态和属性
}
 
draw();
setInterval(draw, 1000);//每过一秒执行一次
