'use client';

import Link from 'next/link';
import Header from './Header';

export default function Hero() {
  return (
    <>
      <Header />
      <section className="py-5 bg-primary-2 text-white">
        <div className="container text-sm-center text-start">
          <h1 className="display-4 fw-bold mb-4">Secure Your Files with the Rijndael-AES Algorithm in CBC Mode</h1>
          <p className="lead mb-5">Encrypt and decrypt files using the Advanced Encryption Standard 128, 192, or 256-bit. No data stored or sent to any server.</p>
          <div className="d-flex justify-content-sm-center justify-content-start">
            <Link href="/start" className="btn btn-white fs-5 fw-bold rounded-pill px-4 py-3">
              Start Encrypting
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
