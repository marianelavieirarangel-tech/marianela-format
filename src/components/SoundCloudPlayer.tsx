const soundCloudUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A143041228&color=%23e6e6c3&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true';

export default function SoundCloudPlayer() {
  return (
    <aside className="fixed bottom-4 right-4 z-[900] w-[calc(100%-2rem)] max-w-[420px] overflow-hidden rounded-xl bg-white shadow-[0_16px_45px_rgba(27,23,20,0.2)] ring-1 ring-ink-900/10">
      <iframe
        title="Deep House Summer Mix en SoundCloud"
        width="100%"
        height="300"
        scrolling="no"
        frameBorder="no"
        allow="autoplay; encrypted-media"
        src={soundCloudUrl}
        className="block h-[220px] sm:h-[300px]"
      />
    </aside>
  );
}
