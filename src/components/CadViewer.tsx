import { Rotate3d } from 'lucide-react';
import { FC, useState } from 'react';

interface CadViewerProps {
  /** Path to a .glb under public/, e.g. '/models/robot.glb'. */
  src: string;
  /** Accessible description of the model. */
  alt: string;
  /** Approximate download size shown on the load button, e.g. '~1 MB'. */
  downloadSize?: string;
  /**
   * Model rotation as 'roll pitch yaw', e.g. '0deg -90deg 0deg' to stand up
   * Z-up CAD exports (glTF is Y-up).
   */
  orientation?: string;
}

type Status = 'idle' | 'loading' | 'ready' | 'error';

/**
 * Click-to-load interactive 3D model viewer.
 *
 * Nothing is downloaded until the visitor clicks the placeholder: the click
 * dynamically imports @google/model-viewer (split into its own JS chunk) and
 * renders the <model-viewer> element, which then streams the Draco-compressed
 * .glb. The Draco decoder is self-hosted under public/draco/ so the site makes
 * no external requests.
 */
const CadViewer: FC<CadViewerProps> = ({ src, alt, downloadSize, orientation }) => {
  const [status, setStatus] = useState<Status>('idle');

  const load = async () => {
    setStatus('loading');
    try {
      const { ModelViewerElement } = await import('@google/model-viewer');
      ModelViewerElement.dracoDecoderLocation = '/draco/';
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'ready') {
    return (
      <div className="cad-viewer">
        <model-viewer
          src={src}
          alt={alt}
          camera-controls
          auto-rotate
          camera-orbit="45deg 75deg auto"
          orientation={orientation}
          shadow-intensity="1"
          interaction-prompt="none"
        />
        <p className="cad-viewer-hint">Drag to orbit — scroll to zoom — two-finger drag to pan</p>
      </div>
    );
  }

  return (
    <div className="cad-viewer">
      <button
        type="button"
        className="cad-viewer-placeholder"
        onClick={load}
        disabled={status === 'loading'}
      >
        <Rotate3d size={42} aria-hidden="true" />
        <span>
          {status === 'loading' && 'Loading model…'}
          {status === 'error' && 'Failed to load — click to retry'}
          {status === 'idle' &&
            `Load interactive 3D model${downloadSize ? ` (${downloadSize})` : ''}`}
        </span>
      </button>
    </div>
  );
};

export default CadViewer;
