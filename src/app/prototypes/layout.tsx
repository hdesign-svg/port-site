/**
 * Prototype routes — isolated from portfolio shell (for Screen Studio capture).
 */
export default function PrototypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-[#1a1d21] antialiased">
      {children}
    </div>
  );
}
