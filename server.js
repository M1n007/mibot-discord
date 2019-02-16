const Discord = require("discord.js");
const request = require("request");
const mibot = new Discord.Client();

const simsimiKey = "your sim simi token";
const url = `http://sandbox.api.simsimi.com/request.p?key=${simsimiKey}&lc=id&ft=9.0&text=`;

mibot.once("ready", async () => {
  console.log("mibot is online!! ^_^");
});

const setMusic = () =>
  new Promise((resolve, reject) => {
    mibot.music = require("discord.js-musicbot-addon");

    // Now we start the music module.
    mibot.music.start(mibot, {
      // Set the api key used for YouTube.
      // This is required to run the bot.
      youtubeKey: "AIzaSyCp-s61ZSzwl_w4Dx6yV7p1cweH2G4Tlak"
    });
    mibot.on("msg", message => {
      if (msg.author.bot) return;

      const client = msg.client;

      const command = message
        .substring(musicbot.botPrefix.length)
        .split(/[ \n]/)[0]
        .trim();

      const suffix = message
        .substring(musicbot.botPrefix.length + command.length)
        .trim();

      let prefix = "!";

      if (msg.content.startsWith(prefix) && command == "play") {
        client.music.bot.playFunction(msg, suffix);
        resolve(client.music.bot.playFunction(msg, suffix));
      }
    });
  });

const normalIndex = () =>
  new Promise((resolve, reject) => {
    mibot.on("message", async message => {
      if (message.author.bot) return;
      let prefix = "!";
      let messageArray = message.content.split(" ");
      let commandMore = messageArray[0];
      let cmd = message.content;
      let args = messageArray.slice(1);

      // console.log(messageArray);

      // if you want to use simsimi

      request(url + messageArray[0], (err, response, body) => {
        if (
          cmd == "namanya siapa" ||
          cmd == "namanya siapa ?" ||
          cmd == "nama siapa ?" ||
          cmd == "nama siapa" ||
          cmd == "nama kamu siapa ?" ||
          cmd == "nama kamu siapa" ||
          cmd == "namamu siapa" ||
          cmd == "namamu siapa ?" ||
          cmd == "nama" ||
          cmd == "nama ?" ||
          cmd == "namamu siapa ?" ||
          cmd == "namamu siapa"
        ) {
          message.reply(
            "namaku mibot, senang berkenalan denganmu. aku dicipatakan oleh seseorang yang sangat tamvan hehe ^_^"
          );
        } else if (
          cmd == "KNTL" ||
          cmd == "JMBT" ||
          cmd == "KONTOL" ||
          cmd == "JEMBUT" ||
          cmd == "mmk" ||
          cmd == "MEMEK" ||
          cmd == "MEMEk" ||
          cmd == "anjing" ||
          cmd == "kontol" ||
          cmd == "memek" ||
          cmd == "bangsat" ||
          cmd == "bnsd" ||
          cmd == "bansad" ||
          cmd == "tempik" ||
          cmd == "ajg"
        ) {
          message.reply(
            "maaf kaka, kalau chat sama mibot ga boleh berkata kasar :'("
          );
        } else if (cmd == "Kampret" || cmd == "Bot Kampret") {
          resolve("Lo yang kampret :angry:");
          message.reply("Lo yang kampret :angry:");
        } else if (
          cmd.includes("!play", "!skip", "!queue", "!stop") ||
          cmd == "play musik"
        ) {
          resolve(
            "kaka akan memutar musik ^_^, command yang dapat di lakukan hanya !play, !skip dan !queue. Selamat bermusik :D"
          );
          message.reply(
            "kaka akan memutar musik ^_^, command yang dapat di lakukan hanya !play, !skip dan !queue. Selamat bermusik :D"
          );
        } else {
          // // return message.channel.send(
          // //   "saat ini mibot belum dapat menjawab banyak pertanyaan :cold_sweat: , maaf :sob:  "
          // // );
          // null;
          return message.channel.send(JSON.parse(body).response);
        }
      }).catch(err => console.log(err));

      if (commandMore == `${prefix}info`) {
        let bicon = mibot.user.displayAvatarURL;
        let mibotProfile = new Discord.RichEmbed()
          .setDescription(
            "namaku mibot, senang berkenalan denganmu. aku dicipatakan oleh seseorang yang sangat tamvan hehe ^_^"
          )
          .setThumbnail(bicon)
          .addField("username", mibot.user.username);

        return message.channel.send(mibotProfile);
      }
    });
  });

normalIndex()
  .then(res => {
    if (
      res ==
      "kaka akan memutar musik ^_^, command yang dapat di lakukan hanya !play, !skip dan !queue. Selamat bermusik :D"
    ) {
      setMusic().then(resMus => {
        console.log(resMus);
      });
    } else {
      console.log(res);
    }
  })
  .catch(err => console.log(err));

mibot.login("your discord bot token");
