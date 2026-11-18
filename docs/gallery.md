# Gallery media

The homepage gallery has four vertical reel cards and two photo compositions.
Reels work best as **9:16 MP4 (H.264) or WebM**, with an optimized poster image.
Only the poster loads on the page; video loads after a user opens its card.
There is no background autoplay. Closing the viewer pauses and unloads playback.

The current artwork is generated design imagery, not verified shop photography.
No video files have been supplied, so reel cards currently open photo previews
and display a camera icon. They must not pretend to play videos.

## Add the real videos

1. Add owner-approved files to `public/gallery/` (for example `grill.mp4`).
2. In `src/content/gallery.ts`, add `videoSrc: '/gallery/grill.mp4'` to the
   matching item in `galleryReels`. Use three or four items as needed; the
   desktop rail and mobile counter adapt to the number of cards.
3. Replace `poster` and `alt` with a matching image and accurate description.
4. For spoken content, provide WebVTT captions using:
   `captions: { src: '/gallery/grill.fr.vtt', language: 'fr', label: 'Français' }`.

Adding `videoSrc` automatically enables a play icon, video label, native player,
fullscreen, sound, captions (when supplied), and playback error fallback.
Use an actual video URL, not an Instagram post URL. The Instagram link in the
section remains the path to the restaurant's social profile.

## Add the shop photos

Replace the two `galleryPhotos` images, alt text, and captions in the same file.
The main composition suits an interior/exterior image and the second a table
or detail. `objectPosition` controls the crop. Full images open uncropped in
the keyboard-accessible viewer; Escape closes it and restores focus.

The older `gallery` export remains for compatibility with the unused React
gallery component. The homepage uses `galleryReels` and `galleryPhotos`.
