import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  Play, 
  User,
  CheckCircle2,
  XCircle,
  Shapes,
  Grid3X3
} from 'lucide-react';
import { PUZZLE_QUESTIONS, IMAGES } from './constants';

const GRID_SIZE = 9; // 3x3 grid

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [revealedPieces, setRevealedPieces] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const shuffledQuestions = useMemo(() => {
    return [...PUZZLE_QUESTIONS].sort(() => Math.random() - 0.5);
  }, [gameState === 'playing']);

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = PUZZLE_QUESTIONS.length;

  const handleChoice = (choice: string) => {
    if (feedback) return;

    if (choice === currentQuestion.target) {
      setFeedback('correct');
      
      if (revealedPieces.length < GRID_SIZE) {
        const nextPiece = revealedPieces.length;
        setRevealedPieces(prev => [...prev, nextPiece]);
      }

      setTimeout(() => {
        moveToNext();
      }, 1500);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        moveToNext();
      }, 2000);
    }
  };

  const moveToNext = () => {
    if (currentIndex >= totalQuestions - 1 || revealedPieces.length >= GRID_SIZE) {
      setGameState('end');
    } else {
      setCurrentIndex(i => i + 1);
      setFeedback(null);
    }
  };

  const restart = () => {
    setGameState('start');
    setRevealedPieces([]);
    setCurrentIndex(0);
    setFeedback(null);
  };

  const PuzzleGrid = () => (
    <div className="relative group overflow-hidden rounded-[2.5rem] border-8 border-slate-800 shadow-2xl aspect-square w-full max-w-[400px]">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 bg-slate-900">
        {[...Array(GRID_SIZE)].map((_, i) => (
          <div key={i} className="relative overflow-hidden bg-slate-950 flex items-center justify-center">
            <div 
              style={{
                backgroundImage: `url(${IMAGES.Pedro})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${(i % 3) * 50}% ${Math.floor(i / 3) * 50}%`,
              }}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                revealedPieces.includes(i) 
                ? 'opacity-100' 
                : 'opacity-0 scale-150 rotate-12'
              }`}
            />
            <div className={`absolute inset-0 bg-slate-900 flex items-center justify-center border border-white/5 transition-all duration-700 ${
              revealedPieces.includes(i) ? 'opacity-0 scale-50 rotate-45' : 'opacity-100 scale-100'
            }`}>
              <Shapes className="w-8 h-8 text-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-slate-100 overflow-hidden flex flex-col items-center justify-center p-4">
      
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="z-10 text-center max-w-xl w-full p-12 rounded-[4rem] bg-slate-900/50 backdrop-blur-3xl border border-white/5"
          >
             <div className="mb-10 flex justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 bg-yellow-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl border-4 border-slate-900"
                >
                   <Shapes className="w-16 h-16 text-slate-900" />
                </motion.div>
             </div>
             
             <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-600 leading-none">ՊԵԴՐՈՅԻ ՓԱԶԼԸ</h1>
             <p className="text-slate-500 font-bold uppercase tracking-[0.5em] mb-12 text-xs">HABLAR & DECIR</p>
             
             <button 
               onClick={() => setGameState('playing')}
               className="group w-full py-8 bg-white text-slate-900 rounded-[2.5rem] font-black text-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 border-b-[8px] border-slate-300"
             >
                <Play className="w-10 h-10 fill-slate-900" />
                ՍԿՍԵԼ
             </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 w-full max-w-5xl flex flex-col items-center"
          >
             <div className="w-full flex justify-between items-center mb-12 px-4 max-w-4xl">
                <div className="flex flex-col">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Պրոգրես</div>
                   <div className="text-3xl font-black italic">{revealedPieces.length} / {GRID_SIZE}</div>
                </div>

                <div className="flex flex-col items-end">
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Հարց</div>
                   <div className="text-3xl font-black italic">{currentIndex + 1}</div>
                </div>
             </div>

             <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl mb-12">
                <PuzzleGrid />
                
                <div className="w-full max-w-xl relative">
                  <AnimatePresence mode="wait">
                     <motion.div 
                       key={currentIndex}
                       initial={{ x: 50, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       exit={{ x: -50, opacity: 0 }}
                       className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[4rem] w-full text-center relative overflow-hidden shadow-2xl"
                     >
                        <h2 className="text-4xl md:text-5xl font-black mb-6 italic tracking-tight uppercase leading-tight">
                          "{currentQuestion.prompt}"
                        </h2>
                        <p className="text-slate-400 font-bold mb-12 text-sm md:text-lg italic">({currentQuestion.translation})</p>

                        <div className="grid grid-cols-1 gap-6">
                           {currentQuestion.choices.map(choice => (
                             <button
                               key={choice}
                               disabled={!!feedback}
                               onClick={() => handleChoice(choice)}
                               className={`py-6 rounded-3xl font-black text-2xl transition-all border-b-4 ${
                                 feedback === 'correct' && choice === currentQuestion.target
                                   ? 'bg-emerald-500 border-emerald-700 text-white scale-105'
                                   : feedback === 'incorrect' && choice !== currentQuestion.target
                                   ? 'bg-rose-500 border-rose-700 text-white opacity-50'
                                   : 'bg-slate-800 border-slate-950 text-slate-100 hover:bg-slate-700 hover:translate-y-[-2px]'
                               }`}
                             >
                               {choice}
                             </button>
                           ))}
                        </div>

                        <AnimatePresence>
                           {feedback && (
                             <motion.div 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               exit={{ opacity: 0 }}
                               className={`absolute inset-0 z-30 flex flex-col items-center justify-center backdrop-blur-md rounded-[3rem] ${feedback === 'correct' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}
                             >
                                {feedback === 'correct' ? (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                     <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                                        <CheckCircle2 className="w-14 h-14 text-white" />
                                     </div>
                                     <div className="text-5xl font-black uppercase italic">ՃԻՇՏ Է!</div>
                                  </motion.div>
                                ) : (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                     <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(244,63,94,0.5)]">
                                        <XCircle className="w-14 h-14 text-white" />
                                     </div>
                                     <div className="text-5xl font-black uppercase italic text-rose-400">ՍԽԱԼ Է!</div>
                                     <div className="text-white/60 font-medium mt-4 text-xl">Ճիշտը՝ <span className="font-black text-white">{currentQuestion.target}</span></div>
                                  </motion.div>
                                )}
                             </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  </AnimatePresence>
                </div>
             </div>
          </motion.div>
        )}

        {gameState === 'end' && (
          <motion.div 
            key="end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 text-center max-w-2xl w-full"
          >
             <div className="bg-slate-900/90 backdrop-blur-3xl p-16 md:p-20 rounded-[5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="flex justify-center mb-12">
                   <div className="relative">
                      <PuzzleGrid />
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl z-10"
                      >
                         <Trophy className="w-12 h-12 text-slate-900" />
                      </motion.div>
                   </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                   ՀԱՂԹԱՆԱԿ!
                </h1>
                <p className="text-slate-400 font-bold mb-12 text-xl italic uppercase tracking-widest">Դուք ամբողջացրիք Պեդրոյի փազլը</p>

                <button 
                  onClick={restart}
                  className="w-full py-8 bg-white text-slate-900 rounded-[3rem] font-black text-3xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4"
                >
                  <RotateCcw className="w-10 h-10" />
                  ԿՐԿՆԵԼ
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#020617_100%)]" />
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </div>
  );
}
