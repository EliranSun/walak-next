CREATE TABLE IF NOT EXISTS "sleepTrack" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sleep_start TEXT,
    sleep_end TEXT,
    duration TEXT,
    rem INTEGER,
    deep INTEGER,
    protein INTEGER,
    carbs INTEGER,
    fat INTEGER,
    sodium INTEGER,
    last_alcohol TEXT,
    last_food TEXT,
    last_caffeine TEXT,
    last_exercise TEXT,
    last_screen TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
