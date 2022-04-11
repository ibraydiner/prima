namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let pacman: ƒ.Node;
  let grid: ƒ.Node;
  let direction: ƒ.Vector2 = ƒ.Vector2.ZERO();
  // let wall: ƒ.Node;
  // let speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
  let speed: number = 0.05;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    let graph: ƒ.Node = viewport.getBranch();
    // console.log(graph);
    // ƒ.Debug.branch(graph);
    pacman = graph.getChildrenByName("PacMan")[0];
    grid = graph.getChildrenByName("GridElements")[0];
    // wall = graph.getChildrenByName("Wall")[0];

    // console.log(pacman);
    // FudgeCore.Keyboard.isPressedOne(ƒ.KEYBOARD_CODE["any"], false);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 1); // refresh time = 1 , change this if u need higher refresh rate
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used

    let posPacman: ƒ.Vector3 = pacman.mtxLocal.translation;
    let nearestGridPoint: ƒ.Vector2 = new ƒ.Vector2(Math.round(posPacman.x),Math.round(posPacman.y));
    let nearGridPoint: boolean = posPacman.toVector2().equals(nearestGridPoint, 2 * speed);
    
    if (nearGridPoint){
      let directionOld: ƒ.Vector2 = direction.clone;
      if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D])){
        direction.set(1,0);
        console.log("Rechts gedrückt");
      }
      

      if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A])){
        direction.set(-1,0);
        console.log("Links gedrückt");
      }  
    
      if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W])){
        direction.set(0,1);
        console.log("Oben gedrückt");
      }
      
    
      if(ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN, ƒ.KEYBOARD_CODE.S])){
        direction.set(0,-1);
        console.log("Unten gedrückt");
      }
     
    
      if(blocked(ƒ.Vector2.SUM(nearestGridPoint, direction)))
        if (direction.equals(directionOld))
          direction.set(0,0);
        else{
          if (blocked(ƒ.Vector2.SUM(nearestGridPoint, directionOld)))
            direction.set(0,0);
          else
            direction = directionOld;
        }
    }

    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.D]) && (pacman.mtxLocal.translation.y) % 1 < 0.05){
    //   speed.set(1/20, 0, 0);
    // }
    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.A]) && (pacman.mtxLocal.translation.y) % 1 < 0.05){
    //   speed.set(-1/20, 0, 0);
    // }
    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.W]) && (pacman.mtxLocal.translation.y) % 1 < 0.05){
    //   speed.set(0, 1/20, 0);
    // }
    // if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN, ƒ.KEYBOARD_CODE.S]) && (pacman.mtxLocal.translation.y) % 1 < 0.05){
    //   speed.set(0, -1/20, 0);
    // }


    pacman.mtxLocal.translate(ƒ.Vector2.SCALE(direction, speed).toVector3());
    viewport.draw();
    ƒ.AudioManager.default.update();
    // console.log("UpdateFrame");
  }

  function blocked(_posCheck: ƒ.Vector2): boolean {
    let check: ƒ.Node = grid.getChild(_posCheck.y)?.getChild(_posCheck.x)?.getChild(0);
    console.log(!check || check.name=="Wall");
    return (!check || check.name=="Wall");
  
  }
}