# Daily Quests

## Presentation

### Introduction

This project allows you to gamify your daily tasks and goals.

Every day, this web app picks at random a set of quests that you have to complete within the day.

Each completed quests earns you XP, that are added to your total XP as well as to the type corresponding to the quest you did.

For exemple, a quest asking you to do push-ups will give you some Strength XP.

Some quests can only appear on certain days, so you don't have to do your legs exercise every day of the week.

### Planned features

There are still some planned features to help you organize your day : 

 - A TODO list you can manage by yourself
 - Push notifications to keep you informed if you're running out of time
 - A stats screen to keep track of your achievments
 - The possibility to switch your theme / the language of the app to have an UI that fits you

### How to add / remove quests

Quests can be added and removed by editing the following file : `src/assets/data/quests.json`

A quest has the following fields, that are all required : 

```json
{
    "id":               1,
    "name":             "Baby steps",
    "description":      "Do 25 push-ups", 
    "xp":               3, 
    "type":             "strength"
}
```

 - **id** being the id of the quest
 - **name** the name of the quest
 - **description** the description of the quest
 - **xp** the amount of xp the player will earn
 - **type** the type of the quest
 
Additionnaly, a quest can have one more optional field : 

```json
{
    "id":               10,
    "name":             "Getting serious",
    "description":      "Do 50 squats", 
    "xp":               10,
    "type":             "strength",
    "requirement":      40
}
```

 - **requirement** determines, along with the **type** field, the amount of XP needed to unlock the quest. In the exemple above, the player will need 40 XP in Strength.
 
Finally, you have to determine when the quest will appear.

For that, simply add its **id** in the array corresponding to the day you want the quest to appear in : 

```json
"days": {
  "monday":       [1, 8], 
  "tuesday":      [2, 9], 
  "wednesday":    [3, 10], 
  "thursday":     [1, 8], 
  "friday":       [2, 9], 
  "saturday":     [3, 10], 
  "sunday":       [6],

  "always":       [4, 5, 6, 7]
}
```

A quest can appear in multiple days.

If you want a quest to always be available, add it to the **"always"** array.

## How to use

### Development server

Run the following commands in your terminal : 

```bash
git clone git@github.com:demarbre1u/daily-quests.git daily-quests
cd daily-quests
npm install
ng serve -o
```

The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
