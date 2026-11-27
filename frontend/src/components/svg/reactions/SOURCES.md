# Noto Emoji のリアクション

このフォルダの `*Icon.jsx` は、Google Noto Emoji の公式SVGをReact用のJSXに変換したものです。

- 配布元: https://github.com/googlefonts/noto-emoji/tree/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg
- 取得元コミット: `99701e07d3d1fe1bdbcdb14964547f0fd592966f`
- ライセンス: Apache License 2.0。配布元の著作権・ライセンス表示は `LICENSE`、ライセンス全文は `LICENSE-APACHE-2.0.txt` に同梱しています。
- 変換内容: XML宣言・書き出しツールのコメントを除去し、属性名とstyleをJSXに変換しています。元の図形・色・viewBoxを使用しています。SVG内のIDと参照にはReactの `useId()` を付け、同じアイコンや別のアイコンを同時に表示してもグラデーション・クリッピングが干渉しないようにしています。

| リアクションID | Reactコンポーネント | 配布元ファイル |
| --- | --- | --- |
| `heart` | `HeartIcon.jsx` | [`emoji_u2764.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u2764.svg) |
| `hug` | `HugIcon.jsx` | [`emoji_u1fac2.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1fac2.svg) |
| `heart-hands` | `HeartHandsIcon.jsx` | [`emoji_u1faf6.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1faf6.svg) |
| `handshake` | `HandshakeIcon.jsx` | [`emoji_u1f91d.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1f91d.svg) |
| `pray` | `PrayIcon.jsx` | [`emoji_u1f64f.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1f64f.svg) |
| `exploding-head` | `ExplodingHeadIcon.jsx` | [`emoji_u1f92f.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1f92f.svg) |
| `pleading-face` | `PleadingFaceIcon.jsx` | [`emoji_u1f97a.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1f97a.svg) |
| `melting-face` | `MeltingFaceIcon.jsx` | [`emoji_u1fae0.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1fae0.svg) |
| `cry` | `CryIcon.jsx` | [`emoji_u1f622.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1f622.svg) |
| `sob` | `SobIcon.jsx` | [`emoji_u1f62d.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1f62d.svg) |
| `pensive` | `PensiveIcon.jsx` | [`emoji_u1f614.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1f614.svg) |
| `eyes` | `EyesIcon.jsx` | [`emoji_u1f440.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1f440.svg) |
| `scream` | `ScreamIcon.jsx` | [`emoji_u1f631.svg`](https://github.com/googlefonts/noto-emoji/blob/99701e07d3d1fe1bdbcdb14964547f0fd592966f/2D/svg/emoji_u1f631.svg) |

表示には `./ReactionIcon.jsx` を使用します。表示名と画面ごとの順番は `src/data/reactions.js`、IDとコンポーネントの対応は `index.js` で管理します。
