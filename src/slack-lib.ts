import {
  ChatPostMessageArguments,
  ConversationsMembersArguments,
  ReactionsAddArguments,
  WebClient
} from '@slack/web-api'
import { CHANNELS } from './config'

const client = new WebClient(process.env.SLACK_BOT_TOKEN)

export const getMembers = async (options: ConversationsMembersArguments) => {
  const result = await client.conversations.members(options)
  if (!result.ok) {
    await client.chat.postMessage({
      channel: CHANNELS.BOT,
      text: `\`\`\`${JSON.stringify(
        options,
        null,
        2
      )}\`\`\` のメンバーを正常に取得できませんでした`
    })
    throw Error('メンバーを正常に取得できませんでした')
  }
  return result.members as string[]
}

export const postMessage = async (options: ChatPostMessageArguments) => {
  await client.chat.postMessage(options)
}

export const reactionsAdd = async (options: ReactionsAddArguments) => {
  await client.reactions.add(options)
}
