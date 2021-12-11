import React, { useState } from "react";
import * as THREE from "three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import OrbitControlsView from "expo-three-orbit-controls";
import { Camera } from "three";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightBase,
  TouchableOpacity,
} from "react-native";

interface GlobeProps {}

export const Globe = ({}) => {
  const [camera, setCamera] = useState<Camera | null>(null);
  const [keepRotating, setKeepRotating] = useState(true);

  const changeRotateStatus = () => {
    console.log("Change Triggered");
    setKeepRotating(false);
  };

  const globeContext = (gl: ExpoWebGLRenderingContext) => {
    // Create a WebGLRenderer without a DOM element
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    //   await ExpoTHREE.createTextureAsync({
    //     asset: Asset.fromModule("./img/panorama.jpg"),
    //   }),
    //const controls = new OrbitControls(camera, renderer.domElement);
    const geometry = new THREE.SphereBufferGeometry(1, 36, 36);
    const texture = new TextureLoader().load(require("./img/panorama.jpg"));
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 5;

    const render = () => {
      requestAnimationFrame(render);

      if (keepRotating) sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={changeRotateStatus}>
      <OrbitControlsView style={{ flex: 1 }} camera={camera}>
        <GLView style={{ flex: 1 }} onContextCreate={globeContext} key="d" />
      </OrbitControlsView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  search: {
    margin: 5,
  },
});
