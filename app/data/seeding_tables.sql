BEGIN;

INSERT INTO "variety"
("name", "slug")
VALUES
('Arbre fruitier', 'arbre-fruitier'),
('Arbre à bois dur', 'arbre-a-bois-dur'),
('Conifère', 'conifere'),
('Herbe', 'herbe'),
('Palmier dattier', 'palmier-dattier');

INSERT INTO "tree"
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


INSERT INTO "users"
("role", "lastname", "firstname", "adress", "email", "password")
VALUES
('admin', 'Green', 'Roots', '4 Rue Saint-Florentin, 75001 Paris', 'greenroots@gmail.com', '6088eadf30a2abdc700eee5f9bc34c95.84b59979cf019bc7e7793c5bdb3e25f67125f67f87378387003a6bcfb1652647b13dca4a593144ff800a8fb204e2fcd9d7293f25703d0c3cb85aa6b8a2d98ab5'),  -- 'uneracineverte'
('user', 'Thomas', 'Desquet', '18 rue de Mars, 75003 Paris', 'thomdesquet@gmail.com', 'fd7518ff1f029790dce0a73c52234104.96d54d2692b13683dccb13e4e584ca11703c8d82afc8107da5f8d37da42831d0ba582ce0ac274f33e47cf88d007de19bab9a1b3073df2e49d5f3549b553bf564'),  -- 'surlalune'
('user', 'Kylian', 'Paquet', '7 avenue de Paris, 17000 La Rochelle', 'kikipaquet@gmail.com', 'f4989dbef2b8911030359ec2611008cc.942b6a42512ae0a47322e14a914311072fb0b5364917905b48ce98101820604b975f95f9071a18776474a501a245606d2dd168027a0d34a6dd9b79cfe47c46eb');  -- 'untriple'

INSERT INTO "command"
("date", "status", "total_price", "user_id")
VALUES
('2024-09-02 10:23:45+02', 'Planté', 54.90, 2),
('2024-08-27 11:21:11+02', 'Livraison vers le lieu de plantation', 88.45, 2),
('2024-08-16 18:45:38+02', 'En cours de validation', 18.75, 3);

INSERT INTO "command_has_tree"
("tree_id", "command_id", "quantity")
VALUES
(1, 1, 2),
(2, 1, 3),
(5, 3, 1),
(4, 2, 3);

INSERT INTO "user_has_tree"
("user_id", "tree_id")
VALUES
(2, 1),
(2, 4),
(2, 8),
(3, 2),
(3, 9);



COMMIT;