import { sql } from "@vercel/postgres";
import MessageField from '@/components/ui/messageField';
import Messages from '@/components/ui/messages';
import '../../globals.css';

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
            <main>
                <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/}

                    <div className="logo-container">
                        <img src="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
                            style={{ width: '400px', height: '400px' }} />
                    </div>

                    <div className='textBoxBackground'>
                        <div className="textBox">
                            <div>
                                <p>messages:</p>
                                <Messages lobbyId={lobbyId} initialMessages={serializedMessages} />
                                <MessageField lobbyId={lobbyId} />
                            </div>
                        </div>
                    </div>
                </div>

            </main>


        );

    } catch (error) {
        console.error("Error retrieving messages:", error);

        return <div>Error retrieving messages from the database</div>;
    }
}

export default page;



{/* 
                <div className='playerContainer'>

                    <div className='player1'>
                        <h1>PlayerName</h1>
                        <img
                            src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' />

                    </div>
                    <div className='player2'>
                        <h1>PlayerName</h1>
                        <img
                            src='https://i.postimg.cc/DfgQq25Q/Wizard-Player2-ezgif-com-gif-maker-1.gif' />
                    </div>
                    <div className='player3'>
                        <h1>PlayerName</h1>
                        <img
                            src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' />
                    </div>
                    <div className='player4'>
                        <h1>PlayerName</h1>
                        <img
                            src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' />
                    </div>

                </div> */}
