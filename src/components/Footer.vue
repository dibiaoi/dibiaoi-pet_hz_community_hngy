<template>
  <footer class="footer">
    <div class="site_footer">
      <div class="content-footer">
        <div class="footer-bottom">
          <div class="footer-bottom-left">
            <div class="copyright">
              Copyright © 2020
              <span>宠圈</span>
              <span>・</span>
              <a target="__blank">合作请联系</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style scoped>
footer {
  margin-top: 50px;
  display: block;
}
.footer {
  font-size: 13px;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07);
}
.site_footer {
  background-color: #fff;
  display: flex;
}
.content-footer {
  width: 1100px;
  max-width: 100%;
  margin: 0 auto;
}
.footer-bottom {
  color: #4d4d4d;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
}
</style>