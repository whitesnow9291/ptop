import { createSlice } from '@reduxjs/toolkit';
import { CardType } from '@app/model/card.model'
import { Cheatsheet } from '@app/model/cheatsheet.model'
import _ from 'lodash'

interface AppConfig {
  CARD_LIMIT_NON_SUBSCRIBER: number,
  CHEATSHEET_LIMIT_NON_SUBSCRIBER: number,
  IOS_APP_LINK: string,
  ANDROID_APP_LINK: string,
  CATEGORIES: {
    id: number,
    title: string
  }[]
}
export interface AppDataState {
  value_appdata: number,
  cards: CardType[],
  cheatsheets: Cheatsheet[],
  cheatsheet_learn_history: [],
  subscribe_options: Any[],
  appconfig: AppConfig,
}

const initialState: AppDataState = {
  value_appdata: 0,
  cards: [],
  cheatsheets: [],
  cheatsheet_cards: [],
  appconfig: {
    CARD_LIMIT_NON_SUBSCRIBER: 10,
    CHEATSHEET_LIMIT_NON_SUBSCRIBER: 10,
    CATEGORIES: []
  }
}
export const slice = createSlice({
  name: 'appdata',
  initialState,
  reducers: {
    initAppData: (state, action) => {
      state = initialState
    },
    saveAppConfig: (state, action) => {
      state.appconfig = action.payload
    },
    saveSubscribeOptions: (state, action) => {
      state.subscribe_options = action.payload
    },
    saveCards: (state, action) => {
      state.cards = _.cloneDeep(action.payload)
    },
    saveCheatsheets: (state, action) => {
      state.cheatsheets = _.cloneDeep(action.payload)
    },
    saveCheatsheetLearnHistory: (state, action) => {
      state.cheatsheet_learn_history = action.payload
    },
    saveCheatsheetCards: (state, action) => {
      const user_cards_ids = state.cards.map(c => c.id)
      const exceptUserCards = action.payload.filter(c => !user_cards_ids.includes(c.id))
      state.cheatsheet_cards = exceptUserCards
    },
    addCheatsheetCards: (state, action) => {
      const newCards = action.payload
      const newCardIds = newCards.map(c => c.id)
      const nonExistedCards = state.cheatsheet_cards.filter(ch => !newCardIds.includes(ch.id))
      state.cheatsheet_cards = [...newCards, ...nonExistedCards]
    },
    updateCard: (state, action) => {
      const card = action.payload
      const index = state.cards.findIndex(c => c.id == card.id)
      if (index > -1) {
        state.cards[index] = card
      } else {
        const newCards = state.cards.concat(card)
        state.cards = newCards
      }
    },
    removeCardById: (state, action) => {
      const id = action.payload
      state.cards = state.cards.filter(f => f.id != id)
    },
    updateCheatsheet: (state, action) => {
      const cheatsheet = action.payload
      const index = state.cheatsheets.findIndex(c => c.id == cheatsheet.id)
      if (index > -1) {
        state.cheatsheets[index] = cheatsheet
      } else {
        const newcheatsheets = state.cheatsheets.concat(cheatsheet)
        state.cheatsheets = newcheatsheets
      }
    },


    removeCheatSheetById: (state, action) => {
      const id = action.payload
      state.cheatsheets = state.cheatsheets.filter(f => f.id != id)
    },
  },
});

export const {
  initAppData,
  saveSubscribeOptions,
  saveCards,
  saveCheatsheets,
  saveCheatsheetLearnHistory,
  saveCheatsheetCards,
  addCheatsheetCards,
  updateCard,
  removeCardById,
  updateCheatsheet,
  removeCheatSheetById,
  saveAppConfig
} = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default slice.reducer;
