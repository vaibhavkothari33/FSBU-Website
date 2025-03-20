"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Star } from "lucide-react";
import MarqueeWave from "./MarqueeWave";

const events = [
  {
    image: "/events/event1.png",
    title: "Figmania",
    date: "April 16, 2024",
    description:
      "Figmania, hosted by the Full Stack Club, helped participants master Figma through hands-on learning. Despite minor delays, it boosted confidence and design skills.",
    leftCard: "/events/Subtract.png",
  },
  {
    image: "/events/phantasialeft.jpg",
    title: "Phantasia",
    date: "March 23, 2024",
    description:
      "Phantasia united creatives in design and development challenges, fostering teamwork and innovation. Despite some struggles, it was a valuable learning experience.",
    leftCard: "/events/phantasialeft2.jpg",
  },
  {
    image: "/events/event1.png",
    title: "Design.io",
    date: "April 17th, 2024",
    description:
      "Design.io challenged participants to redesign Bennett University's site with a GTA theme, showcasing creativity and adaptability.",
    leftCard: "/events/Subtract.png",
  },
  {
    image: "/events/event1.png",
    title: "Hustle & Flow",
    date: "April 17, 2024",
    description:
      "Hustle & Flow, led by entrepreneur Shantanu, offered deep insights into startups and branding. Despite its intensity, the workshop was a hit with aspiring entrepreneurs.",
    leftCard: "/events/Subtract.png",
  },
  {
    image: "/events/event1.png",
    title: "Clone.io",
    date: "April 16, 2024",
    description:
      "Clone.io challenged participants to recreate a website in two hours, testing speed and precision. Despite hurdles, it showcased impressive technical and problem-solving skills.",
    leftCard: "/events/Subtract.png",
  },
  {
    image: "/events/centreHTML.jpg",
    title: "HTML & CSS Workshop",
    date: "November 22-23, 2024",
    description:
      "The HTML & CSS Workshop by the Full Stack Club built a strong web development foundation. Despite initial challenges, structured guidance helped participants gain confidence.",
    leftCard: "/events/leftHTML.jpg",
  },
  {
    image: "/events/9.2left.jpg",
    title: "9.2 SGPA",
    date: "September 10, 2024",
    description:
      "9.2 SGPA, led by Full Stack Club seniors, provided study strategies and resources for academic success. Despite the overwhelming material, it built a strong support network.",
    leftCard: "/events/9.2centre.jpg",
  },
  {
    image: "/events/carnivalcentre.jpg",
    title: "Pirates of Fullstack",
    date: "August 23, 2024",
    description:
      "At Club Carnival, Pirates of Fullstack, featured coding puzzles, design challenges, and a treasure hunt. Despite some tricky clues, the event was a thrilling success.",
    leftCard: "/events/carnivalLeft.jpg",
  },
];

export default function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef(null);

  // Custom hooks for responsive design
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => {
        setMatches(media.matches);
      };
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
  };

  // Implement useIsMobile directly in the component
  const useIsMobile = () => {
    return useMediaQuery("(max-width: 768px)");
  };

  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isExtraSmallScreen = useMediaQuery("(max-width: 480px)");

  // Handle mouse move for parallax effects - with dampened response
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (carouselRef.current && !isMobile) {
        const { left, top, width, height } =
          carouselRef.current.getBoundingClientRect();
        // Reduced divisor for more subtle movement
        const x = (e.clientX - left - width / 2) / 40;
        const y = (e.clientY - top - height / 2) / 40;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Auto-play functionality with longer interval
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 6000); // Increased from 5000 to 6000ms
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying]);

  // Pause auto-play when hovering over carousel
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  // Refined variants for main card animations with gentler transitions
  const cardVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 200 : -200,
      opacity: 0,
      scale: 0.9,
      rotateY: direction === "right" ? -10 : 10,
      zIndex: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 10,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.7 },
        scale: { duration: 0.7 },
        rotateY: { duration: 0.7 },
      },
    },
    exit: (direction) => ({
      x: direction === "right" ? -200 : 200,
      opacity: 0,
      scale: 0.9,
      rotateY: direction === "right" ? 10 : -10,
      zIndex: 1,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateY: { duration: 0.5 },
      },
    }),
  };

  // Refined left card variants with smoother transitions
  const leftCardVariants = {
    initial: { opacity: 0, scale: 1.05, y: 10 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.6, ease: "easeIn" },
    },
  };

  // New right card variants for enhanced animation
  const rightCardVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      rotateY: -15,
      x: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateY: -10,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      x: -20,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  // Mobile variants - simplified for better performance
  const mobileCardVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  // Generate decorative background circles with enhanced bluish spot gradients
  const generateCircles = (count) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 200 + 80; // Slightly larger for more impact
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.15 + 0.05; // Slightly more visible

      // Enhanced bluish gradient patterns
      const gradientTypes = [
        "radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0.02) 70%)",
        "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.01) 70%)",
        "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(37, 99, 235, 0.01) 75%)",
        "radial-gradient(circle, rgba(147, 197, 253, 0.16) 0%, rgba(147, 197, 253, 0.01) 80%)",
      ];

      const gradient =
        i % 4 === 0
          ? "radial-gradient(circle, rgba(219, 234, 254, 0.25) 0%, rgba(219, 234, 254, 0.01) 70%)"
          : gradientTypes[i % gradientTypes.length];

      return (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full backdrop-blur-[80px]"
          style={{
            width: size,
            height: size,
            top: `${top}%`,
            left: `${left}%`,
            background: gradient,
            opacity,
            filter: "blur(20px)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [opacity, opacity * 1.5, opacity],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      );
    });
  };

  return (
    <div
      className="relative flex flex-col items-center py-1 md:py-1 lg:py-1 min-h-screen overflow-hidden px-4 md:px-6 lg:px-8 font-sans"
      style={{
        background: "#ffffff",
        position: "relative",
      }}
    >
      {/* Enhanced bluish spot gradients background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {generateCircles(12)}

        {/* Additional large fixed gradients for more atmosphere */}
        <div
          className="absolute top-0 left-0 w-[45vw] h-[35vh] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(29, 78, 216, 0.15) 0%, rgba(29, 78, 216, 0.01) 70%)",
            transform: "translate(-20%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[50vw] h-[40vh] rounded-full opacity-20 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(96, 165, 250, 0.18) 0%, rgba(96, 165, 250, 0.01) 70%)",
            transform: "translate(20%, 30%)",
          }}
        />
      </div>

      {/* The wavy marquee - smaller now */}
      <div className="w-full mb-4 md:mb-6 relative z-10">
        <MarqueeWave />
      </div>

      {/* Enhanced Title Section with subtle animation and stars */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 mb-6 md:mb-10 lg:mb-14"
      >
        <div className="flex items-center justify-center mb-2 mt-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mr-3"
          >
            <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FF7800] fill-[#FF7800]" />
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#000000] text-center"
            animate={{
              textShadow: [
                "0 0 0px rgba(59, 130, 246, 0)",
                "0 0 10px rgba(59, 130, 246, 0.2)",
                "0 0 0px rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              fontFamily: "'Rufina', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            EXPLORE OUR <span className="text-[#000000]">EVENTS</span>
          </motion.h2>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="ml-3"
          >
            <Star className="w-5 h-5 md:w-6 md:h-6 text-[#0A84FF] fill-[#0A84FF]" />
          </motion.div>
        </div>

        <div className="flex justify-center">
          <motion.div
            className="h-1 w-24 md:w-32 bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] rounded-full"
            animate={{ width: ["24px", "100px", "24px"] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <p
          className="text-base md:text-lg lg:text-xl text-[#004386]/70 text-center mt-4 max-w-xs md:max-w-lg lg:max-w-2xl mx-auto px-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Experience our prestigious gatherings and transformative programs
        </p>
      </motion.div>

      {/* Enhanced Event Carousel - Responsive layout */}
      <div
        ref={carouselRef}
        className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-[300px] xs:max-w-[320px] sm:max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Card - Hidden on mobile/tablet, visible on desktop */}
        {!isTablet && (
          <div className="relative w-[240px] lg:w-[280px] xl:w-[300px] h-[380px] lg:h-[420px] xl:h-[450px] mr-8 xl:mr-14 perspective hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-card-${currentIndex}`}
                className="absolute inset-0 w-full h-full"
                variants={leftCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${events[currentIndex].leftCard})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "brightness(0.9) contrast(1.1)",
                    }}
                    animate={{
                      scale: [1.05, 1.07, 1.05], // Subtle breathing animation
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Enhanced gradient overlay with bluish tones */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/20 via-[#3B82F6]/40 to-[#3B82F6]/80"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Animated accents */}
                  <motion.div
                    className="absolute top-6 left-6 right-6 bottom-6 border border-[#FF7800]/30 rounded-xl"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(255, 120, 0, 0)",
                        "0 0 8px rgba(255, 120, 0, 0.3)",
                        "0 0 0px rgba(255, 120, 0, 0)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <div className="flex items-center mb-2">
                        <Sparkles className="mr-2 text-[#FF7800]" size={16} />
                        <motion.h3
                          className="text-[#FF7800] text-lg font-medium"
                          animate={{
                            textShadow: "0 0 8px rgba(255, 120, 0, 0.5)",
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          PREVIOUS EVENT
                        </motion.h3>
                      </div>
                      <h4
                        className="text-white text-2xl font-bold mb-3"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {
                          events[
                            (currentIndex - 1 + events.length) % events.length
                          ].title
                        }
                      </h4>
                      <p
                        className="text-white/80 text-sm opacity-80"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {
                          events[
                            (currentIndex - 1 + events.length) % events.length
                          ].date
                        }
                      </p>
                    </motion.div>
                  </div>

                  {/* Enhanced floating elements */}
                  <motion.div
                    className="absolute top-6 right-6"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="text-[#FF7800]" size={18} />
                  </motion.div>

                  {/* Enhanced shine effect - more subtle and repeating */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 7,
                    }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Main Carousel Cards - Responsive sizing with enhanced white & blue aesthetics */}
        <div className="relative w-full xs:w-[320px] sm:w-[400px] md:w-[450px] lg:w-[480px] xl:w-[500px] h-[420px] xs:h-[450px] sm:h-[500px] md:h-[520px] lg:h-[550px] perspective">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={isMobile ? mobileCardVariants : cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full rounded-2xl overflow-hidden shadow-xl bg-white border border-[#E5E7EB]"
              style={{
                transformStyle: "preserve-3d",
                backdropFilter: "blur(40px)",
                boxShadow:
                  "0 10px 30px rgba(59, 130, 246, 0.08), 0 4px 8px rgba(59, 130, 246, 0.05)",
              }}
            >
              {/* Event Image with Refined Parallax Effect */}
              <div className="relative w-full h-[160px] xs:h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/0 z-5" />
                <motion.img
                  src={events[currentIndex].image}
                  alt={events[currentIndex].title}
                  className="w-full h-full object-cover"
                  style={{
                    transform: !isMobile
                      ? `scale(1.05) translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`
                      : "scale(1.05)",
                  }}
                  animate={{
                    scale: [1.05, 1.07, 1.05], // Subtle breathing animation
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-0 right-0 m-4 md:m-6 px-3 py-1 md:px-4 md:py-2 bg-[#FF7800] rounded-full z-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(255, 120, 0, 0.5)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <p
                    className="text-white font-semibold text-xs md:text-sm"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {events[currentIndex].date}
                  </p>
                </motion.div>
              </div>

              {/* Content with staggered animation */}
              <div className="p-4 xs:p-5 sm:p-6 md:p-8 relative">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    <h3
                      className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-[#3B82F6] md:mb-4"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {events[currentIndex].title}
                    </h3>
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="ml-2"
                    >
                      <Sparkles className="text-[#FF7800]" size={18} />
                    </motion.div>
                  </div>
                  <motion.p
                    className="text-xs xs:text-sm md:text-base text-gray-700 leading-relaxed line-clamp-4 sm:line-clamp-5 md:line-clamp-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {events[currentIndex].description}
                  </motion.p>
                </motion.div>

                {/* Animated accent line */}
                <motion.div
                  className="absolute left-5 sm:left-6 md:left-8 top-0 w-12 md:w-16 h-1 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full"
                  animate={{ width: ["12px", "60px", "12px"] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Enhanced CTA Button with bluish tone */}
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-3 xs:mt-4 sm:mt-6 md:mt-8 px-3 py-1.5 xs:px-4 xs:py-2 md:px-6 md:py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs xs:text-sm md:text-base font-medium rounded-full flex items-center space-x-2 transform transition-all duration-300 hover:translate-x-1"
                  whileHover={{
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>Learn More</span>
                  <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="md:w-4 md:h-4"
                  >
                    <path
                      d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                      fill="white"
                    />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Repositioned for different screen sizes */}
          {/* Mobile navigation buttons (top positioned) */}
          {isSmallScreen && (
            <div className="absolute -bottom-14 xs:-bottom-16 left-0 right-0 flex justify-center space-x-16 xs:space-x-20 z-20">
              <motion.button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-[#E5E7EB] hover:bg-[#3B82F6] flex items-center justify-center group transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-4 w-4 text-[#3B82F6] group-hover:text-white" />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white shadow-md border border-[#E5E7EB] hover:bg-[#3B82F6] flex items-center justify-center group transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="h-4 w-4 text-[#3B82F6] group-hover:text-white" />
              </motion.button>
            </div>
          )}

          {/* Tablet/Desktop navigation buttons (side positioned) */}
          {!isSmallScreen && (
            <>
              <div className="absolute -left-8 md:-left-12 lg:-left-16 xl:-left-20 top-1/2 transform -translate-y-1/2 z-20">
                <motion.button
                  onClick={prevSlide}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-[#E5E7EB] hover:bg-[#3B82F6] flex items-center justify-center group transition-all duration-300"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-[#3B82F6] group-hover:text-white" />
                </motion.button>
              </div>
              <div className="absolute -right-8 md:-right-12 lg:-right-16 xl:-right-20 top-1/2 transform -translate-y-1/2 z-20">
                <motion.button
                  onClick={nextSlide}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-[#E5E7EB] hover:bg-[#3B82F6] flex items-center justify-center group transition-all duration-300"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-[#3B82F6] group-hover:text-white" />
                </motion.button>
              </div>
            </>
          )}
        </div>

        {/* Right preview card - Hidden on mobile/tablet, visible on desktop */}
        {!isTablet && (
          <div className="relative w-[200px] lg:w-[220px] xl:w-[250px] h-[330px] lg:h-[350px] xl:h-[380px] ml-8 xl:ml-14 opacity-80 hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-card-${currentIndex}`}
                variants={rightCardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(96, 165, 250, 0.6) 100%)",
                  backdropFilter: "blur(10px)",
                  transformStyle: "preserve-3d",
                  transform: `rotateY(-10deg) translateZ(-30px)`,
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3 },
                }}
              >
                <div className="h-[120px] lg:h-[130px] xl:h-[150px] overflow-hidden">
                  <motion.img
                    src={events[(currentIndex + 1) % events.length].image}
                    alt="Next Event"
                    className="w-full h-full object-cover opacity-70"
                    animate={{
                      scale: [1, 1.05, 1], // Subtle zoom effect
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/0" />
                </div>
                <div className="p-4 lg:p-5">
                  <div className="flex items-center mb-1">
                    <Star className="w-3 h-3 mr-1 text-[#FF7800] fill-[#FF7800]" />
                    <motion.h3
                      className="text-[#FF7800] text-sm font-medium"
                      animate={{ textShadow: "0 0 5px rgba(255, 120, 0, 0.5)" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      UP NEXT
                    </motion.h3>
                  </div>
                  <motion.h4
                    className="text-white text-base lg:text-lg font-bold mb-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {events[(currentIndex + 1) % events.length].title}
                  </motion.h4>
                  <motion.p
                    className="text-white/80 text-xs"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {events[(currentIndex + 1) % events.length].date}
                  </motion.p>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute bottom-4 right-4"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="text-[#FF7800]" size={16} />
                </motion.div>

                {/* Shine effect for the upcoming card */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 8,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Enhanced Dots Indicator with smoother animations */}
      <div className="flex mt-6 xs:mt-8 md:mt-10 lg:mt-12 space-x-1.5 xs:space-x-2 relative z-10">
        {events.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left");
              setCurrentIndex(index);
            }}
            className={`relative h-2 md:h-3 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "w-8 md:w-10 bg-[#FF7800]"
                : "w-2 md:w-3 bg-[#3B82F6]/30"
            }`}
            whileHover={{
              scale: 1.2,
              boxShadow: "0 0 10px rgba(255, 120, 0, 0.5)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 rounded-full bg-[#FF7800] opacity-50"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Enhanced Event Counter */}
      <motion.div
        className="mt-4 md:mt-6 lg:mt-8 text-[#3B82F6]/70 text-sm md:text-base font-medium relative z-10"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <span className="text-[#FF7800] font-bold">{currentIndex + 1}</span>
        <span> / {events.length}</span>
      </motion.div>
    </div>
  );
}
