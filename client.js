//VIKRANT KUMAR - 101195442

let data = {};
function init(){
    let clickSubmit = document.getElementById("sub").addEventListener("click", function() {
        submitButton();
        setTimeout(function(){
            getInformation();
        }, 30);
    });
}


function sender(array){
    let xhttp = new XMLHttpRequest();
    //console.log(array);
	xhttp.open("POST", '/search');
	xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(array));
}


function getInformation(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status==200){
            data = JSON.parse(this.responseText);
            //console.log(data)
            printInformation(data);
        }
    }
    xhttp.open("GET",'http://localhost:3000/information');
    xhttp.send();
}


function printInformation(info){
    let getUrl = window.location.pathname; 
    let url = getUrl.substring(1); 
    if(url == "customer"){
        printInformationCustomer(info);
    }
    else if(url == "product"){
        printInformationProduct(info);
    }
    else if(url == "employee"){
        printInformationEmployee(info);
    }
    else if(url == "sale"){
        printInformationSale(info);
    }
}


function printInformationCustomer(info){
    let getter = document.getElementById("info");
    document.getElementById("info").innerHTML = "";
    
    if(info.length == 0){
        getter.innerHTML = "<b>NO SUCH CUSTOMER</b>";
    }

    for(i in info){
        let makeNewDiv = document.createElement('div');
        makeNewDiv.class = "column";
        makeNewDiv.style.display = 'inline-block';
        makeNewDiv.style.width = '250px';
        makeNewDiv.style.margin = '20';
        makeNewDiv.id = i;
        //console.log(info[i].name)
        
        makeNewDiv.innerHTML += "Name:   " + info[i].fname + " " +info[i].lname + "<br>";
        makeNewDiv.innerHTML += "Phone#: " + info[i].phone_num + "<br>";
        makeNewDiv.innerHTML += "Email:  " + info[i].email + "<br>";
        makeNewDiv.innerHTML += "Address " + info[i].address + "<br>";
        makeNewDiv.innerHTML += "<br>" + "</br>";
        getter.appendChild(makeNewDiv);
    }
}


function printInformationProduct(info){
    let getter = document.getElementById("info");
    document.getElementById("info").innerHTML = "";

    if(info.length == 0){
        getter.innerHTML = "<b>NO SUCH PRODUCTS</b>";
    }

    for(i in info){
        let makeNewDiv = document.createElement('div');
        makeNewDiv.class = "column";
        makeNewDiv.style.display = 'inline-block';
        makeNewDiv.style.width = '250px';
        makeNewDiv.style.margin = '50';
        makeNewDiv.id = i;
        //console.log(info[i].name)
        
        makeNewDiv.innerHTML += "Name:      " + info[i].name + "<br>";
        makeNewDiv.innerHTML += "Cost:      " + info[i].cost + "<br>";
        makeNewDiv.innerHTML += "Dept.:     " + info[i].dept + "<br>";
        makeNewDiv.innerHTML += "Inventory: " + info[i].inventory + "<br>";
        if(info[i].number_purchases >= 1000){
            makeNewDiv.innerHTML += "<b> THIS PRODUCT IS VERY POPULAR</b> <br>";
        }
        else if(info[i].number_purchases >= 200){
            makeNewDiv.innerHTML += "<b> THIS PRODUCT IS POPULAR </b> <br>";
        }
        makeNewDiv.innerHTML += "<br>" + "</br>";
        getter.appendChild(makeNewDiv);
        
    }
}


function printInformationEmployee(info){
    let getter = document.getElementById("info");
    document.getElementById("info").innerHTML = "";

    if(info.length == 0){
        getter.innerHTML = "<b>NO SUCH EMPLOYEE</b>";
    }

    for(i in info){
        let makeNewDiv = document.createElement('div');
        makeNewDiv.class = "column";
        makeNewDiv.style.display = 'inline-block';
        makeNewDiv.style.width = '250px';
        makeNewDiv.style.margin = '20';
        makeNewDiv.id = i;
        
        //console.log(info[i].name)
        makeNewDiv.innerHTML += "Name:    " + info[i].fname + " " +info[i].lname + "<br>";
        makeNewDiv.innerHTML += "SIN#:    " + info[i].sin + "<br>";
        makeNewDiv.innerHTML += "Phone#:  " + info[i].phone_num + "<br>";
        makeNewDiv.innerHTML += "Email:   " + info[i].email + "<br>";
        makeNewDiv.innerHTML += "Address: " + info[i].address + "<br>";
        makeNewDiv.innerHTML += "Dept.:   " + info[i].dept + "<br>";
        makeNewDiv.innerHTML += "Salary:  " +" $" +info[i].salary + "<br>";
        makeNewDiv.innerHTML += "<br>" + "</br>";
        getter.appendChild(makeNewDiv);
    }
}


function printInformationSale(info){
    let allButtonIDs = [];
    let getSale = document.getElementById("add_sale");
    document.getElementById("add_sale").innerHTML = "";

    if(info.length == 0){
        getSale.innerHTML = "<b>NO SUCH SALE</b>";
    }
    else if(info[0].url == "moreInfo"){
        let makeNewDiv = document.createElement('div');
        makeNewDiv.id = 1;
        makeNewDiv.innerHTML += "--------------Sale Details--------------"  + "<br>";
        makeNewDiv.innerHTML += "SaleID:           " + info[1].sale_id + "<br>";
        makeNewDiv.innerHTML += "Date:              " + info[1].date_purchased_day + "-" + info[1].date_purchased_month + "-" +info[1].date_purchased_year + "<br>";
        makeNewDiv.innerHTML += "Transaction Type:  " + info[1].trans_type + "<br>";
        makeNewDiv.innerHTML += "Total:             " + info[1].total + "<br>";

        makeNewDiv.innerHTML += "--------------Customer Details--------------" + "<br>";
        makeNewDiv.innerHTML += "Name:    " + info[1].fname + " " +info[1].lname + "<br>";
        makeNewDiv.innerHTML += "Phone#: " + info[1].phone_num + "<br>";
        makeNewDiv.innerHTML += "Email:  " + info[1].email + "<br>";
        makeNewDiv.innerHTML += "Address " + info[1].address + "<br>";
        makeNewDiv.innerHTML += "--------------Products--------------" + "<br>";
        for(i=1; i<info.length; ++i){
            makeNewDiv.innerHTML += info[i].quantity + " " + info[i].name + " --> $" +info[i].cost + "<br>";
            getSale.appendChild(makeNewDiv);
        }
    }
    else{
        for(i in info){
            let makeNewDiv = document.createElement('div');
            let makeButton = document.createElement('Button');
            makeNewDiv.class = "column";
            makeNewDiv.style.display = 'inline-block';
            makeNewDiv.style.width = '250px';
            makeNewDiv.style.margin = '20';
            makeNewDiv.id = i;
            makeButton.id = info[i].sale_id;
    
            makeButton.innerHTML = "MORE INFO";
            allButtonIDs.push(makeButton.id);
            makeNewDiv.innerHTML += "SaleID:           " + info[i].sale_id + "<br>";
            makeNewDiv.innerHTML += "Date:              " + info[i].date_purchased_day + "-" + info[i].date_purchased_month + "-" +info[i].date_purchased_year + "<br>";
    
            makeNewDiv.appendChild(makeButton);
            makeNewDiv.innerHTML += "<br>" + "<br>" + "</br>";
            getSale.appendChild(makeNewDiv);
        }
    }
    
    for(i in allButtonIDs){
        let getButtonID = document.getElementById(allButtonIDs[i]);
        getButtonID.addEventListener("click", function(){
            moreInfoButton(getButtonID.id);
            setTimeout(function(){
                getInformation();
            }, 30);
        });
    }
}


function submitButton(){
    let getUrl = window.location.pathname; 
    let url = getUrl.substring(1); 
    let sendList = [];
    if(url == "customer"){
        let getFirst = document.getElementById("GetCustomer_first");
        let getLast = document.getElementById("GetCustomer_last");
 
        sendList.push(getFirst.value);
        sendList.push(getLast.value);
        sendList.push(url);
        sender(sendList);
        getFirst.value = "";
        getLast.value = "";
    }
    else if(url == "product"){
        let getName = document.getElementById("product_name");
        let getDept = document.getElementById("dept_name");
        sendList.push(getName.value);
        sendList.push(getDept.value);
        sendList.push(url);
        sender(sendList);
        getName.value = "";
        getDept.value = "";
    }
    else if(url == "employee"){
        let getFirstE = document.getElementById("GetEmp_first");
        let getLastE = document.getElementById("GetEmp_last");
        let getDept = document.getElementById("dept_name");

        sendList.push(getFirstE.value);
        sendList.push(getLastE.value);
        sendList.push(getDept.value);
        sendList.push(url);
        sender(sendList);
        getFirstE.value = "";
        getLastE.value = "";
        getDept.value = "";
    }
    else if(url == "sale"){
        let getID = document.getElementById("sale_id");
        let getDateY = document.getElementById("sale_dateY");
        let getDateM = document.getElementById("sale_dateM");
        let getDateD = document.getElementById("sale_dateD");

        sendList.push(getID.value);
        sendList.push(getDateY.value);
        sendList.push(getDateM.value);
        sendList.push(getDateD.value);
        sendList.push(url);
        sender(sendList);
        getID.value = "";
        getDateY.value = "";
        getDateM.value = "";
        getDateD.value = "";
    }
}


function moreInfoButton(id){
    let sendList = [];
    sendList.push(id);
    sendList.push("moreInfo");
    sender(sendList);
}

//DONE