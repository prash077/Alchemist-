// src/contexts/FounderPersona.ts
import { createContext, useContext } from 'react';

export type FounderGoal = 'GTM' | 'Scaling' | 'Fundraising' | 'Hiring' | 'Product';

interface FounderPersonaContextType {
  goals: FounderGoal[];
  setGoals: (goals: FounderGoal[]) => void;
}

// This is just a placeholder to avoid errors. You’ll need to implement logic if needed.
const FounderPersonaContext = createContext<FounderPersonaContextType>({
  goals: ['GTM'], // default fallback goal
  setGoals: () => {},
});

export const useFounderPersona = () => useContext(FounderPersonaContext);
