import { createStore, createHook } from 'react-sweet-state';
import axios from '../hooks/useAxios';

const initialState = {
  init: {},
  loading: false,
  error: null,
}

const actions = {
  getInit: () => async ({ getState, setState }) => {
    if (getState().loading) return;
    setState({ loading: true });
    try {
      const response = await axios(true).get('api/adv/init/');
      setState({ init: response.data, loading: false, error: null });
    } catch (error) {
      setState({ error, loading: false });
    }
  },
  setRoom: (data) => async ({ getState, setState }) => {
    const state = getState();
    if (state.loading) return;
    try {
      setState({
        ...state,
        init: {
          ...state.init,
          room: data.room,
          players: data.players
        },
        loading: false,
        error: null
      })
    } catch (error) {
      setState({ error, loading: false });
    }
  }
}

const InitStore = createStore({ initialState, actions });

const useInit = createHook(InitStore);

export default useInit;
