import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  loading: boolean; 
}

// Khởi tạo trạng thái ban đầu cho bộ đếm
const initialState: CounterState = {
  value: 0,
  loading: false,
};

// Tạo một slice của Redux với tên 'counter'
const counterSlice = createSlice({
  name: "counter", // Tên của slice
  initialState, // Trạng thái ban đầu
  reducers: {
    // Định nghĩa các reducers để cập nhật trạng thái
    incrementStart: (state) => {
      state.loading = true; // Khi bắt đầu tăng giá trị, đặt trạng thái loading thành true
    },
    incrementSuccess: (state, action: PayloadAction<number>) => {
      state.value += action.payload; // Tăng giá trị bộ đếm lên theo payload
      state.loading = false; // Đặt trạng thái loading thành false sau khi thành công
    },
    incrementFailure: (state) => {
      state.loading = false; // Nếu thất bại, đặt trạng thái loading thành false
    },
  },
});

// Xuất ra các action được tạo từ slice để có thể dispatch trong component
export const { incrementStart, incrementSuccess, incrementFailure } = counterSlice.actions;

// Xuất reducer của slice để kết hợp vào store
export default counterSlice.reducer;
