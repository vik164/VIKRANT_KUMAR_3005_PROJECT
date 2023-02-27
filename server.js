//VIKRANT KUMAR - 101195442

const http = require('http');
const pug = require('pug');
const fs = require('fs');

//https://github.com/TryGhost/node-sqlite3
const sqlite3 = require('sqlite3').verbose();
let database = new sqlite3.Database('final_project.db');
let words = [];
let sendInformation = {};

const renderMainPage = pug.compileFile("views/main.pug");
const renderCustomerPage = pug.compileFile("views/customer.pug");
const renderProductPage = pug.compileFile("views/product.pug");
const renderEmployeePage = pug.compileFile("views/employee.pug");
const renderSalePage = pug.compileFile("views/sale.pug");


const server = http.createServer(function (request, response) {
    if(request.method === "GET"){
        if(request.url === "/"){
            let mainPage = renderMainPage();
            response.statusCode = 200;
			response.end(mainPage);
        }
        else if(request.url === "/customer"){
            let customerPage = renderCustomerPage();
            response.statusCode = 200;
			response.end(customerPage);
        }
        else if(request.url === "/product"){
            let productPage = renderProductPage();
            response.statusCode = 200;
			response.end(productPage);
        }
        else if(request.url === "/employee"){
            let employeePage = renderEmployeePage();
            response.statusCode = 200;
			response.end(employeePage);
        }
        else if(request.url === "/sale"){
            let salePage = renderSalePage();
            response.statusCode = 200;
			response.end(salePage);
        }
        else if(request.url === "/search"){
            response.statusCode = 200;
			response.setHeader("Content-Type", "application/json");
			response.write(JSON.stringify(words));
			response.end();
        }
        else if(request.url === "/information"){
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(sendInformation));
			response.end();
        }
        else if(request.url === "/client.js"){
            fs.readFile("client.js", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("ERROR: SERVER");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/javascript");
				response.end(data);
			});
        }
        else{
            response.statusCode = 404;
            response.write("ERROR: 404");
		    response.end();
        }
    }

    else if(request.method === "POST"){
        if(request.url === "/search"){
            let data = "";
            request.on('data', (dat) => {
				data += dat;
			});
            request.on('end', () => {
				let ReceiveData = JSON.parse(data);

                words = ReceiveData;
                sendInformation = [];

                if(ReceiveData[ReceiveData.length-1] == "customer"){
                    customerInformation(ReceiveData);
                }
                else if(ReceiveData[ReceiveData.length-1] == "product"){
                    productInformation(ReceiveData);
                }
                else if(ReceiveData[ReceiveData.length-1] == "employee"){
                    employeeInformation(ReceiveData);
                }
                else if(ReceiveData[ReceiveData.length-1] == "sale"){
                    saleInformation(ReceiveData);
                }
                else if(ReceiveData[ReceiveData.length-1] == "moreInfo"){
                    moreInformation(ReceiveData);
                }
			});	
            response.statusCode = 200;
			response.end();
        }
        else{
            response.statusCode = 404;
            response.write("ERROR: 404");
            response.end();
        }
    }
    else{
        response.statusCode = 404;
        response.write("ERROR: 404");
        response.end();
    }
});


server.listen(3000);
console.log('Server Launched --> http://localhost:3000/');


function customerInformation(ReceiveData){
    if(ReceiveData[0] == "" && ReceiveData[1] == ""){
        console.log("SELECT * FROM customer");
        database.each("SELECT * FROM customer", function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[0] != ""){
        let newQuery = "SELECT * FROM customer WHERE fname like " + "'"+ReceiveData[0]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[1] != ""){
        let newQuery = "SELECT * FROM customer WHERE lname like " + "'"+ReceiveData[1]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else{
        let newQuery = "SELECT * FROM customer WHERE fname like " + "'"+ReceiveData[0]+"' and lname like " + "'" + ReceiveData[1]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
}


function productInformation(ReceiveData){
    if(ReceiveData[0] == "" && ReceiveData[1] == ""){
        console.log("SELECT * FROM product");
        database.each("SELECT * FROM product", function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[0] != ""){
        let newQuery = "SELECT * FROM product WHERE name like " + "'"+ReceiveData[0]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[1] != ""){
        let newQuery = "SELECT * FROM product WHERE dept like " + "'"+ReceiveData[1]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
}


function employeeInformation(ReceiveData){
    if(ReceiveData[0] == "" && ReceiveData[1] == "" && ReceiveData[2] == ""){
        console.log("SELECT * FROM employee");
        database.each("SELECT * FROM employee", function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[0] != ""){
        let newQuery = "SELECT * FROM employee WHERE fname like " + "'"+ReceiveData[0]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[1] != ""){
        let newQuery = "SELECT * FROM employee WHERE lname like " + "'"+ReceiveData[1]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[2] != ""){
        let newQuery = "SELECT * FROM employee WHERE dept like " + "'"+ReceiveData[2]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else{
        let newQuery = "SELECT * FROM employee WHERE fname like " + "'"+ReceiveData[0]+"' and lname like " + "'" + ReceiveData[1]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
}



function saleInformation(ReceiveData){
    if(ReceiveData[0] == "" && ReceiveData[1] == "" && ReceiveData[2] == "" && ReceiveData[3] == ""){
        console.log("SELECT * FROM sales");

        database.each("SELECT * FROM sales", function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[0] != ""){
        let newQuery = "SELECT * FROM sales WHERE sale_id like " + "'"+ReceiveData[0]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[1] != "" && ReceiveData[2] != "" && ReceiveData[3] != ""){
        let newQuery = "SELECT * FROM sales WHERE date_purchased_day like " + "'"+ReceiveData[3]+"' and date_purchased_month like " + "'"+ReceiveData[2]+"'and date_purchased_year like " + "'"+ReceiveData[1]+"';";   
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else if(ReceiveData[1] != "" && ReceiveData[2] != ""){
        let newQuery = "SELECT * FROM sales WHERE date_purchased_year like " + "'"+ReceiveData[1]+"' and date_purchased_month like " + "'"+ReceiveData[2]+"';";   
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
    else{
        let newQuery = "SELECT * FROM sales WHERE date_purchased_year like " + "'"+ReceiveData[1]+"';";
        console.log(newQuery);

        database.each(newQuery, function(err, dat) {
            //console.log(dat);
            sendInformation.push(dat);
        });
    }
}



function moreInformation(ReceiveData){
    let newQuery = "SELECT * FROM ((SELECT * FROM customer, purchases, sales WHERE purchases.customer_id = customer.customer_id AND purchases.sale_id = '" + ReceiveData[0]+"' AND sales.sale_id = '" + ReceiveData[0] +"') NATURAL JOIN (SELECT * FROM product, contains WHERE contains.product_id = product.product_id AND contains.sale_id = '" + ReceiveData[0] + "'))";   
    console.log(newQuery);

    database.each(newQuery, function(err, dat) {
        //console.log(dat);
        sendInformation.push(dat);
    });
    
    let newS = {};
    newS["url"] = "moreInfo";
    sendInformation.push(newS);
}

//DONE