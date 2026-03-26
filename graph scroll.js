function(config) {

 config.xAxis = config.xAxis || {};
 config.xAxis.tickLabelRotation = -90;

 config.zoomAndScroll = "live";
 config.overview = { rendered: "on" };
 config.xAxis.viewportMin = 0;
 config.xAxis.viewportMax = 9;

 return config;

}
