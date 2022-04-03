import { createApp } from 'vue'
// import Vuelidate from 'vuelidate';
import { Vuelidate } from 'vuelidate';
// import 'bootstrap/dist/css/bootstrap.min.css'
import VueSweetalert2 from 'vue-sweetalert2';

// import Vue from 'vue'
import App from './App.vue'

import MISAEnum from './js/enum.js'


// import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
// thiết lập các router
// b1 import các router 
import Employee from './view/employee/EmployeeList.vue'
import Customer from './view/customer/CustomerList.vue'
// import { apply } from 'core-js/fn/reflect'
// b2 định nghĩa các router 
const routers=[
    {path:"/employee",component: Employee},
    {path:"/customer",component: Customer},


];

// bb3khởi tạo các router và truyền các router đã được định nghĩa
const router=createRouter({
    history: createWebHistory(),
    routes: routers,
  });
// bước 4 sử dụng vue router cho app

let app=createApp(App);
app.config.globalProperties.MISAEnum = MISAEnum;
app.use(router,MISAEnum).mount('#app');
app.use(VueSweetalert2);
app.use(Vuelidate);

