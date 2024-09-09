import { scryptSync, timingSafeEqual, randomBytes } from 'node:crypto';

class Scrypt {
    static hash(password) {
        const salt = randomBytes(16).toString('hex');
        console.log('SALT', salt);
        const buf = scryptSync(password, salt, 64, {
            N: 131072,
            maxmem: 134220800,
        });
        

        console.log('BUFFER', buf.toString('hex'));
        return `${buf.toString('hex')}.${salt}`;
    }

    static compare(plainTextpassword, hash) {
       
        const [hashedPassword, salt] = hash.split('.');
        const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
        

        const clearPasswordBuffer = scryptSync(plainTextpassword, salt, 64, {
            N: 131072,
            maxmem: 134220800,
        });
        
        return timingSafeEqual(hashedPasswordBuf, clearPasswordBuffer);
    }
}

export { Scrypt };

