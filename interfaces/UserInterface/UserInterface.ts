export interface UserInterface {
  id: number;
  firstName?: string;
  lastName?: string;
  password: string;
  confirmPassword: string;
  location?: string;
  email: string;
  phoneNumber?: number;
  linkedInURL?: string;
  githubURL?: string;
  portfolioURL?: string;
  profilePicture?: string;
}

export interface UserIDInterface extends Express.User {
  id?: number;
}
