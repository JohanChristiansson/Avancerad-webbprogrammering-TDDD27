import { sql } from "@vercel/postgres";
import { pusherServer } from '@/lib/pusher';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { wordCount, WPM, playerId, lobbyId } = await req.json();
        console.log(req, "req")
      
        console.log("här triggas pusher trigger")
        let data = {wordCount, playerId}
        pusherServer.trigger(lobbyId, 'update-player-words', data);

        await sql`INSERT INTO player_Games (player_id, game_id, current_words, wpm) VALUES (${playerId}, ${lobbyId}, ${wordCount}, ${WPM})`;

        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error("Error creating message:", error);
        return new Response("Error creating message", { status: 500 });
    }
}