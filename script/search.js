'use strict';
//1. Bắt sự kiện Click vào nút "Find"
const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const petArr = getFromStorage("pets");// lấy mảng lưu data thú cưng từ LocalStorage
const petArrBreed = getFromStorage("breeds");//lấy mảng lưu data breed từ LocalStorage
const tableBodyEl = document.getElementById("tbody");

//1.1.Hiển thị lại danh sách thú cưng-breed
renderTableData(petArr)
renderBreed(petArrBreed);

findBtn.addEventListener('click', function () {
    let petArrFind = petArr;

    //tìm id pet
    const idFind = idInput.value;
    if (idFind) {
        petArrFind = petArrFind.filter((pet) => pet.id.toUpperCase().includes(idFind.toUpperCase()));
    }

    //tìm Name pet
    const nameFind = nameInput.value;
    if (nameFind) {
        petArrFind = petArrFind.filter((pet) => pet.namePet.toUpperCase().includes(nameFind.toUpperCase()));
    }

    //tìm theo Type
    if (typeInput.value !== "Select Type") {
        petArrFind = petArrFind.filter((pet) => pet.typePet === typeInput.value);
    }

    //Tìm theo breed
    if (breedInput.value !== "Select Breed") {
        petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
    }

    //Tìm theo vaccinated
    if (vaccinatedInput.checked) {
        petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
    }

    //Tìm theo dewormed
    if (dewormedInput.checked) {
        petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
    }

    //Tìm theo sterilized
    if (sterilizedInput.checked) {
        petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
    }
    //console.log(petArrFind);
    renderTableData(petArrFind);
});

//2. Hàm hiển thị Breed trong màn hình quản lý thú cưng
function renderBreed(petArrBreed) {
    breedInput.innerHTML = "<option>Select Breed</option>";
    petArrBreed.forEach((item) => {
        const option = document.createElement('option');
        option.innerHTML = `<option>${item.breed}</option>`;
        breedInput.appendChild(option);
    })
};

//3. Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
    tableBodyEl.innerHTML = '';                            // xóa nội dung hiện có của bảng
    petArr.forEach((pet) => {
        const row = document.createElement('tr');
        row.innerHTML = genRow(pet)
        tableBodyEl.appendChild(row);
    })
};

//3.1.Truyền dữ liệu thú cưng vào hàng
function genRow(row) {
    return `<th>${row.id}</th>
    <td>${row.namePet}</td>
    <td>${row.age}</td>
    <td>${row.typePet}</td>
    <td>${row.weight} kg</td>
    <td>${row.lengthPet} cm</td>
    <td>${row.breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${row.color}"></i></td>
    <td><i class="bi ${row.vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
    <td><i class="bi ${row.dewormed ? " bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td> 
    <td><i class="bi ${row.sterilized ? " bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
    <td>${row.date}</td>`;
};