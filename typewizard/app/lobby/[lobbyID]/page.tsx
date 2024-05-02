import { sql } from "@vercel/postgres";
import MessageField from '@/components/ui/messageField';
import Messages from '@/components/ui/messages';

interface PageProps {
    params: {
        lobbyID: string //JUste denna kan också ha caps
    }
}

const page = async ({ params }: PageProps) => {
    const lobbyId = params.lobbyID; //ID with caps IS CORRECT IGNORE THE STUPID STUPID ERROR
    console.log("lobbyid in lobby page", lobbyId)
    console.log("params", params)
    try {
        const { rows: existingMessages } = await sql`SELECT * FROM Message WHERE LobbyId = ${lobbyId}`;

        // Map the retrieved messages to the desired format
        const serializedMessages = existingMessages.map((message) => ({
            text: message.text,
            id: message.id,
        }));

        return (
            <div>
                <p>messages:</p>
                <Messages lobbyId={lobbyId} initialMessages={serializedMessages} />
                <MessageField lobbyId={lobbyId} />
            </div>
        );
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return <div>Error retrieving messages from the database</div>;
    }
}

export default page;