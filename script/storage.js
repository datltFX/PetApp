'use strict';

//1. Bổ sung Animation cho Sidebar
const sideBarBtn = document.getElementById("sidebar");
sideBarBtn.addEventListener("click", function () {
    this.classList.toggle("active")
});

//2.1.Hàm lưu data vào localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
//2.2.Hàm lấy data từ localStorage
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};