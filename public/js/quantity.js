//S'exécute quand la page est complètement chargée
document.addEventListener('DOMContentLoaded', function() {
    const incrementBtns = document.querySelectorAll('.increment-btn');
    const decrementBtns = document.querySelectorAll('.decrement-btn');
    const quantityInputs = document.querySelectorAll('.quantity-input');
//Ecouteurs d'évènements - + et quantité
    incrementBtns.forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.treeId, 1));//Accède à la valeur de l'attribut 'data-tree-id'
    });

    decrementBtns.forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.treeId, -1));
    });

    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const newValue = parseInt(input.value);
            if (newValue <= 0) {
                // Si newValue est 0 ou - on supprime l'arbre
                removeTreeFromCart(input.dataset.treeId);
            } else {
                // Sinon, on met à jour la quantité 
                updateQuantity(input.dataset.treeId, 0, newValue);
            }
        });
    });
    // Vider le panier
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    //Mise à jour quantité d'un article
    function updateQuantity(treeId, change, newValue = null) { 
        const input = document.querySelector(`.quantity-input[data-tree-id="${treeId}"]`);
        let quantity = parseInt(input.value);
        //Si newValue null = modifier la quantité existante sinon définir la nouvelle quantité
        if (newValue !== null) {
            quantity = newValue;
        } else {
            quantity += change;
        }
        // Si quantité = 0, fonction 'remove' prend le relai
        if (quantity <= 0) {
            removeTreeFromCart(treeId);
            return;
        } 
        if (quantity > 10000) quantity = 10000;
        //Maj valeur de l'input
        input.value = quantity;

        // Envoi de la quantité mise à jour au serveur
        fetch('/panier/mettre-a-jour', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ treeId, quantity }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Mettre à jour le sous-total et le total immédiatement
                updateItemTotal(treeId);
                updateCartTotal();
            }
        })
        .catch(error => console.error('Error:', error));
    }

//Met à jour le sous-total
    function updateItemTotal(treeId) {
        const card = document.querySelector(`.content-card[data-tree-id="${treeId}"]`);
        const quantity = parseInt(card.querySelector('.quantity-input').value);
        const price = parseFloat(card.querySelector('.item-price').textContent);
        const subtotal = quantity * price;
        card.querySelector('.item-subtotal').textContent = `${subtotal.toFixed(2)}`;
    }

//Met à jour le total de tous les articles
    function updateCartTotal() {
        let total = 0;
        document.querySelectorAll('.item-subtotal').forEach(subtotalElement => {
            total += parseFloat(subtotalElement.textContent);
        });
        document.getElementById('cart-total').textContent = `${total.toFixed(2)} €`;
    }

//Selectionne l'élement du DOM correspondant à l'arbre (treeId) à supprimer
    function removeTreeFromCart(treeId) {
        const card = document.querySelector(`.content-card[data-tree-id="${treeId}"]`);
        if (card) {
            // Supprime l'élément du DOM
            card.remove();
            
            // MAJ total du panier
            updateCartTotal();
            
            //On envoi une requête au serveur pour supprimer l'arbre du panier
            fetch('/panier/supprimer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ treeId }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Arbre supprimé du panier avec succès');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }

    function clearCart() {
        fetch('/panier/vider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Supprime tous les éléments du panier du DOM
                const cartItems = document.querySelectorAll('.content-card');
                cartItems.forEach(item => item.remove());

                // Mettre à jour le total
                updateCartTotal();

                console.log('Panier vidé avec succès');
            }
        })
        .catch(error => console.error('Error:', error));
    }
});