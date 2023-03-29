'use strict';
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const fileInput = document.getElementById("input-file");
let petArr = getFromStorage("pets");
//1.Exportdata
//1.1.Sự kiện nút Export
exportBtn.addEventListener('click', function () {
    const exportConfirm = confirm('Are you sure?');
    if (exportConfirm) {
        saveStaticDataToFile();
    };
});
//1.2.hàm lưu data
function saveStaticDataToFile() {
    let blob = new Blob([JSON.stringify(getFromStorage('pets'), null, 2)], { type: "application/json", });
    saveAs(blob, "pets.json");
};

//2.Importdata
//2.1.Sự kiện nút Import
importBtn.addEventListener('click', function () {
    if (!fileInput.value) {
        alert('chọn file import!');
    }
    else {
        const importConfirm = confirm('Are you sure?');
        if (importConfirm) {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                //đọc file
                reader.readAsText(file);
                //Sự kiện load data lên
                reader.addEventListener("load", function () {
                    let petArrImport = JSON.parse(reader.result);
                    //console.log(petArrImport);
                    //ghi đè thú cưng trùng ID
                    for (let i = 0; i < petArrImport.length; i++) {
                        let index = petArr.findIndex((c) => c.id == petArrImport[i].id)
                        if (index >= 0) {
                            petArr.splice(index, 1, petArrImport[i])
                        };
                    };
                    //xóa thú cưng trùng ID trong mảng của file import sau khi ghi đè
                    for (let i = 0; i < petArr.length; i++) {
                        let index = petArrImport.findIndex((d) => d.id == petArr[i].id)
                        if (index >= 0) {
                            petArrImport.splice(index, 1)
                        };
                    };
                    //console.log(petArrImport);
                    //hợp nhất hai mảng thú cưng
                    petArr = petArr.concat(petArrImport);
                    //console.log(petArr);
                    saveToStorage('pets', petArr);
                    alert('Success!');
                },
                    false
                );
            };
            //reset file input
            fileInput.value = "";

        };
    };
});
