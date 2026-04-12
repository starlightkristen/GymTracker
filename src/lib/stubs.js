// All data flows through this module. Session 2 will swap implementations,
// but signatures stay stable. Do not call Supabase directly from components.

export const getWorkoutForDay = async (day, location) => ({
  day,
  location,
  name: 'Push Day',
  exercises: [
    { id: 1, name: 'Chest Press', muscle: 'Chest', sets: 3, reps: 10,
      last_weight: 85, recommendation: 90,
      rec_note: 'Hit all sets last time ✓ — ready to go up' },
    { id: 2, name: 'Shoulder Press', muscle: 'Shoulders', sets: 3, reps: 12,
      last_weight: 55, recommendation: 55,
      rec_note: 'Hold — missed a set last time' },
    { id: 3, name: 'Tricep Pushdown', muscle: 'Triceps', sets: 3, reps: 15,
      last_weight: 40, recommendation: 45,
      rec_note: 'Hit all sets ✓' },
    { id: 4, name: 'Cable Fly', muscle: 'Chest', sets: 3, reps: 12,
      last_weight: 30, recommendation: 35,
      rec_note: 'Hit all sets ✓' },
  ],
})

export const getExerciseHistory = async (exerciseId) => ({
  last_weight: 85,
  last_reps: 10,
  sets_completed: 3,
  target_sets: 3,
  session_date: new Date().toISOString(),
  all_time_max: 90,
})

export const getRecommendation = async (exerciseId) => ({
  weight: 90,
  note: 'Hit all 3 sets at 85 lbs ✓ — ready to go up',
})

export const getMachineMap = async (qrValue) => null
export const saveMachineMap = async (qrValue, exerciseId) => true
export const saveLogs = async (logs) => true
export const saveWorkoutSession = async (session) => ({ id: 'stub-session-id' })

export const getUserProfile = async () => ({
  goals: ['build_muscle', 'lose_fat'],
  gym_type: 'planet_fitness',
  home_equipment: ['barbell', 'dumbbells', 'bodyweight'],
  location_preference: 'gym',
})

export const saveUserProfile = async (profile) => true

export const getStats = async () => ({
  workouts: 12,
  prs: 7,
  volume: 14200,
  streak: 4,
})

export const getMartialArtsTechniques = async (art, category) => []
export const getStretchSession = async (category) => []
export const getProgressions = async (exerciseName) => []
export const getExercises = async (filters) => []
export const getSchedules = async () => []
export const saveSchedule = async (schedule) => true
export const getWorkoutSessions = async () => []

export const getStretchCategories = async () => ([
  { slug: 'morning', label: 'Morning Mobility', count: 8 },
  { slug: 'pre_workout', label: 'Pre-Workout Dynamic', count: 10 },
  { slug: 'post_workout', label: 'Post-Workout Static', count: 12 },
  { slug: 'lower_body', label: 'Lower Body Focus', count: 10 },
  { slug: 'upper_body', label: 'Upper Body Focus', count: 8 },
  { slug: 'full_body', label: 'Full Body Flow', count: 14 },
])
