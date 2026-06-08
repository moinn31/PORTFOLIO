import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Loader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="loader-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="loader-hex">
            <div className="loader-hex-inner" />
          </div>
          <p className="loader-text">INITIALIZING</p>
          <div className="loader-bar">
            <div className="loader-bar-fill" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
