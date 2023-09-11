import { createElement, ReactElement, useEffect, useState } from 'react'
import { useThree } from "@react-three/fiber";
import { Object3D } from 'three';
import { Context, loadSync, GameObject, getParam, Camera } from '@needle-tools/engine';

// TODO: provide path to glb via props

const onLoadingCallback = (_) => {
  // console.log(callback.name, callback.progress.loaded / callback.progress.total, callback.index + "/" + callback.count);
};

export type NeedleSceneProps = {
  src?: string
}

export function NeedleScene(props: NeedleSceneProps): ReactElement {
  const debug = getParam("debugr3fneedle");

  const [state, setState] = useState<{ context?: Context }>({ context: undefined });
  const three = useThree();

  useEffect(() => {
    if (!state.context) {
      const newContext = new Context({ name: "Needle Scene", alias: "needle-r3f", domElement: three.gl.domElement.parentElement, renderer: three.gl });
      Context.Current = newContext;
      let srcFiles = props?.src ?? globalThis["needle:codegen_files"];
      if(typeof srcFiles === "string") srcFiles = [srcFiles];
      if (srcFiles) {
        const loadFn = async () => {
          for (const file of srcFiles) {
            const loaded = await loadSync(newContext, file, file, null);
            if (loaded?.scene)
              newContext.scene.add(loaded.scene);
          }
        }
        newContext.onCreate(loadFn, { progress: onLoadingCallback })?.then(() => {
          Context.Current = newContext;
          const comp = GameObject.addNewComponent(three.camera, Camera);
          newContext.setCurrentCamera(comp);
        });
      }
      setState({ context: newContext });
    }

    return () => {
      if (debug) console.log("Needle Engine Unmount");
    };
  }, []);

  useEffect(() => {
    if (state.context) {
      root.add(state.context.scene);
    }
  });

  const root = new Object3D();
  root.name = "Needle Engine Scene Root";
  return createElement('primitive', { object: root }, null);;
}