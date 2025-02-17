"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const processor_1 = require("./processor");
const serializer_1 = require("./serializer");
const app = (0, express_1.default)();
const port = 3005;
app.use(express_1.default.json());
app.post('/process-tree', (req, res) => {
    const treeJson = req.body;
    const tree = serializer_1.DecisionTreeSerializer.fromJSON(treeJson);
    if (Array.isArray(tree)) {
        tree.forEach(node => processor_1.DecisionTreeProcessor.process(node));
    }
    else {
        processor_1.DecisionTreeProcessor.process(tree);
    }
    res.send({ status: 'success', message: 'Tree processed successfully' });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
