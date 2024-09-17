// MODAL CREATE TREE

document.getElementById('create-tree').addEventListener('click', function() {
    document.getElementById('modalCreateTree').classList.add('is-active');
});

// MODAL CREATE VARIETY

document.getElementById('create-variety').addEventListener('click', function() {
    document.getElementById('modalCreateVariety').classList.add('is-active');
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