import { prisma } from '@/lib/prisma'

export async function sendMatchNotification(
  senderId: string,
  receiverId: string,
  content: string
) {
  // Ne küldjünk üzenetet saját magunknak
  if (senderId === receiverId) return

  await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
  })
}
