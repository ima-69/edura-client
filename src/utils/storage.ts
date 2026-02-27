/**
 * Storage utility for managing user authentication data
 * Uses localStorage for persistent storage (Remember Me)
 * Uses sessionStorage for temporary storage (session only)
 */

type StorageType = 'local' | 'session';

class StorageManager {
  private storageType: StorageType = 'session';

  /**
   * Set storage type based on "Remember Me" preference
   */
  setStorageType(rememberMe: boolean) {
    this.storageType = rememberMe ? 'local' : 'session';
  }

  /**
   * Get the appropriate storage based on current type
   */
  private getStorage(): Storage {
    return this.storageType === 'local' ? localStorage : sessionStorage;
  }

  /**
   * Get item from storage (checks both localStorage and sessionStorage)
   */
  getItem(key: string): string | null {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  }

  /**
   * Set item in appropriate storage
   */
  setItem(key: string, value: string, rememberMe?: boolean) {
    if (rememberMe !== undefined) {
      this.setStorageType(rememberMe);
    }
    
    const storage = this.getStorage();
    storage.setItem(key, value);
  }

  /**
   * Remove item from both storages
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  /**
   * Clear all auth data from both storages
   */
  clearAuth() {
    this.removeItem('token');
    this.removeItem('user');
    this.removeItem('rememberMe');
  }

  /**
   * Initialize storage on app load
   */
  initializeAuth() {
    // Check if user had "Remember Me" enabled
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    this.setStorageType(rememberMe);

    // If remember me is false, move data from localStorage to sessionStorage
    if (!rememberMe) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token) sessionStorage.setItem('token', token);
      if (user) sessionStorage.setItem('user', user);
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  /**
   * Save auth credentials
   */
  saveCredentials(token: string, user: any, rememberMe: boolean) {
    this.setStorageType(rememberMe);
    const storage = this.getStorage();
    
    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(user));
    
    // Save remember me preference in localStorage only
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }
  }

  /**
   * Get saved credentials
   */
  getCredentials() {
    const token = this.getItem('token');
    const userStr = this.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return { token, user };
  }
}

export const storageManager = new StorageManager();

