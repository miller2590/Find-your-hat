const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    // Set the "home" position before the game starts
    this.field[0][0] = pathCharacter;
  }

  // Field Methods

  runGame() {
    let playing = true;
    while (playing) {
      this.print();
      this.playerChoice();
      if (!this.inBounds()) {
        console.log("Sorry, you are out of bounds!");
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log("Sorry, you fell into a hole!");
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log("You have found your hat. You win!");
        playing = false;
        break;
      }
      this.field[this.locationY][this.locationX] = pathCharacter;
    }

  }

  playerChoice() {
    const choice = prompt("Choose your path: U, D, L, R: ").toUpperCase();
    switch (choice) {
      case 'U':
        this.locationY -= 1;
        break;
      case 'D':
        this.locationY += 1;
        break;
      case 'L':
        this.locationX -= 1;
        break;
      case 'R':
        this.locationX += 1;
        break;
      default:
        console.log('Enter U, D, L or R.');
        this.playerChoice();
        break;
    }
  }

  inBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }
  
  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }
  
  print() {
    // prints current state of the field
    const viewField = this.field
      .map((x) => {
        return x.join("");
      })
      .join("\n");
    console.log(viewField);
  }

  static generateField(height, width, percentage) {
    const field = new Array(height).fill(0).map((el) => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }

    // Set Hat point

    let hatPointX = Math.floor(Math.random() * width);
    let hatPointY = Math.floor(Math.random() * height);

    // Make sure hat point isn't player starting point
    while (hatPointX === 0 && hatPointY === 0) {
      hatPointX = Math.floor(Math.random() * width);
      hatPointY = Math.floor(Math.random() * height);
    }

    field[hatPointY][hatPointX] = hat;
    return field;
  }
}

const prac = new Field(Field.generateField(10, 10, 0.1));

prac.runGame();
