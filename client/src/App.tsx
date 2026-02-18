import ConfessionForm from './components/ConfessionForm';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-serif text-white tracking-widest mb-2">
            VATICAN <span className="text-vaticanGold">OS</span>
        </h1>
        <p className="text-slate-500 italic">Strict Equality. Immutable Logs. Infinite Precision.</p>
      </header>

      <ConfessionForm />

      <footer className="mt-12 text-slate-700 text-xs">
        <p>Powered by The Jesuit Order & Node.js</p>
        <p>v1.0.0 (Sede Vacante)</p>
      </footer>
    </div>
  );
}

export default App;