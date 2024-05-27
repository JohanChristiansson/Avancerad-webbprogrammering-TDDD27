export const dynamic = 'force-dynamic';
import { sql } from "@vercel/postgres";
import { pusherServer } from '@/lib/pusher';
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
        const { lobbyId, correctWords } = await req.json();
        const cookieStore = cookies();
            const cookie = cookieStore.get('user');
        var username;
        if (cookie) {
            username = cookie?.value
        } else {
            return new Response("Error retrieving user, not authenticated", { status: 401 });
        }
        let resp = {
            user: username,
            words: correctWords
        }
        await pusherServer.trigger(lobbyId, 'update-words', resp);

        await sql`
        UPDATE user_in_lobby
        SET current_words = ${correctWords}
        WHERE player_name = ${username} AND game_id = ${lobbyId}
        `;
        console.log(username, correctWords, "sent trigger and added to db")
        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error("Error uppdating user:", error);
        return new Response("Error uppdating user", { status: 500 });
    }
}