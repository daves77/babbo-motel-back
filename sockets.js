

const initSockets  = (io) => {
io.on('connection', socket => {
  console.log("new ws connection")

  socket.on('chatMessage', (msg) => {
    console.log(msg)
    io.emit('chatMessage', msg)
  })

  // socket.on("disconnect", () => {
  //   io.emit("chatMessage", )
  // })
})
}

module.exports = initSockets