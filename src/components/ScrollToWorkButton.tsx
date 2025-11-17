"use client";

export function ScrollToWorkButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <a
      href="#work"
      onClick={handleClick}
      className="inline-flex items-center rounded-full bg-[#6EE7F9] px-8 py-4 text-[#0B0B0C] font-semibold text-lg transition-all hover:bg-[#6EE7F9]/90 hover:scale-105"
    >
      Work With Us
    </a>
  );
}

