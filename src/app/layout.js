import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Poppins } from 'next/font/google';
import BootstrapClient from '@/components/bootstrapClient';
import { Toaster } from 'react-hot-toast';

// Load font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'Next AES App',
  description: 'Encrypt & Decrypt files',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <BootstrapClient />
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
