document.addEventListener('DOMContentLoaded', () => {
  const openModal = document.getElementById('openModal');
  const closeModal = document.getElementById('closeModal');
  const cancelModal = document.getElementById('cancelModal');
  const modal = document.getElementById('addListModal');

  // Ouvrir la modal
  openModal.addEventListener('click', () => {
      modal.classList.add('is-active');
  });

  // Fermer la modal en cliquant sur la croix
  closeModal.addEventListener('click', () => {
      modal.classList.remove('is-active');
  });

  // Fermer la modal en cliquant sur "Annuler"
  cancelModal.addEventListener('click', () => {
      modal.classList.remove('is-active');
  });

  // Fermer la modal en cliquant sur le fond (background)
  modal.querySelector('.modal-background').addEventListener('click', () => {
      modal.classList.remove('is-active');
  });
});