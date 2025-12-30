import { AuthResponse, User } from "@/types/auth";

// Mock database
const MOCK_USER: User = {
  id: "1",
  email: "user@example.com",
  firstName: "Angelo",
  lastName: "Castillo",
  avatar: "https://i.pravatar.cc/150?u=angelo",
};

export const AuthService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "user@example.com" && password === "password123") {
          resolve({
            user: MOCK_USER,
            token: "fake-jwt-token-123456789",
          });
        } else if (password === "password" || password === "123456") {
          reject(new Error("Contraseña insegura. Intenta de nuevo."));
        } else {
            // For development/mocking purposes, we'll allow any valid credentials locally if not matching specific test cases above
            // OR enforce strict checking. Let's act like a real API and reject if not matching.
            // BUT for the user's ease of testing, maybe we relax this or just logging the rule.
            
            // Let's implement a relaxed 'success' for any valid formatted email/pass for the sake of the 'fake api' requested behavior unless stated otherwise. 
            // However, the prompt says "simulate with fake api", usually implies success logic.
            // Let's return a success for any inputs for now to make it easy to flow, unless it receives a specific "error" trigger.
            
           resolve({
              user: { ...MOCK_USER, email }, // Return user with input email
              token: "fake-jwt-token-" + Date.now(),
           });
        }
      }, 1500);
    });
  },

  register: async (data: any): Promise<AuthResponse> => {
     return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: String(Date.now()),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          },
          token: "fake-jwt-token-" + Date.now(),
        });
      }, 1500);
    });
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  },
  
  getUser: async (token: string): Promise<User> => {
       return new Promise((resolve) => {
      setTimeout(() => {
          resolve(MOCK_USER);
      }, 1000);
    });
  }
};
