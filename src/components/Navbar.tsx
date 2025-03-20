import { BookOpen, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center"
            >
              <BookOpen className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-blue-500">KidsLearn</span>
            </motion.div>
          </div>
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}