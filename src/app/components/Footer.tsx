import React from 'react';

interface FooterProps {
  copyrightText?: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText = '© 2024 Adcommerce' }) => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto">
        <p className="text-center">{copyrightText}</p>
        {/* Add other footer content here */}
      </div>
    </footer>
  );
};

export default Footer;