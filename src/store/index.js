import Vue from "vue";
import Vuex from "vuex";
// import coinList from "@/assets/coins.json"
Vue.use(Vuex);
// coinList.map(data => {
//   state.upbits[data.coin] = {
//       coinName: data.name,
//       price: 0
//     }
// })
export default new Vuex.Store({
  state: {
    loading: false,
    upbits: {},
    coinCodes: [],
    coinNames: [],
    coinPrices: [],
 
  },
  mutations: {
    coinPrice(state, data){
      var [coin, price] = data;
      // state.upbits[coin].price.pop()
      state.upbits[coin].price = price;
    }
  },
  actions: {
    setCoinPrice({commit}, coin, price){
      commit('coinPrice', coin, price);
      // dispatch('coinPrice', coin, price);
    }
  },
  modules: {}
});