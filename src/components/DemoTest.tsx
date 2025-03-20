import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Calendar, PlayCircle } from 'lucide-react';

const testDays = [
  {
    day: 1,
    title: "Animals and Nature",
    duration: 300, // 5 minutes in seconds
    description: "Learn about different animals and natural phenomena!"
  },
  {
    day: 2,
    title: "Shapes and Colors",
    duration: 300,
    description: "Explore the world of shapes and colors!"
  },
  {
    day: 3,
    title: "Weather and Seasons",
    duration: 300,
    description: "Discover different weather types and seasons!"
  }
];

const demoQuestions = [
  {
    id: 1,
    question: "What animal is shown in this GIF?",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtY2JrY2Q5Y2kzZWF1NWF4bXE1Z2VlaXJ6YnB6aHBxOGprNXB3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o85xGocUH8RYoDKKs/giphy.gif",
    options: ["Elephant", "Giraffe", "Lion", "Tiger"],
    correctAnswer: "Elephant",
    explanation: "This is an elephant! Elephants are the largest land animals on Earth."
  },
  {
    id: 2,
    question: "What shape is being drawn in this GIF?",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNG41ZWJjMWM2YmJkMjQxNmNjNzFjYTY4YjQ5ZmM5ZDM4ZWJhNzU2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btPCcdNniyf0ArS/giphy.gif",
    options: ["Circle", "Square", "Triangle", "Star"],
    correctAnswer: "Star",
    explanation: "A star has five points and is a beautiful shape we can see in the night sky!"
  },
  {
    id: 3,
    question: "What is this weather phenomenon?",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJxbmN0M2t4ZWx5ZXd0ZmxqbWR6YnBxaWx6YWN0aHZ0ZWxvNm1xdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHB1EKuujDjYFWw/giphy.gif",
    options: ["Rain", "Snow", "Rainbow", "Lightning"],
    correctAnswer: "Rainbow",
    explanation: "A rainbow appears when sunlight hits water droplets in the air. It shows all the beautiful colors!"
  }
];

export default function DemoTest() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showTestInfo, setShowTestInfo] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && testStarted) {
      setShowResults(true);
      setTestStarted(false);
    }
    return () => clearInterval(timer);
  }, [testStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setShowTestInfo(true);
  };

  const handleStartTest = () => {
    setTestStarted(true);
    setTimeRemaining(testDays[selectedDay! - 1].duration);
    setShowTestInfo(false);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < demoQuestions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      setShowResults(true);
      setTestStarted(false);
    }
  };

  const calculateScore = () => {
    return demoQuestions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  if (!isCheckedIn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Welcome to Kids Learning Tests! 👋</h2>
        <p className="text-xl text-gray-600 mb-8">Click the button below to check in and start your learning adventure!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCheckIn}
          className="px-8 py-4 bg-blue-500 text-white text-xl font-medium rounded-xl hover:bg-blue-600 transition-colors"
        >
          Check In Now! 🎉
        </motion.button>
      </motion.div>
    );
  }

  if (!selectedDay) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Test Day! 📚</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testDays.map((test) => (
            <motion.button
              key={test.day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDaySelect(test.day)}
              className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white text-center hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              <Calendar className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Day {test.day}</h3>
              <p className="text-lg">{test.title}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  if (showTestInfo) {
    const selectedTest = testDays[selectedDay - 1];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Day {selectedTest.day}: {selectedTest.title}</h2>
        <div className="mb-8">
          <p className="text-xl text-gray-600 mb-4">{selectedTest.description}</p>
          <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
            <Clock className="w-6 h-6" />
            <span>Time allowed: {formatTime(selectedTest.duration)}</span>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDay(null)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
          >
            ← Back to Days
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartTest}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <PlayCircle className="w-6 h-6" />
            Start Test!
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {score === demoQuestions.length ? "🎉 Perfect Score! 🎉" : "Test Results"}
        </h2>
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-500 mb-8">
            Score: {score}/{demoQuestions.length}
          </p>
          {demoQuestions.map((question, index) => (
            <div key={question.id} className="mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-center mb-4">
                <img 
                  src={question.gif} 
                  alt={question.question}
                  className="rounded-lg h-48 object-cover"
                />
              </div>
              <p className="font-medium text-xl mb-3">{question.question}</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <p className="text-lg">Your answer: <span className="font-semibold">{selectedAnswers[index]}</span></p>
                {selectedAnswers[index] === question.correctAnswer ? (
                  <CheckCircle className="text-green-500 h-6 w-6" />
                ) : (
                  <XCircle className="text-red-500 h-6 w-6" />
                )}
              </div>
              <p className="text-gray-600 italic">{question.explanation}</p>
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedDay(null);
              setSelectedAnswers([]);
              setCurrentQuestion(0);
              setShowResults(false);
            }}
            className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Try Another Day! 🌟
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const currentQ = demoQuestions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Fun Picture Quiz!</h2>
        <div className="text-xl font-medium text-blue-500 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          {formatTime(timeRemaining)}
        </div>
      </div>
      <div className="mb-8">
        <p className="text-lg mb-4">Question {currentQuestion + 1} of {demoQuestions.length}</p>
        <div className="flex justify-center mb-6">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={currentQ.gif}
            alt={currentQ.question}
            className="rounded-xl h-64 object-cover shadow-md"
          />
        </div>
        <p className="text-2xl font-medium text-center">{currentQ.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {currentQ.options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option)}
            className={`p-4 text-center rounded-xl text-lg font-medium transition-colors ${
              selectedAnswers[currentQuestion] === option
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        disabled={!selectedAnswers[currentQuestion]}
        className={`mt-8 w-full py-4 rounded-xl text-lg font-medium ${
          selectedAnswers[currentQuestion]
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {currentQuestion === demoQuestions.length - 1 ? '🎉 Finish Quiz!' : 'Next Question →'}
      </motion.button>
    </motion.div>
  );
}