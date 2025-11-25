'use client';

import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';

const MAX_FILE_SIZE_MB = 200;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * Encrypt a file
 */
export function encryptFile(file, fileName, privateKey) {
  if (!file) return toast.error('Please select a file first');
  if (![16, 24, 32].includes(privateKey.length)) {
    return toast.error('Key length must be 16, 24, or 32 characters');
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return toast.error(`File too large. Max allowed size is ${MAX_FILE_SIZE_MB}MB`);
  }

  const reader = new FileReader();
  reader.onload = () => {
    const wordArray = CryptoJS.lib.WordArray.create(reader.result);
    const key = CryptoJS.enc.Utf8.parse(privateKey);
    const iv = CryptoJS.lib.WordArray.random(16);

    const checksum = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
    const dataWithChecksum = CryptoJS.enc.Utf8.parse(checksum).concat(wordArray);

    const cipher = CryptoJS.AES.encrypt(dataWithChecksum, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const encrypted = iv.concat(cipher.ciphertext);
    const encryptedBytes = new Uint8Array(encrypted.sigBytes);
    for (let i = 0; i < encrypted.sigBytes; i++) {
      encryptedBytes[i] = (encrypted.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }

    const blob = new Blob([encryptedBytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.encrypted`;
    a.click();

    toast.success('Encryption success!');
  };
  reader.readAsArrayBuffer(file);
}

/**
 * Decrypt a previously encrypted file
 */
export function decryptFile(file, fileName, privateKey) {
  if (!file) return toast.error('Please select a file first');
  if (![16, 24, 32].includes(privateKey.length)) {
    return toast.error('Key length must be 16, 24, or 32 characters');
  }
  if (!fileName.endsWith('.encrypted')) {
    return toast.error('Selected file is not an encrypted file (.encrypted)');
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return toast.error(`File too large. Max allowed size is ${MAX_FILE_SIZE_MB}MB`);
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const encryptedData = new Uint8Array(reader.result);
      const key = CryptoJS.enc.Utf8.parse(privateKey);

      const iv = CryptoJS.lib.WordArray.create(encryptedData.slice(0, 16));
      const ciphertext = CryptoJS.lib.WordArray.create(encryptedData.slice(16));

      const decrypted = CryptoJS.AES.decrypt({ ciphertext }, key, {
        iv,
        padding: CryptoJS.pad.Pkcs7,
      });

      const decryptedBytes = new Uint8Array(decrypted.sigBytes);
      for (let i = 0; i < decrypted.sigBytes; i++) {
        decryptedBytes[i] = (decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      }

      const checksumHex = new TextDecoder().decode(decryptedBytes.slice(0, 64));
      const fileData = decryptedBytes.slice(64);
      const checksum = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(fileData)).toString(CryptoJS.enc.Hex);

      if (checksum !== checksumHex) throw new Error('Invalid key or corrupted file');

      const blob = new Blob([fileData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.replace('.encrypted', '');
      a.click();

      toast.success('Decryption success!');
    } catch {
      toast.error('Decryption failed: Invalid key or corrupted file');
    }
  };
  reader.readAsArrayBuffer(file);
}
