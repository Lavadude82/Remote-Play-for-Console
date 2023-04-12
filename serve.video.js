const express = require("express");
const fs = require("fs");

const app = express();
const port = 5500;

app.get("/", (req, res) =>
  res.send(
    `
    <h3>Getting input to server json</h3>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="/gijs">

    </script>
          `
  )
);
app.get("/gijs", (req, res) => {
  res.sendfile(__dirname + "/gi.js");
});
app.get("/game-input", (req, res) => {
  let player = {
    number: req.query.p,
    gamepad: {
      axes: [
          req.query.lx,
          req.query.ly,
          req.query.rx,
          req.query.ry
],
      buttons: undefined,
    },
  };
  player.gamepad.buttons = req.query.btn.split("");
  fs.writeFileSync(
    __dirname + `/Controllers/Gamepad${player.number}.json`,
    JSON.stringify(player)
  );
  res.send(`true`);
});
app.listen(port, () => console.log(`Remote Play on router-ip port:${port}!`));
// type /* below to stop logging the text below
console.log(`
This Setup Requieres The Items below:
Capture Card
Arduino
CRP Script

Please Notice this is in beta!
You will need to setup:
DHCP for your Hosting Device(PC/Laptop)
Port Forwarding(if wanting access from everywhere with wifi)
`);
