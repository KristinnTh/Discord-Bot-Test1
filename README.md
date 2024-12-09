# 🎪 Carnival Bot 🎪  

Welcome to the **Carnival Bot**! A Discord bot designed to bring the fun and excitement of carnival games to your server. Play games, win tickets, and enjoy the festive atmosphere—all in your Discord community!  

---

## 🎯 Features  

### 🌟 Carnival Games  
- **Slot Machine** (`/slot`)  
  Spin the reels and test your luck for a chance to win a jackpot!  
- **Shooting Gallery** (`/shoot`)  
  React to the target within a time limit and see if your aim is sharp!  (Currently has a bug we are working on.)
- **Ring Toss** (`/ringtoss`)  
  Toss rings and aim for the pegs to win prizes and tickets!  
- **Popcorn Machine** *(Coming Soon!)*  
  Get some virtual popcorn and enjoy the carnival vibe!  

### 🎟 Ticket System  
- Earn tickets by playing games and use them to unlock exciting rewards.  
- Check your balance anytime with `/balance`.  

### 📋 Carnival Info  
- Get an overview of what the bot offers with `/info`.  

---

## 🛠 Setup  

### Prerequisites  
- **Node.js** (v16.9.0 or later)  
- **MySQL Database**  

### Installation  
1. Clone the repository:
   git clone <repository-url>

2. Navigate to the project directory:
   cd carnival-bot

3. Install dependencies:
   npm install

4. Set up your .env file:
   DISCORD_TOKEN=your_discord_bot_token
  MYSQL_HOST=your_database_host
  MYSQL_USER=your_database_user
  MYSQL_PASSWORD=your_database_password
  MYSQL_DATABASE=carnival_bot

5. Run the bot:
   node index.js

## ⚙ Commands  

| Command      | Description                                                                                 |  
|--------------|---------------------------------------------------------------------------------------------|  
| `/info`      | View information about the bot and available games.                                         |  
| `/slot`      | Spin the slot machine for a chance to win prizes.                                           |  
| `/shoot`     | Play the shooting gallery game by reacting to the correct target.                           |  
| `/ringtoss`  | Toss rings to hit pegs and win tickets or prizes.                                           |  
| `/balance`   | Check your current ticket balance.                                                          |  

---

## 🧩 Database Structure  

### `users` Table  
- `id` (Primary Key)  
- `discord_id` (Discord User ID)  

### `tickets` Table  
- `user_id` (Foreign Key from `users` table)  
- `ticket_count` (Number of tickets the user has)  

---

## 🚀 Future Features  

- **New Games:** More carnival-themed mini-games!  
- **Prizes:** Redeem tickets for custom rewards.  
- **Leaderboards:** See who has the most tickets in your server.  

---

## 💻 Contributing  

Contributions are welcome! Feel free to:  
1. Fork this repository  
2. Create a new branch  
3. Submit a pull request  

---

## 🔗 License  

This project is licensed under the [MIT License](LICENSE).  

---

## 📝 Author  

Developed by **EllaBloom** 🎮✨  

Bring the carnival vibes to your Discord server today! 🎪  


