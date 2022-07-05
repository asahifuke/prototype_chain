const program  = require('commander');
const { Select } = require('enquirer');

// module.exports = () => {
  let lists = [
    ['メモ1'], 
    ['今日の日記'], 
    ['晩ご飯のレシピ', 'カレー', '豚肉', 'じゃがいも', '人参', 'タマネギ', 'カレールー']
  ];

  program
    .option('-l, --list')
    .option('-r, --read')
    .option('-d, --delete')
    .parse();

  const options = program.opts();

  if (options.list) {
    lists.forEach(list => console.log(list[0]));
  } 
  
  else if (options.read) {
    const prompt = new Select({
      message: 'Choose a note you want to see:',
      choices: lists.map(list => list[0]),
    });
    prompt.run().then(() => {
      lists[prompt.index].forEach(list => console.log(list))
    });
  } 
  
  else if (options.delete) {
    const prompt = new Select({
      message: 'Choose a note you want to delete:',
      choices: lists.map(list => list[0]),
    });
    prompt.run().then(() => {
      lists = lists.filter(list => lists.indexOf(list) !== prompt.index);
    }); 
  }
// };