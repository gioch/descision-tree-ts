"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionTreeSerializer = void 0;
class DecisionTreeSerializer {
    static toJSON(nodes) {
        if (Array.isArray(nodes)) {
            return nodes.map(node => this.toJSON(node));
        }
        if ("action" in nodes) {
            return {
                action: nodes.action,
                params: nodes.params,
            };
        }
        if ("condition" in nodes) {
            return {
                condition: nodes.condition,
                loop: nodes.loop,
                trueAction: nodes.trueAction ? this.toJSON(nodes.trueAction) : undefined,
                falseAction: nodes.falseAction ? this.toJSON(nodes.falseAction) : undefined,
            };
        }
        if ("steps" in nodes) {
            return {
                steps: nodes.steps.map(this.toJSON),
            };
        }
        return {};
    }
    static fromJSON(json) {
        if (Array.isArray(json)) {
            return json.map((item) => this.fromJSON(item));
        }
        if (json.action) {
            return {
                action: json.action,
                params: json.params,
            };
        }
        if (json.condition) {
            const trueAction = json.trueAction ? this.fromJSON(json.trueAction) : undefined;
            const falseAction = json.falseAction ? this.fromJSON(json.falseAction) : undefined;
            return {
                condition: json.condition,
                loop: json.loop,
                trueAction,
                falseAction,
            };
        }
        if (json.steps) {
            return {
                steps: json.steps.map(this.fromJSON),
            };
        }
        return {};
    }
}
exports.DecisionTreeSerializer = DecisionTreeSerializer;
