import Pusher from 'pusher';

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: 'eu',
    useTLS: true,
});
console.log("detta måste skrivas ut")
if (pusher) {
    console.log("pusher verkar finnas")
} else {
    console.log("pusher verkar inte finnas")
}
