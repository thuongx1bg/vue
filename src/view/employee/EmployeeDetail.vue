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
                    v-model="employee.Email"
                  />
                </div>
              </div>

              <div class="m-dialog-input">
                <label for=""
                  >Phòng ban (<span style="color: red">*</span>)</label
                >
                <div class="m-row-input">
                  <select
                    style="width: 200px"
                    class="select"
                    name=""
                    id="DepartmentId"
                    property="DepartmentId"
                    v-model="employee.DepartmentId"
                    required
                  >
                    <option value="142cb08f-7c31-21fa-8e90-67245e8b283e">
                      Phòng Marketing
                    </option>

                    <option value="11452b0c-768e-5ff7-0d63-eeb1d8ed8cef">
                      Phòng Nhân sự
                    </option>

                    <option value="4e272fc4-7875-78d6-7d32-6a1673ffca7c">
                      Phòng đào tạo
                    </option>
                  </select>
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
                  <select style="width: 200px" name="" id="">
                    <option value="">Nam</option>
                    <option value="">Nữ</option>
                    <option value="">Khác</option>
                  </select>
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

// import MISAEnum from "../../js/enum.js"
export default {
  name: "EmployeeDetail",
  props: ["isShow", "employeeSelectedInChild", "formMode"],
  watch: {
    employeeSelectedInChild: function (newEmployeeSelected) {
      this.employee = newEmployeeSelected;
      // setTimeout(function(){
      //   this.$refs.txtEmployeeCode.focus();
      // }, 1000);
    },
  },

  data() {
    return {
      employee: {},
    };
  },

  methods: {
    validate() {},

    btnCloseDialogOnClick() {
      this.$emit("closeOnClick");
    },
    saveEmployee() {
      // build oject

      var employee = this.employee;
      // validate dữ liệu
      // mã nhân viên
      var ma = document.getElementById("txtEmployeeCode");
      if (!ma.value) ma.classList.add("red");
      else ma.classList.remove("red");
      // tên nhân viên
      var ten = document.getElementById("EmployeeName");
      if (!ten.value) ten.classList.add("red");
      else ten.classList.remove("red");
// email
     
      // gọi api thực hiện dữ liệu
      if (this.formMode == this.MISAEnum.FormMode.Add) {
        axios
          .post(`http://amis.manhnv.net/api/v1/Employees`, employee)
          .then((response) => {
            // hiển thị toast message thông báo thành công
            // this.loadData();

            // ẩn form chi tiết:
            document.getElementById("dlgDetail").style.display = "none";
            // load lại dữ liệu
            // axios.get("http://amis.manhnv.net/api/v1/Employees");
            // thông báo thêm thành công
            //  this.$swal.fire("Đã xóa!", "Nhân viên đã được xóa.", "success");
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
            // hiển thị toast message thông báo thành công
            // ẩn form chi tiết:
            document.getElementById("dlgDetail").style.display = "none";
            // load lại dữ liệu

            // thông báo thêm thành công
            //  this.$swal.fire("Đã xóa!", "Nhân viên đã được xóa.", "success");
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
};
</script>

<style></style>
