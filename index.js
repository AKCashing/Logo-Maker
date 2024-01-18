// Installed Packages: npm i inquirer@8.2.4

const inquirer = require('inquirer');
const fs = require('fs');

// Introduction
console.log('\nWelcome to SVG Logo Maker!\n');
console.log('Fill in the following prompts to design your own Logo!\n');

// Prompt for User Input
inquirer
  .prompt([
    {
        type: 'input',
        name: 'text',
        message: 'Input the Text:',
        validate: function (input) {
            return input.length == 3 || 'Input must be 3 characters long.';
        },
    },
    {
      type: 'list',
      name: 'textColor',
      message: 'Select a Text Color:',
      choices: ['White', 'Black', 'Red', 'Green', 'Blue', 'Cyan', 'Magenta', 'Yellow'],
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a Shape:',
      choices: ['Circle', 'Square', 'Triangle'],
    },
    {
      type: 'list',
      name: 'shapeColor',
      message: 'Select a Shape Color:',
      choices: ['White', 'Black', 'Red', 'Green', 'Blue', 'Cyan', 'Magenta', 'Yellow'],
    },
  ])
  // Switch between the Users Selected Shape
  .then((response) => {
    let shapeElement;

    switch (response.shape) {
      case 'Circle':
        shapeElement = `<circle cx="150" cy="100" r="80" fill="${response.shapeColor}" />`;
        break;
      case 'Square':
        shapeElement = `<rect x="50" y="50" width="200" height="200" fill="${response.shapeColor}" />`;
        break;
      case 'Triangle':
        shapeElement = `<polygon points="150,20 250,180 50,180" fill="${response.shapeColor}" />`;
        break;
      default:
        shapeElement = `<circle cx="150" cy="100" r="80" fill="${response.shapeColor}" />`;
    }

    // Save the SVG file content
    const svgContent = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeElement}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${response.textColor}">${response.text}</text>
      </svg>`;

    // Create the SVG File
    fs.writeFileSync('logo.svg', svgContent);
    
    // Log 'Generated logo.svg'
    console.log('Generated logo.svg');
  });