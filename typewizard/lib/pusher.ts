import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: "1277d5b40235a10583fd",
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: 'eu',
  useTLS: true,
})


export const pusherClient = new PusherClient("1277d5b40235a10583fd", {
  cluster: 'eu',
  authEndpoint: '/api/pusher-auth',
  authTransport: 'ajax',
  auth: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})