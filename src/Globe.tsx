import React from "react";
import * as THREE from "three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";

import { Renderer, TextureLoader } from "expo-three";
import Expo from "expo";
import { Asset } from "expo-asset";
interface GlobeProps {}

const _onGLContextCreate = async (gl) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    gl.drawingBufferWidth / gl.drawingBufferHeight,
    0.1,
    1000
  );
  const renderer = new Renderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

  //   await ExpoTHREE.createTextureAsync({
  //     asset: Asset.fromModule("./img/panorama.jpg"),
  //   }),

  const geometry = new THREE.SphereBufferGeometry(1, 36, 36);
  const texture = new TextureLoader().load(require("./img/panorama.jpg"));
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  camera.position.z = 2;
  const render = () => {
    requestAnimationFrame(render);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };
  render();
};

export const Globe = ({}) => {
  return <GLView style={{ flex: 1 }} onContextCreate={_onGLContextCreate} />;
};
