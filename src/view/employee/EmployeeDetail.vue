<template>
  <!-- form thêm sửa nhân viên  -->
  <div id="dlgDetail" class="m-dialog-box" hidden :class="{ open: isShow }">
    <div class="m-dialog-add-user">
      <div class="m-dialog-header">
        <div style="font-size: 16px" class="m-dialog-header-title">
          THÔNG TIN NHÂN VIÊN
        </div>
        <div @click="btnCloseDialogOnClick" class="m-dialog-header-close"></div>
      </div>
      <div class="m-dialog-body">
        <div class="m-dialog-body-left">
          <div class="m-dialog-avatar"></div>
          <div class="m-dialog-avatar-text">
            (Vui lòng chọn ảnh có định dạng .jpg, .jpeg, .png, .gif)
          </div>
        </div>
        <div class="m-dialog-body-right">
          <div style="font-size: 14px" class="m-dialog-right-title">
            A.THÔNG TIN CHUNG
          </div>
          <hr style="font-size: 16px; background-color: #019160" />
          <div class="m-dialog-content">
            <div class="m-dialog-content-column1">
              <div class="m-dialog-input">
                <label for=""
                  >Mã nhân viên (<span style="color: red">*</span>)</label
                >
                <div class="m-row-input">
                  <input
                    style="color: black"
                    required
                    id="txtEmployeeCode"
                    property="EmployeeCode"
                    type="text"
                    class="m-input"
                    placeholder=""
                    v-model="employee.EmployeeCode"
                  />
                </div>
              </div>

              <div class="m-dialog-input">
                <label for="">Ngày sinh</label>
                <div class="m-row-input">
                  <input
                    style="color: black"
                    v-model="employee.DateOfBirth"
                    property="DateOfBirth"
                    class="m-input"
                    type="date"
                    id="ngaysinh"
                  />
                </div>
              </div>

              <div class="m-dialog-input">
                <label for="">Email</label>
                <div class="m-row-input">
                  <input
                    style="color: black"
                    property="Email"
                    type="email"
                    class="m-input"
                    placeholder=""
                    id="email"
                    v-model="employee.Email"
                  />
                </div>
              </div>

              <div class="m-dialog-input">
                <label for=""
                  >Phòng ban (<span style="color: red">*</span>)</label
                >
                <div class="m-row-input">
                  <combobox-component
                    id="department"
                    style="height: 40px,color:black !important"
                    :items="departments"
                    @bindDataForm="bindDataForm"
                    v-bind:employee="employee.DepartmentId"
                  />
                </div>
              </div>
            </div>
            <div class="m-dialog-content-column2">
              <div class="m-dialog-input">
                <label for=""
                  >Họ và tên (<span style="color: red">*</span>)</label
                >
                <div class="m-row-input">
                  <input
                    required
                    property="EmployeeName"
                    id="EmployeeName"
                    type="text"
                    class="m-input"
                    placeholder=""
                    style="color: black"
                    v-model="employee.EmployeeName"
                  />
                </div>
              </div>

              <div class="m-dialog-input">
                <label for="">Giới tính</label>
                <div class="m-row-input">
                  <combobox-component
                    style="height: 40px"
                    :items="genders"
                    @bindDataForm="bindDataForm"
                    v-bind:employee="employee.Gender"
                  />
                </div>
              </div>

              <div class="m-dialog-input">
                <label for="">Số điện thoại</label>
                <div class="m-row-input">
                  <input
                    property="PhoneNumber"
                    type="text"
                    class="m-input"
                    placeholder=""
                    v-model="employee.PhoneNumber"
                  />
                </div>
              </div>

              <div class="m-dialog-input">
                <label for="">Mức lương cơ sở</label>
                <div class="m-row-input">
                  <input
                    property="Salary"
                    type="text"
                    class="m-input"
                    placeholder=""
                    v-model="employee.Salary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-dialog-footer">
        <button @click="btnCloseDialogOnClick" class="m-btn m-btn-close">
          Hủy bỏ
        </button>
        <button @click="saveEmployee" class="m-btn m-btn-save">
          <i class="fas fa-save"></i> Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Combobox from "../../js/Components/Combobox.js";
import ComboboxComponent from "../../components/base/Combobox.vue";

export default {
  name: "EmployeeDetail",
  components: {
    ComboboxComponent,
  },
  props: ["isShow", "employeeSelectedInChild", "formMode"],
  watch: {
    employeeSelectedInChild: function (newEmployeeSelected) {
      this.employee = newEmployeeSelected;
    },
  },

  data() {
    return {
      employee: {},

      // Lấy dữ liệu từ server và build combobox
      departments: Combobox.getDepartment("EmployeeDetail"),

      positions: Combobox.getPosition("EmployeeDetail"),

      genders: Combobox.getGender("EmployeeDetail"),
    };
  },

  methods: {
    // gói dữ liệu từ input để gửi lên server (POST or PUT)
    bindDataForm({ fieldName, item }) {
      let me = this;
      switch (fieldName) {
        case "Department":
          me.employee.DepartmentId = item.id;
          break;
        case "Gender":
          me.employee.Gender = item.id;
          break;
      }
    },

    btnCloseDialogOnClick() {
      this.$emit("closeOnClick");
    },
    /**Thêm sửa nhân viên */
    saveEmployee() {
      // build oject

      var employee = this.employee;
      /**
       *  validate dữ liệu
       *  */
      // mã nhân viên
      var ma = document.getElementById("txtEmployeeCode");
      if (!ma.value) ma.classList.add("red");
      else ma.classList.remove("red");
      // tên nhân viên
      var ten = document.getElementById("EmployeeName");
      if (!ten.value) ten.classList.add("red");
      else ten.classList.remove("red");
      // email
      var email = document.getElementById("email");
      // eslint-disable-next-line
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      console.log(email);
      if (email.value.match(regex)) {
        email.classList.remove("red");
      } else email.classList.add("red");

      // gọi api thực hiện dữ liệu
      if (this.formMode == this.MISAEnum.FormMode.Add) {
        axios
          .post(`http://amis.manhnv.net/api/v1/Employees`, employee)
          .then((response) => {
            // load lại dữ liệu
            this.$emit("loadingEmployees", false);
            // thông báo thêm thành công
            var x = this.$swal;
            x.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", x.stopTimer);
                toast.addEventListener("mouseleave", x.resumeTimer);
              },
            }).fire({
              icon: "success",
              title: "Thêm thành công",
            });

            //
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .put(
            `http://amis.manhnv.net/api/v1/Employees/${employee.EmployeeId}`,
            employee
          )
          .then((response) => {
            // load lại dữ liệu và ẩn form chi tiết:
            this.$emit("loadingEmployees", false);
            // thông báo thêm thành công
            var x = this.$swal;
            x.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", x.stopTimer);
                toast.addEventListener("mouseleave", x.resumeTimer);
              },
            }).fire({
              icon: "success",
              title: "Sửa thành công",
            });

            //
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },

 
  updated() {
    // chỉ chạy duy nhất 1 lần khi khởi tạo
    var ma = document.getElementById("txtEmployeeCode");
    ma.classList.remove("red");
    console.log(`b;ah ba;h`);
    // tên nhân viên
    var ten = document.getElementById("EmployeeName");
    ten.classList.remove("red");
    // email
    var email = document.getElementById("email");
    // eslint-disable-next-line
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(email);
    email.classList.remove("red");
    // forcus vào ô đầu tiên
    console.log(6);
  },
};
</script>

<style></style>
