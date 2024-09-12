import { User } from '../models/User.js'; 
import { Scrypt } from '../Auth/Scrypt.js'; 

async function updateUserPassword(email, newPassword) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`Utilisateur non trouvé pour l'email: ${email}`);
      return false;
    }

    const hashedPassword = Scrypt.hash(newPassword);
    await user.update({ password: hashedPassword });
    console.log(`Mot de passe mis à jour pour l'utilisateur: ${email}`);
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe:', error);
    return false;
  }
}

// Fonction pour exécuter la mise à jour
export async function runUpdate() {
  const email = 'greenroots@gmail.com';
  const newPassword = 'uneracineverte'; 

  try {
    const success = await updateUserPassword(email, newPassword);
    if (success) {
      console.log('Mot de passe mis à jour avec succès');
    } else {
      console.log('Échec de la mise à jour du mot de passe');
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
}


