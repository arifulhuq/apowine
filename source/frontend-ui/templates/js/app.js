function CreateDrink(drinkType){

   var request = new XMLHttpRequest();
   if (drinkType == "beer"){
   var drinkName = document.getElementById("CbeerValue").value;
  request.open('POST', '/drink?drinkType=beer&operationType=create&name='+drinkName, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
        if (request.status != 200){
            alert(request.response)
    }else{
        alert("BeerName: "+drinkName)
    }
  }
}
request.send(JSON.stringify({beername:drinkName}));
}else{
  var drinkName = document.getElementById("CwineValue").value;
  request.open('POST', '/drink?drinkType=wine&operationType=create&name='+drinkName, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
        if (request.status != 200){
            alert(request.response)
    }else{
        alert("WineName: "+drinkName)
    }
  }
}
  request.send(JSON.stringify({winename:drinkName}));
}
}

function ReadDrink(drinkType){
  var request = new XMLHttpRequest();
  if (drinkType=="beer"){
  var id = document.getElementById("RbeerID").value;
  request.open('GET', '/drink?drinkType=beer&&operationType=read&&id='+id, true);
    request.onload = function () {
      var name = JSON.parse(request.response)
      alert("ID: " + name.id + "\n" + "BeerName: " + name.beername)
      document.getElementById("RbeerOP").innerHTML = "ID";
    }
    request.onreadystatechange = function (e) {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var name = JSON.parse(request.response)
          alert("ID: " + name.id + "\n" + "Beer: " + name.beername)
        } else {
          alert("You must be authenticated to drink beer. Are you over 21?")
        }
      }
    }
  request.send();
}else{
  var id = document.getElementById("RwineID").value;
  request.open('GET', '/drink?drinkType=wine&&operationType=read&&id='+id, true);
    request.onload = function () {
      var name = JSON.parse(request.response)
      alert("ID: " + name.id + "\n" + "WineName: " + name.winename)
    }
    request.onreadystatechange = function (e) {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var name = JSON.parse(request.response)
          alert("ID: " + name.id + "\n" + "WineName: " + name.winename)
        } else {
          alert("You must be authenticated to drink wine. Are you over 21?")
        }
      }
    }
  request.send();
}
}

function UpdateDrink(drinkType){
var request = new XMLHttpRequest();

if (drinkType == "beer"){
  var drinkID = document.getElementById("UbeerID").value;
  var drinkName = document.getElementById("UbeerValue").value;
  request.open('PUT', '/drink?drinkType=beer&&operationType=update&&id='+drinkID+'&&name='+drinkName, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
        if (request.status != 200){
            alert(request.response)
    }else{
      alert("ID: "+ drinkID+"\n"+"BeerName: "+drinkName)
    }
  }
}
  request.send(JSON.stringify({id:drinkID,beername:drinkName}));
}else{
  var drinkID = document.getElementById("UwineID").value;
  var drinkName = document.getElementById("UwineValue").value;
  request.open('PUT', '/drink?drinkType=wine&&operationType=update&&id='+drinkID+'&&name='+drinkName, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
        if (request.status != 200){
            alert(request.response)
    }else{
      alert("ID: "+ drinkID+"\n"+"WineName: "+drinkName)
    }
  }
}
  request.send(JSON.stringify({id:drinkID,winename:drinkName}));
}
}

function DeleteDrink(drinkType){
  var request = new XMLHttpRequest();
  if (drinkType=="beer"){
  var id = document.getElementById("DbeerID").value;
  request.open('DELETE', '/drink?drinkType=beer&&operationType=delete&&id='+id, true);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status != 200){
            alert(request.response)
    }else{
      alert("Beer Deleted")
    }
  }
}
  request.send();
}else{
  var id = document.getElementById("DwineID").value;
  request.open('DELETE', '/drink?drinkType=wine&&operationType=delete&&id='+id, true);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status != 200){
            alert(request.response)
    }else{
      alert("Wine Deleted")
    }
  }
}
  request.send();
}
}

function RandomDrink(drinkType){
  var request = new XMLHttpRequest();
  if (drinkType=="beer"){
    request.open('GET', '/drink?drinkType=beer&&operationType=random', true);
    request.onreadystatechange = function (e) {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var name = JSON.parse(request.response)
          alert("ID: " + name.id + "\n" + "Beer: " + name.beername)
        } else {
          alert("You must be authenticated to drink beer.")
        }
      }
    }
    request.send();
  } else if (drinkType=="wine") {
    request.open('GET', '/drink?drinkType=wine&&operationType=random', true);
    request.onreadystatechange = function (e) {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var name = JSON.parse(request.response)
          alert("ID: " + name.id + "\n" + "WineName: " + name.winename)
        } else {
          alert("You must be authenticated to drink wine.")
        }
      }
    }
    request.send();
  }else {
    request.open('GET', '/random', true);
    request.onload=function(){
      var name = JSON.parse(request.response)
      console.log(name)
      if (name.type=="beer"){
        alert("ID: "+ name.id+"\n"+ "BeerName: "+name.beername)
      }else{
        alert("ID: "+ name.id+"\n"+"WineName: "+name.winename)
      }
    }
    request.send();
  }
}

function more(showhide){
  if(showhide == "show"){
    document.getElementById('popupbox').style.visibility="visible";
  }else if(showhide == "hide"){
    document.getElementById('popupbox').style.visibility="hidden";
  }
}
