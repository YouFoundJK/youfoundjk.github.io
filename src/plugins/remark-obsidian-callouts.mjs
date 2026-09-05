import { visit } from 'unist-util-visit';

export function remarkObsidianCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      if (!node.children || node.children.length === 0) return;
      const firstChild = node.children[0];
      if (firstChild.type !== 'paragraph' || !firstChild.children || firstChild.children.length === 0) return;

      const firstTextNode = firstChild.children[0];
      if (firstTextNode.type !== 'text') return;

      const match = firstTextNode.value.match(/^\[!([a-zA-Z0-9_-]+)\](?:[ \t]+([^\n]*))?(?:\n([\s\S]*))?$/);
      if (!match) return;

      const type = match[1].toLowerCase();
      const customTitle = match[2]?.trim();
      const remainder = match[3];

      // Clean up the text node
      if (remainder) {
        firstTextNode.value = remainder;
      } else {
        firstChild.children.shift();
      }

      // Title to display
      const displayTitle = customTitle || (type.charAt(0).toUpperCase() + type.slice(1));

      // Construct callout header node
      const headerNode = {
        type: 'paragraph',
        data: {
          hName: 'div',
          hProperties: { className: 'callout-title' },
        },
        children: [
          {
            type: 'text',
            value: displayTitle,
          },
        ],
      };

      node.data = node.data || {};
      node.data.hName = 'div';
      node.data.hProperties = {
        className: ['obsidian-callout', `callout-${type}`],
        'data-callout': type,
      };

      node.children.unshift(headerNode);
    });
  };
}
