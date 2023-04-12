setInterval(() => {
  const gp = navigator.getGamepads();
  if (gp[0] != undefined) {
    let btn = "";
    gp[0].buttons.forEach((e, i) => {
      if (e.pressed >= 0.1) {
        btn = btn + "1";
      } else {
        btn = btn + "0";
      }
    });
    $.ajax({
      url: `http://${location.hostname}:5500/game-input?p=1&lx=${gp[0].axes[1]}&ly=${gp[0].axes[0]}&rx=${gp[0].axes[3]}&ry=${gp[0].axes[2]}&btn=${btn}`,
      success: function (data) {
        console.clear();
        console.log(data);
      },
    });
  }
});
