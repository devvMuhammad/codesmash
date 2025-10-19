export class CodeLocalStorage {
  private static getKey(gameId: string): string {
    return `codesmash_game_${gameId}_code`;
  }

  static saveCode(gameId: string, code: string): void {
    try {
      localStorage.setItem(this.getKey(gameId), code);
    } catch (error) {
      console.error('Failed to save code to localStorage:', error);
    }
  }

  static loadCode(gameId: string, fallbackCode: string = ''): string {
    try {
      const savedCode = localStorage.getItem(this.getKey(gameId));
      return savedCode !== null ? savedCode : fallbackCode;
    } catch (error) {
      console.error('Failed to load code from localStorage:', error);
      return fallbackCode;
    }
  }

  static clearCode(gameId: string): void {
    try {
      localStorage.removeItem(this.getKey(gameId));
    } catch (error) {
      console.error('Failed to clear code from localStorage:', error);
    }
  }

  static hasCode(gameId: string): boolean {
    try {
      return localStorage.getItem(this.getKey(gameId)) !== null;
    } catch (error) {
      console.error('Failed to check if code exists in localStorage:', error);
      return false;
    }
  }
}