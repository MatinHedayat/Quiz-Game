import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

export default function Page({
  title,
  children,
  footer,
  backPage,
  nextText,
  nextPage,
  nextFunc,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <motion.div
      className='page'
      initial={{ opacity: 0, transform: 'translateY(-1rem)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
    >
      <Header title={title} setIsMenuOpen={setIsMenuOpen} />
      <Menu isOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />

      {children}

      <Footer
        footer={footer}
        backPage={backPage}
        nextText={nextText}
        nextPage={nextPage}
        nextFunc={nextFunc}
      />
    </motion.div>
  );
}
