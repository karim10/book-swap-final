import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from '../../models/user';

module.exports = {
  users: async (_args: any, req: any) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      return await User.find();
    } catch (err) {
      throw new Error(err);
    }
  },
  createUser: async (args: any) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exits already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      const token = jwt.sign(
        { userId: result._id, email: result.email },
        'somesupersecretkey',
        { expiresIn: '1h' },
      );
      return { userId: result._id, token, tokenExpiration: 1 };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      { expiresIn: '1h' },
    );
    return {
      userId: user.id,
      token,
      tokenExpiration: 1,
      books: user.ownedBooks,
    };
  },
};
