import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from './reducers';

const Store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== 'production',
});
export type RootApplicationState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof Store.dispatch;
export default Store;
