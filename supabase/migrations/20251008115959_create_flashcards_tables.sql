/*
  # Create flashcards schema

  1. New Tables
    - `flashcard_sets`
      - `id` (uuid, primary key)
      - `title` (text) - Title of the flashcard set
      - `description` (text) - Optional description
      - `user_id` (uuid) - Owner of the set
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `flashcards`
      - `id` (uuid, primary key)
      - `set_id` (uuid, foreign key to flashcard_sets)
      - `question` (text) - Front of the card
      - `answer` (text) - Back of the card
      - `created_at` (timestamptz)
    
    - `flashcard_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - User tracking progress
      - `flashcard_id` (uuid, foreign key to flashcards)
      - `mastered` (boolean) - Whether user has mastered this card
      - `last_reviewed` (timestamptz) - Last time card was reviewed
      - `review_count` (integer) - Number of times reviewed
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can read their own flashcard sets and progress
    - Users can create, update, and delete their own flashcard sets
*/

CREATE TABLE IF NOT EXISTS flashcard_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  user_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  set_id uuid NOT NULL REFERENCES flashcard_sets(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS flashcard_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  flashcard_id uuid NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  mastered boolean DEFAULT false,
  last_reviewed timestamptz DEFAULT now(),
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, flashcard_id)
);

ALTER TABLE flashcard_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own flashcard sets"
  ON flashcard_sets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own flashcard sets"
  ON flashcard_sets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcard sets"
  ON flashcard_sets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own flashcard sets"
  ON flashcard_sets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view flashcards from their sets"
  ON flashcards FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM flashcard_sets
      WHERE flashcard_sets.id = flashcards.set_id
      AND flashcard_sets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create flashcards in their sets"
  ON flashcards FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM flashcard_sets
      WHERE flashcard_sets.id = flashcards.set_id
      AND flashcard_sets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update flashcards in their sets"
  ON flashcards FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM flashcard_sets
      WHERE flashcard_sets.id = flashcards.set_id
      AND flashcard_sets.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM flashcard_sets
      WHERE flashcard_sets.id = flashcards.set_id
      AND flashcard_sets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete flashcards from their sets"
  ON flashcards FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM flashcard_sets
      WHERE flashcard_sets.id = flashcards.set_id
      AND flashcard_sets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own progress"
  ON flashcard_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress"
  ON flashcard_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON flashcard_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
  ON flashcard_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_flashcards_set_id ON flashcards(set_id);
CREATE INDEX IF NOT EXISTS idx_flashcard_progress_user_flashcard ON flashcard_progress(user_id, flashcard_id);