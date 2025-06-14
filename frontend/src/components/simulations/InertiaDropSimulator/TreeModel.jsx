import React from "react";
import { useGLTF } from "@react-three/drei";

const TreeModel = (props) => {
  const { scene } = useGLTF("/models/tree.glb");
  return <primitive object={scene} {...props} />;
};

export default TreeModel;
