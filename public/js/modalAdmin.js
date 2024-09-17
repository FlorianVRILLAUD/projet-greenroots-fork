// MODAL CREATE TREE

document.getElementById('create-tree').addEventListener('click', function() {
    document.getElementById('modalCreateTree').classList.add('is-active');
});

// MODAL CREATE VARIETY

document.getElementById('create-variety').addEventListener('click', function() {
    document.getElementById('modalCreateVariety').classList.add('is-active');
});

// MODAL UPDATE TREE

const btnUpdate = document.querySelectorAll('.update-tree');
btnUpdate.forEach(button => {
  button.addEventListener('click', function() {
      
      const treeId = this.getAttribute('data-id');

      const modal = document.getElementById(`modalUpdateTree-${treeId}`);

      modal.classList.add('is-active');
  });
});

// MODAL DELETE TREE

const btnDelete = document.querySelectorAll('.delete-tree');
btnDelete.forEach(button => {
  button.addEventListener('click', function() {
      
      const treeId = this.getAttribute('data-id');

      const modal = document.getElementById(`modalDeleteTree-${treeId}`);

      modal.classList.add('is-active');
  });
});

// CLOSE MODAL
document.querySelectorAll('.modal').forEach(modal => {
    const closeButtons = modal.querySelectorAll('.close, .modal-background, .back');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        modal.classList.remove('is-active');
      });
    });
  });