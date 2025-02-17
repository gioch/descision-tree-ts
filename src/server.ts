import express, { Request, Response } from 'express';
import { DecisionTreeProcessor } from './processor';
import { DecisionTreeSerializer } from './serializer';
import { DecisionTreeNode } from './types';

const app = express();
const port = 3005;

app.use(express.json());

app.post('/process-tree', (req: Request, res: Response) => {
  const treeJson = req.body;
  const tree: DecisionTreeNode | DecisionTreeNode[] = DecisionTreeSerializer.fromJSON(treeJson);

  if (Array.isArray(tree)) {
    tree.forEach(node => DecisionTreeProcessor.process(node));
  } else {
    DecisionTreeProcessor.process(tree);
  }

  res.send({ status: 'success', message: 'Tree processed successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
