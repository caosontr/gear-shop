import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import loadingReducer from "./loadingSlice";

// Cấu hình store với các reducers
const store = configureStore({
  reducer: {
    counter: counterReducer, // Thêm counterReducer vào store
    loading: loadingReducer, // Thêm loadingReducer vào store
  },
});

// Định nghĩa kiểu của dispatch được sử dụng trong ứng dụng
export type AppDispatch = typeof store.dispatch;

// Định nghĩa kiểu của trạng thái tổng hợp từ các reducers
export type RootState = ReturnType<typeof store.getState>;

export default store;
