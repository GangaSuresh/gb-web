export class AuthService {
    private tokenKey = 'authToken';
  
    // Store the token in sessionStorage
    login(token: string): void {
      sessionStorage.setItem(this.tokenKey, token);
    }
  
    // Get the token from sessionStorage
    getToken(): string | null {
      return sessionStorage.getItem(this.tokenKey);
    }
  
    // Check if the token is valid and not expired
    isAuthenticated(): boolean {
      const token = this.getToken();
      if (!token) return false;
  
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        return payload.exp > (Date.now() / 1000);
      } catch (error) {
        return false; // Invalid token format
      }
    }
  
    // Clear the session storage (if needed)
    clearSession(): void {
      sessionStorage.removeItem(this.tokenKey);
    }

    // Logout user
    logout(): void {
      this.clearSession();
      window.location.href = '/sign-in';
    }
  }
  