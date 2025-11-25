"use client";

import { useRef } from 'react';

export default function DropZone({ file, fileName, fileInputRef, handleFileChange, setFile, setFileName }) {
  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  };

  return (
    <div className="mb-4">
      <div
        className={`card drop-zone rounded-3 text-center d-flex justify-content-center border-2 p-4 ${file ? 'bg-gray' : 'bg-white'}`}
        style={{ cursor: 'pointer' }}
        onClick={handleButtonClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="d-flex justify-content-center flex-column gap-2">
            <i className="bi bi-file-earmark-arrow-up-fill text-primary display-1"></i>
            <small className="text-secondary m-0">Drag and drop or click to browse file</small>
          </div>
        ) : (
          <div>
            <p
              className="fw-bold text-primary m-0 text-truncate"
              style={{ maxWidth: '100%', overflow: 'hidden' }}
              title={fileName}
            >
              {fileName}
            </p>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="d-none"
        onChange={handleFileChange}
      />
    </div>
  );
}
