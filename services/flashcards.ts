import { supabase } from "@/lib/supabase";

export interface FlashCard {
    id: string;
    set_id: string;
    question: string;
    answer: string;
    created_at: string;
}

export interface FlashCardSet {
    id: string;
    title: string;
    description: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface FlashCardProgress {
    id: string;
    user_id: string;
    flashcard_id: string;
    mastered: boolean;
    last_reviewed: string;
    review_count: number;
    created_at: string;
    updated_at: string;
}

export const flashcardService = {
    async getFlashcardSets() {
        const { data, error } = await supabase
            .from("flashcard_sets")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data as FlashCardSet[];
    },

    async getFlashcardsBySetId(setId: string) {
        const { data, error } = await supabase
            .from("flashcards")
            .select("*")
            .eq("set_id", setId)
            .order("created_at", { ascending: true });

        if (error) throw error;
        return data as FlashCard[];
    },

    async getProgress(userId: string, flashcardId: string) {
        const { data, error } = await supabase
            .from("flashcard_progress")
            .select("*")
            .eq("user_id", userId)
            .eq("flashcard_id", flashcardId)
            .maybeSingle();

        if (error) throw error;
        return data as FlashCardProgress | null;
    },

    async updateProgress(
        userId: string,
        flashcardId: string,
        mastered: boolean
    ) {
        const existing = await this.getProgress(userId, flashcardId);

        if (existing) {
            const { data, error } = await supabase
                .from("flashcard_progress")
                .update({
                    mastered,
                    last_reviewed: new Date().toISOString(),
                    review_count: existing.review_count + 1,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", existing.id)
                .select()
                .single();

            if (error) throw error;
            return data as FlashCardProgress;
        } else {
            const { data, error } = await supabase
                .from("flashcard_progress")
                .insert({
                    user_id: userId,
                    flashcard_id: flashcardId,
                    mastered,
                    review_count: 1,
                })
                .select()
                .single();

            if (error) throw error;
            return data as FlashCardProgress;
        }
    },

    async createFlashcardSet(
        userId: string,
        title: string,
        description: string
    ) {
        const { data, error } = await supabase
            .from("flashcard_sets")
            .insert({
                user_id: userId,
                title,
                description,
            })
            .select()
            .single();

        if (error) throw error;
        return data as FlashCardSet;
    },

    async createFlashcard(
        setId: string,
        question: string,
        answer: string
    ) {
        const { data, error } = await supabase
            .from("flashcards")
            .insert({
                set_id: setId,
                question,
                answer,
            })
            .select()
            .single();

        if (error) throw error;
        return data as FlashCard;
    },
};
