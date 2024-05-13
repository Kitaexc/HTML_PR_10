
class ClothingItem {
    constructor(name, size, color) {
        this.name = name;
        this.size = size;
        this.color = color;
    }
}

let clothingItems = [];


function addClothingItem(item) {
    clothingItems.push(item);
}


function removeClothingItem(index) {
    clothingItems.splice(index, 1);
}

function updateClothingItem(index, newItem) {
    clothingItems[index] = newItem;
}

function validateInput(name, size, color) {
    return name.trim() !== '' && size.trim() !== '' && color.trim() !== '';
}

function displayClothingItems() {
    const clothingList = document.getElementById('clothing-list');
    clothingList.innerHTML = '';

    clothingItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <strong>${item.name}</strong> - Размер: ${item.size}, Цвет: ${item.color}
            <button class="btn btn-sm btn-secondary ml-2" onclick="editItem(${index})">Изменить</button>
            <button class="btn btn-sm btn-danger ml-2" onclick="deleteItem(${index})">Удалить</button>
        `;
        clothingList.appendChild(itemElement);
    });
}

function displayAddForm() {
    const addForm = document.getElementById('add-form');
    addForm.innerHTML = `
        <h2 class="mb-3">Добавление нового элемента одежды</h2>
        <div class="form-group">
            <input type="text" class="form-control" id="name" placeholder="Название">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" id="size" placeholder="Размер">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" id="color" placeholder="Цвет">
        </div>
        <button class="btn btn-primary" onclick="addItem()">Добавить</button>
    `;
}

function addItem() {
    const nameInput = document.getElementById('name');
    const sizeInput = document.getElementById('size');
    const colorInput = document.getElementById('color');

    const name = nameInput.value.trim();
    const size = sizeInput.value.trim();
    const color = colorInput.value.trim();

    if (validateInput(name, size, color)) {
        const newItem = new ClothingItem(name, size, color);
        addClothingItem(newItem);
        displayClothingItems();
        nameInput.value = '';
        sizeInput.value = '';
        colorInput.value = '';
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}

function deleteItem(index) {
    removeClothingItem(index);
    displayClothingItems();
}

function editItem(index) {
    console.log('Редактирование элемента с индексом', index);
    const item = clothingItems[index];

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-size').value = item.size;
    document.getElementById('edit-color').value = item.color;

    $('#editModal').modal('show');

    document.getElementById('save-changes-btn').addEventListener('click', function() {
        saveChanges(index);
    });
}

function saveChanges(index) {
    const newName = document.getElementById('edit-name').value.trim();
    const newSize = document.getElementById('edit-size').value.trim();
    const newColor = document.getElementById('edit-color').value.trim();

    if (validateInput(newName, newSize, newColor)) {
        const updatedItem = new ClothingItem(newName, newSize, newColor);
        updateClothingItem(index, updatedItem);
        displayClothingItems();
        $('#editModal').modal('hide');
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}

displayClothingItems();
displayAddForm();
