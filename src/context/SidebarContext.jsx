import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <LayoutContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);