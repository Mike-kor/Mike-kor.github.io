# Portfolio asset and description sources

Refreshed 2026-11-17 against the latest local project repositories, official store icons, promotion banners, and gameplay art. The homepage shows the verified app icon over gameplay artwork where available. If a project has no app icon, the icon badge is omitted instead of substituting another project's art.

| Portfolio item | Source repository | Current artwork / promotional banner | Verified app icon |
| --- | --- | --- | --- |
| NUMERON | `numeron` | `promotions/numeron-banner.webp` optimized from Korean 2026 Play listing feature graphic | `app-icons/numeron.png` from project `icon.png` |
| Shooter Survival | `shooter-survival` | `promotions/shooter-survival-banner.webp` optimized from current Play Store feature graphic | `app-icons/shooter-survival.png` from current project `icon-512.png` |
| GOLDILOCKS | `goldilocks` | `portfolio/goldilocks-current.png` from current 1080×1920 gameplay capture | `app-icons/goldilocks.png` from project `assets/icons/icon_512.png` |
| 귀환의 서 | `vector-mud` | Current official app icon in a dedicated art panel; current capture is too text-heavy for a promo banner | `app-icons/tome-of-return.png` from project `icon.png` |
| 눈덩이 대재앙 | `drawsnowball` | Official app icon | `app-icons/snowball-apocalypse.png` from project `icon.png`; description now reflects rolling, destruction, and lab upgrades |
| 묵검: 천마일대기 | `muhyup` | `promotions/mukgeom-banner.webp` optimized from current Play Store feature graphic | `app-icons/mukgeom.png` from project `icon.png` |
| 이세계 아이돌 키우기 | `isekai-idol` | `promotions/isekai-idol-banner.webp` optimized from Play Store feature graphic | `app-icons/isekai-idol.png` from current Play Store icon |
| 집값의 신: 한 달만 더 | `apt-market` | `promotions/apt-market-banner.webp` optimized from November 2026 store graphic | `app-icons/apt-market.png` from current store icon |
| 퇴사 좀 시켜줘! | `quitverse-letmequit` | `promotions/quitverse-banner.webp` optimized from Korean store feature graphic | `app-icons/quitverse.png` from current Korean store app icon |
| 신과 통계 | `god-statistics` | Official app icon | `app-icons/god-statistics-console-reference.png`, a visual reconstruction from the current Play Console 512×512 listing preview (original source file unavailable in local project) |
| 말랑꼬리: 포근펫 키우기 | `tail-pivot` | `promotions/tail-pivot-banner.webp` optimized from current Play feature graphic | `app-icons/tail-pivot.png` from current Google Play icon |
| Endless Edge | `infinity-blade4` | `endless-edge.png`, an unaltered current combat capture | `app-icons/endless-edge.png` from English store assets; Android project is in development and has no Play listing yet |
| 밤티월드 | `bamtiworld` | `bamti-sunset.jpg` + `bamti/*.svg` | Web project; no Android app icon |

The Growth Desk's `growth/apps.json` is the canonical project description and destination list. Every homepage promo banner and campaign download CTA routes through `/install/<slug>/` before handing off to its store or web destination. Update it alongside homepage cards and regenerate detail/share pages with `node growth/build-campaign-pages.mjs` and `node growth/build-install-pages.mjs`.
