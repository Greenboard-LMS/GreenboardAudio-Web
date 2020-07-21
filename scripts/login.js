let w;
function connectToBorum() {
  w = window.open(
    "http://www.bforborum.com/Login",
    "MsgWindow",
    "width=500,height=600"
  );
  window.addEventListener(
    "message",
    function (event) {
      if (event.origin !== "http://www.bforborum.com") return;
      console.log(event.data);
      performLoginWithBorum(event);
    },
    false
  );
  document.body.onunload = function () {
    w.close();
  };
}

function performLoginWithBorum(event) {
  try {
    setTimeout(function () {
      window.location.href = "/";
    }, 1000);
  } catch (e) {
    alert("You could not be logged in to Flytrap because of a system error.");
  }
}
