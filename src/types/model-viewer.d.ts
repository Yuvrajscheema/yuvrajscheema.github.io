import type { DetailedHTMLProps, HTMLAttributes } from 'react';

// JSX typing for the <model-viewer> custom element rendered by
// src/components/CadViewer.tsx. Attribute names are the kebab-case HTML
// attributes documented at https://modelviewer.dev/docs/.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'camera-orbit'?: string;
        orientation?: string;
        'shadow-intensity'?: string;
        'interaction-prompt'?: string;
        exposure?: string;
      };
    }
  }
}

export {};
