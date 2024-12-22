import { configureStore, combineReducers } from "@reduxjs/toolkit";
import commentReducer from "./Comment/commentSlice";
import productReducer from "./Product/productSlice";
import categoryParentReducer from "./Category/categoryParentSlice";
import categoryChildReducer from "./Category/categoryChildSlice";
import addRessReducer from "./Address/addressSlice";
import authReducer from "./User/authSlice";
import cartReducer from "./Cart/cartSlice";
import supplierReducer from "./Supplier/supplierSlice";
import wareHouseMannagementReducer from "./WareHouseManagement/WareHouseMannagementSlice";
import storage from './configStore';
import { persistReducer ,persistStore } from 'redux-persist';
import customerReducer from './Customers/customerSlice';
import paymentReducer from './Payment/paymentSlice';
import orderReducer from './Order/orderSlice';

const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: ["wareHouseMannagementReducer"],
};
const rootReducer = combineReducers({
  comments: commentReducer,
  products: productReducer,
  categories_parent: categoryParentReducer,
  categories_child: categoryChildReducer,
  address: addRessReducer,
  auth: authReducer,
  cart: cartReducer,
  supplier: supplierReducer,
  wareHouseMannagement: wareHouseMannagementReducer,
  customers: customerReducer, 
  payment : paymentReducer,
  orders : orderReducer
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Tạo store với rootReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

// Xuất RootState để sử dụng trong các component
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
