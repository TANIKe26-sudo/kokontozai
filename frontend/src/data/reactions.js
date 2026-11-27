// SVGの実装は components/svg/reactions/ に置き、表示名や一覧の順番はここで管理します。
export const REACTIONS = {
  'heart': { id: 'heart', name: 'ハート', label: '共感' },
  'hug': { id: 'hug', name: 'ハグ', label: 'ハグ' },
  'heart-hands': { id: 'heart-hands', name: 'ハート(手)', label: 'ハートを送る' },
  'handshake': { id: 'handshake', name: '握手', label: '握手' },
  'pray': { id: 'pray', name: '祈り', label: '祈る' },
  'exploding-head': { id: 'exploding-head', name: '頭爆発', label: 'びっくり' },
  'pleading-face': { id: 'pleading-face', name: 'ぴえん', label: 'ぴえん' },
  'melting-face': { id: 'melting-face', name: '溶ける顔', label: 'とろける' },
  'cry': { id: 'cry', name: '涙', label: '泣く' },
  'sob': { id: 'sob', name: '号泣', label: '号泣' },
  'pensive': { id: 'pensive', name: 'しょんぼり', label: '考える' },
  'eyes': { id: 'eyes', name: '目', label: '見守る' },
  'scream': { id: 'scream', name: '叫び', label: '叫ぶ' },
};

export const INVENTORY_REACTIONS = Object.values(REACTIONS);

export const MESSAGE_REACTIONS = [
  REACTIONS['heart'],
  REACTIONS['eyes'],
  REACTIONS['hug'],
  REACTIONS['exploding-head'],
  REACTIONS['handshake'],
  REACTIONS['heart-hands'],
  REACTIONS['cry'],
  REACTIONS['scream'],
  REACTIONS['sob'],
  REACTIONS['pensive'],
  REACTIONS['pray'],
  REACTIONS['melting-face'],
  REACTIONS['pleading-face'],
];
