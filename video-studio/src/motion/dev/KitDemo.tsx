import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Database, Server, Users } from 'lucide-react';
import {
  Annotation, At, Backdrop, Badge, Captions, Card, ChapterCard, Checklist, Footnote, Host, HudSeries, Look,
  loadMotionFonts, MotionProvider, Note, Punchline, Recap, TeyroBridge, TeyroOutro, TitleCard, Wire, World, camAt, cue, useMotion, Z,
} from '../kit';
import { fakeVO } from './fakeVo';

/** A ~40 s kit demo with synthetic timings: every major component on screen once. Not a deliverable. */
const LINES = [
  { id: 'title', text: 'System design 101.' },
  { id: 'hook', text: 'People hear load balancer, cache, queue. | It sounds like random jargon.' },
  { id: 'c1', text: 'Start with one server. | For a thousand users, that is fine.' },
  { id: 'c2', text: 'Then traffic grows. | One server cannot handle everything.' },
  { id: 'c3', text: 'So you add a load balancer, | and spread requests across servers.' },
  { id: 'bridge', text: 'Quick thing: lessons like this are what Teyro is for. | Back to the servers.' },
  { id: 'twist', text: 'Here is the mistake beginners make.' },
  { id: 'recap', text: 'Recap: one server, then scale out, then a load balancer.' },
  { id: 'punch', text: 'Do not memorize the names. | Ask what problem forced them.' },
  { id: 'cta', text: 'Want to understand tech like this? | Search Teyro.' },
];
export const DEMO_VO = fakeVO(LINES);
export const DEMO_DURATION = Math.ceil(DEMO_VO.duration * 30) + 15;

const Scene: React.FC = () => {
  loadMotionFonts();
  const { vo, t } = useMotion();
  const L = (id: string) => vo.lines.find((l) => l.id === id)!;
  const c1 = L('c1').start, c2 = L('c2').start, c3 = L('c3').start, br = L('bridge'), tw = L('twist').start, rc = L('recap'), pu = L('punch'), cta = L('cta');
  const cam = camAt([{ t: 0, x: -(Z.sideCx - 540), y: 0, z: 1 }, { t: c2 + 0.1, x: 0, y: 30, z: 1 }, { t: c3 - 0.2, x: -60, y: 60, z: 0.92 }, { t: rc.start - 0.3, x: 0, y: 0, z: 0.8 }], t);
  const world = t >= c1 && t < tw;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} />
      <HudSeries series="System design 101" pulseTeyro={[br.start]}
        chapters={[{ t: 0, text: '00 The words' }, { t: c1, text: '01 One server' }, { t: c2, text: '02 Scale out' }, { t: tw, text: '03 The mistake' }, { t: rc.start, text: '04 Recap' }]}
        counter={{ keys: [{ t: 0, v: 1 }, { t: c1 + 1.5, v: 1000 }, { t: cue(vo, 'grows.'), v: 250000 }, { t: c3 + 1, v: 1000000 }], unit: 'users', icon: <Users size={30} color="#3D5AFE" /> }}
        chips={[{ label: 'LB', t: cue(vo, 'balancer,', { after: c3 }) }, { label: 'CACHE', t: 999 }, { label: 'QUEUE', t: 999 }, { label: 'CDN', t: 999 }, { label: 'REPLICAS', t: 999 }]} />
      <TitleCard title={['SYSTEM', 'DESIGN 101']} kicker="EXPLAINED" until={L('hook').start + 0.1}>
        <Card at={0} w={520} h={300} title="Blueprint" sub="social app · v9" />
      </TitleCard>
      {t >= L('hook').start && t < c1 && (
        <AbsoluteFill>
          <At x={Z.sideCx} y={640}><Card at={cue(vo, 'balancer,')} w={420} title="Load balancer" icon={<Server size={34} />} pad={20} /></At>
          <At x={Z.sideCx - 60} y={820}><Card at={cue(vo, 'cache,')} w={300} title="Cache" pad={20} /></At>
          <At x={Z.sideCx + 60} y={980}><Card at={cue(vo, 'queue.')} w={300} title="Queue" pad={20} /></At>
          <At x={Z.sideCx - 40} y={1170}><Annotation at={cue(vo, 'random')} text="sounds like jargon" dx={120} dy={-90} /></At>
        </AbsoluteFill>
      )}
      {world && (
        <World cam={cam}>
          <At x={0} y={-330}><Card at={c1 + 0.2} w={430} title="Users" icon={<Users size={34} />} pad={20} /></At>
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <Wire pts={[[0, -260], [0, 120]]} at={c1 + 0.4} flow={[{ from: c1 + 0.8, to: 99, rate: 2 }, { from: cue(vo, 'grows.'), to: 99, rate: 7 }]} tone={t >= cue(vo, 'cannot') ? 'problem' : 'normal'} />
          </div>
          <At x={0} y={210}><Card at={c1 + 0.5} w={460} title="One server" icon={<Database size={34} />} pad={22} states={[{ t: cue(vo, 'cannot'), tone: 'problem' }, { t: cue(vo, 'spread'), tone: 'good' }]} /></At>
          <At x={0} y={330}><Badge at={cue(vo, 'cannot')} until={cue(vo, 'spread')} text="CPU 100%" /></At>
          <At x={-260} y={60}><Card at={cue(vo, 'balancer,', { after: c3 })} w={300} title="LB" pad={18} states={[{ t: cue(vo, 'balancer,', { after: c3 }), tone: 'accent' }]} /></At>
        </World>
      )}
      {world && <At x={215} y={470}><Note items={[{ t: c1, kind: 'RULE', text: 'Start simple: one server' }, { t: c2, kind: 'PROBLEM', text: 'One server can\'t keep up' }, { t: c3, kind: 'FIX', text: 'Spread the load' }]} w={300} /></At>}
      <ChapterCard at={tw} until={rc.start} n="03" title="The mistake" sub="CHAPTER" />
      {t >= tw + 0.6 && t < rc.start && <At x={Z.sideCx} y={1000}><Checklist items={[{ text: 'Useful', at: tw + 0.6, check: tw + 0.9 }, { text: 'Popular', at: tw + 0.8, check: tw + 1.1, tone: 'problem' }]} width={560} size={38} /></At>}
      {t >= rc.start - 0.2 && t < pu.start && <At x={Z.sideCx} y={900}><Recap items={[{ text: 'One server', at: cue(vo, 'one', { after: rc.start }) }, { text: 'Scale out', at: cue(vo, 'scale', { after: rc.start }) }, { text: 'Load balancer', at: cue(vo, 'load', { after: rc.start }) }]} width={600} /></At>}
      <Punchline at={pu.start} until={cta.start} lead="Don't memorize the names." payoff="Ask what forced them." payoffAt={cue(vo, 'ask', { after: pu.start })} size={88} />
      {t >= pu.start && t < cta.start && <At x={540} y={1010}><Footnote at={pu.start + 0.4} text="demo footnote · source: example.com (2026)" /></At>}
      <TeyroBridge at={br.start} until={br.end} line="Learn coding and AI, a few minutes a day" chips={['Coding', 'AI', 'Bite-sized lessons']} />
      <TeyroOutro at={cta.start} until={vo.duration} headline="The fun way to finish learning coding and AI." ask="Search Teyro" />
      <Host on={[[L('hook').start, c2 + 0.2], [tw, rc.start], [rc.start, pu.start]]} poses={[{ t: 0, p: 'wave' }, { t: L('hook').start + 0.6, p: 'point' }, { t: c1, p: 'explain' }, { t: tw, p: 'wow' }, { t: rc.start, p: 'pointUp' }]} />
      <Captions hideBetween={[[br.start, br.end]]} />
    </AbsoluteFill>
  );
};

export const KitDemo: React.FC<{ look?: Look['name'] }> = ({ look = 'blueprint' }) => (
  <MotionProvider look={look} vo={DEMO_VO}><Scene /></MotionProvider>
);
