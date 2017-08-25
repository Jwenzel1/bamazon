function main(){
  // Gets the list of items from the database
  connection.query("SELECT * from products;", function(err, results){
    if(err){
      console.log("Unable to retrieve items from the database :(");
    }
    else{
      inquirer.prompt(
        {
          name: "productID",
          message: "Enter the ID of product you want to buy.",
          validate: function(input, answers){
            if(parseInt(input)){
              if(parseInt(input) > 0 && parseInt(input) <= results.length){
                return true;
              }
            }
            console.log("\nPlease enter a valid number 1 - " + results.length);
            return false;
          }
        }
      ).then(function(answer){
        var id = parseInt(answer.productID);
        var item = results[parseInt(answer.productID) - 1];
        if(item.stock_quantity > 0){
          inquirer.prompt(
            {
              name: "quantity",
              message: "And how many " + item.product_name + "'s would you like to buy?",
              validate: function(input, answers){
                if(parseInt(input)){
                  if(parseInt(input) > 0 && parseInt(input) <= item.stock_quantity){
                    return true;
                  }
                }
                console.log("\nPlease enter a valid number 1 - " + item.stock_quantity);
                return false;
              }
            }
          ).then(function(answer){
            var newQuantity = item.stock_quantity - parseInt(answer.quantity);
            connection.query({
              sql: "UPDATE products SET ? WHERE item_id = " + connection.escape(id),
              values: {stock_quantity: newQuantity}
            });
            var output = "Thank You!\n";
            output += "Price per item: " + item.price + "\n";
            output += "Total amount charged: $" + Math.round(item.price * parseInt(answer.quantity)) + "\n";
            output += "Have a nice day!"
            console.log(output);
            connection.end();
          });
        }
        else{
          console.log("Sorry that item is out of stock.");
          connection.end();
        }
      });
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
