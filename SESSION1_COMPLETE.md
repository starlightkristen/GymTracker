# Session 1 Complete

## Deployed URL
https://gymtracker-lzp7k2mro-kristen-stehlars-projects.vercel.app

Every push to `main` auto-deploys to Vercel.

## GitHub Repo
https://github.com/starlightkristen/GymTracker

## Figma File
https://www.figma.com/design/f9NANguHXmS5hKpqf3rGRJ

## All Routes

- `/` → redirects to `/discover`
- `/discover` — DiscoverHome
- `/discover/muscle` — ByMuscleGroup
- `/discover/goal` — ByGoal
- `/discover/type` — ByWorkoutType
- `/discover/equipment` — ByEquipment
- `/discover/stretch` — StretchHome
- `/discover/stretch/session` — StretchSession
- `/discover/stretch/:id` — StretchDetail
- `/discover/martial-arts` — MartialArtsHome
- `/discover/martial-arts/muay-thai` — MuayThaiOverview
- `/discover/martial-arts/krav-maga` — KravMagaOverview
- `/discover/martial-arts/bjj` — BJJOverview
- `/discover/martial-arts/bjj/map` — BJJPositionalMap
- `/discover/martial-arts/:art/technique/:id` — TechniqueDetail
- `/discover/martial-arts/muay-thai/combo/:id` — CombinationCard
- `/discover/martial-arts/krav-maga/scenario/:id` — ScenarioDetail
- `/library` — ExerciseLibrary
- `/library/:id` — ExerciseDetail
- `/routines` — RoutineTemplates
- `/routines/:id/edit` — RoutineEditor
- `/today` — TodayGym
- `/today/home` — TodayHome
- `/today/exercise/:id` — ExerciseLog
- `/today/qr` — QRScan
- `/today/complete` — WorkoutComplete
- `/today/plate-calc` — PlateCalculator
- `/progress` — Progress
- `/progress/history` — History
- `/settings` — Settings
- `/onboarding` — Welcome
- `/onboarding/goals` — Goals
- `/onboarding/schedule` — Schedule
- `/onboarding/equipment` — HomeEquipment
- `/onboarding/gym` — GymSetup

## Components Built

### Layout (`src/components/layout/`)
- `NavBar.jsx` — 4-tab bottom nav (Discover, Today, Progress, Settings)
- `PageHeader.jsx` — Back link + title + subtitle + optional right slot
- `ScreenWrapper.jsx` — Mobile-first 390px max-width wrapper with safe-area pb

### UI (`src/components/ui/`)
- `ExerciseCard.jsx` — Tappable card with accent bar, muscle pill, recommendation
- `Pill.jsx` — Rounded pill chip with themable bg/color
- `NumericKeypad.jsx` — Weight entry keypad (1–9, ., 0, ⌫) + quick ± step
- `RestTimer.jsx` — 60px timer with start/pause/reset
- `SkeletonCard.jsx` — Animated pulse placeholder
- `StubBadge.jsx` — Amber chip for unfinished features

## All Stub Functions (`src/lib/stubs.js`)

Same signatures are preserved for Session 2 (only internals change):

- `getWorkoutForDay(day, location)`
- `getExerciseHistory(exerciseId)`
- `getRecommendation(exerciseId)`
- `getMachineMap(qrValue)`
- `saveMachineMap(qrValue, exerciseId)`
- `saveLogs(logs)`
- `saveWorkoutSession(session)`
- `getUserProfile()`
- `saveUserProfile(profile)`
- `getStats()`
- `getMartialArtsTechniques(art, category)`
- `getStretchSession(category)`
- `getProgressions(exerciseName)`
- `getExercises(filters)`
- `getSchedules()`
- `saveSchedule(schedule)`
- `getWorkoutSessions()`
- `getStretchCategories()`

## Session 2 Will

- Wire Supabase auth (magic link → `signInWithOtp`)
- Run schema migrations (exercises, workouts, logs, schedules, machine_map, user_profile)
- Replace every stub with real Supabase queries (signatures unchanged)
- Wire onboarding to save real data via `saveUserProfile` / `saveSchedule`
- Wire QR scan to `navigator.mediaDevices.getUserMedia` + QR decoder
- Populate exercise library + martial arts + stretch library tables
- Replace static charts with real aggregated data

## Known Placeholders

- `.env.local` has `VITE_SUPABASE_URL=placeholder` / `VITE_SUPABASE_ANON_KEY=placeholder`
- Vercel env vars are also placeholders (same names, set for Production)
- All data returned from `stubs.js` is mock
- Progress screen chart bars are static sample heights
- QR scan screen shows viewfinder UI only (no camera stream yet)
- Martial Arts technique / combo / scenario detail pages are backed by inline sample data
- BJJ position map lights up one position; tap routes update highlight only

## Build Stats

`npm run build` → 247 KB JS (71 KB gzip), 12 KB CSS (3.5 KB gzip), 0 errors
