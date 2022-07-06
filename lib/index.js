const program  = require('commander');
const { Select } = require('enquirer');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./test.db");
// module.exports = () => {
  // let lists = [
  //   ['メモ1'], 
  //   ['今日の日記'], 
  //   ['晩ご飯のレシピ', 'カレー', '豚肉', 'じゃがいも', '人参', 'タマネギ', 'カレールー']
  // ];

db.serialize(() => {
    db.run("drop table if exists memos");
    db.run("drop table if exists categories");

    db.run("create table if not exists categories(id INTEGER PRIMARY KEY AUTOINCREMENT, name)");
    db.run("create table if not exists memos(id INTEGER PRIMARY KEY AUTOINCREMENT, body, category_id INTEGER, foreign key (category_id) references categories(id))");

    db.run("insert into memos(body, category_id) values(?, ?)", "メモ1", 0);
    db.run("insert into memos(body, category_id) values(?, ?)", "今日の日記", 1);
    db.run("insert into memos(body, category_id) values(?, ?)", "晩ご飯のレシピ", 2);

    program
      .option('-l, --list')
      .option('-r, --read')
      .option('-d, --delete')
      .parse();

    const options = program.opts();

    if (options.list) {
      db.each("select * from memos", (err, row) => {
          console.log(row.body);
      });
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

    // var input = require("fs").readFileSync("/dev/stdin", "utf8");
    // if (input) {
    //   db.run("insert into memos(body, category_id) values(?, ?)", input, 0);
    //   db.each("select * from memos", (err, row) => {
    //     console.log(row.body);
    //   });
    // }
});

db.close();
