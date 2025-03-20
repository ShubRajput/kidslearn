import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1488330890490-c291ecf62571?auto=format&fit=crop&w=1200",
    title: "Adventure Awaits!",
    description: "Join us on a magical journey of learning"
  },
  {
    url: "https://images.unsplash.com/photo-1615627121117-e3278bc8b1db?auto=format&fit=crop&w=1200",
    title: "Learn with Fun!",
    description: "Discover amazing things every day"
  },
  {
    url: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200",
    title: "Explore & Grow",
    description: "Every day is a new adventure"
  }
];

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <div key={index} className="relative h-[500px]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-full"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent rounded-3xl">
                <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-white mb-4"
                  >
                    {image.title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-white"
                  >
                    {image.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
}