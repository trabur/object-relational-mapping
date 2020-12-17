// method
export default function (prisma: any, channel: any) {
  // trigger
  return async function (data: any) {
    const user = await prisma.user.create({ data: data.message.payload })
  
    // console.log('sign:data:', data.message.sign)
    // let msg = jwt.sign(data.message.sign, '1337-secret-shhhhh', { expiresIn: '1h' })
  
    channel.push("room:broadcast", {
      room: data.message.output,
      message: user
    })
  }
}