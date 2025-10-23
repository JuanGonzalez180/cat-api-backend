import { UserModel } from '../models/user.model';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../interfaces/user.interface';

export class UsersService {
  async login(loginRequest: LoginRequest): Promise<AuthResponse> {
    try {
      const { email, password } = loginRequest;

      if (!email || !password) {
        return {
          success: false,
          message: 'Email and password are required',
        };
      }

      const user = await UserModel.findOne({ email: email.toLowerCase() });

      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      if (user.password !== password) {
        return {
          success: false,
          message: 'Invalid password',
        };
      }

      const userData: User = {
        _id: user._id?.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: '',
      };

      return {
        success: true,
        message: 'Login successful',
        user: userData,
      };
    } catch (error) {
      console.error('Error during login:', error);
      return {
        success: false,
        message: 'An error occurred during login',
      };
    }
  }

  async register(registerRequest: RegisterRequest): Promise<AuthResponse> {
    try {
      const { email, password, firstName, lastName } = registerRequest;

      if (!email || !password || !firstName || !lastName) {
        return {
          success: false,
          message: 'All fields are required',
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          message: 'Password must be at least 6 characters',
        };
      }

      const existingUser = await UserModel.findOne({
        email: email.toLowerCase(),
      });

      if (existingUser) {
        return {
          success: false,
          message: 'Email already registered',
        };
      }

      const newUser = new UserModel({
        email: email.toLowerCase(),
        password,
        firstName,
        lastName,
      });

      await newUser.save();

      const userData: User = {
        _id: newUser._id?.toString(),
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: '',
      };

      return {
        success: true,
        message: 'User registered successfully',
        user: userData,
      };
    } catch (error) {
      console.error('Error during registration:', error);
      return {
        success: false,
        message: 'An error occurred during registration',
      };
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) return null;

      return {
        _id: user._id?.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: '',
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}

export const usersService = new UsersService();
