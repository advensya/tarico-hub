import * as _ from "lodash";
import type { Flow } from "~/components/flow/interface";

export function getLatestVersion(flow?: Flow) {
  if (!flow) return;

  console.log(flow);

  const _flow = _.cloneDeep(flow);

  return _flow.data.sort((a, b) => b.version - a.version)[0];
}
