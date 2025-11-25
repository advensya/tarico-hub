import type { StateDefinition } from "../interface/workflow.ts";
import type { Flow } from "../interface/index.ts";

export class WorkflowParser {
  /**
   * Génère un nom d'événement conventionnel pour une arête.
   * Si edge.label est vide, génère ACTION_TO_STATE.
   */
  private generateEventName(targetStateName: string, customLabel?: string) {
    // Si l'utilisateur a renseigné un label, on le priorise.
    // if (customLabel && customLabel.trim() !== "") {
    //   return customLabel.trim().toUpperCase().replace(/\s/g, "_");
    // }
    // Sinon, on crée un événement par convention
    return `${targetStateName}`;
  }

  /**
   * Convertit le JSON de Vue Flow en une définition de workflow exécutable.
   */
  public parseVueFlow(flowData: Flow) {
    const states: Record<string, StateDefinition> = {};
    const nodeMap = new Map(flowData.nodes.map((node) => [node.id, node]));

    // --- ÉTAPE 1: Initialisation de tous les états (Nœuds) ---
    for (const node of flowData.nodes) {
      const stateName = node.data.state;

      states[node.id] = {
        id: node.id,
        name: node.data.label || stateName, // Utiliser le label visuel si disponible
        type: node.data.type,
        on: {}, // Initialisation de la map de transitions
      };
    }

    // --- ÉTAPE 2: Création des Transitions (Arêtes) ---
    for (const edge of flowData.edges) {
      const sourceId = edge.source;
      const targetId = edge.target;

      // Trouver le nom logique de l'état CIBLE pour la convention d'événement
      const targetNode = nodeMap.get(targetId);
      const targetStateName = targetNode?.data.state || targetId;

      // ⚠️ Point critique : Ici on assume que le 'label' est l'événement si non vide.
      const eventName = this.generateEventName(
        targetStateName,
        edge.label as string
      );

      // S'assurer que l'état source existe
      if (states[sourceId]) {
        // Ajouter la transition à l'état source
        states[sourceId].on[eventName] = targetId;
      }
    }

    // --- ÉTAPE 3: Assemblage de la définition finale ---
    const initialStateNode = flowData.nodes.find(
      (n) => n.data.state === "draft" && !n.deletable
    );
    const initialStateId = initialStateNode?.id || flowData.nodes[0]?.id;

    if (!initialStateId) {
      throw new Error(
        "La définition de workflow doit contenir un état initial ('draft')."
      );
    }

    return states;
  }
}
