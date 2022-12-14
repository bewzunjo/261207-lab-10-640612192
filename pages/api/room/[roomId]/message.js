import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const idx = rooms.findIndex((x) => x.roomId === roomId);
    
    if (idx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    return res.json({ ok: true, messages: rooms[idx].messages });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const roomId = req.query.roomId;

    
    const text = req.body.text;

    
    const newId = uuidv4();

    const idx = rooms.findIndex((x) => x.roomId === roomId);
    
    if (idx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
  
    if (typeof text !== "string")
      return res.status(400).json({ ok: false, message: "Invalid text input" });

   
    const message = { messageId: newId, text };
    rooms[idx].messages.push(message);
    writeDB(rooms);
    return res.json({ ok: true, message });
  }
}