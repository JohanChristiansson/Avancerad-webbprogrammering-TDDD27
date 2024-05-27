"use server"
import { sql } from "@vercel/postgres";
import MessageField from '@/components/ui/messageField';
import Messages from '@/components/ui/messages';
import '../../globals.css';
import { LongButton } from '@/components/ui/tmpButton';
import { HomeButton } from '@/components/ui/tmpButton'
import { cookies } from 'next/headers'
import { pusherServer } from '@/lib/pusher';
import axios from 'axios'


//Should these be saved in a txt file, db or somehow else?
const names: string[] = [
    "Merlin",
    "Morgana",
    "Saruman",
    "Gandalf",
    "Gale Dekarios",
    "Broom",
    "Jaina Proudmore",
    "Albus Dumbledore",
    "Harry Potter",
    "Severus Snape",
    "Khadgar",
    "Voldemort",
    "Sorcerer Mickey",
    "Gargamel",
    "Ursula",
    "Jafar",
    "Dr Strange",
    "Sheev Palpatine",
    "Melisandre",
    "Yennefer of Vengerberg",
    "The White Witch",
    "Kvothe",
    "Tissaia de Vries",
    "Stregobor",
    "Zeref Dragneel",
    "Häxan Surtant",
    "Galbatorix",
    "Tobbe Trollkarl",
    "Prospero",
    "Howl",
    "Frieren",
    "Kiki",
    "Yubaba",
    "Shadowheart",
    "Ganondorf",
    "Elminster",
    "Baba Yaga",
    "Mordenkainen"
];

function getRandomName(serializedPlayers: { playername: string }[]): string {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];

    if (serializedPlayers.some(player => player.playername === randomName)) {
        return getRandomName(serializedPlayers);
    }
    return randomName;
}


interface PageProps {
    params: {
        lobbyId: string //JUste denna kan också ha caps
    }
}

const page = async ({ params }: PageProps) => {
    const lobbyId = params.lobbyId; //ID with caps IS CORRECT IGNORE THE STUPID STUPID ERROR
    console.log(lobbyId, "lobbyId")
    //Get players in lobby
    var serializedPlayers: { playername: string }[]
    try {
        const players = await sql`
            SELECT player_name
            FROM user_in_lobby
            WHERE game_id = ${lobbyId}
        `;
        console.log(players, "players")
        serializedPlayers = players.rows.map(row => row.player_name);
    } catch (error) {
        console.log(error, "error retrieving serializedPlayers")
        serializedPlayers = []
    }
    console.log(serializedPlayers, "serialised players")

    //Check if lobby is full
    if (serializedPlayers.length >= 4) {
        //Reroute to some other page? Write appropriate html directly in return?
        console.log("lobby is full")
        return;
    }

    //add player to the current lobby
    const cookieStore = cookies();
    const cookie = cookieStore.get('user');
    var username: string;
    if (cookie) {
        username = cookie?.value
    } else {
        username = getRandomName(serializedPlayers)

    }
    await pusherServer.trigger(lobbyId, 'player-joined', username + " has joined the lobby pusher");
    try {
        await sql`INSERT INTO user_in_lobby (player_name, game_id, current_words, wpm)
                VALUES (${username}, ${lobbyId}, ${0}, ${0})`;
        serializedPlayers.push({ playername: username })
    } catch (error) {
        console.log(error, "error adding player to the game")
    }

    //Get previous messages
    var serializedMessages: { id: string, text: string }[]
    try {
        const existingMessages = await sql`SELECT text, id FROM Message 
                                            WHERE lobby_id = ${lobbyId}`;
        serializedMessages = existingMessages.rows.map(item => ({
            id: item.id,
            text: item.text
        }));
    } catch (error) {
        console.log(error, "error retrieving serializedMessages")
        serializedMessages = []
    }
    console.log(serializedMessages, "serialised messages")


    return (
        <main>
            <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/}

                <div className='home-button'>
                    <HomeButton
                        disabled={false}
                        imgSrc="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
                        style={{}} //Must set size to be visible
                    >
                    </HomeButton>
                </div>

                <div className="w-[40vw] h-[35vh] bg-center absolute left-[30vw] top-[22vh] bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://i.postimg.cc/g2ZrYDTS/najs-Papper-removebg.png')",
                        backgroundSize: "105% 100%"
                    }}>
                    <div className="absolute left-[6vw] top-[6vh] max-h-[23vh] overflow-y-auto w-[90vw]">
                        <Messages lobbyId={lobbyId} initialMessages={serializedMessages} players={serializedPlayers} />
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
                        <h1>playername</h1>
                        <img
                            src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' />

                    </div>
                    <div className='player2'>
                        <h1>playername</h1>
                        <img
                            src='https://i.postimg.cc/DfgQq25Q/Wizard-Player2-ezgif-com-gif-maker-1.gif' />
                    </div>
                    <div className='player3'>
                        <h1>playername</h1>
                        <img
                            src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' />
                    </div>
                    <div className='player4'>
                        <h1>playername</h1>
                        <img
                            src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' />
                    </div>

                </div>} */}

        </main >


    );

}

export default page;
