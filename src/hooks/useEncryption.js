import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { encryptFile, decryptFile } from '@/utils/crypto';

const MAX_FILE_SIZE_MB = 200;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function useEncryption() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleRefresh = () => {
    setFile(null);
    setFileName('');
    setPrivateKey('');
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const checkFileSize = () => {
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File too large. Max allowed size is ${MAX_FILE_SIZE_MB}MB`);
      return false;
    }
    return true;
  };

  const handleEncryptClick = () => {
    if (!checkFileSize()) return;
    encryptFile(file, fileName, privateKey);
  };

  const handleDecryptClick = () => {
    if (!checkFileSize()) return;
    decryptFile(file, fileName, privateKey);
  };

  return {
    file,
    fileName,
    privateKey,
    setPrivateKey,
    fileInputRef,
    handleFileChange,
    handleRefresh,
    handleEncryptClick,
    handleDecryptClick,
  };
}
