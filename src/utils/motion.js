export const textVariant = (delay) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

export const fadeIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0, // tùy chọn left hay right mà dịch vị trí sang bên đó
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,    // tùy chọn up hay down mà dịch vị trí sang bên đó
      opacity: 0, // ban đầu ẩn
    },
    show: {
      x: 0,   // về lại vị trí
      y: 0,
      opacity: 1, // hiện ra đầy đủ
      transition: {
        type: type,   // kiểu chuyển động: "spring" hoặc "tween"
        delay: delay, // trễ bao nhiêu giây
        duration: duration,  // kéo dài bao nhiêu giây
        ease: "easeOut", // dạng easing (giảm dần tốc độ)
      },
    },
  };
};

export const zoomIn = (delay, duration) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};