import { sql } from "@vercel/postgres";
import { waitForDebugger } from "inspector";

export async function POST(req: Request) {
    try {
        console.log(req, "req")
      
        await sql`INSERT INTO player_Games (player_id, game_id, current_words, wpm) VALUES (${2}, ${2}, ${2}, ${2})`;

        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error("Error creating message:", error);
        return new Response("Error creating message", { status: 500 });
    }
}