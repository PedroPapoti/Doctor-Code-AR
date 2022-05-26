import {loadVideo} from "../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../targets/ar.mind',
      uiScanning: "#scanning",
      uiLoading: "no"
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("../videos/ra.mp4");
    const texture = new THREE.VideoTexture(video);
 
    const geometry = new THREE.BoxGeometry(1);//204/480
    const material = new THREE.MeshBasicMaterial({map: texture});
    const box = new THREE.Mesh(geometry, material);
    

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(box);
  
    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      box.rotation.x += 0.05;
      box.rotation.y += 0.05;
      renderer.render(scene, camera);

    });
  }
  start();
});
