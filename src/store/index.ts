import Vue from "vue";
import Vuex from "vuex";
import { CurrentWeather } from "@/core/weather-api/WeatherService";
import { Nullable } from "@/types/app";

Vue.use(Vuex);

interface AppState {
  weather: Nullable<CurrentWeather>;
}

const state: AppState = {
  weather: null
};

export default new Vuex.Store({
  state,
  mutations: {},
  actions: {},
  modules: {}
});
