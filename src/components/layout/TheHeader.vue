<template>
    <div class="m-header">
      <div class="m-header-left">
        <div class="m-header-toogle"></div>
        <div class="m-header-logo"></div>
      </div>
      <div class="m-header-right">
        <div class="m-header-right1">
          <div class="m-header-combobox-img">MB</div>
          <div class="m-header-combobox">
            <select name="" id="">
              <option value=""><span style="font-weight: bold;">Chi nhánh Misa miền bắc</span>  </option>
              <option value="">vt1</option>
              <option value="">vt2</option>
              
          </select>
          </div>
        </div>
        
        <div class="m-header-right2">
            <div class="m-header-notify"><i class="far fa-bell"></i></div>
            <div class="m-header-avatar"></div>
            <div class="m-header-name"><b>Nguyễn Văn Thương</b> </div>
            <div class="m-header-option "></div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name:"TheHeader"
}
</script>
<style scoped>
@import url(../../css/layout/header.css);

</style>