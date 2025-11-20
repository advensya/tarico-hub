import type {
  Edge,
  OnConnectStartParams,
  ValidConnectionFunc,
} from "@vue-flow/core";

// import type { EdgeProps } from '@vue-flow/core'

export interface IFlowConnecting {
  start: OnConnectStartParams;
}

export interface IFlowNodeProps {
  data: {
    label?: string;
    type: "final" | "initial" | "standard";
    state: IFlowState;
    [key: string]: any;
  };
  isValidConnection: ValidConnectionFunc;
  connecting?: IFlowConnecting;
  id: string;
  edges: Edge[];
  selected?: boolean;
  label?: string;
}

export const flowStates = [
  "draft",
  "cancel",
  "close",
  "pending",
  "processed",
  "approved",
  "rejected",
] as const;
export type IFlowState = (typeof flowStates)[number];
