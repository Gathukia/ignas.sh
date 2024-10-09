import { visit } from 'unist-util-visit';

const BLOCK = "valkyrie rounded-lg overflow-hidden";
const TITLE = "rounded-t-md border-b border-rose-100/[3%] bg-rose-100/[2%] px-2.5 py-1 font-mono text-xs text-rose-100/60";
const PRE = "overflow-x-auto py-2 text-[13px] leading-6 [color-scheme:dark] [&::-webkit-scrollbar]:h-[12px] [&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-gray-700/30 hover:[&::-webkit-scrollbar-thumb]:transition hover:[&::-webkit-scrollbar-thumb]:bg-gray-700/80 [&::-webkit-scrollbar-thumb]:bg-clip-padding selection:bg-blue-700/70 selection:text-inherit";
const CODE = "grid [&>span]:border-l-[3px] [&>span]:border-l-transparent [&>span]:pl-2 [&>span]:pr-3";
const INLINE_BLOCK = "whitespace-nowrap border border-rose-200/10 px-1.5 py-px text-[12px] rounded-full bg-white/5 whitespace-nowrap text-rose-300/90";
const INLINE_CODE = "";
const NUMBERED_LINES = "[counter-reset:line] [&>span]:before:mr-3 [&>span]:before:inline-block [&>span]:before:w-4 [&>span]:before:text-right [&>span]:before:text-white/20 [&>span]:before:![content:counter(line)] [&>span]:before:[counter-increment:line]";
const HIGHLIGHTED_LINE = "!border-l-blue-700/80 bg-blue-800/[15%] before:!text-blue-200/80";

export function rehypePrettyCodeClasses() {
  return (tree) => {
    visit(
      tree,
      (node) =>
        node.tagName === "code" &&
        Object.keys(node.properties).length === 0 &&
        node.children.some((n) => n.type === "text"),
      (node) => {
        const textNode = node.children.find((n) => n.type === "text");
        textNode.type = "element";
        textNode.tagName = "code";
        textNode.properties = { className: [INLINE_CODE] };
        textNode.children = [{ type: "text", value: textNode.value }];
        node.properties.className = [INLINE_BLOCK];
        node.tagName = "span";
      }
    );

    visit(
      tree,
      (node) =>
        typeof node?.properties?.["data-rehype-pretty-code-fragment"] !== "undefined",
      (node) => {
        if (node.tagName === "span") {
          node.properties.className = [
            ...(node.properties.className || []),
            INLINE_BLOCK,
          ];
          node.children[0].properties.className = [
            ...(node.children[0].properties.className || []),
            INLINE_CODE,
          ];
          return node;
        }

        if (node.tagName === "div") {
          node.properties.className = [
            ...(node.properties.className || []),
            BLOCK,
          ];
          node.children = node.children.map((childNode) => {
            if (
              childNode.tagName === "div" &&
              typeof childNode.properties?.["data-rehype-pretty-code-title"] !== "undefined"
            ) {
              childNode.properties.className = [
                ...(childNode.properties.className || []),
                TITLE,
              ];
            }
            if (childNode.tagName === "pre") {
              childNode.properties.className = [PRE];
              if (childNode.children[0].tagName === "code") {
                childNode.children[0].properties.className = [
                  ...(childNode.children[0].properties.className || []),
                  CODE,
                ];
                if (
                  typeof childNode.children[0].properties["data-line-numbers"] !== "undefined"
                ) {
                  childNode.children[0].properties.className.push(NUMBERED_LINES);
                }
              }
            }
            return childNode;
          });
          return node;
        }
      }
    );
  };
}

export const rehypePrettyCodeOptions = {
  theme: {
    dark: 'one-dark-pro',
    light: 'github-light',
  },
  tokensMap: {
    fn: "entity.name.function",
    objKey: "meta.object-literal.key",
  },
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
    node.properties.className = [""];
  },
  onVisitHighlightedLine(node) {
    node.properties.className = node.properties.className || [];
    node.properties.className.push(HIGHLIGHTED_LINE);
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['highlighted-word'];
  },
};