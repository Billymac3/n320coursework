var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var camera;

var cone, cone2, cone3, light, blueMat, GreenMat, whiteMat;
var selectedMesh = null;

var scene = createScene(); //Call the createScene function

function createScene() {
  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  // Add a camera to the scene and attach it to the canvas
  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 4,
    4,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  // Add lights to the scene
  var myLight = new BABYLON.DirectionalLight(
    "dir01",
    new BABYLON.Vector3(0, -0.5, 1.0),
    scene
  );

  // Add and manipulate meshes in the scene
  cone = BABYLON.MeshBuilder.CreateCylinder(
    "cone",
    { diameterTop: 0, tessellation: 4 },
    scene
  );
  cone2 = BABYLON.MeshBuilder.CreateCylinder(
    "cone",
    { diameterTop: 0, tessellation: 4 },
    scene
  );
  cone3 = BABYLON.MeshBuilder.CreateCylinder(
    "cone",
    { diameterTop: 0, tessellation: 4 },
    scene
  );
  cone.position = new BABYLON.Vector3(0, 0, 0);
  cone2.position = new BABYLON.Vector3(1.5, 0, 0);
  cone3.position = new BABYLON.Vector3(-1.5, 0, 0);

  light = new BABYLON.HemisphericLight(
    "HemiLight",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

  blueMat = new BABYLON.StandardMaterial("ground", scene);
  blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  blueMat.emissiveColor = BABYLON.Color3.Blue();

  whiteMat = new BABYLON.StandardMaterial("ground", scene);
  whiteMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  whiteMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  whiteMat.emissiveColor = BABYLON.Color3.White();

  GreenMat = new BABYLON.StandardMaterial("ground", scene);
  GreenMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  GreenMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  GreenMat.emissiveColor = BABYLON.Color3.Green();

  return scene;
}

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function() {
  //sphere.rotate(BABYLON.Axis.Y, .01, BABYLON.Space.WORLD);
  scene.render();
});

function checkUp() {
  console.log(selectedMesh.rotation.x);
  if (
    cone.rotation.x == cone2.rotation.x &&
    cone2.rotation.x == cone3.rotation.x
  ) {
    cone.material = GreenMat;
    cone2.material = GreenMat;
    cone3.material = GreenMat;
  }
}

window.addEventListener("keydown", event => {
  if (selectedMesh) {
    if (event.keyCode == 87) {
      TweenLite.to(selectedMesh.rotation, 1, {
        x: "+=20",
        onComplete: checkUp
      });
    }
  }
});

window.addEventListener("keydown", event => {
  if (selectedMesh) {
    if (event.keyCode == 83) {
      TweenLite.to(selectedMesh.rotation, 1, {
        x: "-=20",
        onComplete: checkUp
      });
    }
  }
});

window.addEventListener("click", function() {
  // We try to pick an object
  var pickResult = scene.pick(scene.pointerX, scene.pointerY);
  if (selectedMesh) {
    selectedMesh.material = whiteMat;
  }

  pickResult.pickedMesh.material = blueMat;

  selectedMesh = pickResult.pickedMesh;
});
