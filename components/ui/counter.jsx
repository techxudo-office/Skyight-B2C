const Counter = ({ label, value, setValue, min = 0, max = 10 }) => (
  <div className="flex items-center justify-between py-1 text-foreground">
    <span>{label}</span>
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={() => setValue(Math.max(min, value - 1))}
        className="w-6 h-6 text-lg leading-tight border rounded text-foreground border-input bg-background hover:bg-muted"
      >
        –
      </button>
      <span>{value}</span>
      <button
        type="button"
        onClick={() => setValue(Math.min(max, value + 1))}
        className="w-6 h-6 text-lg leading-tight border rounded text-foreground border-input bg-background hover:bg-muted"
      >
        +
      </button>
    </div>
  </div>
);

export { Counter };
