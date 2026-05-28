export interface UserInterface {
  id: number;
  firstName: string | null;
  lastName: string | null;
  password: string;
  confirmPassword: string;
  location: string | null;
  email: string;
  phoneNumber: number | null;
  linkedInURL: string | null;
  githubURL: string | null;
  portfolioURL: string | null;
  profilePicture?: string | null;
}

export interface UserIDInterface extends Express.User {
  id: number;
}
