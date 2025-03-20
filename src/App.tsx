import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import DemoTest from './components/DemoTest';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Carousel />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <h1 className="text-4xl font-bold text-center mb-8">Welcome to KidsLearn!</h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Try our demo test and see how fun learning can be!
          </p>
          <DemoTest />
        </motion.div>
      </main>
    </div>
  );
}

export default App;