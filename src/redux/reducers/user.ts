import { createSlice } from '@reduxjs/toolkit';
export const slice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    profile: null,
    auth_token: '',
    device_token: null,
    push_notifications: [],

    // subscription
    purchased_products: [],
    coupon_success: false
  },
  reducers: {

    addPurchasedProducts: (state, action) => {
      const newPurchasedProducts: any = [...state.purchased_products, action.payload]
      state.purchased_products = newPurchasedProducts
    },
    savePurchasedProducts: (state, action) => {
      state.purchased_products = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setCouponSuccess: (state) => {
      state.coupon_success = true
    },
    setDeviceToken: (state, action) => {
      state.device_token = action.payload
    },

    login: (state, action) => {
      state.loggedIn = true
      state.profile = action.payload.profile
      state.auth_token = action.payload.token
    },
    logout: (state, action) => {
      state.loggedIn = false
      state.profile = null
      state.auth_token = ''
    },

    add_push_notification: (state, action) => {
      const temp = state.push_notifications
      const existed = temp.filter(t => t.id == action.payload.id)[0]
      if (!existed) {
        temp.push(action.payload)
        state.push_notifications = temp
      }
    },
    pop_push_notification: (state, action) => {
      const temp = state.push_notifications.filter(p => p.id != action.payload.id)
      state.push_notifications = temp
    },
    set_demo_push_notification: (state, action) => {
      const channel_request_speak = {
        alert: 'Nomura Nori invited you to speak in roomA',
        channel_id: 1,
        type: 'JOINER_REQUEST_SPEAK',
        date: Date(),
        id: 1,
      }
      const channel_invite_cohoster = {
        alert: 'Nomura Nori invited you as cohost in roomA',
        channel_id: 1,
        type: 'INVITE_COHOSTER',
        date: Date(),
        id: 2,
      }
      const channel_invite_speaker = {
        alert: 'Nomura Nori invited you as speaker in roomA',
        channel_id: 1,
        type: 'INVITE_SPEAKER',
        date: Date(),
        id: 3,
      }
      state.push_notifications = [channel_request_speak, channel_invite_cohoster, channel_invite_speaker]
    }
  },
});

export const {
  addPurchasedProducts,
  savePurchasedProducts,
  setDeviceToken,
  setProfile,
  setLoggedIn,
  login,
  logout,
  add_push_notification,
  pop_push_notification,
  set_demo_push_notification,
  setCouponSuccess
} = slice.actions;


export default slice.reducer;
