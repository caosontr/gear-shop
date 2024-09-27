import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {  
  isLoading: boolean;
}

// Khởi tạo trạng thái ban đầu cho loading
const initialState: LoadingState = {
  isLoading: false, 
};

// Tạo một slice của Redux với tên 'loading'
const loadingSlice = createSlice({
  name: 'loading', // Tên của slice
  initialState, // Trạng thái ban đầu
  reducers: {
    // Định nghĩa các reducers để cập nhật trạng thái
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload; // Cập nhật trạng thái loading theo payload
    },
  },
});

// Xuất ra action được tạo từ slice để có thể dispatch trong component
export const { setLoading } = loadingSlice.actions;

// Xuất reducer của slice để kết hợp vào store
export default loadingSlice.reducer;
