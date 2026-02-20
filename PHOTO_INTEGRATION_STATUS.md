# New Muslim Stories - Photo Integration Status

**Session Date:** 2026-02-20
**Status:** In Progress

## Completed Work

### Photos Added to Project (11 total)
1. ✅ **Yusuf Islam (Cat Stevens)** - `cat-stevens.png`
2. ✅ **Yusuf Estes** - `yusuf-estes.jpg`
3. ✅ **Eddie Redzovic** - `eddie-redzovic.jpeg`
4. ✅ **Lauren Booth** - `lauren-booth.jpg`
5. ✅ **Abdur-Raheem Green** - `abdur-raheem-green.jpg`
6. ✅ **Kristiane Backer** - `kristiane-backer.jpg`
7. ✅ **Malcolm X** - `malcolm-x.jpg`
8. ✅ **Muhammad Ali** - `muhammad-ali.jpg`
9. ✅ **Aisha Bhutta** - `aisha-bhutta.jpg` (YouTube thumbnail)
10. ✅ **Shakeel Romero** - `shakeel-romero.jpg` (YouTube thumbnail)
11. ✅ **Rahim Jung** - `rahim-jung.jpg` (YouTube thumbnail)

### Stories Created
- ✅ Abdur-Raheem Green (EN + AR)
- ✅ Kristiane Backer (EN + AR)
- ✅ Malcolm X (EN + AR)
- ✅ Muhammad Ali (EN + AR)

### Code Changes Made
- ✅ Enabled profile photos in `ProfileHeader.tsx`
- ✅ Added image display to `StoryCard.tsx`
- ✅ Updated `next.config.mjs` with `images.unoptimized: true`
- ✅ Synchronized EN/AR image paths for 7 stories

## Remaining Work (25 Stories Missing Photos)

### High Priority (Well-known converts with potential photos)
1. **Aisha Bhutta** - Scottish convert who converted 30+ people
2. **Louis/Umair** - Brazilian ex-gangster (YouTube video available)
3. **David** - American recovering addict
4. **Jennifer Harrell** - Former Methodist minister
5. **Hamza** - Manchester shop worker

### Medium Priority
6. **Abd Al-Malik Rezeski** - Jewish/Christian to Islam
7. **Amin** - Dutch atheist
8. **Asia (Aisha)** - Japanese anthropologist
9. **Barbara** - French university student
10. **Brazilian Doctor** - Female doctor (15 years research)
11. **Brazilian Military** - Soldier
12. **Brazilian Taxi Driver** - Alessandro (São Paulo)
13. **British Police Officer** - Daniel
14. **British Young Man** - Rahim Jung's mother
15. **Christian Ramadan Fast** - Amin (Netherlands)
16. **Christian Young Man** - Tim/Jamal (UK)
17. **Deaf Woman** - Rebecca Hussain
18. **Elaine Aisyah** - Chinese woman
19. **French Girl (Barbara)** - French convert
20. **Karen Meek** - Skeptical American
21. **Madeline** - Swedish woman
22. **Martin** - Leeds man
23. **Music as Religion** - Another Cat Stevens entry
24. **Polish Young Man** - Poland
25. **Rashid** - Spanish convert

### Photo Search Strategy
- Check YouTube videos for screenshots (Aisha Bhutta, Louis/Umair, etc.)
- Use news articles or official websites
- For unknown/unclear cases, use generic Islamic imagery or symbolic photos

## File Locations
- **Photos:** `public/images/stories/`
- **Stories:** `src/stories/`
- **Components:** `src/components/ProfileHeader.tsx`, `src/components/StoryCard.tsx`

## Technical Notes
- Images stored locally in `/public/images/stories/`
- Build configured with `images.unoptimized: true`
- Both EN and AR versions must have matching image paths
- Profile photos display in circular format on story cards and detail pages

## Next Steps
1. Continue searching for photos of remaining 25 stories
2. Download suitable images
3. Update story markdown files (both EN and AR)
4. Verify build passes after each batch

---
**Last Updated:** 2026-02-20
**Build Status:** ✅ Pass (76 pages)
