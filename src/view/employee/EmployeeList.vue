<template>
  <!-- content header  -->
  <div class="m-content-header">
    <div class="m-content-header-title">Danh sách nhân viên</div>
    <div class="m-content-header-button">
      <button @click="btnAddOnclick" id="btnAdd" class="m-btn m-btn-icon">
        Thêm nhân viên
      </button>
    </div>
  </div>

  <!-- toolbar  -->

  <div class="m-content-toolbar">
    <div class="m-content-toolbar-left">
      <input
        type="text"
        class="m-input-search m-input"
        placeholder="Tìm kiếm theo tên, mã hoặc số điện thoại"
      />
      <!-- <select style="margin-left: 10px; margin-right: 13px" name="" id="">
        <option value="">Tất cả phòng ban</option>
        <option value="">Phòng 1</option>
      </select> -->

      <!-- items : dữ liệu để build combobox -->
      <!-- employeeForm : truyền toàn bộ dữ liệu form sang combobox để bind combobox -->
      <!-- bindDataForm : sự kiện khi thay đổi lựa chọn trên combobox sẽ gửi lại dữ liệu lên form để gửi lên server -->
      <combobox-component
      style="height:40px;margin-left:16px"
        :items="departments"
        
      />

      <combobox-component
      style="height:40px;margin-left:16px"
        :items="positions"
        
      />
    </div>

    <div class="m-content-toolbar-right">
      <div class="m-content-toolbar-right1">
        <i class="text-align-center far fa-trash-alt btnDelete"></i>
      </div>
      <div @click="loadingEmployees" class="m-content-toolbar-right2"></div>
    </div>
  </div>

  <!-- end toolbar  -->

  <!-- gird  -->
  <div class="m-content-grid m-grid">
    <div class="m-grid-table">
      <table class="m-table">
        <thead>
          <tr>
            <th class="text-align-center" style="width: 50px">#</th>
            <!-- <th class="text-align-left" propName="Stt">Stt</th> -->
            <th class="text-align-left" propName="EmployeeCode">
              Mã nhân viên
            </th>
            <th class="text-align-left" propName="EmployeeName">Họ và tên</th>
            <th class="text-align-left" propName="Email">Email</th>

            <th class="text-align-center" propName="DateOfBirth" format="Date">
              Ngày Sinh
            </th>
            <th class="text-align-left" propName="PhoneNumber">
              Số điện thoại
            </th>

            <th class="text-align-right" propName="Salary" format="Salary">
              Lương
            </th>
            <th
              class="text-align-center action"
              propName="action"
              format="action"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            @dblclick="rowOnDbClick(emp)"
            @click="rowOnClick(emp)"
            v-for="emp in employees"
            :key="emp.EmployeeId"
          >
            <td class="text-align-left">
              <input type="checkbox" class="m-checkbox" />
            </td>
            <td class="text-align-left">
              {{ emp.EmployeeCode }}
            </td>
            <td class="text-align-left">{{ emp.EmployeeName }}</td>
            <td class="text-align-left">{{ emp.Email }}</td>

            <td class="text-align-center">
              {{ this.formatDate(emp.DateOfBirth) }}
            </td>
            <td class="text-align-left">
              {{ emp.PhoneNumber }}
            </td>

            <td class="text-align-right">3.000.000 đ</td>
            <td class="action text-align-center">
              <i
                @click="rowOnDbClick(emp)"
                style="font-size: 17px; color: #138496; margin-right: 10px"
                class="far fa-edit edit-form-employee"
              ></i>
              <i
                v-on:click="deleteEmployee(emp)"
                style="font-size: 17px; color: red"
                class="text-align-center far fa-trash-alt btnDelete"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="m-paging">
      <div class="m-paging-left">Hiển thị 01-20/1223 lao động</div>
      <div class="m-paging-center">
        <button class="m-firstpage"></button>
        <button class="m-prev-page"></button>
        <button class="m-paging-number">1</button>
        <button class="m-paging-number m-paging-selected">2</button>
        <button class="m-paging-number">3</button>
        <button class="m-paging-number">4</button>
        <button class="m-next-page"></button>
        <button class="m-lastpage"></button>
      </div>
      <div class="m-paging-right">
        <!-- <select name="" id="">
          <option value="">Tất cả vị trí</option>
          <option value="">vt1</option>
          <option value="">vt2</option>
        </select> -->
        10 nhân viên / trang
      </div>
    </div>
  </div>
  <!-- mặt nạ sau khi show sweetalert  -->
  <div
    id="matna"
    hidden
    style="
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.158);
      z-index: 10;
    "
  ></div>

  <!-- end mặt nạ -->
  <EmployeeDetail
    v-bind:employeeSelectedInChild="employeeSelected"
    :isShow="isShowDialog"
    @closeOnClick="showOrHideDialog"
    :newEmployeeCode="newEmployeeCode"
    :formMode="formMode"
    @loadingEmployees="loadingEmployee"
  />
</template>

<script>
import axios from "axios";
import EmployeeDetail from "./EmployeeDetail.vue";
import MISAEnum from "../../js/enum";
import Combobox from "../../js/Components/Combobox.js";
import ComboboxComponent from "../../components/base/Combobox.vue";
export default {
  name: "employee-list",
  components: {
    EmployeeDetail, ComboboxComponent
  },

  /**
   *
   * data
   */
  data() {
    return {
      formMode: 0,
      employeeSelected: {},
      newEmployeeCode: {},
      employees: [],
      isShowDialog: false,
      departments: Combobox.getDepartment("EmployeeDetail"),

      positions: Combobox.getPosition("EmployeeDetail"),

      genders: Combobox.getGender("EmployeeDetail"),
     
    };
  },

  /**
   * các phương thuwcs
   */
  methods: {

    
    /**
     * Hàm load lại data và ẩn form thêm sửa nhân viên
     */
    loadingEmployee(isShow) {
      let me = this;
      me.loadingEmployees();
      me.isShowDialog = isShow;
    },
    /**
     * Hàm load lại data
     */
    loadingEmployees() {
      try {
        var me = this;
        axios
          .get("http://amis.manhnv.net/api/v1/Employees")
          .then(function (res) {
            me.employees = res.data;
          })
          .catch(function () {
            // kiểm tra mã lỗi của api và thực hiện hành động tướng ứng với mã lỗi đó
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm xóa nhân viên
     */
    deleteEmployee(emp) {
      /**
       * Bật mặt nạ sau form có background có màu đậm hơn
       */
      let me = this;
      document.getElementById("matna").style.display = "block";
      /**
       * show sweetalert
       */
      this.$swal
        .fire({
          title: "Xóa nhân viên",
          text: "Bạn có chắc chắn muốn xóa nhân viên này không ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#019160",
          cancelButtonColor: "#d33",
          confirmButtonText: "Có",
          cancelButtonText: "Hủy",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.employeeSelected = emp;

            axios
              .delete(
                `http://amis.manhnv.net/api/v1/Employees/${emp.EmployeeId}`,
                emp
              )
              .then((res) => {
                me.loadingEmployees();
              });
            // ẩn mặt nạ
            document.getElementById("matna").style.display = "none";

            // thông báo xóa thành công
            var x = this.$swal;
            x.mixin({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", x.stopTimer);
                toast.addEventListener("mouseleave", x.resumeTimer);
              },
            }).fire({
              icon: "success",
              title: "Xóa thành công",
            });
            // this.$swal.fire("Đã xóa!", "Nhân viên đã được xóa.", "success");
          } else {
            // ẩn mặt nạ
            document.getElementById("matna").style.display = "none";
          }
        });
    },

    /**
     * select 1 row nhan viên
     */
    rowOnClick(emp) {
      var me = this;
      me.employeeSelected = emp;
    },
    /**
     * hiển thiwjc form cho phép sửa thông tin nhân viên
     */
    rowOnDbClick(emp) {
      // lấy thông tin nhân viên:
      // console.log(emp.EmployeeName);
      var me = this;
      me.formMode = this.MISAEnum.FormMode.Update;

      // Biding thông tin chi tiết nhân viên tương ứng lên form chi tiết

      // hiển thị dialog
      this.showOrHideDialog(true);
    },
    /**
     * thực hiện form thêm mới nhân viênp
     * thương
     */
    btnAddOnclick() {
      var me = this;
      me.formMode = MISAEnum.FormMode.Add;
      this.employeeSelected = {};
      // lấy thông tin mã nhân viên mới
      axios
        .get("http://amis.manhnv.net/api/v1/Employees/NewEmployeeCode")
        .then(function (res) {
          me.employeeSelected.EmployeeCode = res.data;
        })
        .catch(function () {}),
        me.showOrHideDialog(true);
    },
    showOrHideDialog(isShow) {
      this.isShowDialog = isShow;
    },

    /**
     * Hàm định dạng ngày tháng năm
     */
    formatDate(value) {
      try {
        if (value) {
          let DateOfBirth = new Date(value);
          let date = DateOfBirth.getDate();
          let month = DateOfBirth.getMonth() + 1;
          let year = DateOfBirth.getFullYear();
          date = date > 10 ? date : `0${date}`;
          month = month > 10 ? month : `0${month}`;
          let dateOfBirth = `${date}/${month}/${year}`;

          value = dateOfBirth;
        } else {
          value = "";
        }
        return value;
      } catch (error) {
        console.log(error);
        return "";
      }
    },
  },
  //1. beforeCreate
  beforeCreate() {
    console.log("1beforeceCreate");
    console.log(`không thể truy cập vào data`);
    console.log(`không thể gọi đến phương thức được`);
  },
  // 2, created
  created() {
    // console.log("2created- đã có thể truy cập vào data và gọi được methods")
    // console.log(`${this.Name}`)
    // thực hiện lấy dữ liệu
    // gọi api lấy dữ liệu danh sách nhân viên
    this.loadingEmployees();
  },
  // 3. beforeceMount
  beforeMount() {
    // chỉ chạy duy nhất 1 lần khi khởi tạo

    console.log(`3-beforeceMount- 
  có thể truyd caaph và data và phương thức
  Nhưng chưa thể truy cập vào trong DOM`);
  },
  // 4 Mounted
  mounted() {
    // chỉ chạy duy nhất 1 lần khi khởi tạo
    console.log("4-Mounted");
    console.log("có thể truy cập data và method");
    console.log("đã lấy được phần tử trong DOM");
  },
  // 5. beforceUpdate
  beforeUpdate() {
    // chạy trước khi DOM update dữ liệu
    console.log("5-beforceUpdate");
    console.log("");
  },
  // 6 updated
  updated() {
    // chạy sau khi DOM upadate dữ liệu
    console.log("6-updated");
  },
  //7 onBeforeMount
  onBeforeMount() {
    console.log("7-onBeforeMount");
    console.log(" vẫn có thể truy vập vào data và method");
    console.log(" vẫn có thể truy vập vào data và DOM");
  },
  //8 onUnmounted
  unmounted() {
    console.log("8-onUnmounted");
    console.log(" vẫn có thể truy vập vào data và method");
    console.log(" nhưng không thể truy vập vào data và DOM");
  },
};
</script>

<style></style>
