type CheckUserRequest = {
  vkId: number;
  name: string;
};

type CheckUserResponse = {
  team: Teams,
  points: integer,
  attempts: integer,
};

type GetRaitingsRequest = {
  vkId: number
};

type GetRaitingsResponse = {
  raitings: RaitingsUser[],
  user: RaitingsUser,
};

type RaitingsUser = {
  place: integer,
  name: string,
  points: integer,
};

type TryHittingRequest = {
  vkId: integer,
  target: Targets,
};

type SetTeamRequest = {
  vkId: integer,
  team: Teams,
};

type SetTeamResponse = {
  error: boolean;
};

type TryHittingResponse = {
  error: boolean,
  success: boolean,
  points: integer,
  attempts: integer,
};

enum Targets {
  Top,
  Middle,
  Bottom,
};

enum Teams {
  None = 0,
  Zenit = 1,
  CSKA = 2,
  Sochi = 3,
  Novgorod = 4,
};  

type State = {
  vkId: number;
  name: string;
  attempts: integer;
  currentPoints: integer;
  team: Teams;
  modal: Modals;
};

enum Modals {
  None,
  Tutorial,
  Raitings,
  End,
};

enum Fonts {
  DrukWide = 'DrukWide',
  FuturaPT = 'FuturaPT',
};

export {
  CheckUserRequest,
  CheckUserResponse,
  GetRaitingsRequest,
  GetRaitingsResponse,
  TryHittingRequest,
  TryHittingResponse,
  RaitingsUser,
  State,
  Teams,
  Modals,
  Fonts,
  SetTeamRequest,
  SetTeamResponse,
};