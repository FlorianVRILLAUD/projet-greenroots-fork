import { scryptSync, timingSafeEqual, randomBytes } from 'node:crypto';

class Scrypt {
    static hash(password) {
        const salt = randomBytes(16).toString('hex');
        const buf = scryptSync(password, salt, 64, {
          N: 131072,
          maxmem: 134220800,
        });
        return `${salt}.${buf.toString('hex')}`;
      }

      static compare(plainTextPassword, storedHash) {
        console.log("Comparaison de mot de passe - Hash stocké:", storedHash);
        const [salt, hash] = storedHash.split('.');
        if (!salt || !hash) {
          console.error('Format de mot de passe hashé invalide:', storedHash);
          return false;
        }
      
        const newHash = scryptSync(plainTextPassword, salt, 64, {
          N: 131072,
          maxmem: 134220800,
        }).toString('hex');
      
        return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(newHash, 'hex'));
      }
    }

export { Scrypt };
