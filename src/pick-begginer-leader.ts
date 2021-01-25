import { BEGGINER_LEADER, BOT_USER_ID, CHANNELS } from './config'
import {
  arrayAtLeastOne,
  formatDate,
  getJstDate,
  randomPickFromArray
} from './lib'
import { getMembers, postMessage } from './slack-lib'

export const handler = async () => {
  const members = await getMembers({ channel: CHANNELS.BEGGINER })
  const withoutLeader = members.filter(
    member => member !== BEGGINER_LEADER && member !== BOT_USER_ID
  )
  if (!arrayAtLeastOne(withoutLeader)) {
    await postMessage({
      channel: CHANNELS.BEGGINER,
      text: '選択するメンバーがいません'
    })
    throw Error('選択するメンバーがいません')
  }
  const randomMember = randomPickFromArray(withoutLeader)
  await postMessage({
    channel: CHANNELS.BEGGINER,
    text: `${formatDate(
      getJstDate(new Date()),
      'yyyy年MM月dd日'
    )}から１週間は <@${randomMember}> がリーダーです！`
  })
}
