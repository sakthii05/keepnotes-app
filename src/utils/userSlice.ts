import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id:string;
  username: string;
  email:string;
  password: string;
};

interface UserState {
  users: User[];
  currentUser: string | null;
  error: string | null,
}

const initialState: UserState = {
    users: [],
    currentUser: null,
    error: null,
  };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signup: (state, action: PayloadAction<User>) => {
        const exists = state.users.find(user => user.email === action.payload.email);
        if (exists) {
          state.error = 'User with this email already exists';
        } else {
          state.users.push(action.payload);
          state.error = null;
        }
      },
      login: (state, action: PayloadAction<{email:string,password:string}>) => {
        const found = state.users.find(
          user => user.email === action.payload.email && user.password === action.payload.password
        );
        if (found) {
          state.currentUser = `${found.email}/${found.username}/${found.id}`;
          state.error = null;
        } else {
          state.error = 'Invalid email or password';
        }
      },
      logout: (state) => {
        state.currentUser = null;
        state.error = null;
      },
      clearError: (state) => {
        state.error = null;
      },
    },
  });
  
  export const { signup, login, logout, clearError } = userSlice.actions;
  export default userSlice.reducer;