import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bohzhang.com',
  // Bilingual: /en/ and /zh/ as separate route trees; the root path redirects to /en/.
  build: { format: 'directory' },
  compressHTML: true,
});
