export class CodeLocalStorage {
  private static getKey(gameId: string, language: string): string {
    return `codesmash_game_${gameId}_${language}_code`;
  }

  static getLastSelectedLanguageKey(gameId: string): string {
    return `codesmash_game_${gameId}_last_selected_language`;
  }

  static loadLastSelectedLanguage(gameId: string): string {
    try {
      return localStorage.getItem(this.getLastSelectedLanguageKey(gameId)) || '';
    } catch (error) {
      console.error('Failed to load last selected language from localStorage:', error);
      return '';
    }
  }

  static saveLastSelectedLanguage(gameId: string, language: string): void {
    try {
      localStorage.setItem(this.getLastSelectedLanguageKey(gameId), language);
    } catch (error) {
      console.error('Failed to save last selected language to localStorage:', error);
    }
  }

  static saveCode(gameId: string, language: string, code: string): void {
    try {
      localStorage.setItem(this.getKey(gameId, language), code);
    } catch (error) {
      console.error('Failed to save code to localStorage:', error);
    }
  }

  static loadCode(gameId: string, language: string, fallbackCode: string = ''): string {
    try {
      const savedCode = localStorage.getItem(this.getKey(gameId, language));
      return savedCode !== null ? savedCode : fallbackCode;
    } catch (error) {
      console.error('Failed to load code from localStorage:', error);
      return fallbackCode;
    }
  }

  static clearCode(gameId: string, language: string): void {
    try {
      localStorage.removeItem(this.getKey(gameId, language));
    } catch (error) {
      console.error('Failed to clear code from localStorage:', error);
    }
  }

  static hasCode(gameId: string, language: string): boolean {
    try {
      return localStorage.getItem(this.getKey(gameId, language)) !== null;
    } catch (error) {
      console.error('Failed to check if code exists in localStorage:', error);
      return false;
    }
  }
}