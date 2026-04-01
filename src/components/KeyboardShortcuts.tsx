import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Keyboard, MousePointer2, MessageSquare, Download, Home, User, Briefcase, Newspaper, Mail } from "lucide-react";

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      switch (key) {
        case "1":
        case "h":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "2":
        case "a":
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "3":
        case "p":
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "4":
        case "n":
          document.getElementById("news")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "5":
        case "c":
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "k":
          window.dispatchEvent(new CustomEvent("toggle-chatbot"));
          break;
        case "?":
          setShowHelp((prev) => !prev);
          break;
        case "escape":
          setShowHelp(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const shortcuts = [
    { key: "1 / H", label: "Home", icon: <Home size={16} /> },
    { key: "2 / A", label: "About", icon: <User size={16} /> },
    { key: "3 / P", label: "Projects", icon: <Briefcase size={16} /> },
    { key: "4 / N", label: "News", icon: <Newspaper size={16} /> },
    { key: "5 / C", label: "Contact", icon: <Mail size={16} /> },
    { key: "K", label: "Toggle Chat", icon: <MessageSquare size={16} /> },
    { key: "?", label: "Show Help", icon: <Keyboard size={16} /> },
  ];

  return (
    <>
      {/* Help Trigger (Floating Button or Hint) */}
      <div className="fixed bottom-6 left-6 z-[100] hidden lg:block">
        <button
          onClick={() => setShowHelp(true)}
          className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white/50 hover:text-white p-3 rounded-full transition-all duration-300 group"
          title="Keyboard Shortcuts (?)"
        >
          <Keyboard size={20} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 p-2 rounded-xl">
                    <Keyboard className="text-black" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">Shortcuts</h2>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {shortcuts.map((s) => (
                  <div
                    key={s.key}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-orange-500 group-hover:scale-110 transition-transform">
                        {s.icon}
                      </div>
                      <span className="font-medium text-white/80">{s.label}</span>
                    </div>
                    <kbd className="bg-zinc-800 text-orange-500 px-3 py-1 rounded-lg font-mono text-sm border border-white/10 shadow-lg">
                      {s.key}
                    </kbd>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-white/40 text-sm">
                <MousePointer2 size={14} />
                <p>Press <span className="text-orange-500 font-mono">?</span> anytime to toggle this menu</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
