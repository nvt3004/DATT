import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import generalSlice from './slices/general/generalSlice';
import payReducer from './slices/pay/paySlice'
import agentReducer from './slices/agent_used/agentUsedSlice'
import adviseReducer from './slices/advise/adviseSlice'
import productPackageReducer from './slices/product_pakage/productPackageSlice'
import thongsoReducer from './slices/thongso/thongsoSlice';
import thongsogrReducer from './slices/thongsogr/thongsogrSlice';
import quoteReducer from './slices/quote/quoteSlice'
import warrantyReducer from './slices/warranty/warrantySlice'
import hangmucReducer from "./slices/hangmuc/hangmucSlice";
import maychuReducer from "./slices/maychu/maychuSlice";
import nhomchucnangReducer from "./slices/nhom_chucnang/nhom_chucnangSlice";
import chucnangReducer from "./slices/chucnang/chucnangSlice";
import phanmem_tsktReducer from "./slices/phanmemtskt/phanmem_tsktSlice";
import Content_newReducer from "./slices/content_new/content_new_Slice";
import donvitinhReducer from "./slices/donvitinh/donViTinhSlice";
import reportSlice from './slices/report/reportSlice';
import userSlice from './slices/user/userSlice'
import softwareSystemSlice from './slices/software_system/softwareSlice'
import categorySystemSlice from './slices/category_system/categorySlice'
import quoteDetailSystemSlice from './slices/quote_detail/quoteDetailSlice'
import softWareManageSlice from './slices/software/softwareSlice'
import clientSlice from './slices/client/clientSlice';
import warrantymethodSlice from './slices/warrantymethod/warrantymethodSlice';
import warrantynewSlice from './slices/warrantynew/warrantynewSlice';
import warrantyserviceSlice from './slices/warrantyservice/warrantyserviceSlice';
import warrantytermSlice from './slices/warrantytermsc/warrantytermSlice';
import function_categorySlice from './slices/chucnang_hangmuc/chucnang_hangmucSlice';

import productSlice from './slices/product/productSlice'
import baohanhbaogiaSlice from './slices/product/productSlice'
import kythuatcongngheSlice from './slices/kythuatcongnghe/kythuatcongngheSlice';
import productseverSlice from './slices/productsever/productSeverSlice';
import productseverdetailSlice from './slices/productseverdetail/productSeverDetailSlice';
import techologycateSlice from './slices/techologycate/techologycateSlice';
import cateSlice from './slices/cate/cateSlice';
import productcategorysSlice from './slices/productcategorys/productcategorysSlice';

const reducers = combineReducers({
  general: generalSlice,
  thongso: thongsoReducer,
  thongsogr: thongsogrReducer,
  hangmuc: hangmucReducer,
  pay: payReducer,
  agent: agentReducer,
  advise: adviseReducer,
  productPackage: productPackageReducer,
  quote: quoteReducer,
  report: reportSlice,
  user: userSlice,
  warrantyMethods: warrantymethodSlice,
  warrantyTerms: warrantytermSlice,
  warrantyServices: warrantyserviceSlice,
  maychu: maychuReducer,
  nhomchucnang: nhomchucnangReducer,
  chucnang: chucnangReducer,
  phanmem_tskt: phanmem_tsktReducer,
  content_new: Content_newReducer,
  donvitinh: donvitinhReducer,
  software: softwareSystemSlice,
  category: categorySystemSlice,
  quotedetail: quoteDetailSystemSlice,
  sofewareManager: softWareManageSlice,
  customer: clientSlice,
  warrantyMethod: warrantymethodSlice,
  warranty: warrantynewSlice,
  warrantyService: warrantyserviceSlice,
  warrantyTerm: warrantytermSlice,
  function_categorySlice: function_categorySlice,
  product : productSlice,
  baohanhbaogia: baohanhbaogiaSlice,
  engineering_Technology: kythuatcongngheSlice,
  productsever: productseverSlice,
  productseverdetail: productseverdetailSlice,
  techologycate: techologycateSlice,
  cate : cateSlice,
  productcategorys: productcategorysSlice, 
  wrranty: warrantyReducer
});

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['navigation'], // navigation will not be persisted
  // whitelist: ['navigation'], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  });
}

const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;