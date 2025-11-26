<script lang="ts" setup>
import * as _ from "lodash";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import {
  VueFlow,
  useVueFlow,
  type Node,
  type Edge,
  type NodeProps,
  type Connection,
  type OnConnectStartParams,
  type FlowExportObject,
} from "@vue-flow/core";

import UiNodePending from "~/components/flow/node/pending.vue";
import UiNodeDraft from "~/components/flow/node/draft.vue";
import UiNodeCancel from "~/components/flow/node/cancel.vue";
import UiNodeClose from "~/components/flow/node/close.vue";

import CustomEdge from "~/components/flow/edge.vue";
import {
  type Flow,
  type OneFlow,
  type FlowData,
  type IFlowConnecting,
  type IFlowState,
  flowStates,
} from "./interface/index";

import { WorkflowParser } from "./utils/parser";
import { oneFlow } from "./default";
import { getLatestVersion } from "~/tools/flow";

const props = defineProps({
  data: { type: Object as PropType<FlowData> },
  flow: { type: Object as PropType<Flow> },
});

const {
  onConnect,
  addEdges,
  addNodes,
  getNodes,
  getHandleConnections,
  toObject,
  onInit,
  fitView,
  zoomIn,
  zoomOut,
} = useVueFlow();

const _flow = ref<Flow | undefined>(_.cloneDeep(props.flow));
const version = ref<OneFlow>(getLatestVersion(props.flow) || oneFlow);

const connecting = ref<IFlowConnecting>();
const inited = ref(false);

onInit((v) => {
  setTimeout(() => {
    inited.value = true;
  }, 500);
});

onConnect((params) => {
  const e = [
    { usage: "source", node: params.source, id: params.sourceHandle },
    { usage: "target", node: params.target, id: params.targetHandle },
  ];

  addEdges([{ ...params, animated: true }]);
});

function isHandleAcceptConnection(connection: Connection) {
  if (connection.source === connection.target) return false;

  const s = getHandleConnections({ nodeId: connection.source, type: "source" });
  if (s.find((s0) => s0.target === connection.target)) return false;

  if (connection.sourceHandle && connection.targetHandle) {
    if (
      connection.sourceHandle.split("-")[2] ===
      connection.targetHandle.split("-")[2]
    ) {
      return false;
    }
  }

  return true;
}

const createNewNode = ({
  linkTo,
  state,
}: {
  linkTo?: NodeProps;
  state: IFlowState;
}) => {
  // 1. Générer un ID unique (Timestamp est une méthode simple et sûre ici)
  const id = Date.now().toString();
  const c = Math.random() * (200 - 10) + 10;
  let x = c + 400;
  let y = 0;

  let linkTonode: Node | undefined;

  if (linkTo) {
    linkTonode = getNodes.value.find((n) => n.id === linkTo.id);
    if (linkTonode) {
      x = linkTonode.position.x + c + 400;
      y = linkTonode.position.y + c;
    }
  }

  // 2. Définir le nouvel objet Nœud
  const newNode: Node = {
    id,
    position: { x, y },
    data: { state, label: `$close.pending.${state}` },
    type: "custom",
  };

  // 3. L'ajouter au graphe
  addNodes([newNode]);

  if (linkTonode) {
    // écris moi le code qui doit se mettre ici
    addEdges([
      {
        id: `e-${linkTonode.id}-${id}`,
        source: linkTonode.id,
        target: id,
        animated: true,
      },
    ]);
  }
};

function onConnectStart(
  event: { event?: MouseEvent | undefined } & OnConnectStartParams
) {
  connecting.value = { start: event };
}

function onConnectEnd() {
  connecting.value = undefined;
}

const saving = ref(false);
async function save() {
  // const parser = new WorkflowParser();
  saving.value = true;
  try {
    const newVersion = _.cloneDeep(version.value);
    newVersion.version++;
    newVersion.createdAt = new Date();

    let body = { data: [newVersion] };
    if (_flow.value) {
      const flow = _.cloneDeep(_flow.value);
      flow.data.push(newVersion);
      body = flow;
    }

    const r = await $fetch("/api/flow/create", {
      method: "post",
      body,
    });

    _flow.value = r as any;
  } catch (error) {
  } finally {
    saving.value = false;
  }
}

function compareFlowData(
  o: { nodes: Node[]; edges: Edge[] },
  n: { nodes: Node[]; edges: Edge[] }
) {
  const compareArraysByPaths = <T extends object>(
    arrA: T[],
    arrB: T[],
    paths: string[]
  ): boolean => {
    if (arrA.length !== arrB.length) return false;

    for (let i = 0; i < arrA.length; i++) {
      const a = arrA[i];
      const b = arrB[i];

      const same = paths.every((path) =>
        _.isEqual(_.pick(a, path), _.pick(b, path))
      );

      if (!same) return false;
    }

    return true;
  };

  const nodeKeys = ["id", "type", "position", "data"];
  const isNode = compareArraysByPaths(o.nodes, n.nodes, nodeKeys);

  const edgeKeys = [
    "id",
    "type",
    "source",
    "target",
    "sourceHandle",
    "targetHandle",
    "data",
    "animated",
  ];
  const isEdge = compareArraysByPaths(o.edges, n.edges, edgeKeys);

  return isNode && isEdge;
}
</script>

<template>
  <div class="w-full h-full">
    <div class="flex h-full">
      <VueFlow
        v-model:nodes="version.nodes"
        v-model:edges="version.edges"
        fit-view-on-init
        :default-zoom="1.5"
        :min-zoom="0.2"
        :max-zoom="4"
        @connect-start="onConnectStart"
        @connect-end="onConnectEnd"
      >
        <Background :gap="12" />

        <!-- :nodes-draggable="false"
    :nodes-connectable="false"
    :elements-selectable="false"
    :edges-updatable="false"
    :zoom-on-scroll="false"
    :zoom-on-pinch="false"
    :zoom-on-double-click="false"
    :pan-on-scroll="false"
    :pan-on-drag="false"
     -->

        <MiniMap />

        <div class="absolute bottom-5 left-5 z-50 flex flex-col gap-1">
          <UDropdownMenu
            v-if="!data"
            :items="[
              [
                ...flowStates.values().map((e) => ({
                  label: e,
                  onSelect: () => {
                    createNewNode({ state: e });
                  },
                })),
              ],
            ]"
          >
            <u-button
              color="neutral"
              variant="soft"
              class="cursor-pointer"
              icon="i-lucide-git-branch-plus"
            >
            </u-button>
          </UDropdownMenu>

          <ui-undo-redo
            v-if="inited && !data"
            v-model="version"
            :compare="compareFlowData"
          >
            <template #default="{ canUndo, canRedo, undo, redo }">
              <u-button
                icon="i-lucide-undo-2"
                color="neutral"
                variant="soft"
                class="cursor-pointer"
                :disabled="!canUndo"
                @click="undo"
              >
              </u-button>
              <u-button
                color="neutral"
                variant="soft"
                icon="i-lucide-redo-2"
                class="cursor-pointer"
                :disabled="!canRedo"
                @click="redo"
              >
              </u-button>
            </template>
          </ui-undo-redo>

          <u-button
            icon="i-lucide-plus"
            color="neutral"
            variant="soft"
            class="cursor-pointer"
            @click="zoomIn()"
          />

          <u-button
            icon="i-lucide-minus"
            color="neutral"
            variant="soft"
            class="cursor-pointer"
            @click="zoomOut()"
          />

          <u-button
            icon="i-lucide-scan"
            color="neutral"
            variant="soft"
            class="cursor-pointer"
            @click="fitView()"
          />
        </div>

        <!-- <Controls>
          <template #></template>
        </Controls> -->

        <svg>
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>
        </svg>

        <template #node-custom="props">
          <component
            v-bind="props"
            :is="
              props.data.state === 'draft'
                ? UiNodeDraft
                : props.data.state === 'cancel'
                ? UiNodeCancel
                : props.data.state === 'close'
                ? UiNodeClose
                : UiNodePending
            "
            :is-valid-connection="isHandleAcceptConnection"
            :connecting
            :flow="version"
            :flow-data="data"
          />
        </template>

        <template #edge-default="props">
          <CustomEdge v-bind="props" :flow="version" :flow-data="data" />
        </template>
      </VueFlow>

      <div class="ui-flow-toolbar absolute top-6 right-5 z-50">
        <u-button v-if="!data" :loading="saving" @click="save()">
          save
        </u-button>
      </div>
    </div>
  </div>
</template>

<style>
/* import the required styles */
@import "@vue-flow/core/dist/style.css";

/* import the default theme (optional) */
/* @import "@vue-flow/core/dist/theme-default.css"; */

@import "@vue-flow/controls/dist/style.css";
@import "@vue-flow/minimap/dist/style.css";
</style>
