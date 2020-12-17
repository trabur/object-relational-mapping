// method
export default function (prisma: any, channel: any) {
  // trigger
  return async function (data: any) {
    
    const user = await prisma.user.findOne({
      where: data
    })

    // console.log('verify:token:', data.message.token)
    // let msg = jwt.verify(data.message.token, '1337-secret-shhhhh', { expiresIn: '1h' })

    channel.push("room:broadcast", {
      room: data.message.output,
      message: user
    })
  }
}