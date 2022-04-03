<template>
  <div class="m-navbar">
    <router-link to="" class="m-navbar-item ">
      <div class="m-item-icon"><i class="fab fa-opera"></i></div>
      <div class="m-item-content">Tổng quan</div>
    </router-link>

    <router-link to="" class="m-navbar-item m-item-selected">
      <div class="m-item-icon"><i class="fas fa-chart-bar"></i></div>
      <div class="m-item-content">Báo cáo</div>
    </router-link>

    <router-link to="" class="m-navbar-item">
      <div class="m-item-icon"><i class="fas fa-money-check"></i></div>
      <div class="m-item-content">Mua hàng</div>
    </router-link>

    <router-link to="/employee" class="m-navbar-item">
      <div class="m-item-icon"><i class="fas fa-users"></i></div>
      <div class="m-item-content">Danh mục nhân viên</div>
    </router-link>

    <router-link to="/customer" class="m-navbar-item">
      <div class="m-item-icon"><i class="fas fa-users"></i></div>
      <div class="m-item-content">Danh mục khách hàng</div>
    </router-link>

    <router-link to="" class="m-navbar-item">
      <div class="m-item-icon"><i class="fas fa-cogs"></i></div>
      <div class="m-item-content">Thiết lập hệ thống</div>
    </router-link>
    <router-link to="" class="">
      <div  class="m-collapse-toggle">
        <i class="fas fa-angle-left"></i>
      </div>
    </router-link>
  </div>
</template>
<script>


export default {
  name: "TheNavbar",
};



</script>
<style scoped>
@import url(../../css/layout/navbar.css);
</style>
