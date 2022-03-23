namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let pacman: ƒ.Node;
  let speed: ƒ.Vector3 = new ƒ.Vector3(1 / 60, 1 / 60, 0);
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    let graph: ƒ.Node = viewport.getBranch();
    // console.log(graph);
    // ƒ.Debug.branch(graph);
    pacman = graph.getChildrenByName("PacMan")[0];
    console.log(pacman);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 1); // refresh time = 1 , change this if u need higher refresh rate
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    pacman.mtxLocal.translate(speed);
    viewport.draw();
    ƒ.AudioManager.default.update();
    console.log("UpdateFrame");
  }
}