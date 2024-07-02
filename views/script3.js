$(document).ready(function() {
  $('#categoryInput, #itemInput').mask('AAAAAAAAAA', {
    translation: {
      'A': { pattern: /[A-Za-z]/ }
    }
  });
  $('#countInput').mask('0000');

});


document.addEventListener('DOMContentLoaded', function() {
  let editMode = false;
  let editItem = null;

  document.getElementById('saveButton').addEventListener('click', function() {
    const category = document.getElementById('categoryInput').value;
    const item = document.getElementById('itemInput').value;
    const count = document.getElementById('countInput').value;

    if (category && item && count) {
      if (editMode) {
        updateItem(editItem, category, item, count);
      } else {
        addItem(category, item, count);
      }

      const addItemModal = bootstrap.Modal.getInstance(document.getElementById('addItemModal'));
      addItemModal.hide();
      document.getElementById('addItemForm').reset();
    }
  });

  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', function() {
      const listItem = this.closest('li');
      const category = listItem.querySelector('.fw-bold').textContent;
      const item = listItem.querySelector('.ms-2.me-auto div:nth-child(2)').textContent;
      const count = listItem.querySelector('.badge').textContent;
      editMode = true;
      editItem = listItem;
      loadEditData(category, item, count);
    });
  });

  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
      const listItem = this.closest('li');
      listItem.remove();
    });
  });

  function addItem(category, item, count) {
    const itemList = document.getElementById('itemList');
    
    if (!itemList) {
      console.error('Elemento com ID "itemList" não encontrado.');
      return;
    }
    
    const newItem = createListItem(category, item, count);
    itemList.appendChild(newItem);
  }

  function createListItem(category, item, count) {
    const newItem = document.createElement('li');
    newItem.className = 'list-group-item d-flex justify-content-between align-items-start';
    
    const itemContent = document.createElement('div');
    itemContent.className = 'ms-2 me-auto';
    
    const itemCategory = document.createElement('div');
    itemCategory.className = 'fw-bold';
    itemCategory.textContent = category;
    
    const itemName = document.createElement('div');
    itemName.textContent = item;
    
    itemContent.appendChild(itemCategory);
    itemContent.appendChild(itemName);
    
    const itemBadge = document.createElement('span');
    itemBadge.className = 'badge text-bg-primary rounded-pill';
    itemBadge.textContent = count;
    
    const editButton = document.createElement('button');
    editButton.className = 'btn btn-sm btn-warning edit-button ms-2';
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', function() {
      const listItem = this.closest('li');
      const category = listItem.querySelector('.fw-bold').textContent;
      const item = listItem.querySelector('.ms-2.me-auto div:nth-child(2)').textContent;
      const count = listItem.querySelector('.badge').textContent;
      editMode = true;
      editItem = listItem;
      loadEditData(category, item, count);
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-danger delete-button ms-2';
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', function() {
      const listItem = this.closest('li');
      listItem.remove();
    });

    newItem.appendChild(itemContent);
    newItem.appendChild(itemBadge);
    newItem.appendChild(editButton);
    newItem.appendChild(deleteButton);
    
    return newItem;
  }

  function loadEditData(category, item, count) {
    document.getElementById('categoryInput').value = category;
    document.getElementById('itemInput').value = item;
    document.getElementById('countInput').value = count;
    const addItemModalLabel = document.getElementById('addItemModalLabel');
    addItemModalLabel.textContent = 'Editar Item';
    const addItemModal = new bootstrap.Modal(document.getElementById('addItemModal'));
    addItemModal.show();
  }

  function updateItem(itemElement, category, item, count) {
    const itemContent = itemElement.querySelector('.ms-2.me-auto');
    itemContent.querySelector('.fw-bold').textContent = category;
    itemContent.querySelector('div:not(.fw-bold)').textContent = item;
    itemElement.querySelector('.badge').textContent = count;
    editMode = false;
    editItem = null;
    document.getElementById('addItemModalLabel').textContent = 'Adicionar Novo Item';
  }
});