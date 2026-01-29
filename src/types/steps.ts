/**
 * Step interface for the 5-step emotional regulation process.
 * Based on Diane Lapensee's "Du declencheur au besoin" methodology.
 */
export interface Step {
  id: number;         // 1-5
  title: string;      // e.g., "S'arrêter"
  question: string;   // Key question with proper French accents
  actions: string[];  // Bullet points from content
}
