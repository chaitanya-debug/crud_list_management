document.addEventListener('DOMContentLoaded', function () {
    const itemForm = document.getElementById('itemForm');
    const itemInput = document.getElementById('itemInput');
    const itemList = document.getElementById('itemList');

    let editMode = false;
    let editElement;

    itemForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newItemText = itemInput.value.trim();
        if (newItemText === '') return;

        if (editMode) {
            // Update item
            editElement.querySelector('.item-text').textContent = newItemText;
            itemInput.value = '';
            editMode = false;
            itemForm.querySelector('button').textContent = 'Add Item';
        } else {
            // Create new item
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="item-text">${newItemText}</span>
                <div class="actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            itemList.appendChild(li);
            itemInput.value = '';
        }
    });

    itemList.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-btn')) {
            // Edit item
            editElement = e.target.closest('li');
            itemInput.value = editElement.querySelector('.item-text').textContent;
            editMode = true;
            itemForm.querySelector('button').textContent = 'Update Item';
        }

        if (e.target.classList.contains('delete-btn')) {
            // Delete item
            const li = e.target.closest('li');
            itemList.removeChild(li);
        }
    });
});