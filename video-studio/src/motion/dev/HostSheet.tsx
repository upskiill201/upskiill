import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Backdrop, Host, HOST_NAME, HOST_POSES, HostPoseName, LOOKS, loadMotionFonts, MotionProvider, FONT } from '../kit';
import { fakeVO } from './fakeVo';

/** Character sheet for approval: every pose, on each of the four looks. 4320×1920 still. */
const VO = fakeVO([{ id: 'a', text: 'hello there this is a talking test for the mouth shapes' }]);
export const HostSheet: React.FC = () => {
  loadMotionFonts();
  const poses = Object.keys(HOST_POSES) as HostPoseName[];
  const looks = Object.keys(LOOKS) as (keyof typeof LOOKS)[];
  return (
    <AbsoluteFill style={{ flexDirection: 'row' }}>
      {looks.map((lk, li) => (
        <MotionProvider key={lk} look={lk} vo={VO}>
          <div style={{ position: 'relative', width: 1080, height: 1920, overflow: 'hidden' }}>
            <Backdrop />
            <div style={{ position: 'absolute', top: 40, left: 40, fontFamily: FONT.mono, fontSize: 34, fontWeight: 700, color: LOOKS[lk].ink }}>{HOST_NAME} · {lk}</div>
            {poses.map((p, i) => {
              const col = i % 4, row = Math.floor(i / 4);
              return (
                <div key={p}>
                  <Host on={[[-1, 99]]} poses={[{ t: 0, p }]} x={140 + col * 265} bottom={880 + row * 900} scale={0.62} />
                  <div style={{ position: 'absolute', left: 60 + col * 265, top: 900 + row * 900, width: 170, textAlign: 'center', fontFamily: FONT.mono, fontSize: 24, color: LOOKS[lk].inkSoft }}>{p}</div>
                </div>
              );
            })}
            {li === 0 && <div style={{ position: 'absolute', right: 40, bottom: 60, fontFamily: FONT.mono, fontSize: 22, color: LOOKS[lk].inkSoft }}>original character · not the reference host</div>}
          </div>
        </MotionProvider>
      ))}
    </AbsoluteFill>
  );
};
