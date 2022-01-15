import { CreatureId } from "./types";
import { VillageState } from "./VillageState";

export class Translator extends VillageState {
  translateTo(dayNum: number, id?: CreatureId): string[] {
    const lines: string[] = [];
    for (const l of this.village.days[dayNum].night.logs) {
      if (id && l.receivers instanceof Array && !l.receivers.includes(id)) {
        continue;
      }
      const actor = this.creature(l.actor).name;
      const target = this.creature(l.target).name;
      let line;
      switch (l.action) {
        case 'bite':
          line = `${actor}は${target}を襲撃した。`;
      }
      lines.push(line);
    }
    return lines;
  }
}
