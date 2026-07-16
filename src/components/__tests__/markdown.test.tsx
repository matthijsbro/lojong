import React from 'react';
import renderer from 'react-test-renderer';
import { Markdown } from '../Markdown';
import { THEMES } from '@/theme/themes';
import { slogans } from '@/content/slogans';
import { commentaryExtras } from '@/content/commentary';

const colors = THEMES.warm;

function create(el: React.ReactElement) {
  let tree: renderer.ReactTestRenderer;
  renderer.act(() => {
    tree = renderer.create(el);
  });
  return tree!;
}

function texts(node: any): string[] {
  const out: string[] = [];
  const walk = (n: any) => {
    if (typeof n === 'string') out.push(n);
    else if (n?.children) n.children.forEach(walk);
  };
  walk(node.toJSON());
  return out;
}

describe('Markdown', () => {
  it('renders null for empty input', () => {
    const tree = create(<Markdown markdown="" colors={colors} fontScale={1} />);
    expect(tree.toJSON()).toBeNull();
  });

  it('renders headings, lists, quote, bold, italic', () => {
    const md = [
      '# Title',
      '',
      'Para with **bold** and *ital* and _under_.',
      '',
      '- first',
      '- second',
      '',
      '1. one',
      '2. two',
      '',
      '> a quote',
      '> second line',
    ].join('\n');
    const tree = create(<Markdown markdown={md} colors={colors} fontScale={1} />);
    const all = texts(tree).join('|');
    expect(all).toContain('Title');
    expect(all).toContain('bold');
    expect(all).toContain('ital');
    expect(all).toContain('under');
    expect(all).toContain('first');
    expect(all).toContain('•');
    expect(all).toContain('2.');
    expect(all).toContain('a quote\nsecond line');
    expect(all).not.toContain('**');
  });

  it('preserves verse line breaks and unmatched markers', () => {
    const md = 'line one\nline two\n\nprice was 3*4 dollars';
    const tree = create(<Markdown markdown={md} colors={colors} fontScale={1} />);
    const all = texts(tree).join('|');
    expect(all).toContain('line one\nline two');
    expect(all).toContain('3*4');
  });

  it('renders every migrated slogan explanation without crashing', () => {
    for (const s of slogans) {
      for (const locale of ['en', 'de'] as const) {
        const tree = create(
          <Markdown markdown={s[locale].explanation} colors={colors} fontScale={1} />
        );
        const joined = texts(tree).join('');
        // merged content must survive rendering essentially intact
        expect(joined.length).toBeGreaterThan(s[locale].explanation.length * 0.9);
      }
    }
  });

  it('renders the commentary extras without crashing', () => {
    for (const locale of ['en', 'de'] as const) {
      const extras = commentaryExtras[locale];
      for (const md of [extras.introduction, extras.conclusion, extras.bibliography]) {
        const tree = create(<Markdown markdown={md} colors={colors} fontScale={1} />);
        if (md.trim()) {
          // markdown markers are consumed, not rendered literally
          const joined = texts(tree).join('');
          expect(joined.length).toBeGreaterThan(0);
          expect(joined).not.toMatch(/^#|\n#/);
        } else {
          expect(tree.toJSON()).toBeNull();
        }
      }
    }
  });
});
