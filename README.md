# BurnBuddy 🔥

BurnBuddy is an intelligent workout companion that leverages dynamic programming algorithms to create personalized fitness schedules. Built with Svelte and TailwindCSS, it offers a sleek, modern interface for achieving your fitness goals.

![BurnBuddy Screenshot](/src/assets//burnbuddy-readme-thumbnail.png)

## 🌐 **Try BurnBuddy Now!**

<a href="https://algorithm-group-o.github.io/BurnBuddy/" target="_blank">👉 Click here to launch the Live Demo! 👈</a>



## 🚀 Features

- **Smart Workout Planning**: Utilizes dynamic programming to optimize workout schedules
- **Personalized Goals**: Set custom calorie targets and time constraints
- **Adaptive Scheduling**: Automatically adjusts workout intensity based on your preferences
- **Mobile-First Design**: Fully responsive interface for seamless mobile experience

## 🧮 Algorithm

BurnBuddy implements a dynamic programming approach to solve the classic knapsack problem, optimizing workout selections based on:
- Available time (constraint)
- Target calories (objective)
- Exercise intensity levels

The algorithm ensures optimal workout combinations while respecting user constraints, making it both efficient and practical.

## 🛠️ Tech Stack

- **Frontend**: Svelte
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Routing**: Svelte Routing
- **Icons**: Font Awesome

## 🏃 Getting Started

1. Clone the repository
```bash
git clone https://github.com/algorithm-group-o/BurnBuddy.git
```

2. Install dependencies
```bash
cd BurnBuddy
npm install
```

3. Start development server
```bash
npm run dev
```


4. Build for production
```bash
npm run build
```


## 📱 Usage

1. Select your preferred workout type
2. Enter target calories (between exercise minimum and 2000)
3. Specify available time (30-180 minutes)
4. Get your personalized workout schedule

## 🎯 Project Structure
```
BurnBuddy/
├── src/
│ ├── components/
│ ├── routes/ 
│ ├── lib/ 
│ └── assets/ 
├── public/ 
└── ...config files
```


## 📄 License

This project is licensed under the MIT License

## 🔍 Data Sources

Exercise calorie burn rates were sourced from:
- General exercises: [Wisconsin Department of Health Services - Calories Burned Per Hour](https://www.dhs.wisconsin.gov/publications/p4/p40109.pdf)
- Deadlift data: [FitnessVolt - Calories Burned Deadlifting](https://fitnessvolt.com/calories-burned-deadlifting/)

## 🙏 Acknowledgments

- UI/UX design inspired by luckti.me's minimalist aesthetic
- Logo generated using Adobe Firefly, referencing NewJeans' Bunny character
- Algorithm implementation inspired by classic knapsack problem

