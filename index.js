const Discord = require("discord.js");
const config = require("./config.json");
const fetch = require('cross-fetch');

const client = new Discord.Client();

function transform(value) {
  value = value.split(" ");
  let newvalue = "";
  for (let i = 1; i < value.length; i++) {
    newvalue += value[i] + ".";
  }
  return newvalue;
}

const prefix = "!";

client.on("message", async function(message) { 
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  var newname = transform(message.content);

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "omaismentiroso") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`IGOR DONE`);
  }

  if (command === "floor") {
    message.reply(`<NOME DO PROJETO>  >>>  ${message.content}`);
    newname2 = newname.replace('.', '+');
    await fetch('https://server.jpgstoreapis.com/search/collections?nameQuery=' + newname2 + '&verified=should-be-verified&pagination=%7B%7D&size=5')
      .then(function (response) {
        response.json()
          .then(function (result) {
            console.log("RESULTADO", result);
            var encontrou = false;
            for (let i = 0; i < result.collections.length; i++) {
              var namecomun = newname2.replace('+', '');
              namecomun = namecomun.replace('.', '');
              namecomun = namecomun.toLowerCase();
              console.log("AASAS", namecomun);
              console.log("reghdj", result.collections[i].url);
              if (namecomun == result.collections[i].url) {
                console.log("json", result.collections[i]);
                encontrou = true;
                if (result.collections.length >= 1) {
                  var policy = result.collections[0].policy_id;
                  console.log("FLOFLOFLOR", result.collections[0].global_floor_lovelace);
                  var floor = result.collections[i].global_floor_lovelace.toString();
                  if (floor.length == 11) {
                    var newfloor = floor[0] + floor[1] + floor[2] + floor[3] + floor[4];
                  }
                  if (floor.length == 10) {
                    var newfloor = floor[0] + floor[1] + floor[2] + floor[3];
                  }
                  if (floor.length == 9) {
                    var newfloor = floor[0] + floor[1] + floor[2];
                  } if (floor.length == 8) {
                    var newfloor = floor[0] + floor[1];
                  }
                  if (floor.length == 7) {
                    var newfloor = floor[0];
                  }
                  message.reply(`<POLICY ID> >>>  ${policy}`);
                  message.reply(`<VALOR DO FLOOR> >>>  ${newfloor}`);
                  console.log("polici", policy);
                }

              } else if (!encontrou) {
                message.reply(`Pesquisando ... & :(`);

              }
            }
            if (encontrou == false) {
              message.reply(`NÃ£o Encontrou :(`);
            }

          });
      });

  }

});    

client.login(config.BOT_TOKEN);