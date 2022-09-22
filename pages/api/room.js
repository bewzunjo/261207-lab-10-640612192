import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const roomsRead = readDB();
  const rooms = roomsRead.map((x) => ({
    roomId: x.roomId,
    roomName: x.roomName,
  }));
  return res.json({ ok: true, rooms });
}