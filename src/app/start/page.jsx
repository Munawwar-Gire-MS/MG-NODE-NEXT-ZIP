'use client';

import Image from 'next/image';
import DropZone from '@/components/DropZone';
import InputKey from '@/components/InputKey';
import Credit from '@/components/Credit';
import { useInAppBrowserWarning } from '@/hooks/useInAppBrowserWarning';
import { useEncryption } from '@/hooks/useEncryption';

export default function EncryptionPage() {
  useInAppBrowserWarning();

  const { file, fileName, privateKey, setPrivateKey, fileInputRef, handleFileChange, handleRefresh, handleEncryptClick, handleDecryptClick } = useEncryption();

  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="text-center mb-4">
        <div className="mb-3 d-flex justify-content-center align-items-center">
          <span className="icon blue-pastel-1 d-flex justify-content-center align-items-center pt-1">
            <Image src="/logo-blue.png" alt="logo" className="img-logo" width={43} height={50} priority />
          </span>
        </div>
        <h1 className="mb-2 fw-bold">File Security</h1>
        <p className="text-secondary">Securely encrypt and decrypt your files with AES 128, 192, or 256 bit</p>
      </div>

      <div>
        <div className="row">
          <div className="col-lg-6">
            <DropZone file={file} fileName={fileName} fileInputRef={fileInputRef} handleFileChange={handleFileChange} />
          </div>
          <div className="col-lg-6">
            <InputKey privateKey={privateKey} setPrivateKey={setPrivateKey} />
            <div className="d-flex justify-content-center gap-sm-2 gap-1 mt-3">
              <button className="btn btn-primary flex-fill" onClick={handleEncryptClick}>
                <i className="bi bi-lock-fill"></i> Encrypt
              </button>
              <button className="btn btn-primary flex-fill" onClick={handleDecryptClick}>
                <i className="bi bi-unlock-fill"></i> Decrypt
              </button>
              <button className="btn btn-refresh flex-fill" onClick={handleRefresh}>
                <i className="bi bi-arrow-clockwise"></i> Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Credit />
        </div>
      </div>
    </div>
  );
}
