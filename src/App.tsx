import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Clock } from 'lucide-react';

type TimerMode = 'work' | 'break';

function App() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            setMode(mode === 'work' ? 'break' : 'work');
            setMinutes(mode === 'work' ? breakTime : workTime);
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode, workTime, breakTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(workTime);
    setSeconds(0);
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleWorkTimeChange = (value: number) => {
    const newValue = Math.max(1, Math.min(60, value));
    setWorkTime(newValue);
    if (mode === 'work' && !isActive) {
      setMinutes(newValue);
      setSeconds(0);
    }
  };

  const handleBreakTimeChange = (value: number) => {
    const newValue = Math.max(1, Math.min(30, value));
    setBreakTime(newValue);
    if (mode === 'break' && !isActive) {
      setMinutes(newValue);
      setSeconds(0);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          playsInline
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="https://tactusmarketing.com/wp-content/uploads/tactus-waves-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {/* Timer Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2">
                {mode === 'work' ? 'Work Time' : 'Break Time'}
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                {mode === 'work' ? (
                  <Brain className="w-6 h-6 text-white" />
                ) : (
                  <Coffee className="w-6 h-6 text-white" />
                )}
                <span className="text-white/80">
                  {mode === 'work' ? 'Stay focused!' : 'Time to relax'}
                </span>
              </div>
              <div className="text-7xl font-bold text-white mb-8 font-mono">
                {formatTime(minutes, seconds)}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleTimer}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all"
                >
                  {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
            {/* Timer Settings */}
            <div className="mb-8 p-4 bg-white/5 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timer Settings
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Work Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={workTime}
                    onChange={(e) => handleWorkTimeChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max="60"
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                    disabled={isActive}
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    Break Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={breakTime}
                    onChange={(e) => handleBreakTimeChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max="30"
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                    disabled={isActive}
                  />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <h2 className="text-2xl font-bold text-white mb-6">How to Use</h2>
            <div className="space-y-4 text-white/80">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Work Session</h3>
                  <p>Focus on your task without any distractions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Break Time</h3>
                  <p>Take a short break to recharge</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <p className="text-sm">
                  The Pomodoro Technique helps you stay focused and productive by breaking your work into manageable chunks, followed by short breaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
