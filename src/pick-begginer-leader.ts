import { WebClient } from '@slack/web-api'
import { BEGGINER_LEADER, CHANNELS } from './config'
import {
  arrayAtLeastOne,
  formatDate,
  getJstDate,
  randomPickFromArray
} from './lib'

const client = new WebClient(process.env.SLACK_BOT_TOKEN)

const getBegginerMembers = async () => {
  const result = await client.conversations.members({
    channel: CHANNELS.BEGGINER
  })
  if (!result.ok) {
    await client.chat.postMessage({
      channel: CHANNELS.BEGGINER,
      text: '#begginer のメンバーを正常に取得できませんでした'
    })
    throw Error('メンバーを正常に取得できませんでした')
  }
  return result.members as string[]
}

export const handler = async () => {
  const members = await getBegginerMembers()
  const withoutLeader = members.filter(member => member !== BEGGINER_LEADER)
  if (!arrayAtLeastOne(withoutLeader)) {
    await client.chat.postMessage({
      channel: CHANNELS.BEGGINER,
      text: '選択するメンバーがいません'
    })
    throw Error('選択するメンバーがいません')
  }
  const randomMember = randomPickFromArray(withoutLeader)
  await client.chat.postMessage({
    channel: CHANNELS.BEGGINER,
    text: `${formatDate(
      getJstDate(new Date()),
      'yyyy年MM月dd日'
    )}から１週間は <@${randomMember}> がリーダーです！`
  })
}
