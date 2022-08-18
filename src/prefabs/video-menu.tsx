/** @jsx createElementEntity */
import { createElementEntity, createRef, Ref } from "../utils/jsx-entity";
import { Button, Label } from "../prefabs/camera-tool";

function Slider({ trackRef, headRef, ...props} : any) {
  return (
    <entity {...props} >
      <entity
        name="Track"
        video-menu-item
        scale={[1.0, 0.1, 0.01]}
        object3D={new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 0xaa00aa }))}
        cursor-raycastable
        remote-hover-target
        holdable
        holdable-button
        ref={trackRef}
      />
      <entity
        scale={[0.1, 0.1, 0.1]}
        object3D={new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial())}
        ref={headRef}
      />
    </entity>
  );
}

export function VideoMenuPrefab() {
  const uiZ = 0.01;
  const playButtonRef = createRef();
  const timeLabelRef = createRef();
  const headRef = createRef();
  const trackRef = createRef();
  return (
    <entity video-menu={{ playButtonRef, timeLabelRef, headRef, trackRef }}>
      <Button ref={playButtonRef} video-menu-item position={[0, 0, uiZ]} width={0.3} height={0.15} text="Play" />
      <Label ref={timeLabelRef} scale={[1, 1, 1]} position={[-0.2, -0.15, uiZ]} />
      <Slider trackRef={trackRef} headRef={headRef} position={[0, -0.25, uiZ]} />
      </entity>
  );
}
