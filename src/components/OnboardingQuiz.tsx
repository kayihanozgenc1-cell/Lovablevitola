import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroCigars from "@/assets/hero-cigars.jpg";

export type UserLevel = "novice" | "aficionado" | "collector";

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
    points: { novice: number; aficionado: number; collector: number };
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "How often do you enjoy a cigar?",
    subtitle: "Your ritual defines your relationship with the leaf",
    options: [
      { label: "Rarely or Never", description: "I'm just getting curious", value: "a", points: { novice: 3, aficionado: 0, collector: 0 } },
      { label: "Occasionally", description: "Special occasions & weekends", value: "b", points: { novice: 1, aficionado: 2, collector: 0 } },
      { label: "Weekly", description: "A cherished weekly ritual", value: "c", points: { novice: 0, aficionado: 3, collector: 1 } },
      { label: "Daily", description: "Life is too short for bad cigars", value: "d", points: { novice: 0, aficionado: 1, collector: 3 } },
    ],
  },
  {
    id: 2,
    question: "What matters most to you?",
    subtitle: "Every palate tells a different story",
    options: [
      { label: "Mild & Smooth", description: "Creamy, light, easy to enjoy", value: "a", points: { novice: 3, aficionado: 1, collector: 0 } },
      { label: "Balanced Complexity", description: "Layers that reveal themselves slowly", value: "b", points: { novice: 0, aficionado: 3, collector: 1 } },
      { label: "Bold & Full-Bodied", description: "Rich, powerful, intense flavors", value: "c", points: { novice: 0, aficionado: 2, collector: 3 } },
      { label: "Rare & Vintage", description: "Age-worthy, limited editions", value: "d", points: { novice: 0, aficionado: 0, collector: 3 } },
    ],
  },
  {
    id: 3,
    question: "How familiar are you with cigar origins?",
    subtitle: "Terroir shapes the character of every leaf",
    options: [
      { label: "Just getting started", description: "Cuba? Nicaragua? Still learning", value: "a", points: { novice: 3, aficionado: 0, collector: 0 } },
      { label: "I know the basics", description: "I can name a few regions & brands", value: "b", points: { novice: 1, aficionado: 3, collector: 0 } },
      { label: "Quite knowledgeable", description: "I follow specific vitolas & blenders", value: "c", points: { novice: 0, aficionado: 2, collector: 2 } },
      { label: "Deeply passionate", description: "Pre-embargo, vintage year, factory ID — I know it all", value: "d", points: { novice: 0, aficionado: 0, collector: 3 } },
    ],
  },
];

const levelConfig = {
  novice: {
    title: "The Gentleman Newcomer",
    subtitle: "Your journey into the world of premium cigars begins now.",
    description: "We'll guide you through the essentials — from your first mild smoke to understanding what makes a great cigar. Your adventure starts with the finest introductions.",
    icon: "🌿",
    color: "hsl(var(--gold))",
  },
  aficionado: {
    title: "The Seasoned Aficionado",
    subtitle: "You appreciate the art. Now let's refine your collection.",
    description: "You know the difference between a Robusto and a Churchill. Let us help you discover exceptional blends, deepen your tasting notes, and build a humidor worth admiring.",
    icon: "🥃",
    color: "hsl(var(--gold))",
  },
  collector: {
    title: "The Discerning Collector",
    subtitle: "Welcome to the inner circle.",
    description: "For you, cigars are a passion, a culture, an investment. We've curated a world of rare finds, aged beauties, and limited releases — worthy of your refined palate.",
    icon: "👑",
    color: "hsl(var(--gold))",
  },
};

interface OnboardingQuizProps {
  onComplete: (level: UserLevel) => void;
}

export function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<UserLevel | null>(null);

  const calculateResult = (finalAnswers: string[]): UserLevel => {
    const totals = { novice: 0, aficionado: 0, collector: 0 };
    finalAnswers.forEach((answer, i) => {
      const option = questions[i].options.find((o) => o.value === answer);
      if (option) {
        totals.novice += option.points.novice;
        totals.aficionado += option.points.aficionado;
        totals.collector += option.points.collector;
      }
    });
    return Object.entries(totals).sort(([, a], [, b]) => b - a)[0][0] as UserLevel;
  };

  const handleAnswer = (value: string) => {
    setSelectedOption(value);
    setTimeout(() => {
      const newAnswers = [...answers, value];
      if (currentQuestion < questions.length - 1) {
        setAnswers(newAnswers);
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        const level = calculateResult(newAnswers);
        setResult(level);
        setStep("result");
      }
    }, 400);
  };

  const q = questions[currentQuestion];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroCigars})` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(20 15% 4% / 0.7) 0%, hsl(20 15% 6% / 0.95) 100%)" }} />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="divider-gold mx-auto w-24 mb-8" />
                <p className="text-xs font-ui tracking-[0.25em] uppercase text-gold mb-4">Welcome to</p>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-cream mb-4 leading-tight">
                  Cigar<br />
                  <span className="smoke-text">Companion</span>
                </h1>
                <div className="divider-gold mx-auto w-24 mt-6 mb-8" />
                <p className="font-serif-body text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Every great journey begins with the perfect cigar. Let us craft your personal experience — from first light to finest collection.
                </p>
              </div>
              <button
                onClick={() => setStep("quiz")}
                className="group relative inline-flex items-center gap-3 px-10 py-4 border border-gold text-gold font-ui font-medium tracking-[0.12em] uppercase text-sm transition-all duration-300 hover:bg-gold hover:text-mahogany hover:shadow-gold"
              >
                <span>Begin Your Journey</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
              <p className="mt-6 text-xs text-muted-foreground font-ui tracking-wider">
                3 questions · 2 minutes
              </p>
            </motion.div>
          )}

          {/* QUIZ */}
          {step === "quiz" && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Progress */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-ui tracking-[0.2em] uppercase text-gold">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-xs font-ui text-muted-foreground">
                    {Math.round(((currentQuestion) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-px bg-border">
                  <div
                    className="h-px bg-gold transition-all duration-500"
                    style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8 text-center">
                <h2 className="font-display text-3xl md:text-4xl text-cream mb-3">{q.question}</h2>
                <p className="font-serif-body text-muted-foreground italic">{q.subtitle}</p>
              </div>

              {/* Options */}
              <div className="grid gap-3">
                {q.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`group w-full text-left p-5 border transition-all duration-300 ${
                      selectedOption === option.value
                        ? "border-gold bg-gold/10 shadow-gold"
                        : "border-border bg-card hover:border-gold/50 hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 transition-all duration-300 ${
                          selectedOption === option.value
                            ? "border-gold bg-gold"
                            : "border-border group-hover:border-gold/50"
                        }`}
                      />
                      <div>
                        <p className="font-ui font-medium text-foreground text-sm">{option.label}</p>
                        <p className="font-serif-body text-muted-foreground text-sm mt-0.5">{option.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULT */}
          {step === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <div className="divider-gold mx-auto w-24 mb-8" />
              <p className="text-xs font-ui tracking-[0.25em] uppercase text-gold mb-3">Your Profile</p>
              <div className="text-6xl mb-6 animate-float">{levelConfig[result].icon}</div>
              <h2 className="font-display text-4xl md:text-5xl text-cream mb-3">
                {levelConfig[result].title}
              </h2>
              <p className="font-serif-body text-lg text-gold italic mb-6">
                {levelConfig[result].subtitle}
              </p>
              <div className="divider-gold mx-auto w-16 mb-6" />
              <p className="font-serif-body text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
                {levelConfig[result].description}
              </p>
              <button
                onClick={() => onComplete(result)}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-mahogany font-ui font-semibold tracking-[0.12em] uppercase text-sm transition-all duration-300 hover:shadow-gold hover:scale-[1.02]"
              >
                <span>Enter Your Sanctuary</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
