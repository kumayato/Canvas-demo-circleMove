/**
 * Created by Administrator on 2017/3/22 0022.
 */
function circleMove (option) {
    this._init(option)
};
circleMove.prototype = {
    _init : function (option) {
        // 第一步 设置初始化的信息
        // 每个圆由内部的圆和外部的圆环组合而成
        // 设置圆的中心点坐标
        this.x = option.x || 0;
        this.y = option.y || 0;
        // 设置内圆的半径和外圆的半径
        this.innerRadius = option.innerRadius || 0; // 内圆半径
        this.outerRadius = option.outerRadius || 0; // 外部圆环半径
        // 设置圆里面的文字
        this.text = option.text || "canvas";
        // 设置圆的填充样式
        this.innerStyle = option.innerStyle || 'red';  // 内圆填充色
        this.outerStyle = option.outerStyle || 'yellow'; // 外部圆环填充色

        // 第二步 创建一个组，每个组里面包括（一个内圆，一个外部圆环，和圆里面的文字）
        this.group = new Konva.Group({
            //设置组的x，y坐标，组的内部元素会按照组内的新坐标系定位。
            x : this.x,
            y : this.y
        });

        // 第三步 创建一个内圆并把它加到组里面去
        var innerCircle = new Konva.Circle({
            // 设置圆心的坐标
            // 因为前面设置了组的坐标为this.x和this.y
            // 组的内部元素会按照组内的新坐标系定位
            // 所有这里要将圆心的坐标设置为0,0
            x : 0,
            y : 0,
            radius : this.innerRadius, // 设置半径
            fill : this.innerStyle, // 设置圆的填充颜色
            opacity : .8 // 设置透明度
        });
        this.group.add(innerCircle) // 添加到组里面去

        // 第四步 创建一个外部圆环并把它加到组里面去
        var outerRing = new Konva.Ring({
            x : 0,
            y : 0,
            innerRadius : this.innerRadius, // 圆环圆心到内圆的半径
            outerRadius : this.outerRadius, // 圆环圆心到外圆的半径
            fill : this.outerStyle, // 圆环的填充色
            opacity : .5 // 设置圆环的透明度
        })
        this.group.add(outerRing);

        // 第五步 创建一个文字并把它加到组里面去
        var text = new Konva.Text({
            x : 0 - this.outerRadius,
            y : 0 - 7,  // 上下还有行高，所有减去的值比字体大小的一半稍微小一点，刚好居中
            width : this.outerRadius*2,
            fontSize : 16,  // 字体大小
            fontStyle : 'bold', // 文字字体
            text : this.text, // 文字内容
            align : 'center', // 文字居中
            fill : '#fff' // 文字颜色
        })
        this.group.add(text);
    },

    //第六步 把组添加到层或者其他组中
    addToGroupOrLayer: function(layer) {
        layer.add( this.group );
    }
}