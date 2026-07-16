import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeColors, scaled } from '@/theme/themes';

// Minimal markdown renderer for the app's hand-edited content
// (slogans.ts, commentary.ts). Supported syntax:
//   # ## ###   headings
//   - or *     bulleted list item
//   1.         numbered list item
//   >          blockquote (consecutive > lines form one quote)
//   **bold**, *italic*, _italic_
// Blank line = new paragraph; single newlines inside a paragraph are kept
// (verse line breaks). Content is trusted first-party text; no links,
// tables or images.

type Props = {
  markdown: string;
  colors: ThemeColors;
  fontScale: number;
};

type Block =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] };

function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      blocks.push({
        type: 'heading',
        level: heading[1].length as 1 | 2 | 3,
        text: heading[2].trim(),
      });
      i++;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'quote', text: quoteLines.join('\n').trim() });
      continue;
    }
    const isBullet = (l: string) => /^[-*]\s+/.test(l);
    const isNumbered = (l: string) => /^\d+\.\s+/.test(l);
    if (isBullet(line) || isNumbered(line)) {
      const ordered = isNumbered(line);
      const matches = ordered ? isNumbered : isBullet;
      const items: string[] = [];
      while (i < lines.length && matches(lines[i])) {
        items.push(lines[i].replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, ''));
        i++;
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }
    // Paragraph: consecutive plain lines, joined with '\n' to preserve verse
    // line breaks.
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3})\s/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !isBullet(lines[i]) &&
      !isNumbered(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: 'paragraph', text: paraLines.join('\n') });
  }
  return blocks;
}

// Split text into plain/bold/italic segments. Bold (**) is matched before
// italic (* or _); unmatched markers render literally.
function renderInline(text: string, styles: Styles): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*([^*\n]+)\*|_([^_\n]+)_/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(
        <Text key={key++} style={styles.bold}>
          {match[1]}
        </Text>
      );
    } else {
      nodes.push(
        <Text key={key++} style={styles.italic}>
          {match[2] ?? match[3]}
        </Text>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ markdown, colors, fontScale }: Props) {
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);
  const blocks = useMemo(() => parseBlocks(markdown), [markdown]);
  if (blocks.length === 0) return null;

  return (
    <View>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const style =
              block.level === 1 ? styles.h1 : block.level === 2 ? styles.h2 : styles.h3;
            return (
              <Text key={index} style={style}>
                {renderInline(block.text, styles)}
              </Text>
            );
          }
          case 'quote':
            return (
              <View key={index} style={styles.quote}>
                <Text style={styles.body}>{renderInline(block.text, styles)}</Text>
              </View>
            );
          case 'list':
            return (
              <View key={index} style={styles.list}>
                {block.items.map((item, n) => (
                  <View key={n} style={styles.listItem}>
                    <Text style={[styles.body, styles.listMarker]}>
                      {block.ordered ? `${n + 1}.` : '•'}
                    </Text>
                    <Text style={[styles.body, styles.listText]}>
                      {renderInline(item, styles)}
                    </Text>
                  </View>
                ))}
              </View>
            );
          case 'paragraph':
            return (
              <Text key={index} style={[styles.body, styles.paragraph]}>
                {renderInline(block.text, styles)}
              </Text>
            );
        }
      })}
    </View>
  );
}

type Styles = ReturnType<typeof makeStyles>;

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    body: {
      fontSize: scaled(15, f),
      color: c.textPrimary,
      lineHeight: scaled(23, f),
    },
    paragraph: {
      marginBottom: 10,
    },
    h1: {
      fontSize: scaled(20, f),
      lineHeight: scaled(28, f),
      fontWeight: '700',
      color: c.textPrimary,
      marginTop: 12,
      marginBottom: 10,
    },
    h2: {
      fontSize: scaled(17, f),
      lineHeight: scaled(25, f),
      fontWeight: '700',
      color: c.textPrimary,
      marginTop: 10,
      marginBottom: 8,
    },
    h3: {
      fontSize: scaled(15, f),
      lineHeight: scaled(23, f),
      fontWeight: '700',
      color: c.textPrimary,
      marginTop: 8,
      marginBottom: 6,
    },
    quote: {
      borderLeftWidth: 3,
      borderLeftColor: c.highlight,
      paddingLeft: 12,
      marginBottom: 10,
    },
    list: {
      marginBottom: 10,
    },
    listItem: {
      flexDirection: 'row',
    },
    listMarker: {
      width: scaled(22, f),
    },
    listText: {
      flex: 1,
    },
    bold: {
      fontWeight: '700',
    },
    italic: {
      fontStyle: 'italic',
    },
  });
