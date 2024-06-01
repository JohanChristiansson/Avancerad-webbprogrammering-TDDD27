export const dynamic = 'force-dynamic';
import { sql } from "@vercel/postgres";
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
    try {
        const { wordCount, WPM, playerId, lobbyId } = await req.json();
        console.log(req, "Skrivs detta ut någon gång? I route multiplayer")
      
        let data = {wordCount, playerId}
        await pusherServer.trigger(lobbyId, 'update-player-words', data);

        await sql`INSERT INTO player_Games (player_id, game_id, current_words, wpm) VALUES (${playerId}, ${lobbyId}, ${wordCount}, ${WPM})`;

        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error("Error creating message:", error);
        return new Response("Error creating message", { status: 500 });
    }
}