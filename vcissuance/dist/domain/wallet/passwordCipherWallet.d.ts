export default class PasswordCipherWallet {
    private wallet;
    private constructor();
    decrypt(encryptedPassword: string): string;
    encrypt(password: string): string;
    static loadWallet(encryptedKeys: string, password: string): Promise<PasswordCipherWallet>;
}
