

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass p-card ${className ?? ""}`}>
      {children}
    </div>
  );
}