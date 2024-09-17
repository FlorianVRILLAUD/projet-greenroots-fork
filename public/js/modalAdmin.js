// MODAL CREATE TREE

document.getElementById('create-tree').addEventListener('click', function() {
    document.getElementById('modalCreateTree').classList.add('is-active');
});

// MODAL CREATE VARIETY

document.getElementById('create-variety').addEventListener('click', function() {
    document.getElementById('modalCreateVariety').classList.add('is-active');
});

// MODAL UPDATE TREE

document.getElementById('update-tree').addEventListener('click', function() {
    document.getElementById('modalUpdateTree').classList.add('is-active');
});

// MODAL DELETE TREE

document.getElementById('delete-tree').addEventListener('click', function() {
  document.getElementById('modalDeleteTree').classList.add('is-active');
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