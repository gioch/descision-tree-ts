import { PREDEFINED_ACTIONS } from './actions';
import { DecisionTreeNode, ActionNode, ConditionNode } from './types';

export class DecisionTreeProcessor {
  static processAction(node: ActionNode) {
    let actionFunc = PREDEFINED_ACTIONS[node?.action];
    if (actionFunc) {
      actionFunc(...node?.params);
    } else {
      console.log('Unsupported Action');
    }
  }

  static processConditional(node: ConditionNode) {
    let result = eval(node?.condition);

    if (result && node?.trueAction) {
      this.process(node?.trueAction);
    } else if (!result && node?.falseAction) {
      this.process(node?.falseAction);
    }
  }

  static process(node: DecisionTreeNode) {
    if ("action" in node) {
      this.processAction(node);
    } else if ("condition" in node) {
      if (node.loop !== undefined) {
        for (let i = 0; i < node.loop; i++) {
          this.processConditional(node);
        }
      } else {
        this.processConditional(node);
      }
    } else if ("steps" in node) {
      for (const actionNode of node.steps) {
        this.processAction(actionNode);
      }
    }
  }
}
