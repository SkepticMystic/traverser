import { digraph, renderDot } from "https://deno.land/x/graphviz@v0.2.1/mod.ts";
import { Traversal, name_traversal } from "../traverse.ts";
import { range } from "../utils/array.ts";

/** Get the x,y coords of the ith point on a unit circle with n points */
const circular_pos = (i: number, n: number) => {
  const angle = (i * 2 * Math.PI) / n;

  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
};

export const draw_graphviz = (
  traversal: Traversal,
  options?: Partial<{
    radius: number;
    format: "svg" | "png" | "json" | "jpg" | "pdf" | "xdot";
  }>
) => {
  const { n, path } = traversal;
  const { format, radius } = Object.assign(
    {
      format: "svg",
      radius: n / 2,
    },
    options
  );

  const G = digraph("G", { layout: "neato" }, (g) => {
    // Create nodes
    const nodes = range(n).map((i) => {
      const { x, y } = circular_pos(i, n);

      return g.node(i.toString(), {
        pos: `${x * radius},${y * radius}!`,
      });
    });

    // Create edges
    for (let i = 0; i < path.length - 1; i++) {
      const [source, target] = [path[i], path[i + 1]];
      // I think it allows hyper-edges with an array of nodes...
      g.edge([nodes[source], nodes[target]]);
    }

    // Close the loop
    g.edge([
      nodes[path[path.length - 1]],
      // traverse assumes 0 is the start, but we don't have to here
      nodes[path[0]],
    ]);
  });

  const name = name_traversal(traversal);

  return renderDot(G, `./drawings/graphviz/${name}.${format}`, {
    format,
  });
};
