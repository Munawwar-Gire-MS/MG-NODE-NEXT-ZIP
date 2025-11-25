import './style.css';

export const metadata = {
  title: 'Start | Secure Your Files',
  description: 'Encrypt and decrypt your files securely using AES 128, 192, 256 bit encryption technology.',
};

export default function StartLayout({ children }) {
  return (
    <section id="enkripsi" className="container py-5">
      {children}
    </section>
  );
}
