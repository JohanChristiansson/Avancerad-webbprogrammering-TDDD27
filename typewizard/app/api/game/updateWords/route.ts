export const dynamic = 'force-dynamic';
import { pusherServer } from '@/lib/pusher';
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
        const { lobbyId, totNrOfWords } = await req.json();
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
            words: totNrOfWords
        }
        await pusherServer.trigger(lobbyId, 'update-words', resp);
        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error("Error uppdating user:", error);
        return new Response("Error uppdating user", { status: 500 });
    }
}