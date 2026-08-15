import { useEffect, useState, useRef } from 'react';
import { Play, RotateCcw, X, Code, Sparkles, HelpCircle } from 'lucide-react';

export default function CodeEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const speedRef = useRef(150);

  const codeSnippet = `async function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight: Compare elements
      if (arr[j] > arr[j + 1]) {
        // Highlight: Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`;

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => {
        const next = !prev;
        if (next) {
          generateNewArray();
          setComparing([]);
          setSwapping([]);
          setSorted([]);
          setCurrentLine(-1);
        }
        return next;
      });
    };

    window.addEventListener('toggle-sandbox', handleToggle);
    return () => window.removeEventListener('toggle-sandbox', handleToggle);
  }, []);

  const generateNewArray = () => {
    if (running) return;
    const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 80) + 15);
    setArray(newArray);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setCurrentLine(-1);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const runBubbleSortVisualizer = async () => {
    if (running) return;
    setRunning(true);
    setSorted([]);
    
    const arr = [...array];
    const n = arr.length;

    setCurrentLine(0);
    await sleep(speedRef.current);

    setCurrentLine(1);
    await sleep(speedRef.current);

    for (let i = 0; i < n; i++) {
      setCurrentLine(2);
      await sleep(speedRef.current);

      for (let j = 0; j < n - i - 1; j++) {
        if (!isOpen) break;

        setCurrentLine(3);
        setComparing([j, j + 1]);
        setSwapping([]);
        await sleep(speedRef.current);

        setCurrentLine(4);
        await sleep(speedRef.current);

        if (arr[j] > arr[j + 1]) {
          setCurrentLine(6);
          setSwapping([j, j + 1]);
          
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          setArray([...arr]);
          await sleep(speedRef.current * 1.5);
        }
      }
      setSorted((prev) => [...prev, n - i - 1]);
    }
    
    setSorted(Array.from({ length: n }, (_, i) => i));
    setComparing([]);
    setSwapping([]);
    setCurrentLine(-1);
    setRunning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9985] flex items-center justify-center bg-black/75 p-4 md:p-10 backdrop-blur-md animate-fade-in">
      <div className="flex h-[85vh] w-full max-w-5xl flex-col rounded-xl border border-cyan-500/20 bg-[#0d131f] shadow-[0_0_60px_rgba(6,182,212,0.15)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-800 bg-[#070b13] px-5 py-3 select-none">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold text-gray-200 tracking-wider">
              ALGORITHM SANDBOX - VISUAL COMPILER
            </span>
            <span className="hidden sm:inline-flex rounded-full bg-cyan-950 px-2.5 py-0.5 text-xs font-medium text-cyan-400 border border-cyan-500/20">
              Interactive
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded p-1 text-gray-500 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-800 bg-[#070b13] p-4 overflow-y-auto font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between mb-3 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-800/50 pb-2">
              <span>bubble_sort.js</span>
              <span className="flex items-center gap-1 text-cyan-400/80"><Sparkles className="h-3.5 w-3.5" /> JavaScript ES6</span>
            </div>
            <pre className="relative leading-relaxed text-gray-400">
              {codeSnippet.split('\n').map((line, idx) => {
                const isCurrent = idx === currentLine;
                return (
                  <div 
                    key={idx} 
                    className={`flex items-start px-2 py-0.5 rounded transition-all duration-100 ${
                      isCurrent ? 'bg-cyan-500/15 border-l-2 border-cyan-400 text-cyan-200' : 'border-l-2 border-transparent'
                    }`}
                  >
                    <span className="w-6 text-gray-600 text-right pr-2 select-none">{idx + 1}</span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                );
              })}
            </pre>
          </div>

          <div className="flex-1 flex flex-col bg-[#0d131f] p-6 justify-between overflow-hidden">
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-200 flex items-center gap-2">
                Sorting Execution Sandbox
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Watch the bars sort live as code loops execute. Red elements highlight comparison scopes, Orange denotes active swaps, and Blue highlights sorted values.
              </p>
            </div>

            <div className="flex-1 flex items-end justify-center gap-1.5 bg-[#070b13]/40 border border-gray-800/60 rounded-lg p-6 h-[200px] md:h-auto min-h-[180px]">
              {array.map((val, idx) => {
                const isComparing = comparing.includes(idx);
                const isSwapping = swapping.includes(idx);
                const isSorted = sorted.includes(idx);

                let barColor = 'bg-gray-700/80 border border-gray-600/30';
                if (isSwapping) barColor = 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]';
                else if (isComparing) barColor = 'bg-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
                else if (isSorted) barColor = 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]';

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center max-w-[24px]">
                    <span className="text-[10px] text-gray-500 font-mono mb-1 select-none">{val}</span>
                    <div 
                      className={`w-full rounded-t-sm transition-all duration-150 ${barColor}`} 
                      style={{ height: `${val * 2}px` }} 
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-800/60 pt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={runBubbleSortVisualizer}
                  disabled={running}
                  className="flex items-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 text-black px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer select-none"
                >
                  <Play className="h-4 w-4 fill-black" /> Run Visualizer
                </button>
                <button
                  onClick={generateNewArray}
                  disabled={running}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-800 bg-gray-900/60 hover:bg-gray-800 text-gray-300 disabled:opacity-50 px-4 py-2 text-xs font-semibold transition-colors cursor-pointer select-none"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Randomize
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-mono">Speed:</span>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="50"
                  defaultValue="200"
                  onChange={(e) => {
                    speedRef.current = 650 - parseInt(e.target.value);
                  }}
                  className="w-24 accent-cyan-400"
                  disabled={running}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#070b13] px-5 py-2 border-t border-gray-800 text-[10px] text-gray-500 font-mono">
          <HelpCircle className="h-3.5 w-3.5 text-gray-600" />
          <span>Note: Visual compiler maps line execution speeds via custom runtime timers.</span>
        </div>
      </div>
    </div>
  );
}
