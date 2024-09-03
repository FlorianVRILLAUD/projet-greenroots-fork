BEGIN;

INSERT INTO tree
("name", "slug", "image", "variety", "size", "price_ht", "price_ttc", "origin")
VALUES
('Pommier', 'pommier', 'pommier.jpg', 'Arbre fruitier', 7, 20.75, 24.90, 'France'),
('Chêne', 'chene', 'chene.jpg', 'Arbre à bois dur', 15, 7.41, 8.90, 'France'),
('Olivier', 'olivier', 'olivier.jpg', 'Arbre fruitier', 5, 26.58, 31.90, 'Espagne'),
('Cèdre', 'cedre', 'cedre.jpg', 'Conifère', 30, 15, 18, 'France'),
('Noisetier', 'noisetier', 'noisetier.jpg', 'Arbre fruitier', 4, 15.60, 18.75, 'Danemark');

INSERT INTO user
("role", "lastname", "firstname", "adress", "email", "password")
VALUES
('admin', 'Green', 'Roots', '4 Rue Saint-Florentin, 75001 Paris', 'greenroots@gmail.com', 'uneracineverte'),
('user', 'Thomas', 'Desquet', '18 rue de Mars, 75003 Paris', 'thomdesquet@gmail.com', 'surlalune'),
('user', 'Kylian', 'Paquet', '7 avenue de Paris, 17000 La Rochelle', 'kikipaquet@gmail.com', 'untriple');


INSERT INTO command
("date", "status", "total_price", "user_id")
VALUES
('2024-09-02 10:23:45+02', 'Planté', 54.90, 2),
('2024-08-27 11:21:11+02', 'Livraison vers le lieu de plantation', 88.45, 2),
('2024-08-16 18:45:38+02', 'En cours de validation', 18.75, 3);

INSERT INTO command_has_tree
("tree_id", "command_id", "quantity")
VALUES
(1, 1, 2),
(2, 1, 3),
(5, 3, 1),
(4, 2, 3);

COMMIT;