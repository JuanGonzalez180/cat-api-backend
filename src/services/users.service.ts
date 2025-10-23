import { UserModel } from '../models/user.model';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../interfaces/user.interface';
import { comparePasswords } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';

export interface AuthResponseWithToken extends AuthResponse {
  token?: string;
}

export class UsersService {
  async login(loginRequest: LoginRequest): Promise<AuthResponseWithToken> {
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

      // Compare hashed password
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid password',
        };
      }

      const userId = user._id?.toString() || '';
      const token = generateToken(userId, user.email);

      const userData: User = {
        _id: userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: '',
      };

      return {
        success: true,
        message: 'Login successful',
        user: userData,
        token,
      };
    } catch (error) {
      console.error('Error during login:', error);
      return {
        success: false,
        message: 'An error occurred during login',
      };
    }
  }

  async register(registerRequest: RegisterRequest): Promise<AuthResponseWithToken> {
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

      const userId = newUser._id?.toString() || '';
      const token = generateToken(userId, newUser.email);

      const userData: User = {
        _id: userId,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: '',
      };

      return {
        success: true,
        message: 'User registered successfully',
        user: userData,
        token,
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
