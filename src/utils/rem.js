(function(doc, win, desW) {
  var docEI = doc.documentElement;
  var resizeEvt =
    "orientationchange" in window ? "orientationchange" : "resize";
  var recalc = function() {
    var clientWidth = docEI.clientWidth;
    if (!clientWidth) return;
    docEI.style.fontSize = (clientWidth / desW) * 100 + "px";
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window, 1080);
