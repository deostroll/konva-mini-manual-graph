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
var points = [];
stage.add(layer);
stage.on('contentClick', function(){
  var pos = stage.getPointerPosition();
  var pt = new Konva.Point({
    x: pos.x,
    y: pos.y,
    stroke: 'blue'
  });
  layer.add(pt);
  points.push(pt);
  layer.draw();
});

document.getElementById('btnDraw')
  .addEventListener('click', function(){
    drawCurve();
  }, false);

function drawCurve() {
  var ctx = layer.getContext();
  if(points.length > 1) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'pink';
    ctx.moveTo(points[0].x(), points[0].y());
    for (var i = 0, j = points.length - 2; i < j; i++) {
      var p1 = points[i],
        p2 = points[i+1];
      var xc = (p1.x() + p2.x()) / 2;
      var yc = (p1.y() + p2.y()) / 2;
      ctx.quadraticCurveTo(p1.x(), p1.y(), xc,yc);
    }
    ctx.stroke();
  }
}
