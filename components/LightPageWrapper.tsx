export default function LightPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#000000] text-white min-h-screen">
      {children}
    </div>
  );
}
