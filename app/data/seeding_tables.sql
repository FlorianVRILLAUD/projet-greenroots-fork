COMMIT;

BEGIN;

INSERT INTO "variety"
("name")
VALUES
('Arbre fruitier'),
('Arbre à bois dur'),
('Conifère'),
('Herbe'),
('Palmier dattier');

INSERT INTO tree
("name", "slug", "image", "size", "price_ht", "price_ttc", "origin", "variety_id")
VALUES
('Pommier', 'pommier', 'pommier.jpg', 7, 20.75, 24.90, 'France', 1),
('Chêne', 'chene', 'chene.jpg', 15, 7.41, 8.90, 'France', 2),
('Olivier', 'olivier', 'olivier.jpg', 5, 26.58, 31.90, 'Espagne', 1),
('Cèdre', 'cedre', 'cedre.jpg', 30, 15, 18, 'France',3),
('Noisetier', 'noisetier', 'noisetier.jpg', 4, 15.60, 18.75, 'Danemark', 1),
('Poirier middle', 'poirier-middle', 'poirier-middle.webp', 8, 18.99, 24.99, 'France', 1),
('Bambou sacré', 'bambou-sacre', 'bambou_sacré.webp', 2, 20.50, 24.50, 'Chine', 4),
('Bonsai de californie', 'bonsai-de-californie', 'bonsai_de_californie.webp', 10, 65, 70, 'Japon', 1),
('Cerisier', 'cerisier', 'cerisier.webp', 4, 10, 14.50, 'France', 1),
('Cypres de Lambert', 'cypres-de-lambert', 'cypres_de_lambert.webp', 10, 13.50, 19.50, 'Région Mediterranéenne', 3),
('Dattier', 'dattier', 'dattier.webp', 2, 20.50, 24.50, 'Afrique du Nord', 5);



INSERT INTO "user"
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