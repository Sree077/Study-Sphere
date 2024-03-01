var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res, next)=> {
  res.render('index', { title: 'Express' });
  // const quoteurl = "https://quote-garden.onrender.com/api/v3/quotes";
  const quotesArray = [
    { quote: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", author: "Helen Keller" },
    { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { quote: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
    { quote: "Do not be afraid to give up the good to go for the great.", quoteAuthor: "John D. Rockefeller" },
    { quote: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails. Explore, Dream, Discover.", author: "Mark Twain" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { quote: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "If you can dream it, you can do it.", author: "Walt Disney" },
    { quote: "There is no passion to be found playing small - in settling for a life that is less than the life you are capable of living.", author: "Nelson Mandela" },
    { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { quote: "The mind is everything. What you think you become.", author: "Buddha" },
    { quote: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.", author: "Thomas Edison" },
    { quote: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "The bad news is time flies. The good news is you're the pilot.", author: "Michael Altshuler" },
    { quote: "The best revenge is massive success.", author: "Frank Sinatra" },
    { quote: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
    { quote: "Get busy living or get busy dying.", author: "Stephen King" },
    { quote: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { quote: "The difference between successful people and others is not a lack of strength, not a lack of knowledge, but rather a lack of will.", author: "Vince Lombardi" },
    { quote: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.", author: "Steve Jobs" },
  ];
  
  const randomNumber = Math.floor(Math.random() * 26);
  console.log(quotesArray[randomNumber].quote);
  
});

module.exports = router;
