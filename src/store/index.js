import { createStore } from "vuex";
import apiAxios from "../axios/index";
import useRouter from "../router/index";

const initialState = () => ({
  isLoading: false,
  isConection: true,
  msg: null,
  firmaImg: null,
  status: true,
  isAction: {},
  isChofer: [],
  isVerificador: [],
  isVerificadorSalida: [],
  isUsuarioSalida: [],
  isList: null,
  isReport: {},
  isPvr: {},
  isPvrS: [],
  isStep: 1,
  isListAyudante: [],
  isListCondicion: [],
  isRuta: [],
  correlativo: null,
  isSalida: [],
  isEntrada: [],
  isUnidad: [],
  isUsuario: [],
  isObservacion: "",
  isVariableSalida: [],
  isVariableCondicionSalida: {},
  isVariableEntrada: [],
  isVariableCondicionEntrada: [],
  isToken: JSON.parse(localStorage.getItem("token")),
});

export default createStore({
  state: initialState,
  mutations: {
    setReset(state) {
      const initial = initialState();

      Object.keys(initial).forEach((key) => {
        state[key] = initial[key];
      });
    },
    setLoading(state, val) {
      state.isLoading = val;
    },
    setConection(state, val) {
      state.isConection = val;
    },
    setMsg(state, val) {
      state.msg = val;
    },
    setAction(state, val) {
      state.isAction = val;
    },
    setPvr(state, val) {
      state.isPvr = val;
    },
    setList(state, val) {
      state.isList = val;
    },
    setMutuacion(state, { val, valor }) {
      state[val] = valor;
    },
    setMutuacionUser(state, { myVal, Obj }) {
      //state[myVal] = Obj;
      // Object.assign(state.isUsuario, Obj);
      state.isUsuario.push(Obj);

      console.log(state.isUsuario);
    },
    setMutuacionObjeto(state, data) {
      //state[val].push(valor);

      let { val, valor, key } = data;

      /* Object.entries(state[val]).forEach(([key, value]) => {
        console.log(key);

        //if(value)
      });*/

      for (const prop in state[val]) {
        //console.log(`${prop} - ${state[val][prop]}`);

        if (prop === key) {
          state[val][key] = valor;
        }
      }

      Object.assign(state[val], valor);
      console.log(state.isVariableCondicionSalida);

      /*const resultado = state[val].find((e) => {
        //  key;

        if (e[key] === valor[key]) {
          e[key] = valor[key];

          return e;

          // console.log("son iguales");
        }
      });

     /* if (resultado === undefined) {
        //  state.isVariableCondicionSalida.push(valor);

        // console.log(valor);

        // let objeto = {};

        //valor = { ...valor };

        Object.assign(state[val], valor);

        //state.isVariableCondicionSalida.push(valor);

        console.log(state.isVariableCondicionSalida);
      }

      /* state.isVariableSalida.forEach((object) => {
          if (object) {
            console.log(object[jey]);
          }
        });
      } else {
        //   state.isVariableEntrada.push(valor);
      }

      /*let obj = {};
      let arr = [];

      let { val, valor } = data;

      obj[val] = valor;

      arr.push(obj);

      console.log(arr);*/

      //state.isPvrS.push(valor);
    },
  },
  actions: {
    async conecctionApiRest({ commit }, { url, options, urlRoute, msg }) {
      let { accessToken } = initialState().isToken;
      console.log("aqui");
      commit("setLoading", true);
      await apiAxios(url, accessToken, options)
        .then((res) => {
          if (res.statusText === "OK") {
            //     commit("setConection", true);

            commit("setMsg", msg);
            //     commit("setReset");
            useRouter.push(urlRoute);
          }
        })
        .catch((error) => {
          //   commit("setConection", false);
          if (error.message === "canceled") {
            commit("setMsg", "Problemas de Conexion a la Api-Rest");

            commit("setReset");
            useRouter.push(urlRoute);
          }
          if (error.response.status === 401) {
            commit("setMsg", error.message);

            // localStorage.clear();
            let variable = { val: "isConection", valor: false };
            commit("setMutuacion", variable);
          }
        })
        .finally(() => {
          commit("setLoading", false);
          commit("setReset");
        });
    },
    async login({ commit }, { url, options, urlRoute }) {
      commit("setLoading", true);

      let accessToken = "asdas5d4a65s4d6a4s";

      await apiAxios(url, accessToken, options)
        .then((res) => {
          console.log(res);
          if (res.data.accessToken === null) {
            commit("setMsg", res.data.message);
          } else {
            // useRouter.push(urlRoute);
            let ls = localStorage;
            const {
              id,
              lastname,
              firstname,
              accessToken,
              tipoUsuario,
              ruta,
              menu,
              email,
              firma,
            } = res.data;
            ls.setItem(
              "token",
              JSON.stringify({
                lastname,
                id,
                firstname,
                tipoUsuario,
                accessToken,
                ruta,
                menu,
                email,
                firma,
              })
            );
            useRouter.push(urlRoute);
          }
        })
        .catch((error) => {
          //   commit("setConection", false);
          if (error.message === "canceled") {
            commit("setMsg", error.message);
          }
        })
        .finally(() => {
          commit("setLoading", false);
          commit("setReset");
        });
    },
    async action(
      { commit },
      { url, options, msg, label, method, disabled, routeAdd, routePrincipal }
    ) {
      commit("setLoading", true);

      let { accessToken } = initialState().isToken;

      await apiAxios(url, accessToken, options)
        .then((res) => {
          console.log(res);
          if (res.statusText === "OK") {
            let payLoad = {
              data: res.data,
              msg,
              label,
              method,
              disabled,
              routePrincipal,
              routeEndpoint: url,
            };

            commit("setAction", payLoad);
            useRouter.push(routeAdd);
          }
        })
        .catch((err) => {
          commit("setMsg", err);
          if (err.response.status === 401) {
            commit("setMsg", err.message);

            // localStorage.clear();
            let variable = { val: "isConection", valor: false };
            commit("setMutuacion", variable);
          }
        })
        .finally(() => {
          commit("setLoading", false);
        });

      // commit("setAction", val);
    },
    pvrState({ commit }) {
      commit("setPvr");
    },
    resetState({ commit }) {
      commit("setReset");
    },
    varMutuacion({ commit }, variable) {
      commit("setMutuacion", variable);
    },
    varMutuacionUser({ commit }, variable) {
      commit("setMutuacionUser", variable);
    },
    varMutuacionArray({ commit }, variable) {
      commit("setMutuacionObjeto", variable);
    },

    async loadList({ commit }, { url, options }) {
      let { accessToken } = initialState().isToken;
      commit("setList", []);
      commit("setLoading", true);

      await apiAxios(url, accessToken, options)
        .then((res) => {
          console.log(res);
          if (res.statusText === "OK") {
            //     commit("setConection", true);

            commit("setList", res.data);

            //     commit("setReset");
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            commit("setMsg", err.message);
            // localStorage.clear();
            let variable = { val: "isConection", valor: false };
            commit("setMutuacion", variable);
          }
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
  },
  getters: {
    isMsg: (state) => state.msg,
    isLoader: (state) => state.isLoading,
    isAction: (state) => state.isAction,
    isList: (state) => state.isList,
    isStep: (state) => state.isStep,
    isListAyudante: (state) => state.isListAyudante,
    isListCondicion: (state) => state.isListCondicion,
    isSalida: (state) => state.isSalida,
    isEntrada: (state) => state.isEntrada,
    isUnidad: (state) => state.isUnidad,
    isRuta: (state) => state.isRuta,
    status: (state) => state.status,
    isVariableCondicionSalida: (state) => state.isVariableCondicionSalida,
    isVariableCondicionEntrada: (state) => state.isVariableCondicionEntrada,
    isVariableEntrada: (state) => state.isVariableEntrada,
    isVariableSalida: (state) => state.isVariableSalida,

    isGetter: (state) => (variable) => {
      //state.isRuta,
      return state[variable];
    },

    /*  isFuncion: (state) => () => {
      //state.isRuta,
      return {
        unidad: state.isUnidad.unidad,
        placa: state.isUnidad.placa,
        rutas: state.isRuta,
        chofer: state.isChofer,
        // unidad: state.isUnidad,
        salida: {
          varSalida: state.isVariableSalida,
          varCondicionSalida: state.isVariableCondicionSalida,
        },
        entrada: {
          varEntrada: state.isVariableEntrada,
          varCondicionEntrada: state.isVariableCondicionEntrada,
        },
      };
    },*/
    isData: (state) => () => {
      let isVarSalida = state.isVariableCondicionSalida;

      isVarSalida = { ...isVarSalida };

      // let isVerificadorSalida = state.is;

      let isVarEntrada = state.isVariableCondicionEntrada;

      isVarEntrada = { ...isVarEntrada };

      let pvr = {
        isListAyudante: state.isListAyudante,
        isUnidad: state.isUnidad,
        isRuta: state.isRuta,
        isChofer: state.isChofer,
        isVerificador: state.isVerificador,
        isVerificadorSalida: state.isVerificadorSalida,
        isVariableSalida: state.isVariableSalida,
        isVariableCondicionSalida: isVarSalida,
        isVariableCondicionEntrada: isVarEntrada,
        isVariableEntrada: state.isVariableEntrada,
        isObservacion: state.isObservacion,
        isUsuario: state.isUsuario,
        isUsuarioSalida: state.isUsuarioSalida,
      };
      // pvr = JSON.stringify(pvr);

      return {
        unidad: state.isUnidad.unidad,
        correlativo: state.correlativo, //Date.now(),
        placa: state.isUnidad.placa,
        idUsuario: initialState().isToken.email,
        status: state.status,
        fecha: state.isVariableSalida.fechaSalida, //new Date().toLocaleDateString("en-US"),
        chofer: `Cedula: ${state.isChofer.cedula} - ${state.isChofer.nombreApellido}`,
        tipoUnidad: state.isUnidad.tipoUnidad,
        pvr,
      };
    },
  },
});
