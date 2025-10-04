export const registerChatHandlers = (io, socket) => {
  // kullanıcı belirli bir odaya katılmak isterse (kanal/DM)
  socket.on("room:join", (roomId) => socket.join(roomId));

  // mesaj gönderimi
  socket.on("message:send", ({ roomId, payload }) => {
    // burada DB’ye kaydetme ileride eklenecek
    io.to(roomId).emit("message:new", payload);
  });

  // typing göstergesi
  socket.on("typing:start", (roomId) => socket.to(roomId).emit("typing", { active: true }));
  socket.on("typing:stop", (roomId) => socket.to(roomId).emit("typing", { active: false }));
};
