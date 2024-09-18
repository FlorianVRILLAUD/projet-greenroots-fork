import multer from 'multer';
import path from 'path';

// Configuration de multer pour gérer l'upload des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/photos'); // Dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    // Ajouter un suffixe et un identifiant unique au nom du fichier
    const uniqueSuffix = 'nobdd'; // Génère un identifiant unique
    const ext = path.extname(file.originalname); // Obtenir l'extension du fichier
    const baseName = path.basename(file.originalname, ext); // Obtenir le nom du fichier sans extension

    // Nom final du fichier avec suffixe
    cb(null, `${uniqueSuffix}-${baseName}${ext}`);
  }
});

// Filtrer les fichiers pour accepter uniquement les images (PNG/JPEG)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Seules les images sont autorisées'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de taille : 5MB
  fileFilter: fileFilter
});

export default upload;
