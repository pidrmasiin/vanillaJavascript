var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

function moi() {
  if (window.location.hostname !== "localhost") {
    getJSON( "https://vanillatesting.herokuapp.com/api/questions", function(err, data) {
      if (err !== null) {
        alert("Something went wrong: " + err);
      } else {
        request_ok(data)
      }
    });
  } else {
    getJSON("http://localhost:3003/api/questions", function(err, data) {
      if (err !== null) {
        alert("Something went wrong: " + err);
      } else {
        request_ok(data)
      }
    });
  }
}

function answerInTheDB() {
  if (window.location.hostname !== "localhost") {
    getJSON( "https://vanillatesting.herokuapp.com/api/questions", function(err, data) {
      if (err !== null) {
        alert("Something went wrong: " + err);
      } else {
        document.getElementById("answer_from_db").innerHTML = 'Haettu vastaus: ' + data[0].answer;
      }
    });
  } else {
    getJSON("http://localhost:3003/api/questions", function(err, data) {
      if (err !== null) {
        alert("Something went wrong: " + err);
      } else {
        document.getElementById("answer_from_db").innerHTML = 'Haettu vastaus: ' + data[0].answer;
      }
    });
  }
}

function request_ok(data) {
  document.getElementById("data_here").innerHTML = 'Haettu kysymys: ' + data[0].question;
        document.getElementById('answer_form').src = 'post_data.html';
}


onsubmit = function(e) {
  // stop the regular form submission
  e.preventDefault();
  console.log("e", document.getElementById("answer").value);
  // collect the form data while iterating over the inputs
  console.log("e", e);
  if (document.getElementById("answer").value.length > 0) {
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    if (window.location.hostname === "localhost") {
      xhr.open("PUT", "http://localhost:3003/api/questions/5ba8f768c2ef1c3d0e61d89e", true);
    } else {
      xhr.open("PUT", "https://vanillatesting.herokuapp.com/api/questions/5ba8f768c2ef1c3d0e61d89e", true);
    }

    data = {
      answer: document.getElementById("answer").value
    };
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function() {
      // done
    };
    answerInTheDB()
  } else {
    console.log("lomake tyhjä");
  }
};
