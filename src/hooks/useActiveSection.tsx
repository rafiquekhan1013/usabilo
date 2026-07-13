import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const ActiveSectionContext = createContext<{
  activeSection: string;
  setActiveSection: (id: string) => void;
}>({ activeSection: "home", setActiveSection: () => {} });

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("home");
  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
