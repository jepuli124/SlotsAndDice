// this whole file is deepseek generated.

export type SymbolType = 
  // Common symbols
  | '4leaf' | 'Dice' | 'Cherries' | 'Coin' | 'Nut' | '9' | '6' | '7' | 'Star'
  // Rare symbols
  | '5leaf' | 'BlackLily' | 'Heart' | 'Box' | 'Feather' 
  | 'Acorn' | 'Blade' | 'Glass';

  export interface SymbolPosition {
  symbol: SymbolType;
  row: number;
  col: number;
}

export interface WinningPattern {
  pattern: string;
  symbols: SymbolPosition[];
  multiplier: number;
  description: string;
}

export interface PatternResult {
  wins: WinningPattern[];
  totalMultiplier: number;
  specialEffects?: {
    cherryJuice?: boolean;
    princessSlain?: boolean;
    mysteryReveal?: SymbolType;
  };
}
