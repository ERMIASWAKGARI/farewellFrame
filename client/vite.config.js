import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: [
      '@tiptap/extension-color',
      '@tiptap/extension-link',
      '@tiptap/extension-placeholder',
      '@tiptap/extension-text-align',
      '@tiptap/extension-text-style',
      '@tiptap/extension-underline',
      '@tiptap/react',
      '@tiptap/starter-kit',
      'emoji-picker-react',
    ],
  },
})
