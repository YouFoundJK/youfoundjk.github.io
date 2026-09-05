import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkObsidianCallouts } from './src/plugins/remark-obsidian-callouts.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://youfoundjk.github.io',
  base: process.env.ASTRO_BASE || '/',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkMath, remarkObsidianCallouts],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
