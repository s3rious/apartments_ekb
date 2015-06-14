import ReactUpdates from 'react/lib/ReactUpdates';

function setTimeoutRequestAnimationFrame(cb) {
  setTimeout(cb, 1000 / 60);
};

var requestAnimationFrame;

if (typeof window === 'undefined') {
  requestAnimationFrame = setTimeoutRequestAnimationFrame;
} else {
  requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    setTimeoutRequestAnimationFrame;
}

var rafBatchingStrategy = {
  isBatchingUpdates: true,
  batchedUpdates: function(callback, param) {
    callback(param);
  }
};

var tick = function() {
  ReactUpdates.flushBatchedUpdates();
  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);

ReactUpdates.injection.injectBatchingStrategy(rafBatchingStrategy);
