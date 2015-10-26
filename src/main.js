
var stage = new Konva.Stage({
  container:'container',
  height: 400,
  width: 400
});

var max = {
  x: stage.getWidth(),
  y: stage.getHeight()
};

var layer = new Konva.Layer();

(function () {
  Konva.Point = function(config) {
    this.___init(config);
  };

  Konva.Point.prototype = {
    ___init: function(config) {
      Konva.Shape.call(this, config);
      this.className = 'Point';
      this.sceneFunc(this._sceneFunc);
    },
    _sceneFunc: function(ctx) {
      //console.log(this.attr('stroke'));
      //ctx.beginPath();
      var len = 2;
      ctx.moveTo(-len, -len);
      ctx.lineTo(len,len);
      ctx.moveTo(-len, len);
      ctx.lineTo(len, -len);
      ctx.strokeStyle = this.attrs.stroke;
      ctx.stroke();
    }
  };

  Konva.Util.extend(Konva.Point, Konva.Shape);
})();

var point = new Konva.Point({
  x: stage.getWidth()/2,
  y: stage.getHeight()/2,
  stroke: 'red'
});

var rect = new Konva.Rect({
    height: stage.getHeight(),
    width: stage.getWidth(),
    stroke: 'black',
    x:0,
    y:0
});

var xaxis = new Konva.Line({
  x: 0,
  y: max.y/2,
  points: [
    0,0,
    max.x, 0],
  stroke:'black',
  strokeWidth:0.1
});

var yaxis = new Konva.Line({
  x: max.x/2,
  y: 0,
  points: [
    0,0,
    0,max.y],
  stroke:'black',
  strokeWidth:0.1
});

var gorigin = {
  x: max.x/2,
  y: max.y/2
};

var scale = {
  x: 1,
  y: 1
};

function translateToPoint(rpoint) {
  var xoffset = rpoint.x/scale.x + gorigin.x;
  var yoffset = gorigin.y - rpoint.y/scale.y;
  return new Konva.Point({
    x: xoffset,
    y: yoffset,
    stroke:'transparent',
    opacity: '0.5'
  });
}
var f = function(radius, angle) {
  return {
    x: radius * Math.cos(angle * Math.PI/180),
    y: radius * Math.sin(angle * Math.PI/180)
  };
};

var parabola = function(t) {
  return {x: t, y: t*t};
};

var cubic = function(t) {
  return {x: t, y: (t-10) * (t+2) * (t+30) };
}

var cycloid = function(r, t) {
  return {
    x: r * (t - Math.sin(t)),
    y: r * (1 - Math.cos(t))
  };
}
for(var i = -50; i <=50; i++ ) {

  var pt = translateToPoint(cycloid(25, i));
  layer.add(pt);
}
var points = layer.find('Point');
var pline = new Konva.Line({
  stroke: 'pink',
  stokeWidth: 1,
  points: points.reduce(function(a, c){ return a.concat([c.x(), c.y()])}, []),
  x: 0,
  y: 0,
  tension: 0.33
});

layer.add(rect, point, xaxis, yaxis, pline);
stage.add(layer);
