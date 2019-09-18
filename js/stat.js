'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 17;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_BASELINE_Y = CLOUD_Y + GAP + FONT_GAP * 4 + BAR_MAX_HEIGHT;
var BAR_TEXT_BASELINE_Y = BAR_BASELINE_Y + FONT_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px, PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP * 2);

  var maxTime = 0;
  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }

  for (i = 0; i < names.length; i++) {
    var height = Math.round(times[i] * 150 / maxTime);
    var time = Math.round(times[i]);
    var gapX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, 100%, ' + Math.round(Math.random() * 100) + '% )';
    ctx.fillRect(gapX, BAR_BASELINE_Y - height, BAR_WIDTH, height);
    ctx.fillText(names[i], gapX, BAR_TEXT_BASELINE_Y);
    ctx.fillText(time.toString(), gapX, BAR_BASELINE_Y - height - FONT_GAP / 2);
  }
};


