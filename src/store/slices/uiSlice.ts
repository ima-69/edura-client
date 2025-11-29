import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Page = 'home' | 'register-select' | 'student-register' | 'teacher-register' | 'admin-register' | 'login' | 'teacher-profile' | 'student-profile' | 'admin-profile';

interface UIState {
  currentPage: Page;
  pageHistory: Page[];
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  currentPage: 'home',
  pageHistory: ['home'],
  isSidebarOpen: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<Page>) => {
      // Add to history only if it's different from current page
      if (state.currentPage !== action.payload) {
        state.pageHistory.push(state.currentPage);
      }
      state.currentPage = action.payload;
      
      // Update browser history
      if (typeof window !== 'undefined') {
        const url = action.payload === 'home' ? '/' : `/${action.payload}`;
        window.history.pushState({ page: action.payload }, '', url);
      }
    },
    goBack: (state) => {
      if (state.pageHistory.length > 0) {
        const previousPage = state.pageHistory.pop();
        if (previousPage) {
          state.currentPage = previousPage;
        }
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setCurrentPage, goBack, toggleSidebar, setSidebarOpen, toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;

