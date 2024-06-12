const { Telegraf } = require('telegraf');

require('dotenv').config();
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Algorithms
const algorithms = {
  linearSearch: `
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
  binarySearch: `
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
  bubbleSort: `
function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  return arr;
}`,
  quickSort: `
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
  mergeSort: `
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
  insertionSort: `
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`
};

// Start command
bot.start((ctx) => {
  ctx.reply("Welcome! Send me the name of the algorithm (e.g., 'linear search', 'quick sort') and I'll send you the code in Node.js.");
});

// Handle messages
bot.on('message', (ctx) => {
  const text = ctx.message.text.toLowerCase();

  if (text.includes('linear search')) {
    ctx.replyWithMarkdown(algorithms.linearSearch);
  } else if (text.includes('binary search')) {
    ctx.replyWithMarkdown(algorithms.binarySearch);
  } else if (text.includes('bubble sort')) {
    ctx.replyWithMarkdown(algorithms.bubbleSort);
  } else if (text.includes('quick sort')) {
    ctx.replyWithMarkdown(algorithms.quickSort);
  } else if (text.includes('merge sort')) {
    ctx.replyWithMarkdown(algorithms.mergeSort);
  } else if (text.includes('insertion sort')) {
    ctx.replyWithMarkdown(algorithms.insertionSort);
  } else {
    ctx.reply("Sorry, I don't have the code for that algorithm. Please try another one.");
  }
});

// Start the bot
bot.launch();
console.log("Bot is running.........")
