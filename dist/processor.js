"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionTreeProcessor = void 0;
const actions_1 = require("./actions");
class DecisionTreeProcessor {
    static processAction(node) {
        let actionFunc = actions_1.PREDEFINED_ACTIONS[node === null || node === void 0 ? void 0 : node.action];
        if (actionFunc) {
            actionFunc(...node === null || node === void 0 ? void 0 : node.params);
        }
        else {
            console.log('Unsupported Action');
        }
    }
    static processConditional(node) {
        let result = eval(node === null || node === void 0 ? void 0 : node.condition);
        if (result && (node === null || node === void 0 ? void 0 : node.trueAction)) {
            this.process(node === null || node === void 0 ? void 0 : node.trueAction);
        }
        else if (!result && (node === null || node === void 0 ? void 0 : node.falseAction)) {
            this.process(node === null || node === void 0 ? void 0 : node.falseAction);
        }
    }
    static process(node) {
        if ("action" in node) {
            this.processAction(node);
        }
        else if ("condition" in node) {
            if (node.loop !== undefined) {
                for (let i = 0; i < node.loop; i++) {
                    this.processConditional(node);
                }
            }
            else {
                this.processConditional(node);
            }
        }
        else if ("steps" in node) {
            for (const actionNode of node.steps) {
                this.processAction(actionNode);
            }
        }
    }
}
exports.DecisionTreeProcessor = DecisionTreeProcessor;
