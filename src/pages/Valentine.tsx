import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Valentine.module.css';

type Stage = 'envelope' | 'opening' | 'letter' | 'transition' | 'celebration';

const MUSIC_URL = '/those-eyes.mp3';

const ESCAPE_POSITIONS = [
  { x: 100, y: -60 }, { x: 130, y: 20 }, { x: 90, y: 70 },
  { x: 140, y: -30 }, { x: 110, y: 50 }, { x: 150, y: 0 },
];

const Valentine = () => {
  const [stage, setStage] = useState<Stage>('envelope');
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [escIdx, setEscIdx] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const floatingHearts = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      emoji: ['💕', '💗', '💖', '✨', '💝'][i % 5],
    })), []);

  const explosionHearts = useMemo(() =>
    [...Array(40)].map((_, i) => {
      const angle = (i / 40) * Math.PI * 2;
      const dist = 500 + Math.random() * 500;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 2 + Math.random() * 2.5,
        duration: 1.2 + Math.random() * 0.6,
        delay: Math.random() * 0.3,
        emoji: ['💖', '💕', '❤️', '💗', '💝', '❤️‍🔥'][i % 6],
      };
    }), []);

  const confetti = useMemo(() => 
    [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 4,
      emoji: ['💖', '💕', '❤️', '✨', '🌹', '💝'][i % 6],
    })), []);

  const handleEnvelopeClick = () => {
    if (stage !== 'envelope') return;
    if (audioRef.current && !musicOn) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setMusicOn(true)).catch(() => {});
    }
    setStage('opening');
    setTimeout(() => setStage('letter'), 1000);
  };

  const handleYes = () => {
    setStage('transition');
    setTimeout(() => setStage('celebration'), 1800);
  };

  const handleNoHover = () => {
    setHoverCount(h => h + 1);
    const next = (escIdx + 1) % ESCAPE_POSITIONS.length;
    setEscIdx(next);
    setNoPos(ESCAPE_POSITIONS[next]);
  };

  const noMsgs = ['No', 'Aisa mat kro 🥺', 'Pwease? 💔', 'Pretty Please?', 'Badtameez', 'Bhaw kha rhi ho'];

  const isOpen = stage === 'opening' || stage === 'letter' || stage === 'transition';
  const letterUp = stage === 'letter';
  const letterDown = stage === 'transition';
  const showEnv = stage !== 'celebration';
  const showExplosion = stage === 'transition';
  const showCeleb = stage === 'celebration';

  return (
    <div className={styles.page}>
      <audio ref={audioRef} src={MUSIC_URL} loop />
      
      <button className={styles.musicBtn} onClick={() => {
        if (audioRef.current) {
          musicOn ? audioRef.current.pause() : audioRef.current.play();
          setMusicOn(!musicOn);
        }
      }}>
        {musicOn ? '🎵' : '🔇'}
      </button>

      <div className={styles.bg} />

      {/* Floating hearts */}
      <div className={styles.floatLayer}>
        {floatingHearts.map(h => (
          <motion.span
            key={h.id}
            className={styles.floatHeart}
            style={{ left: h.left }}
            animate={{ y: ['100vh', '-10vh'] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
          >
            {h.emoji}
          </motion.span>
        ))}
      </div>

      {/* Main content */}
      <div className={styles.center}>
        
        {/* ══════════ ENVELOPE SYSTEM ══════════ */}
        <AnimatePresence>
          {showEnv && (
            <motion.div 
              className={styles.envSystem}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              {/* Top text */}
              {stage === 'envelope' && (
                <motion.p 
                  className={styles.topText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  A little something for you...
                </motion.p>
              )}

              {/* Container for envelope + letter */}
              <div className={styles.envContainer}>
                
                {/* ENVELOPE */}
                <motion.div 
                  className={styles.envelope}
                  onClick={handleEnvelopeClick}
                  style={{ cursor: stage === 'envelope' ? 'pointer' : 'default' }}
                  animate={{ y: isOpen ? 100 : 0 }}
                  transition={{ type: 'spring', stiffness: 60, damping: 14 }}
                >
                  {/* Envelope body (white pocket) */}
                  <div className={styles.envBody}>
                    {/* Inner shadow/depth */}
                    <div className={styles.envInner} />
                  </div>

                  {/* Flap - rotates open */}
                  <motion.div
                    className={styles.flap}
                    animate={{ 
                      rotateX: isOpen ? -180 : 0,
                      zIndex: isOpen ? 1 : 20,
                    }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Decorative edge pattern */}
                    <div className={styles.flapPattern} />
                    {/* Heart seal */}
                    <div className={styles.seal}>❤️</div>
                  </motion.div>

                  {/* LETTER - inside envelope, rises up */}
                  <motion.div
                    className={styles.letter}
                    animate={{
                      y: letterUp ? -380 : (letterDown ? 0 : 0),
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 50, 
                      damping: 13,
                      delay: isOpen && !letterDown ? 0.3 : 0,
                    }}
                    style={{ pointerEvents: letterUp ? 'auto' : 'none' }}
                  >
                    <div className={styles.letterContent}>
                      <h1 className={styles.hi}>Hey Vandita!</h1>
                      <div className={styles.divider}>── 💝 ──</div>
                      <p className={styles.sub}>I have a very important question...</p>
                      <div className={styles.emoji}>🥺👉👈</div>
                      <h2 className={styles.mainQ}>Will you be my Valentine?</h2>
                      
                      <div className={styles.btns}>
                        <motion.button
                          className={styles.yesBtn}
                          onClick={handleYes}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Yes! 💖
                        </motion.button>
                        <motion.button
                          className={styles.noBtn}
                          onMouseEnter={handleNoHover}
                          onTouchStart={handleNoHover}
                          initial={{ x: 0, y: 0 }}
                          animate={{ x: noPos.x, y: noPos.y }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          style={{ willChange: 'transform' }}
                        >
                          {noMsgs[hoverCount % noMsgs.length]}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom text */}
              {stage === 'envelope' && (
                <motion.p 
                  className={styles.bottomText}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  tap to open 💕
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════ HEART EXPLOSION ══════════ */}
        <AnimatePresence>
          {showExplosion && (
            <div className={styles.explosion}>
              {explosionHearts.map(h => (
                <motion.span
                  key={h.id}
                  style={{ fontSize: `${h.size}rem` }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ x: h.x, y: h.y, scale: 1, opacity: 0 }}
                  transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
                >
                  {h.emoji}
                </motion.span>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* ══════════ CELEBRATION ══════════ */}
        <AnimatePresence>
          {showCeleb && (
            <motion.div
              className={styles.celeb}
              initial={{ opacity: 0, scale: 0.5, y: 80 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 12 }}
            >
              {/* Confetti */}
              <div className={styles.confettiWrap}>
                {confetti.map(c => (
                  <motion.span
                    key={c.id}
                    className={styles.confetti}
                    style={{ left: `${c.x}%` }}
                    animate={{ y: ['-5vh', '105vh'] }}
                    transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'linear' }}
                  >
                    {c.emoji}
                  </motion.span>
                ))}
              </div>

              <div className={styles.celebCard}>
                <motion.h1 
                  className={styles.celebTitle}
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                >
                  YIPEEEEEE 💖
                </motion.h1>
                <motion.div 
                  className={styles.celebEmoji}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🎉 🥳 🎉
                </motion.div>
                <motion.div 
                  className={styles.celebDance}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  💃 ❤️‍🔥 🕺
                </motion.div>
                <div className={styles.celebMsg}>
                  <p className={styles.celebText}>I knew you'd say yes, Bhondu!</p>
                  <span className={styles.celebHeart}>💝</span>
                  <p className={styles.celebSub}>Can't wait to spend Valentine's Day with you!</p>
                </div>
                <p className={styles.sig}>💖 Forever yours, Sanchit 💖</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Valentine;
