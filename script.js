'use strict';
//1. Bắt sự kiện Click vào nút "Submit"
const submitBtn = document.getElementById("submit-btn");
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
const petArr = getFromStorage("pets") === null ? [] : getFromStorage("pets");// lấy mảng lưu data thú cưng từ LocalStorage
const petArrBreed = getFromStorage("breeds");
const tableBodyEl = document.getElementById("tbody");
const showHealthyPetBtn = document.getElementById("healthy-btn");


submitBtn.addEventListener('click', function (e) {
    //1.1 Lấy được dữ liệu từ các Input Form
    const data = {
        id: idInput.value,
        namePet: nameInput.value,
        age: parseInt(ageInput.value),
        typePet: typeInput.value,
        weight: weightInput.value,
        lengthPet: lengthInput.value,
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: `${new Date().getDay() + 5}/${(new Date().getMonth() + 1)}/${new Date().getFullYear()}`,
    };
    //1.2.giá trị ID trùng với giá trị thú cưng còn lại(không hợp lệ)
    let checkPet = true;
    function validateData() {
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].id === data.id) {
                window.alert("ID must unique!");
                checkPet = false;
                break;
            }
        }
        //1.3.Xác thực dữ liệu nhập đầu vào
        if (!data.id) {
            alert("Please input for ID!");
            checkPet = false;
        }
        if (!data.namePet) {
            alert("Please input for name!");
            checkPet = false;
        }
        if (!data.age) {
            alert("Please input for age!");
            checkPet = false;
        }
        if (!data.weight) {
            alert("Please input for weight!");
            checkPet = false;
        }
        if (!data.lengthPet) {
            alert("Please input for length!");
            checkPet = false;
        }
        if (data.age < 0 || data.age > 15) {
            alert("Age must be between 1 and 15!");
            checkPet = false;
        }
        if (data.weight < 0 || data.weight > 15) {
            alert("Weight must be between 1 and 15!");
            checkPet = false;
        }
        if (data.lengthPet < 0 || data.lengthPet > 100) {
            alert("Length must be between 1 and 100!");
            checkPet = false;
        }
        if (data.typePet === 'Select Type') {
            alert("Please select Type!");
            checkPet = false;
        }
        if (data.breed === 'Select Breed') {
            alert("Please select Breed!");
            checkPet = false;
        }
        return checkPet;
    };
    //console.log(validateData());
    //1.4. Thêm thú cưng vào danh sách
    const validate = validateData(data);
    if (validate) {
        petArr.push(data);
        saveToStorage("pets", petArr);//lưu mảng pet vào localStorage
        renderTableData(petArr);
        clearInput();
    }
});

//2. Hiển thị Breed trong màn hình quản lý thú cưng
//2.1.Bổ sung thêm sự kiện khi mà giá trị của Type Input thay đổi. Bạn có thể sử dụng onChange event.
typeInput.onchange = function () {
    if (typeInput.value == "Dog") {
        const dogBreedArr = petArrBreed.filter((pet) => pet.type === "Dog");
        //console.log(dogBreedArr);
        renderBreed(dogBreedArr);
    }
    if (typeInput.value == "Cat") {
        const catBreedArr = petArrBreed.filter((pet) => pet.type === "Cat");
        //console.log(catBreedArr);
        renderBreed(catBreedArr);
    }
    if (typeInput.value == "Select Type") {
        breedInput.innerHTML = "<option>Select Breed</option>";
    }

};
//2.2.Hàm hiển thị breed
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
    <td>${row.date}</td>
    <td><button class="btn btn-danger" onclick="deletePet('${row.id}')">Delete</button></td>`;
}

//4. Hàm xóa các dữ liệu vừa nhập trên Form
function clearInput() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    if (typeInput.value == "Select Type") { breedInput.innerHTML = "<option>Select Breed</option>"; };
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
};

//5. Hàm xóa một thú cưng
function deletePet(x) {
    const petConfirm = confirm("Are you sure?");
    if (petConfirm) {
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].id == x) {
                petArr.splice(i, 1);
            }
        }
    }
    saveToStorage("pets", petArr);//lưu mảng pet vào localStorage sau khi xóa
    renderTableData(petArr);
};

//6. Hiển thị các thú cưng khỏe mạnh
let healthyCheck = true;
let healthyPetArr = [];
showHealthyPetBtn.addEventListener("click", function () {
    if (healthyCheck) {
        showHealthyPetBtn.textContent = 'Show All Pet'; // hiển thị thú cưng khỏe mạnh
        healthyPetArr = petArr.filter(function (pet) {
            return (pet.vaccinated === true && pet.dewormed === true && pet.sterilized === true);
        });//lọc thú cưng khỏe mạnh
        //console.log(healthyPetArr);
        renderTableData(healthyPetArr);
        healthyCheck = false;
        return;
    }
    else {
        showHealthyPetBtn.textContent = 'Show Healthy Pet'; // hiển thị toàn bộ thú cưng
        renderTableData(petArr);
        healthyCheck = true;
        return;
    }
});
//7.tải dữ liệu ban đầu
window.onload = function () {
    renderTableData(petArr);
};