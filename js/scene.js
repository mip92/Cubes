//import {GUI} from "dat.gui";

var scene, renderer, camera;
var cube;
var controls;

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
//    let gui = new GUI();
    scene = new THREE.Scene();

    let coubeWidth = sizeBlock();

    var cubeGeometry = new THREE.BoxGeometry(coubeWidth, coubeWidth, coubeWidth);
    let firstLine=numberOfBlock();
function mc() {
    function makeCoubs(cubeGeometry, color, y, x) {
        let cubeMaterial = new THREE.MeshBasicMaterial({color});
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        scene.add(cube);
        cube.position.y = y;
        cube.position.x = x;
        return cube;
    }

    function makeColor() {
        var c = '';
        while (c.length < 6) {
            c += (Math.random()).toString(16).substr(-6).substr(-1)
        }
        return '#' + c;
    }


    let y = coubeWidth / 2
    let count = 0;
    let count2 = 0;
    for (let k = 0; k < firstLine; k++) {
        if (k % 2 == 0) {
            for (let i = 0; i < firstLine - k; i++) {
                makeCoubs(cubeGeometry, makeColor(), y + k * coubeWidth, (i * 1.5 * coubeWidth) + count * 1.5 * coubeWidth);
            }
            count++;
        } else {
            for (let i = 0; i < firstLine - k; i++) {
                makeCoubs(cubeGeometry, makeColor(), y + k * coubeWidth, (i * 1.5 * coubeWidth + coubeWidth * 0.75) + count2 * 1.5 * coubeWidth);
            }
            count2++;
        }
    }
}
mc();

    /* makeCoubs(cubeGeometry, makeColor(),  coubeWidth/2, 0),
     makeCoubs(cubeGeometry, makeColor(), coubeWidth/2,coubeWidth*1.5),
     makeCoubs(cubeGeometry, makeColor(),  coubeWidth/2,coubeWidth*3),*/

    /*makeCoubs(cubeGeometry, makeColor(),  (coubeWidth/2)+coubeWidth,coubeWidth*0.75),
    makeCoubs(cubeGeometry, makeColor(),  (coubeWidth/2)+coubeWidth,1.5*coubeWidth+coubeWidth*0.75),

    makeCoubs(cubeGeometry, makeColor(),  (coubeWidth/2)+2*coubeWidth,1.5*coubeWidth),*/
    //];
    //cube.position.set (0, 5, 0);



    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.y = 160;
    camera.position.z = 400;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var gridXZ = new THREE.GridHelper(100, 10);
    gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    scene.add(gridXZ);

}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}