import { App, ExpressReceiver } from '@slack/bolt'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'

// Initialize your custom receiver
const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || '',
  processBeforeResponse: true
})

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver
})

const server = createServer(expressReceiver.app)

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me'
          },
          action_id: 'button_click'
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  })
})

// Listens to incoming messages that contain "goodbye"
app.message('goodbye', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`See ya later, <@${message.user}> :wave:`)
})

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack()
  await say(`<@${body.user.id}> clicked the button`)
})

export const handler = (event: APIGatewayProxyEvent, context: Context) => {
  console.log('⚡️ Bolt app is running!')
  proxy(server, event, context)
}
