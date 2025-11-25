'use client';

export default function InputKey({ privateKey, setPrivateKey }) {
  return (
    <div className="text-start">
      <label htmlFor="privateKey" className="form-label text-start">
        Private key (16, 24, or 32 chars)<span className="text-danger fw-bold">*</span>
      </label>
      <input type="text" className="form-control rounded-3 py-3 border-2" id="privateKey" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} placeholder="Example: mysecretkey12345" />
    </div>
  );
}
