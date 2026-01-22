export function StatusBanner({ text }: { text: string }) {
  return (
    <div className="bg-primary/5 border-b border-primary/10 px-4 py-3 text-center">
      <p className="text-sm font-medium text-primary font-urbanist">
        {text}
      </p>
    </div>
  );
}
