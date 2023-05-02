import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '@/lib/store'

export interface CartState {
  id: string
  products: object[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CartState = {
  id: '',
  products: [],
  status: 'idle',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    createCart: (state, action: PayloadAction<object>) => {
      return action.payload
    },
    addItem: (state, action: PayloadAction<object>) => {
      const productExists = state.products.find(p => p._id === action.payload._id)

      if (!productExists) state.products.push(action.payload)
      
      return state
    },
    removeItem: (state, action: PayloadAction<object>) => {
      // state.products.filter(product => product.id !== action.payload.id)
    },
  }
})

export const { createCart, addItem, removeItem } = cartSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCart = (state: AppState) => state.cart

export default cartSlice.reducer
