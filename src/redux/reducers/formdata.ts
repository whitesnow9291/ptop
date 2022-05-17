import { createSlice } from '@reduxjs/toolkit';
import * as CardModal from '@app/model/card.model'
import { Cheatsheet } from '@app/model/cheatsheet.model'

export interface PageSize {
  label: string,
  width_inch: number,
  height_inch: number
}

interface PrintConfig {
  pageSize: PageSize,
  pageBackgroundColor: string,
  pageCount: number,
  isLanding: boolean
}
export interface PrintData {
  id: number,
  print_config: string,
  print_data: string,
  pdf_url: string,
  cheatsheet_id: number,
}
export interface FormDataState {
  value_formdata: number,
  card_data: CardModal.CardType,
  cheatsheet_data: Cheatsheet,

  // print data
  print_cheatsheet: Cheatsheet,
  print_config: PrintConfig,

  // print data for edit
  print_data: PrintData
}

const initialState: FormDataState = {
  value_formdata: 0,
  card_data: null,
  cheatsheet_data: null
}
export const slice = createSlice({
  name: 'formdata',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value_formdata += action.payload;
    },
    updateCard: (state, action) => {
      state.card_data = action.payload
    },
    addCardContent: (state, action) => {
      state.card_data = {
        ...state.card_data,
        card_contents: [...state.card_data.card_contents, action.payload]
      }
    },
    updateCardContent: (state, action) => {
      const { data, index } = action.payload
      const newContents = state.card_data.card_contents
      newContents.splice(index, 1, data)
      state.card_data = {
        ...state.card_data,
        card_contents: newContents
      }
    },

    removeCardContentByIndex: (state, action) => {
      const newContents = state.card_data.card_contents
      newContents.splice(action.payload, 1)
      state.card_data = {
        ...state.card_data,
        card_contents: newContents
      }
    },
    updateContentLayout: (state, action) => {
      state.card_data = {
        ...state.card_data,
        content_layout: action.payload
      }
    },
    
    
    updateCheatsheet: (state, action) => {
      state.cheatsheet_data = action.payload
    },

    updatePrintCheatsheet: (state, action) => {
      state.print_cheatsheet = action.payload
    },

    updatePrintConfig: (state, action) => {
      state.print_config = action.payload
    },
    updatePrintData: (state, action) => {
      state.print_data = action.payload
    },
  },
});

export const {
  updateCard,
  addCardContent,
  updateCardContent,
  removeCardContentByIndex,
  updateContentLayout,
  // cheatsheet
  updateCheatsheet,

  // print config
  updatePrintCheatsheet,
  updatePrintConfig,
  updatePrintData,

  incrementByAmount,

} = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default slice.reducer;
