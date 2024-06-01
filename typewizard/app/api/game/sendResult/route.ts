import { sql } from "@vercel/postgres";
import { pusherServer } from '@/lib/pusher';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { lobbyId, wpm, accuracy, score } = await req.json();

        if (!lobbyId || typeof lobbyId !== 'string') {
            return new Response("Invalid or missing lobbyId", { status: 400 });
        }
        if (typeof wpm !== 'number' || wpm < 0) {
            return new Response("Invalid or missing wpm", { status: 400 });
        }
        if (typeof accuracy !== 'number' || accuracy < 0 || accuracy > 100) {
            return new Response("Invalid or missing accuracy", { status: 400 });
        }
        if (typeof score !== 'number' || score < 0) {
            return new Response("Invalid or missing score", { status: 400 });
        }

        const cookieStore = cookies();
        const cookie = cookieStore.get('user');
        console.log(cookie?.value);

        if (!cookie) {
            return new Response("Error retrieving user, not authenticated", { status: 401 });
        }

        const name = cookie.value;

        const resp = {name, score, wpm, accuracy}; // Assuming you want to send these values in the Pusher event

        await pusherServer.trigger(lobbyId, 'send-result', resp);

        await sql`
            UPDATE user_in_lobby
            SET score = ${score}, wpm = ${wpm}, accuracy = ${accuracy}
            WHERE player_name = ${name} AND game_id = ${lobbyId}
        `;
        
        return new Response(JSON.stringify({ success: true }), { status: 200});
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
    }
}
