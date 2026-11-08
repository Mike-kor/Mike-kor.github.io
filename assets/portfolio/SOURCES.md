# Portfolio asset and description sources

Refreshed 2026-11-09 against the current local project repositories and their app icon or store art. The homepage shows the verified app icon over gameplay artwork where available. If a project has no app icon, the icon badge is omitted instead of substituting another project's art.

| Portfolio item | Source repository | Current artwork | Verified app icon |
| --- | --- | --- | --- |
| NUMERON | `numeron` | `numeron.jpg` | `app-icons/numeron.png` from project `icon.png` |
| Shooter Survival | `shooter-survival` | `shooter.jpg` | `app-icons/shooter-survival.png` from Play Store assets |
| GOLDILOCKS | `goldilocks` | `goldilocks.jpg` | `app-icons/goldilocks.png` from project `assets/icons/icon_512.png` |
| 귀환의 서 | `vector-mud` | Official app icon | `app-icons/tome-of-return.png` from project `icon.png`; replaced the stale combat screenshot |
| 눈덩이 대재앙 | `drawsnowball` | Official app icon | `app-icons/snowball-apocalypse.png` from project `icon.png`; description now reflects rolling, destruction, and lab upgrades |
| 묵검: 천마일대기 | `muhyup` | `mukgeom.jpg` | `app-icons/mukgeom.png` from project `icon.png` |
| 이세계 아이돌 키우기 | `isekai-idol` | `idol.jpg` | `app-icons/isekai-idol.png` from Play Store assets |
| 집값의 신: 한 달만 더 | `apt-market` | `apt-market.jpg` | `app-icons/apt-market.png` from store icon |
| 퇴사 좀 시켜줘! | `quitverse-letmequit` | `quitverse.jpg` | `app-icons/quitverse.png` from Korean store assets |
| 신과 통계 | `god-statistics` | Official app icon | `app-icons/god-statistics.svg` from current project `icon.svg` |
| 말랑꼬리: 포근펫 키우기 | `tail-pivot` | `tail-pivot.jpg` | `app-icons/tail-pivot.svg` from current project art |
| Endless Edge | `infinity-blade4` | `endless-edge.png`, an unaltered current combat capture | `app-icons/endless-edge.png` from English store assets; Android project is in development and has no Play listing yet |
| 밤티월드 | `bamtiworld` | `bamti-sunset.jpg` + `bamti/*.svg` | Web project; no Android app icon |

The Growth Desk's `growth/apps.json` is the canonical project description and destination list. Update it alongside homepage cards and regenerate detail/share pages with `node growth/build-campaign-pages.mjs` and `node growth/build-install-pages.mjs`.
