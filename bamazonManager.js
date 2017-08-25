function viewProducts(){
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results){
    if(err){
      console.log("Unable to retrieve product information.");
    }
    else{
      var output = "";
      for(item of results){
        output += "ID: " + item.item_id + " | ";
        output += "NAME: " + item.product_name + " | ";
        output += "PRICE: $" + item.price + " | ";
        output += "STOCK: " + item.stock_quantity + "\n";
      }
      console.log(output);
    }
  });
  connection.end();
}

function viewLowInv(){
  connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", function(err, results){
    if(err){
      console.log("Unable to retrieve product information.");
    }
    else{
      var output = "LOW INVENTORY\n";
      for(item of results){
        output += "ID: " + item.item_id + " | ";
        output += "NAME: " + item.product_name + " | ";
        output += "STOCK: " + item.stock_quantity + "\n";
      }
      console.log(output);
    }
  });
  connection.end();
}

function addToInv(){
  inquirer.prompt(
    {
      name: "id",
      message: "Please enter the ID of the item you wish to add more of.",
      validate: function(input){
        if(parseInt(input) && parseInt(input) > 0){
          return true;
        }
        console.log("\nYou need to enter a numerical ID.");
        return false;
      }
    }
  )
  .then(function(answer){
    var id = answer.id;
    connection.query("SELECT product_name, stock_quantity FROM products WHERE item_id = " + connection.escape(answer.id), function(err, result){
      if(err){
        console.log("Add to Inv broke :(");
        connection.end();
      }
      else{
        if(result.length === 0){
          console.log("Sorry that ID does not appear in the database");
          connection.end();
        }
        else{
          var currentStock = result[0].stock_quantity;
          inquirer.prompt(
            {
              name: "quantityToAdd",
              message: "And how many " + result[0].product_name + "'s' would you like to add?",
              validate: function(input){
                if(parseInt(input)){
                  return true;
                }
                console.log("\nYou must enter a number");
                return false;
              }
            }
          ).then(function(answer){
            currentStock += parseInt(answer.quantityToAdd);
            connection.query({
              sql: "UPDATE products SET ? WHERE item_id = " + connection.escape(id),
              values: {stock_quantity: currentStock}
            });
            connection.end();
          });
        }
      }
    });
  });
}

function addNewProduct(){
  inquirer.prompt(
    [
      {
        name: "product_name",
        message: "What is the name of the new product?",
      },
      {
        name: "department_name",
        message: "What department does this item belong in?",
      },
      {
        name: "price",
        message: "How much does 1 cost?",
        validate: function(input){
          if(parseFloat(input) && parseFloat(input) >= 0){
            return true;
          }
          return false;
        }
      },
      {
        name: "stock_quantity",
        message: "How much do we have in stock?"
      }
    ]
  ).then(function(answers){
    answers.price = parseFloat(answers.price);
    answers.stock_quantity = parseInt(answers.stock_quantity);
    console.log(answers);
    connection.query("INSERT INTO products SET ?", answers, function(err, result){
      connection.end();
    })
  });
}

function main(){
  inquirer.prompt(
    {
      name: "choice",
      type: "list",
      message: "Welcome manager! What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
  ).then(function(answer){
    switch(answer.choice){
      case ("View Products for Sale"):
        viewProducts();
        break;
      case ("View Low Inventory"):
        viewLowInv();
        break;
      case ("Add to Inventory"):
        addToInv();
        break;
      case ("Add New Product"):
        addNewProduct();
    }
  });
}

var mysql = require("mysql");
var inquirer = require("inquirer");
var credentials = require("./credentials.js");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : credentials.user,
  password : credentials.pass,
  database : 'bamazon'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});
main();
