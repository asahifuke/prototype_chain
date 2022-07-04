const readline = require("readline");

module.exports = () => {
  const [, , firstArg] = process.argv;

  if (!firstArg) {
    console.error("Please pass one argument!!");
    process.exit(1);
  }

  const msg = `
    Hello!! ${firstArg} san.
    I am Toshihisa Tomatsu.
    GitHub: https://github.com/toshi-toma
    Twitter: https://twitter.com/toshi__toma
  `;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(msg);

  rl.question("Please enter names for your project: ", answer => {
    console.log(`Thank you!! Let's start ${answer}`);

    rl.close();
  });
};