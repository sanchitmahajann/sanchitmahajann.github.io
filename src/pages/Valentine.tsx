import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Valentine.module.css';

type Stage = 'envelope' | 'letter' | 'celebration';

// "Those Eyes" by New West - You'll need to add the audio file to public folder
const MUSIC_URL = '/those-eyes.mp3';

// Predefined escape positions that avoid the Yes button
const ESCAPE_POSITIONS = [
  { x: 100, y: -60 },
  { x: 130, y: 20 },
  { x: 90, y: 70 },
  { x: 140, y: -30 },
  { x: 110, y: 50 },
  { x: 150, y: 0 },
  { x: 80, y: -80 },
  { x: 120, y: 40 },
];

const Valentine = () => {
  const [stage, setStage] = useState<Stage>('envelope');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [escapeIndex, setEscapeIndex] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Memoize floating elements
  const heartsData = useMemo(() => 
    [...Array(25)].map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 0.8 + Math.random() * 1.2,
      emoji: ['💕', '💗', '💖', '✨', '💝', '🌸'][Math.floor(Math.random() * 6)],
    })), 
  []);

  const sparklesData = useMemo(() =>
    [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    })),
  []);

  const confettiData = useMemo(() => 
    [...Array(60)].map((_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 3,
      direction: Math.random() > 0.5 ? 1 : -1,
      emoji: ['💖', '💕', '❤️', '💗', '✨', '🌹', '💝', '🎀'][Math.floor(Math.random() * 8)],
      size: 0.8 + Math.random() * 0.8,
    })),
  []);

  const handleEnvelopeClick = () => {
    setStage('letter');
    // Start music on first interaction
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(console.error);
    }
  };

  const handleYesClick = () => setStage('celebration');

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleNoHover = () => {
    setHoverCount(prev => prev + 1);
    const nextIndex = (escapeIndex + 1) % ESCAPE_POSITIONS.length;
    setEscapeIndex(nextIndex);
    const pos = ESCAPE_POSITIONS[nextIndex];
    const variation = { x: (Math.random() - 0.5) * 15, y: (Math.random() - 0.5) * 15 };
    setNoButtonPosition({ x: pos.x + variation.x, y: pos.y + variation.y });
  };

  // Playful messages when No button is hovered
  const noButtonMessages = ['No', 'Aisa mat krow 🥺', 'Pwease? 💔', 'Pretty Please? With a cherry on top!', 'Badtameez', 'Chalti ban', 'Tryhard', 'Gandi ladki', 'At this point aap bhaw kha rahi ho'];

  return (
    <div className={styles.container}>
      {/* Background Music */}
      <audio ref={audioRef} src={MUSIC_URL} loop />

      {/* Music Toggle Button */}
      <motion.button
        className={styles.musicToggle}
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        title={isMusicPlaying ? 'Pause music' : 'Play music'}
      >
        {isMusicPlaying ? '🎵' : '🔇'}
      </motion.button>

      {/* Animated gradient background */}
      <div className={styles.gradientBg} />
      
      {/* Floating hearts layer */}
      <div className={styles.floatingLayer}>
        {heartsData.map((heart) => (
          <motion.div
            key={heart.id}
            className={styles.floatingHeart}
            style={{ left: heart.left, fontSize: `${heart.size}rem` }}
            initial={{ y: '100vh', opacity: 0, rotate: -20 }}
            animate={{ 
              y: '-100vh', 
              opacity: [0, 1, 1, 0],
              rotate: [-20, 20, -20],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </div>

      {/* Sparkle layer */}
      <div className={styles.sparkleLayer}>
        {sparklesData.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className={styles.sparkle}
            style={{ left: sparkle.left, top: sparkle.top }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ════════════════ ENVELOPE STAGE ════════════════ */}
        {stage === 'envelope' && (
          <motion.div
            key="envelope"
            className={styles.envelopeStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className={styles.forYouText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              A little something for you...
            </motion.p>

            <motion.div
              className={styles.envelopeWrapper}
              onClick={handleEnvelopeClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Envelope glow effect */}
              <motion.div 
                className={styles.envelopeGlow}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Main envelope */}
              <motion.div 
                className={styles.envelope}
                animate={{ 
                  y: [0, -8, 0],
                  rotateZ: [0, -2, 2, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className={styles.envelopeTop} />
                <div className={styles.envelopeBody}>
                  <span className={styles.heartSeal}>💌</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.p 
              className={styles.tapText}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
            >
              tap to open 💕
            </motion.p>
          </motion.div>
        )}

        {/* ════════════════ LETTER STAGE ════════════════ */}
        {stage === 'letter' && (
          <motion.div
            key="letter"
            className={styles.letterStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
          >
            <motion.div 
              className={styles.letterCard}
              initial={{ scale: 0.3, rotateX: 90, y: 100 }}
              animate={{ scale: 1, rotateX: 0, y: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.8,
              }}
            >
              {/* Decorative corners */}
              <div className={`${styles.corner} ${styles.cornerTL}`}>❀</div>
              <div className={`${styles.corner} ${styles.cornerTR}`}>❀</div>
              <div className={`${styles.corner} ${styles.cornerBL}`}>❀</div>
              <div className={`${styles.corner} ${styles.cornerBR}`}>❀</div>

              {/* Letter content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h1 className={styles.greeting}>Hey Vandita!</h1>
                <div className={styles.heartDivider}>
                  <span>─────</span>
                  <span className={styles.dividerHeart}>💝</span>
                  <span>─────</span>
                </div>
              </motion.div>

              <motion.div
                className={styles.questionSection}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <p className={styles.preQuestion}>I have a very important question...</p>
                
                <motion.div 
                  className={styles.cuteEmoji}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🥺👉👈
                </motion.div>

                <h2 className={styles.mainQuestion}>
                  Will you be my Valentine?
                </h2>
              </motion.div>

              <motion.div 
                className={styles.buttonsArea}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.button
                  className={styles.yesBtn}
                  onClick={handleYesClick}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 8px 30px rgba(255, 100, 150, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 4px 20px rgba(255, 100, 150, 0.3)',
                      '0 4px 30px rgba(255, 100, 150, 0.5)',
                      '0 4px 20px rgba(255, 100, 150, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Yes! 💖
                </motion.button>

                <motion.button
                  className={styles.noBtn}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {noButtonMessages[hoverCount % noButtonMessages.length]}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* ════════════════ CELEBRATION STAGE ════════════════ */}
        {stage === 'celebration' && (
          <motion.div
            key="celebration"
            className={styles.celebrationStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Confetti */}
            <div className={styles.confettiLayer}>
              {confettiData.map((c) => (
                <motion.div
                  key={c.id}
                  className={styles.confettiPiece}
                  style={{ fontSize: `${c.size}rem` }}
                  initial={{ x: `${c.initialX}vw`, y: -50, rotate: 0 }}
                  animate={{ y: '110vh', rotate: 360 * c.direction }}
                  transition={{
                    duration: c.duration,
                    delay: c.delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {c.emoji}
                </motion.div>
              ))}
            </div>

            <motion.div 
              className={styles.celebrationCard}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
              <motion.div
                className={styles.celebEmojis}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                🎉✨🎉
              </motion.div>

              <motion.h1 
                className={styles.yayTitle}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                Yayyyy!
              </motion.h1>

              <motion.div 
                className={styles.dancingHearts}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                💃❤️🕺
              </motion.div>

              <motion.div 
                className={styles.loveMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className={styles.knewIt}>I knew you'd say yes, Bhondu! 💕</p>
                <div className={styles.messageDivider}>💝</div>
                <p className={styles.cantWait}>
                  Can't wait to spend<br/>
                  Valentine's Day with you!
                </p>
              </motion.div>

              <motion.div 
                className={styles.finalHearts}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                💖 Forever yours 💖
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Valentine;
