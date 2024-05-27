#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Enemy variables
let enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth: number = 75; // Maximum health an enemy can have
let enemyAttackDamageToHero: number = 25; // Maximum attack damage an enemy can deal

// player variables
let heroHealth = 100; // inital value
let attackDamageToEnemy = 50; // Maximum attack damage the player can deal to an enemy
let numHealthpotion = 3; // Number of health potions the player has
let healthPotionHealAmount = 30;  // Amount of health each potion restores
let healthPotionDropChance  = 50; // Chance that an enemy will drop a health potion

let gameRuninning = true; // Flag to keep the game running

console.log(chalk.bold.underline.blueBright("------------------------------WellCome to The DeadZone!------------------------------"));

// Main game loop
Game:
while(gameRuninning){
  let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);// Generate random health for the enemy
  let enemyIndex = Math.floor(Math.random() * enemies.length);  // Select a random enemy from the list
  let enemy = enemies[enemyIndex];

  console.log(chalk.bold.greenBright(`\t# ${enemy} has appear #\n`)); // Display the Enemy that appeared

// loop for the encounter with the current Enemy
  while(enemyHealth > 0){
  // Display the player's and Enemy health  
    console.log(chalk.bold.magentaBright(`\t Your Health: ${heroHealth}\t`));
    console.log(chalk.bold.magentaBright(`\t ${enemy} Health: ${enemyHealth}\t`));
    
    // prompt the player for their action
    let options = await inquirer.prompt([
      {
        name: "answer",
        message: "What would you like to do?",
        type: "list",
        choices: ["Attack","Take Health Potion","Run"]
      }
    ]);

    // Handle the player choice
    // first option: Attack
    if(options.answer === "Attack"){
      // calculate damage to enemy and player 
      let attackDamageToEnemy = 50;
      let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);// 50
      let damageToHero =  Math.floor(Math.random() * enemyAttackDamageToHero + 1);//25

      // Apply damage to enemy and player
      enemyHealth -= damageToEnemy
      heroHealth -= damageToHero;

      // Display the result of the attack
      console.log(chalk.greenBright(`You strike  the ${enemy} for damage ${damageToEnemy}`));
      console.log(chalk.yellowBright(`${enemy} strike  you for ${damageToHero} damage`));

      // Check if the player's health has dropped below 1
      if(heroHealth < 1){
        console.log(chalk.redBright(`You  have taken too much damage, you are to weak to go on!`));
        break;
      }
      // Second option: Take Health Potion
    }else if(options.answer === "Take Health Potion"){
      if(numHealthpotion > 0){
        heroHealth += healthPotionHealAmount 
        numHealthpotion--;  // Decrease the number of health potions

        // Display the result of using a health potion
        console.log(chalk.magentaBright(`You use health potion for ${healthPotionHealAmount}`));
        console.log(chalk.yellowBright(`You have ${heroHealth} health!`));
        console.log(chalk.greenBright(`You have ${numHealthpotion} health potions left!`));
      }else{
        console.log(chalk.redBright(`\t You have no health potions left!, Defeat enemy for a chance to get one \n`));
      };
      // Third option: Run
    }else if(options.answer === "Run"){
      console.log(chalk.bold.rgb(170, 51, 106)(`You Run away from ${enemy}`));
      continue Game; // Skip to the next iteration of the main game loop
    }
  }
  // Check if the player's health has dropped below 1 after the encounter
  if(heroHealth < 1){
    console.log(chalk.redBright(`You are out From Battle. You are too weak!`));
    break;
  };

  console.log(chalk.rgb(0,153,76)(`${enemy} was defeated!`)); // Enemy defeated message
  console.log(chalk.greenBright(`You have ${heroHealth} health!`));// Display player's current health

   // Chance to drop a health potion
  let randomNumber = Math.floor(Math.random() * 100 + 1);
  if(randomNumber < healthPotionDropChance){
    numHealthpotion++;
    
    // Display the result of getting a health potion
    console.log(chalk.blueBright(`Enemy give you health potion`));
    console.log(chalk.greenBright(`Your health is ${heroHealth}!`));
    console.log(`Your health potion is ${numHealthpotion}!`);
  }
  // Prompt the player to continue or exit
  let userOption = await inquirer.prompt([
    {
      name: "ans",
      message: "Would you like to do now?",
      type: "list",
      choices: ["Continue", "Exit"]
    }
  ])
  //Handle the player's choice to continue or exit
  if(userOption.ans === "Continue"){
    console.log(chalk.rgb(0,204,204)("You are continue on your adventure!!"));
  }else{
    console.log(chalk.bold.magenta("You are successfully Exit from DeadZone!"));
    break;
  };

  console.log(chalk.bold.rgb(255,51,255)("\tThank you for Playing\n"));
};
