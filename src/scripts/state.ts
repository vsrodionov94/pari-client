import { Modals, State, Teams } from './types';

const state: State = {
  name: '',
  vkId: 0,
  team: Teams.None,
  attempts: 5,
  currentPoints: 0,
  modal: Modals.None,
};

export default state;