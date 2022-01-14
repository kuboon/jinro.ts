import { Results, SingleTargetAction, VillageState, Vote } from "./types";

function countVote(votes: Vote[]) {
  const voteCounts = {} as Record<string, number>;
  for (const v of votes) {
    voteCounts[v.target] = (voteCounts[v.target] || 0) + 1;
  }
  const result = Object.entries(voteCounts).reduce((acc, [k, v]) => {
    if (v > acc.count) {
      return {
        target: k,
        count: v,
      };
    }
    return acc;
  }, { target: "", count: 0 });
  return result.target;
}
export class Village {
  state: VillageState;
  constructor(state: VillageState) {
    this.state = state;
  }
  public creature(id: string) {
    return this.state.creatues.find((c) => c.id === id);
  }
  public getAllState() {
    return this.state;
  }
  public getStateFor(user: string) {
    return this.state;
  }
  public goNextDay() {
    const tonight = this.state.days[this.state.days.length - 1];
    const results = {} as Results;
    const votes = tonight.actions.filter((x) => x.type === "vote") as Vote[];
    results.voted = countVote(votes);
    const actions = tonight.actions.filter((x) => x.type !== "vote");
    results.died = actions.filter((x) => x.type === "bite").map((x) => x.target);

    const nextDay = Object.assign({}, tonight, {results});
    const days = [...this.state.days.slice(0,-2), nextDay];
    const nextState = Object.assign({}, this.state, {days});
    return new Village(nextState);
  }
}
