import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dickfos Brothers | Same DNA, Different Decisions",
  description: "Two brothers. One brand. Same DNA, different decisions.",
};

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0B0C] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Dickfos Brothers</h1>
        <p className="text-xl text-[#a1a1aa]">Same DNA, Different Decisions</p>
      </div>
    </div>
  );
}
