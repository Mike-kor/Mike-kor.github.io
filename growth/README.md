# INDANG SOFT Growth Desk

## Daily workflow

1. Open `/growth/` and select one app for today's campaign.
2. Review the Naver Blog, Google/Naver SEO, Google Play ASO, Instagram/Reels, TikTok, Shorts, X/Threads, and Facebook/community drafts. Edit anything that does not match the latest build or release stage.
3. Copy the app-specific URL. Each share link points to `/go/<app>/` and labels the source, medium, campaign day, and post placement with UTM parameters.
4. Open a channel, paste or review its draft, attach a real gameplay capture, and publish manually. The content angle rotates through the app's feature list by date, so each new day highlights a different feature.
5. Mark the six daily tasks as complete. The checklist is saved in local browser storage for that device only.

## Portfolio source of truth

`apps.json` holds each product's current public description, stage, audience, key features, search terms, artwork, and known destination. Keep the project's own README and store listing as the factual source, then update this file when a project or release stage changes. Run `node growth/build-campaign-pages.mjs` to regenerate each indexable `/go/<slug>/` landing page.

The shared campaign pages use unique titles, descriptions, canonical URLs, Open Graph images, and `VideoGame` structured data. They do not claim a public Play listing when the app is in closed testing. The two playable web projects lead to the live web game; Android test projects lead to a test or release inquiry.

## Measurement and automation boundary

UTM values identify the source channel and campaign in analytics installed on the destination. This repository does not currently contain a verified GA4 property ID or connected platform publishing credentials, so the Growth Desk does not claim to report aggregate clicks or publish on the user's behalf. Daily checklist state stays in the visitor's browser. The paid-ads pack prepares copy and audience hints only; it never creates a campaign or spends budget. Automatic publishing can be added later behind each platform's OAuth and an authenticated server-side scheduler; credentials must not be added to this static site.
