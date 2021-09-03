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

const prac = new Field(Field.generateField(3, 3, 0.1));

prac.print();
