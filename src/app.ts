import { App, ExpressReceiver } from '@slack/bolt'
import type { APIGatewayEvent, Context } from 'aws-lambda'
import { createServer, proxy } from 'aws-serverless-express'
import { CHANNELS } from './config'
import { postMessage, reactionsAdd } from './slack-lib'

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  processBeforeResponse: true
})

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver
})

const server = createServer(expressReceiver.app)

export const handler = (event: APIGatewayEvent, context: Context) => {
  proxy(server, event, context)
}

// Set up done

/**
 * 自己紹介で発言したユーザーにリプで歓迎する。
 */
app.message(async ({ event: { channel, ts } }) => {
  if (channel !== CHANNELS.SELF_INTRODUCTION) return
  await Promise.all([
    reactionsAdd({
      channel: CHANNELS.SELF_INTRODUCTION,
      name: 'クラッカー',
      timestamp: ts
    }),
    postMessage({
      channel: CHANNELS.SELF_INTRODUCTION,
      text: 'Engineへようこそ！:クラッカー:',
      thread_ts: ts
    })
  ])
})