import { getIntroVideoId } from '@/lib/site/introVideo';
import { Reveal } from './Visuals';
import IntroVideoPlayer from './IntroVideoPlayer';
import s from './Home.module.css';
import v from './IntroVideo.module.css';

/** Right under the hero: a short film that introduces Teyro. Renders nothing until HQ has a video link. */
export default async function IntroVideo() {
  const videoId = await getIntroVideoId();
  if (!videoId) return null;

  return (
    <section className={v.band} id="intro-video" aria-labelledby="intro-video-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Meet Teyro</span>
          <h2 id="intro-video-title" className={`${s.display} ${s.h2}`}>
            See what Teyro is <em>all about.</em>
          </h2>
          <p className={s.lead}>
            A quick look at short daily lessons, streaks and friends that help you actually finish what you start.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <IntroVideoPlayer videoId={videoId} />
        </Reveal>
      </div>
    </section>
  );
}
