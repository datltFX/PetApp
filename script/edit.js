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
const petArr = getFromStorage("pets");// lấy mảng lưu data thú cưng từ LocalStorage
const petArrBreed = getFromStorage("breeds");//lấy mảng lưu data breed từ LocalStorage
const editForm = document.getElementById("container-form")
const tableBodyEl = document.getElementById("tbody");
//1.1.Hiển thị lại danh sách thú cưng
renderEditData(petArr);
//1.2.Submit lại thú cưng đã sửa
submitBtn.addEventListener('click', function (e) {
    //1.2.1. Lấy được dữ liệu từ các Input Form
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
    //1.2.2.Xác thực dữ liệu nhập đầu vào
    let checkPet = true;
    function validateData() {
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
    //1.2.3 Thêm thú cưng sửa vào danh sách
    const validate = validateData();
    if (validate) {
        //tìm index thú cưng đã sửa và thay thế
        let index = petArr.findIndex((c) => c.id == data.id)
        if (index >= 0) {
            petArr.splice(index, 1, data)
        }
        //console.log(index)
        saveToStorage("pets", petArr);//lưu lại mảng pet vào localStorage
        renderEditData(petArr);
        clearInput();
        editForm.classList.add("hide");//ẩn form sau khi submit chỉnh sửa
    }
});
//2. Hiển thị Breed trong màn hình quản lý thú cưng
typeInput.onchange = function () {
    if (typeInput.value == "Dog") {
        const dogBreedArr = petArrBreed.filter((pet) => pet.type === "Dog");
        console.log(dogBreedArr);
        renderBreed(dogBreedArr);
    };
    if (typeInput.value == "Cat") {
        const catBreedArr = petArrBreed.filter((pet) => pet.type === "Cat");
        console.log(catBreedArr);
        renderBreed(catBreedArr);
    };
    if (typeInput.value == "Select Type") {
        breedInput.innerHTML = "<option>Select Breed</option>";
    };
};
//.2.1.Hàm hiển thị danh sách breed
function renderBreed(petArrBreed) {
    breedInput.innerHTML = "<option>Select Breed</option>";
    petArrBreed.forEach((item) => {
        const option = document.createElement('option');
        option.innerHTML = `<option>${item.breed}</option>`;
        breedInput.appendChild(option);
    })
};
//3. Hàm hiển thị danh sách thú cưng
function renderEditData(petArr) {
    tableBodyEl.innerHTML = '';                            // xóa nội dung hiện có của bảng
    for (let i = 0; i < petArr.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<th>${petArr[i].id}</th>
        <td>${petArr[i].namePet}</td>
        <td>${petArr[i].age}</td>
        <td>${petArr[i].typePet}</td>
        <td>${petArr[i].weight} kg</td>
        <td>${petArr[i].lengthPet} cm</td>
        <td>${petArr[i].breed}</td>
        <td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
        <td><i class="bi ${petArr[i].vaccinated ? "bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
        <td><i class="bi ${petArr[i].dewormed ? " bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td> 
        <td><i class="bi ${petArr[i].sterilized ? " bi-check-circle-fill" : "bi bi-x-circle-fill"}"></i></td>
        <td>${petArr[i].date}</td>
        <td><button class="btn btn-warning" onclick="editPet('${petArr[i].id}')">Edit</button></td>`;
        tableBodyEl.appendChild(row);
    }
};
//4. Chức năng: Edit
function editPet(x) {
    editForm.classList.remove("hide");
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id == x) {
            idInput.value = `${petArr[i].id}`;
            nameInput.value = `${petArr[i].namePet}`;
            ageInput.value = `${petArr[i].age}`;
            typeInput.value = `${petArr[i].typePet}`;
            weightInput.value = `${petArr[i].weight}`;
            lengthInput.value = `${petArr[i].lengthPet}`;
            colorInput.value = `${petArr[i].color}`;
            if (typeInput.value == "Dog") {
                const dogBreedArr = petArrBreed.filter((pet) => pet.type === "Dog");
                renderBreed(dogBreedArr);
            };
            if (typeInput.value == "Cat") {
                const catBreedArr = petArrBreed.filter((pet) => pet.type === "Cat");
                renderBreed(catBreedArr);
            };
            breedInput.value = `${petArr[i].breed}`;
            vaccinatedInput.checked = petArr[i].vaccinated;
            dewormedInput.checked = petArr[i].dewormed;
            sterilizedInput.checked = petArr[i].sterilized;
        }
    }
};
//5. Hàm xóa các dữ liệu vừa nhập trên Form
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
