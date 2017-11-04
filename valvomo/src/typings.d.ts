/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Document {
  mozCancelFullScreen: () => void;
  mozFullScreenElement: () => void;
  msExitFullscreen: () => void;
  msFullscreenElement: () => void;
}