import { createStore, createHook } from 'react-sweet-state';
import axios from '../hooks/useAxios';

const initialState = {
  gameMap: [],
  rooms: [],
  mapSize: 0,
  loading: false,
  error: null,
}

const actions = {
  getRooms: () => async ({ getState, setState }) => {
    if (getState().loading) return;
    setState({ loading: true });
    try {
      // get rooms from server
      const response = await axios(true).get('api/adv/rooms/');
      const { rooms, mapSize } = response.data;
      // generate map with these rooms
      const gameMap = [];
      for (let y = 0; y < mapSize; y++) {
        gameMap.push([]);
        for (let x = 0; x < mapSize; x++) {
          const findRoomInPosition = rooms.find(r => r.x === x && r.y === y)
          gameMap[y].push((findRoomInPosition && findRoomInPosition.id) || 0);
        }
      }
      setState({ rooms, mapSize, gameMap, loading: false, error: null });
    } catch (error) {
      setState({ error, loading: false });
    }
  },
}

const RoomStore = createStore({ initialState, actions });

const useRooms = createHook(RoomStore);

export default useRooms;
