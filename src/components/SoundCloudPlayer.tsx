import { useEffect, useRef } from 'react';

const soundCloudUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A143041228&color=%23e6e6c3&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=false';

declare global {
  interface Window {
    SC?: {
      Widget: {
        (iframe: HTMLIFrameElement): {
          bind: (event: string, callback: () => void) => void;
          setVolume: (volume: number) => void;
        };
      };
    };
  }
}

export default function SoundCloudPlayer() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const configurePlayer = () => {
      if (!window.SC?.Widget) return;
      const widget = window.SC.Widget(iframe);
      widget.bind('ready', () => widget.setVolume(25));
    };

    if (window.SC?.Widget) {
      configurePlayer();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    script.addEventListener('load', configurePlayer);
    document.body.appendChild(script);

    return () => script.removeEventListener('load', configurePlayer);
  }, []);

  return (
    <aside className="fixed bottom-4 right-4 z-[900] w-[calc(100%-2rem)] max-w-[320px] overflow-hidden rounded-xl bg-white shadow-[0_12px_30px_rgba(27,23,20,0.16)] ring-1 ring-ink-900/10">
      <iframe
        ref={iframeRef}
        title="Deep House Summer Mix en SoundCloud"
        width="100%"
        height="110"
        scrolling="no"
        frameBorder="no"
        allow="autoplay; encrypted-media"
        src={soundCloudUrl}
        className="block h-[110px]"
      />
    </aside>
  );
}
