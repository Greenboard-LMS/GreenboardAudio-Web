let w;
function connectToBorum(name='Flytrap') {
  w = window.open(
    "https://forum.bforborum.com/Login",
    "MsgWindow",
    "width=500,height=600"
  );
  window.addEventListener(
    "message",
    function (event) {
      if (event.origin !== "https://forum.bforborum.com") return;
      console.log(event.data);
      performLoginWithBorum(event, name);
    },
    false
  );
  document.body.onunload = function () {
    w.close();
  };
}

function performLoginWithBorum(event, name) {
  try {
    setTimeout(function () {
      window.location.href = "/";
    }, 1000);
  } catch (e) {
    alert(`You could not be logged in to ${name} because of a system error.`);
  }
}
