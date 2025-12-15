import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GeometricBackground = ({ variant = 'light' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let shapes = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Create geometric shapes
    const createShapes = () => {
      shapes = [];
      const numShapes = Math.floor((canvas.width * canvas.height) / 50000);

      for (let i = 0; i < numShapes; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 10,
          type: ['circle', 'square', 'triangle', 'line', 'cross'][Math.floor(Math.random() * 5)],
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          opacity: Math.random() * 0.15 + 0.05,
          color: variant === 'light'
            ? `rgba(22, 163, 74, ${Math.random() * 0.15 + 0.05})`
            : `rgba(134, 239, 172, ${Math.random() * 0.1 + 0.05})`,
        });
      }
    };

    createShapes();

    const drawShape = (shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = shape.color;
      ctx.fillStyle = shape.color;
      ctx.lineWidth = 1.5;

      switch (shape.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'square':
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.stroke();
          break;
        case 'line':
          ctx.beginPath();
          ctx.moveTo(-shape.size / 2, 0);
          ctx.lineTo(shape.size / 2, 0);
          ctx.stroke();
          break;
        case 'cross':
          ctx.beginPath();
          ctx.moveTo(-shape.size / 2, 0);
          ctx.lineTo(shape.size / 2, 0);
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(0, shape.size / 2);
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        // Update position
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += shape.rotationSpeed;

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

        drawShape(shape);
      });

      // Draw connecting lines between nearby shapes
      shapes.forEach((shape1, i) => {
        shapes.slice(i + 1).forEach((shape2) => {
          const dx = shape1.x - shape2.x;
          const dy = shape1.y - shape2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = variant === 'light'
              ? `rgba(22, 163, 74, ${0.05 * (1 - distance / 150)})`
              : `rgba(134, 239, 172, ${0.03 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(shape1.x, shape1.y);
            ctx.lineTo(shape2.x, shape2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// Additional floating elements for extra visual interest
export const FloatingElements = () => {
  const elements = [
    { icon: '₽', delay: 0 },
    { icon: '$', delay: 1 },
    { icon: '€', delay: 2 },
    { icon: '֏', delay: 3 },
    { icon: '%', delay: 0.5 },
    { icon: '∑', delay: 1.5 },
    { icon: '∞', delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl font-bold text-primary-500/10"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ['0%', '100%'],
            x: [`${20 + index * 10}%`, `${30 + index * 8}%`],
          }}
          transition={{
            duration: 20 + index * 5,
            delay: el.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {el.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default GeometricBackground;
