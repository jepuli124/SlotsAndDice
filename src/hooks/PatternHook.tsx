// Original file written by deepseek. Then edited and fixed.
// patternDetector.ts
import type { SymbolType, SymbolPosition, WinningPattern, PatternResult } from '../types/PatternTypes';

export class PatternDetector {
  private readonly grid: string[][];
  
  // Paylines for simple wins (5 columns × 3 rows)
  private readonly paylines = [
    // Horizontal lines
    { positions: [[0,0], [1,0], [2,0], [3,0], [4,0]], name: 'Top Row' },
    { positions: [[0,1], [1,1], [2,1], [3,1], [4,1]], name: 'Middle Row' },
    { positions: [[0,2], [1,2], [2,2], [3,2], [4,2]], name: 'Bottom Row' },
    
    // V-shaped patterns
    { positions: [[0,0], [1,1], [2,2], [3,1], [4,0]], name: 'V-Shape' },
    { positions: [[0,2], [1,1], [2,0], [3,1], [4,2]], name: 'Inverse V' },
    
    // Diagonal patterns
    { positions: [[2,0], [1,1], [2,2], [3,1]], name: 'Diamond' },
    { positions: [[1,0], [0,1], [1,2], [2,1]], name: 'Left Diamond' },
    { positions: [[3,0], [2,1], [3,2], [4,1]], name: 'Right Diamond' },
    
    // Zigzag patterns
    { positions: [[0,0], [1,1], [2,0], [3,1], [4,0]], name: 'Zigzag Top' },
    { positions: [[0,2], [1,1], [2,2], [3,1], [4,2]], name: 'Zigzag Bottom' },
    
    // Stair patterns
    { positions: [[0,0], [1,0], [2,1], [3,2], [4,2]], name: 'Stair Right' },
    { positions: [[0,2], [1,2], [2,1], [3,0], [4,0]], name: 'Stair Left' },
    
  ];

  constructor(grid: string[][]) {
    this.grid = grid;
  }

  public detectAllPatterns(): PatternResult {
    const wins: WinningPattern[] = [];
    let totalMultiplier = 0;
    const specialEffects: PatternResult['specialEffects'] = {};

    // Check simple payline patterns
    const lineWins = this.checkPaylines();
    wins.push(...lineWins);
    totalMultiplier += lineWins.reduce((sum, win) => sum + win.multiplier, 0);

    // Check for cherry juice (cherries above glass)
    if (this.checkCherryJuice()) {
      specialEffects.cherryJuice = true;
      wins.push({
        pattern: 'Cherry Juice',
        symbols: this.getCherryJuiceSymbols(),
        multiplier: 5,
        description: 'Cherries above Royal Glass creates mystical cherry juice!'
      });
      totalMultiplier += 5;
    }

    // Check for princess slaying (blade near princess symbols)
    const slayingResult = this.checkPrincessSlaying();
    if (slayingResult.slain) {
      specialEffects.princessSlain = true;
      wins.push({
        pattern: 'Princess Slain',
        symbols: slayingResult.symbols,
        multiplier: 10,
        description: 'The blade has claimed a princess!'
      });
      totalMultiplier += 10;
    }

    // Check for mystery box reveals
    const mysteryResult = this.checkMysteryBox();
    if (mysteryResult.revealed) {
      specialEffects.mysteryReveal = mysteryResult.symbol;
      wins.push({
        pattern: 'Mystery Reveal',
        symbols: mysteryResult.symbols,
        multiplier: mysteryResult.multiplier,
        description: `Mystery box revealed: ${mysteryResult.symbol}!`
      });
      totalMultiplier += mysteryResult.multiplier;
    }

    // Check for five-leaf clover alignment (all princess symbols)
    const princessAlignment = this.checkPrincessAlignment();
    if (princessAlignment.found) {
      wins.push({
        pattern: 'Princess Convergence',
        symbols: princessAlignment.symbols,
        multiplier: 25,
        description: 'All five princess symbols aligned!'
      });
      totalMultiplier += 25;
    }

    return {
      wins,
      totalMultiplier,
      specialEffects
    };
  }

  private checkPaylines(): WinningPattern[] {
    const wins: WinningPattern[] = [];

    for (const line of this.paylines) {
      const symbols: SymbolPosition[] = [];
      const symbolTypes: Set<string> = new Set();

      for (const [col, row] of line.positions) {
        const symbol = this.grid[col][row];
        symbols.push({ symbol: symbol as SymbolType, row, col });
        symbolTypes.add(symbol);
      }

      // Check for 3+ matching symbols in a row
      if (symbolTypes.size === 1) {
        // 5 of a kind
        wins.push({
          pattern: `Five of a Kind - ${line.name}`,
          symbols,
          multiplier: 10,
          description: `Five matching symbols on ${line.name}!`
        });
      } else {
        // Check for sequences (3,4 of a kind)
        const sequence = this.findLongestSequence(symbols);
        if (sequence.length >= 3 && !line.name.includes("Diamond")) {
          const multiplier = sequence.length === 3 ? 2 : 
                           sequence.length === 4 ? 5 : 10;
          wins.push({
            pattern: `${sequence.length} in a Row - ${line.name}`,
            symbols: sequence,
            multiplier,
            description: `${sequence.length} matching symbols on ${line.name}!`
          });
        }
        if(sequence.length >= 4 && line.name.includes("Diamond")){
          const multiplier = sequence.length === 4 ? 5 : 1;
          wins.push({
            pattern: `${sequence.length} in a Row - ${line.name}`,
            symbols: sequence,
            multiplier,
            description: `${sequence.length} matching symbols on ${line.name}!`
          });
        }
      }
    }

    return wins;
  }

  private findLongestSequence(symbols: SymbolPosition[]): SymbolPosition[] {
    let longest: SymbolPosition[] = [];
    let current: SymbolPosition[] = [symbols[0]];

    for (let i = 1; i < symbols.length; i++) {
      if (symbols[i].symbol === symbols[i-1].symbol) {
        current.push(symbols[i]);
      } else {
        if (current.length > longest.length) {
          longest = [...current];
        }
        current = [symbols[i]];
      }
    }

    if (current.length > longest.length) {
      longest = [...current];
    }

    return longest;
  }

  private checkCherryJuice(): boolean {
    // Check for cherries directly above royal glass
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 2; row++) { // Check up to row 1 (since need space below)
        if (this.grid[col][row] === 'cherries' && 
            this.grid[col][row + 1] === 'glass-royal') {
          return true;
        }
      }
    }
    return false;
  }

  private getCherryJuiceSymbols(): SymbolPosition[] {
    const symbols: SymbolPosition[] = [];
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 2; row++) {
        if (this.grid[col][row] === 'cherries' && 
            this.grid[col][row + 1] === 'glass-royal') {
          symbols.push({ symbol: 'Cherries', row, col });
          symbols.push({ symbol: 'Glass', row: row + 1, col });
        }
      }
    }
    return symbols;
  }

  private checkPrincessSlaying(): { slain: boolean; symbols: SymbolPosition[] } {
    const princessSymbols: SymbolType[] = ['BlackLily', 'Heart', 'Feather', 'Nut', 'Glass'];
    const symbols: SymbolPosition[] = [];

    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 3; row++) {
        const currentSymbol = this.grid[col][row] as SymbolType;
        
        if (currentSymbol === 'Blade') {
          // Check adjacent cells for princess symbols (including diagonals)
          const adjacentPositions = [
            [col-1, row-1], [col, row-1], [col+1, row-1],
            [col-1, row], [col+1, row],
            [col-1, row+1], [col, row+1], [col+1, row+1]
          ];

          for (const [adjCol, adjRow] of adjacentPositions) {
            if (adjCol >= 0 && adjCol < 5 && adjRow >= 0 && adjRow < 3) {
              const adjSymbol = this.grid[adjCol][adjRow] as SymbolType;
              if (princessSymbols.includes(adjSymbol)) {
                symbols.push({ symbol: 'Blade', row, col });
                symbols.push({ symbol: adjSymbol, row: adjRow, col: adjCol });
                return { slain: true, symbols };
              }
            }
          }
        }
      }
    }

    return { slain: false, symbols: [] };
  }

  private checkMysteryBox(): { revealed: boolean; symbol?: SymbolType; symbols: SymbolPosition[]; multiplier: number } {
    const mysteryPositions: SymbolPosition[] = [];
    const bladePositions: SymbolPosition[] = [];

    // Find all mystery boxes and blades
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 3; row++) {
        const symbol = this.grid[col][row] as SymbolType;
        if (symbol === 'Box') {
          mysteryPositions.push({ symbol, row, col });
        } else if (symbol === 'Blade') {
          bladePositions.push({ symbol, row, col });
        }
      }
    }

    // Check if blade is adjacent to mystery box
    for (const mystery of mysteryPositions) {
      for (const blade of bladePositions) {
        if (Math.abs(mystery.row - blade.row) <= 1 && 
            Math.abs(mystery.col - blade.col) <= 1) {
          // Mystery box is opened! Reveal a random rare symbol
          const rareSymbols: SymbolType[] = [
            '5leaf', 'BlackLily', 'Heart', 'Feather', 
            'Nut', 'Glass'
          ];
          const revealedSymbol = rareSymbols[Math.floor(Math.random() * rareSymbols.length)];
          
          return {
            revealed: true,
            symbol: revealedSymbol,
            symbols: [mystery, blade],
            multiplier: 3
          };
        }
      }
    }

    return { revealed: false, symbols: [], multiplier: 0 };
  }

  private checkPrincessAlignment(): { found: boolean; symbols: SymbolPosition[] } {
    const princessSymbols: SymbolType[] = ['BlackLily', 'Heart', 'Feather', 'Nut', 'Glass'];
    const symbols: SymbolPosition[] = [];
    const foundPrincesses = new Set<SymbolType>();

    // Check each column for a complete set of princesses
    for (let col = 0; col < 5; col++) {
      foundPrincesses.clear();
      symbols.length = 0;

      for (let row = 0; row < 3; row++) {
        const symbol = this.grid[col][row] as SymbolType;
        if (princessSymbols.includes(symbol)) {
          foundPrincesses.add(symbol);
          symbols.push({ symbol, row, col });
        }
      }

      // Also check horizontally
      for (let row = 0; row < 3; row++) {
        foundPrincesses.clear();
        symbols.length = 0;

        for (let col = 0; col < 5; col++) {
          const symbol = this.grid[col][row] as SymbolType;
          if (princessSymbols.includes(symbol)) {
            foundPrincesses.add(symbol);
            symbols.push({ symbol, row, col });
          }
        }

        if (foundPrincesses.size === 5) {
          return { found: true, symbols: [...symbols] };
        }
      }
    }

    return { found: false, symbols: [] };
  }

  // Helper method to get symbol rarity
  public isRareSymbol(symbol: string): boolean {
    const rareSymbols: SymbolType[] = [
      '5leaf', 'BlackLily', 'Heart', 'Box', 
      'Feather', 'Nut', 'Blade', 'Glass'
    ];
    return rareSymbols.includes(symbol as SymbolType);
  }
}