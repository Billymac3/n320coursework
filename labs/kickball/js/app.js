// application level stuff
// cluttering the global namespace!!
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

// app varrrrs
var camera, scene, ball, goal, timeoutId, particleSystem;

// create the scene
scene = createScene();
engine.runRenderLoop(function() {
  scene.render();
});

scene.registerAfterRender(function() {
  if (ball.intersectsMesh(goal, false)) {
    //   move goal
    goal.position.x = Math.random() * 8 - 4;

    // play a particle burst
    particleSystem.manualEmitCount = 21;
    particleSystem.start();

    // position particles
    particleSystem.minEmitBox = ball.position;
    particleSystem.minEmitBox = ball.position;

    // put ball back
    resetBall();
  }
});

function createScene() {
  var scene = new BABYLON.Scene(engine);

  //   basic scene setup
  camera = new BABYLON.UniversalCamera(
    "UC",
    new BABYLON.Vector3(0, 0, -15),
    scene
  );

  var light = new BABYLON.DirectionalLight(
    "Lighty",
    new BABYLON.Vector3(0, -0.2, 0.2),
    scene
  );

  //   enable physics
  var gravityVector = BABYLON.Vector3(0, -9.81, 0);
  var physicsPlugin = new BABYLON.CannonJSPlugin();
  scene.enablePhysics(gravityVector, physicsPlugin);
  // setup Ball
  ball = BABYLON.MeshBuilder.CreateSphere("sphero", { diameter: 1 }, scene);
  ball.physicsImpostor = new BABYLON.PhysicsImpostor(
    ball,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1, restitution: 0.2 },
    scene
  );
  ball.tag = "ball";

  //   setup ground for ball to exist on
  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { height: 20, width: 20, subdivisions: 4 },
    scene
  );
  ground.position.y = -3;
  ground.position.z = 9;
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.9 },
    scene
  );

  //   make the goal
  goal = new BABYLON.MeshBuilder.CreateBox(
    "goal",
    { height: 5, width: 5 },
    scene
  );
  goal.position.z = 7;
  goal.position.x = Math.random() * 8 - 4;

  //   make the particle system
  particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
  particleSystem.emitter = new BABYLON.Vector3(0, 0, 0);
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.addVelocityGradient(0, 2);

  //   load the particle texture
  particleSystem.particleTexture = new BABYLON.Texture(
    "images/stadia.png",
    scene
  );

  return scene;
}

function resetBall() {
  // reset position
  ball.position = new BABYLON.Vector3();

  //   reset velocity
  ball.physicsImpostor.setLinearVelocity(new BABYLON.Vector3());
  ball.physicsImpostor.setAngularVelocity(new BABYLON.Vector3());

  //   get rid of the timeout if its still on
  clearTimeout(timeoutId);
}

window.addEventListener("click", function() {
  // getthe mesh that was clicked on
  var pickResult = scene.pick(scene.pointerX, scene.pointerY);
  var selectedObject = pickResult.pickedMesh;

  // null check
  if (selectedObject) {
    if (selectedObject.tag == "ball") {
      // get a direction away from where the user clicked on the ball
      var surfaceNormal = pickResult.getNormal(true);
      var forceDirection = surfaceNormal.scale(-1000);

      // kick the object
      selectedObject.physicsImpostor.applyForce(
        forceDirection,
        selectedObject.getAbsolutePosition()
      );

      // reset ball after 3 seconds
      timeoutId = setTimeout(resetBall, 3000);
    }
  }
});
