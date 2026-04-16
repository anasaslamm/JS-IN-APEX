<div id="page-progress-container">
  <div id="page-progress-bar"></div>
</div>

<style>
#page-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #eee;
  z-index: 9999;
}

#page-progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  transition: width 0.1s linear;
}
</style>

<script>
(function () {

  function updateProgress() {
    let scrollTop = window.scrollY || window.pageYOffset;
    let docHeight = document.documentElement.scrollHeight - window.innerHeight;

    let percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    document.getElementById("page-progress-bar").style.width = percent + "%";
  }

  window.addEventListener("scroll", updateProgress);

  document.addEventListener("DOMContentLoaded", updateProgress);

})();
</script>
