import { sql } from "@vercel/postgres";
import MessageField from '@/components/ui/messageField';
import Messages from '@/components/ui/messages';
import '../../globals.css';
import { LongButton } from '@/components/ui/tmpButton';
import { usePathname, redirect } from 'next/navigation'

interface PageProps {
    params: {
        lobbyID: string //JUste denna kan också ha caps
    }
}

const page = async ({ params }: PageProps) => {
    const lobbyId = params.lobbyID; //ID with caps IS CORRECT IGNORE THE STUPID STUPID ERROR
    console.log("lobbyid in lobby page", lobbyId)
    const { rows: existingMessages } = await sql`SELECT * FROM Message WHERE lobby_id = ${lobbyId}`;

    // Map the retrieved messages to the desired format
    const serializedMessages = existingMessages.map((message) => ({
        text: message.text,
        id: message.id,
    }));
    console.log(serializedMessages, "serialised messages")


    return (
        <main>
            <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/}

                <div className="logo-container">
                    <img src="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
                        style={{ width: '400px', height: '400px' }} />
                </div>

                <div className="w-[40vw] h-[35vh] bg-center absolute left-[30vw] top-[22vh] bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://i.postimg.cc/g2ZrYDTS/najs-Papper-removebg.png')",
                        backgroundSize: "105% 100%"
                    }}>
                    <div className="absolute left-[6vw] top-[6vh] max-h-[23vh] overflow-y-auto w-[90vw]">
                        <Messages lobbyId={lobbyId} initialMessages={serializedMessages} />
                    </div>
                    <div className="absolute left-[6vw] bottom-[3vh]">
                        <MessageField lobbyId={lobbyId} />
                    </div>
                </div>
            </div>
            <div className='buttonContainer'>

                <div className='multiplayerButton'>
                    <LongButton
                        disabled={false}
                        imgSrc="https://i.postimg.cc/2yt0VBkj/Multi-Player-Button-Border-removebg-preview.png"
                        imgSrc2='https://i.postimg.cc/1zSJnSQF/Multiplayer-Button.png'
                        style={{ width: '250px', height: '120px' }} //Must set size to be visible
                        lobbyId={lobbyId}
                    >
                    </LongButton>
                </div>
            </div>
            {/* {<div className='playerContainer'>

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

                </div>} */}

        </main >


    );

}

export default page;
