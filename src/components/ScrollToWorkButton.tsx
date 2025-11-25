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
      className="work-with-us-button inline-flex items-center rounded-lg px-8 py-4 text-white font-semibold text-lg transition-all hover:scale-105 relative z-10"
    >
      <span className="relative z-10">Work With Us</span>
    </a>
  );
}

