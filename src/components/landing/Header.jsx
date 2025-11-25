'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="container-fluid bg-primary-2 py-3">
      <div className="container bg-primary-2 px-0 d-flex justify-content-between align-items-center">
        <Link href="/" passHref>
          <div className="d-flex header-logo justify-content-center align-items-center bg-white rounded-circle" style={{ cursor: 'pointer' }}>
            <Image src="/logo-blue.png" alt="Next.js AES logo" width={37} height={42} priority />
          </div>
        </Link>
        <a href="https://github.com/danutama/nextjs-aes-encryption" target="_blank" rel="noopener noreferrer" className="btn btn-white px-3 fw-bold rounded-pill">
          <div className="d-flex justify-content-center align-items-center gap-2">
            <i className="bi bi-github fs-5"></i> <span>GitHub</span>
          </div>
        </a>
      </div>
    </header>
  );
}
