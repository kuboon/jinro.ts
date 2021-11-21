import { Reguration, VillageState } from "./types";

export class Jinro {
  reguration: Reguration;
  state: VillageState;
  constructor(reguration: Reguration) {
    this.reguration = reguration;
  }
  public setState(state: VillageState) {
    this.state = state;
  }
  public getAllState() {
    return this.state;
  }
  public getStateFor(user: string) {
    return this.state.players[user];
  }
}
