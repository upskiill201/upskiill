-- CreateTable user_course_progress
CREATE TABLE IF NOT EXISTS "user_course_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'not_started',
    "progressPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentLessonId" TEXT,
    "lastStepId" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "lastActiveAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_course_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable user_lesson_progress
CREATE TABLE IF NOT EXISTS "user_lesson_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'locked',
    "progressPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "attemptsCount" INTEGER NOT NULL DEFAULT 0,
    "lastStepId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_lesson_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable user_step_progress
CREATE TABLE IF NOT EXISTS "user_step_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'not_started',
    "completionPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "score" DOUBLE PRECISION,
    "attemptsCount" INTEGER NOT NULL DEFAULT 0,
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "lastAttemptAt" TIMESTAMP(3),
    "isMastered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_step_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable user_step_attempts
CREATE TABLE IF NOT EXISTS "user_step_attempts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,
    "inputData" JSONB,
    "resultScore" DOUBLE PRECISION,
    "aiFeedback" TEXT,
    "isCorrect" BOOLEAN,
    "timeSpentSeconds" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_step_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable learning_sessions
CREATE TABLE IF NOT EXISTS "learning_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "durationSeconds" INTEGER,
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "stepsCompleted" INTEGER NOT NULL DEFAULT 0,
    "deviceType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learning_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable user_learning_streaks
CREATE TABLE IF NOT EXISTS "user_learning_streaks" (
    "userId" TEXT NOT NULL,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActivityDate" TEXT,
    "streakFreezeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_learning_streaks_pkey" PRIMARY KEY ("userId")
);

-- Unique Indexes
CREATE UNIQUE INDEX IF NOT EXISTS "user_course_progress_userId_courseId_key" ON "user_course_progress"("userId", "courseId");
CREATE UNIQUE INDEX IF NOT EXISTS "user_lesson_progress_userId_lessonId_key" ON "user_lesson_progress"("userId", "lessonId");
CREATE UNIQUE INDEX IF NOT EXISTS "user_step_progress_userId_stepId_key" ON "user_step_progress"("userId", "stepId");

-- Performance Indexes
CREATE INDEX IF NOT EXISTS "idx_ucp_user" ON "user_course_progress"("userId");
CREATE INDEX IF NOT EXISTS "idx_ulp_user" ON "user_lesson_progress"("userId");
CREATE INDEX IF NOT EXISTS "idx_usp_user" ON "user_step_progress"("userId");
CREATE INDEX IF NOT EXISTS "idx_attempts_step" ON "user_step_attempts"("stepId");
CREATE INDEX IF NOT EXISTS "idx_attempts_user" ON "user_step_attempts"("userId");
CREATE INDEX IF NOT EXISTS "idx_sessions_user" ON "learning_sessions"("userId");
CREATE INDEX IF NOT EXISTS "idx_streak_last_activity" ON "user_learning_streaks"("lastActivityDate");

-- Foreign Keys
ALTER TABLE "user_course_progress" ADD CONSTRAINT "user_course_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_course_progress" ADD CONSTRAINT "user_course_progress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "course_lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_step_progress" ADD CONSTRAINT "user_step_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_step_progress" ADD CONSTRAINT "user_step_progress_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "lesson_steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_step_attempts" ADD CONSTRAINT "user_step_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_step_attempts" ADD CONSTRAINT "user_step_attempts_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "lesson_steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "learning_sessions" ADD CONSTRAINT "learning_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_learning_streaks" ADD CONSTRAINT "user_learning_streaks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
