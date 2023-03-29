'use strict';
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const breedSubmitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const breedArr = getFromStorage("breeds") === null ? [] : getFromStorage("breeds");//lấy mảng lưu data breed từ LocalStorage
//a. Bắt sự kiện Click vào nút "Submit"
breedSubmitBtn.addEventListener("click", function () {
    const dataBreed = {
        breed: breedInput.value,
        type: typeInput.value,
    }
    let checkBreed = true;
    function validateDataBreed() {
        //Xác thực dữ liệu nhập đầu vào
        if (!dataBreed.breed) {
            alert("Breed???");
            checkBreed = false;
        }
        if (dataBreed.type === "Select Type") {
            alert("Dog or Cat???");
            checkBreed = false;
        }
        return checkBreed;
    };
    //console.log(validateDataBreed());
    //Thêm Breed vào danh sách
    const validateBreed = validateDataBreed(dataBreed);
    if (validateBreed) {
        breedArr.push(dataBreed);
        saveToStorage("breeds", breedArr);//lưu mảng breeds vào local storage
        renderBreedTable(breedArr);
        clearInputBreed();
    }
});

//b.Hàm hiển thị danh sách Breed
function renderBreedTable(breedArr) {
    tableBodyEl.innerHTML = "";
    for (let i = 0; i < breedArr.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<th>${breedArr.indexOf(breedArr[i]) + 1}</th>
                <td>${breedArr[i].breed}</td>
                <td>${breedArr[i].type}</td>
                <td><button class="btn btn-danger" onclick="deleteBreed('${breedArr.indexOf(breedArr[i]) + 1}')">Delete</button></td>`
        tableBodyEl.appendChild(row);
    };
}

//c.Hàm xóa các dữ liệu vừa nhập trên Form
function clearInputBreed() {
    breedInput.value = "";
    typeInput.value = "Select Type";
};

//d.Hàm xóa Breed
function deleteBreed(x) {
    const breedConfirm = confirm("Are you sure?");
    if (breedConfirm) {
        for (let i = 0; i < breedArr.length; i++) {
            if ((breedArr.indexOf(breedArr[i]) + 1) == x) {
                breedArr.splice(i, 1);
            }
        }
    }
    //console.log(breedArr);
    saveToStorage("breeds", breedArr);
    renderBreedTable(breedArr);
};
//e.tải dữ liệu ban đầu
window.onload = function () {
    renderBreedTable(breedArr);
};

