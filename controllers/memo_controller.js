const readline = require("readline");
const { Select } = require('enquirer');
const Memo = require('../models/memo').Memo;

const each = (memos, callback) => setTimeout(() => memos.forEach(memo => callback(memo)), 25);
const show_first = memo => { return memo.body.split(/\n/)[0] }

const select = (message, show_first, callback) => {
  const memos = Memo.all();
  const lists = [] 
  const add = memo => lists.push(show_first(memo))
  each(memos, add)
  setTimeout(function(){
    const prompt = new Select({
      message: message,
      choices: lists,
    });
    prompt.run().then(() => callback(memos, prompt));
  },30);
}

exports.index = () => {
  const memos = Memo.all();
  const display_index = memo => console.log(show_first(memo))
  each(memos, display_index)
}

exports.destroy = () => {
  const destroy_body = (memos, prompt) => {
    const memo = memos.filter(memo => memos.indexOf(memo) === prompt.index)[0];
    memo.destroy();
  }
  select('Choose a note you want to delete:', show_first, destroy_body)
} 

exports.show = () => {
  const show_body = (memos, prompt) => console.log(memos[prompt.index].body)
  select('Choose a note you want to see:', show_first, show_body)
}

exports.create = () => {
  process.stdin.setEncoding("utf8");
  const lines = []; 
  const reader = readline.createInterface({
    input: process.stdin,
  });
  reader.on("line", line => lines.push(line));
  const save = () => {
    const memo = new Memo(lines[0]);
    memo.save();
  }
  setTimeout(save, 25);
}
