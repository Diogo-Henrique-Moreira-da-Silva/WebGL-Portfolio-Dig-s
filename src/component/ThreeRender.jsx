import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export function createScene(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.5,
    600,
  );
  camera.position.set(42, 1.7, 0);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.4;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.physicallyCorrectLights = true;

  // Luzes
  const sun = new THREE.DirectionalLight(0xffffff, 1.0);
  sun.position.set(300, 500, 200);
  sun.castShadow = true;
  sun.shadow.mapSize.width  = 4096;
  sun.shadow.mapSize.height = 4096;
  sun.shadow.camera.near   = 1;
  sun.shadow.camera.far    = 1000;
  sun.shadow.camera.left   = -150;
  sun.shadow.camera.right  = 150;
  sun.shadow.camera.top    = 150;
  sun.shadow.camera.bottom = -150;
  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(sun, ambient);

  const sunDirection = new THREE.Vector3().copy(sun.position).normalize();

  scene.fog = new THREE.FogExp2(0xabf7b7, 0.002); // mais suave, montanhas visíveis ao fundo

  // Skybox
  new EXRLoader().load("/texture/sky2.exr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material.envMap) {
        obj.material.envMapIntensity = 0.3;
        obj.material.needsUpdate = true;
      }
    });
  });

  // Terreno
  const loader = new THREE.TextureLoader();
  const albedo    = loader.load("/texture/grass__Png_albedo.png");
  const normalMap = loader.load("/texture/grass__Png_normal.png");
  const aoMap     = loader.load("/texture/grass__Png_ao.png");
  const heightMap = loader.load("/texture/grass__Png_height.png");

  [albedo, normalMap, aoMap, heightMap].forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(512, 512);
  });

  // Terreno estilo Windows XP
  // Área central plana onde o jogador anda
  const size = 800, segments = 256; // maior e mais detalhado
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
  geometry.rotateX(-Math.PI / 2);
  geometry.setAttribute("uv2", new THREE.BufferAttribute(geometry.attributes.uv.array, 2));

  const pos = geometry.attributes.position;

  // Área plana no centro (onde o jogador fica)
  const FLAT_RADIUS  = 60;   // raio da área completamente plana
  const BLEND_START  = 50;   // onde começa a subir
  const BLEND_END    = 350;  // onde atinge altura máxima

  const VALLEY_FLOOR = -1.5;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const dist = Math.sqrt(x * x + z * z);

    if (dist <= FLAT_RADIUS) {
      pos.setY(i, 0);
      continue;
    }

    // Blend suave do centro para as bordas
    const t     = Math.min((dist - BLEND_START) / (BLEND_END - BLEND_START), 1.0);
    const blend = t * t * (3 - 2 * t);

    // Colinas principais, cristas longas e assimétricas
    const hill1 = Math.sin(x * 0.009 + 0.3)  * Math.cos(z * 0.007 - 0.8) * 18;
    const hill2 = Math.sin(x * 0.006 - 1.2)  * Math.cos(z * 0.011 + 0.5) * 14;
    const hill3 = Math.sin((x + z) * 0.005 + 0.9) * 10;

    // Detalhe médio, ondulações que criam os vales entre as colinas
    const detail1 = Math.sin(x * 0.018 + z * 0.013 + 1.1) * 5;
    const detail2 = Math.cos(x * 0.014 - z * 0.019 - 0.4) * 4;

    // Detalhe fino, irregularidades nas encostas
    const fine = Math.sin(x * 0.035 + 0.7) * Math.sin(z * 0.028 - 0.3) * 1.5;

    const raw = hill1 + hill2 + hill3 + detail1 + detail2 + fine;

    // Nas bordas externas força o terreno para cima (horizonte elevado como o Bliss)
    // Nas partes intermediárias deixa vales naturais aparecerem
    let h;
    if (t < 0.35) {
      // Zona de transição vales livres, água pode aparecer
      h = Math.max(VALLEY_FLOOR, raw) * blend;
    } else {
      // Bordas
      const minHeight = (t - 0.35) / 0.65 * 8;
      h = Math.max(minHeight, raw) * blend;
    }

    pos.setY(i, h);
  }

  geometry.computeVertexNormals();
  pos.needsUpdate = true;

  albedo.minFilter = THREE.LinearMipMapLinearFilter;
  albedo.magFilter = THREE.LinearFilter;

  const material = new THREE.MeshPhysicalMaterial({
    map: albedo, normalMap, normalScale: new THREE.Vector2(0.3, 0.3),
    aoMap, aoMapIntensity: 0.15,
    displacementMap: heightMap, displacementScale: 0.03,
    color: new THREE.Color(0x6edc5a),
    roughness: 0.7, metalness: 0, clearcoat: 0, envMapIntensity: 0,
  });

  const ground = new THREE.Mesh(geometry, material);
  ground.position.y = 0.14;
  scene.add(ground);

  // Água
  const water = new Water(new THREE.PlaneGeometry(2000, 2000), {
    textureWidth: 2048, textureHeight: 2048,
    waterNormals: new THREE.TextureLoader().load("/texture/water_normal.jpg", (t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
    }),
    sunDirection, sunColor: 0xffffff, waterColor: 0x0a6e8a,
    distortionScale: 0.8, fog: true,
  });
  water.material.transparent = true;
  water.material.opacity = 0.10;
  water.material.uniforms["size"].value = 2.5;
  water.material.uniforms["distortionScale"].value = 0.4;
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.12;

  water.material.transparent  = true;
  water.material.opacity      = 0.78;   // deixa ver o fundo
  water.material.depthWrite   = false;  // evita artefatos de profundidade com o terreno
  water.material.blending     = THREE.NormalBlending;

  // Uniforms do shader Water.js
  water.material.uniforms["size"].value           = 6.0;   // escala das ondas normais (maior = ondas menores/mais detalhadas)
  water.material.uniforms["distortionScale"].value = 0.4;  // amplitude da distorção da refração
  water.material.uniforms["alpha"].value  
  scene.add(water);

  const borderGeo = new THREE.RingGeometry(260, 280, 128);
  borderGeo.rotateX(-Math.PI / 2);
  const waterBorder = new THREE.Mesh(borderGeo, new THREE.MeshBasicMaterial({
    color: 0xbbeeff, transparent: true, opacity: 0.4,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  waterBorder.position.y = 0.13;
  scene.add(waterBorder);

  // Texturas extras
  const textureLoader = new THREE.TextureLoader();
  const texturaGotasNormal  = textureLoader.load("/texture/water_drops_normal.png");
  const texturaPiso         = textureLoader.load("/texture/shiny_marble.png");
  const texturaMetalEscovado = textureLoader.load("/texture/brushed_metal_normal.jpg");

  texturaGotasNormal.colorSpace   = THREE.NoColorSpace;
  texturaMetalEscovado.colorSpace = THREE.NoColorSpace;
  texturaGotasNormal.wrapS = texturaGotasNormal.wrapT = THREE.RepeatWrapping;
  texturaGotasNormal.repeat.set(32, 32);
  texturaPiso.wrapS = texturaPiso.wrapT = THREE.RepeatWrapping;
  texturaPiso.repeat.set(10, 10);

  // Cena JSON
  fetch("/app.json")
    .then((r) => r.json())
    .then((json) => {
      const objeto = new THREE.ObjectLoader().parse(json.scene);

      ["caminho_1","caminho_2","caminho_3","caminho_4"].forEach((nome) => {
        const piso = objeto.getObjectByName(nome);
        if (!piso?.material) return;
        piso.geometry.computeBoundingBox();
        const box = piso.geometry.boundingBox;
        piso.geometry.dispose();
        piso.geometry = new RoundedBoxGeometry(
          box.max.x - box.min.x, box.max.y - box.min.y, 0.2, 4, 0.6
        );
        piso.material.needsUpdate = true;
      });

      ["plataform_start","caminho_2","caminho_1","caminho_3","caminho_4",
       "platform_1","platform_3","platform_4"].forEach((nome) => {
        const m = objeto.getObjectByName(nome)?.material;
        if (!m) return;
        Object.assign(m, {
          normalMap: texturaPiso, roughness: 0.09, metalness: 0.1,
          clearcoat: 1.0, clearcoatRoughness: 0.0, envMapIntensity: 0.7,
        });
        m.normalScale.set(0.5, 0.5);
        m.color.setHex(0xf4fbff);
        m.needsUpdate = true;
      });

      ["bolha_flutuante","plataform_2","topo_predio_4"].forEach((nome) => {
        const m = objeto.getObjectByName(nome)?.material;
        if (!m) return;
        Object.assign(m, {
          normalMap: texturaGotasNormal, transmission: 0.85, opacity: 1.0,
          iridescence: 0.7, iridescenceIOR: 1.3,
          iridescenceThicknessRange: [100, 400],
          roughness: 0.0, clearcoat: 1.0, clearcoatRoughness: 0.0, ior: 1.5,
        });
        m.normalScale.set(0.5, 0.5);
        m.color.setHex(0xd4f0ff);
      });

      ["panel_1","panel_2","panel_3","panel_4"].forEach((nome) => {
        const m = objeto.getObjectByName(nome)?.material;
        if (!m) return;
        m.normalMap = texturaMetalEscovado;
        m.normalScale.set(0.2, 0.2);
      });

      scene.add(objeto);
    });

  // Composer / Bloom
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 0.1, 0.2, 0.4
  ));

  let waterElapsed = 0;
  let waterPrevTime = performance.now();

  function tickWater(timestamp) {
    const now = timestamp ?? performance.now();
    waterElapsed += Math.min((now - waterPrevTime) / 1000, 0.1);
    waterPrevTime = now;
    water.material.uniforms["time"].value = waterElapsed * 0.4;
  }

  // Retorna tickWater para o PlayerControls chamar a cada frame
  return { scene, camera, renderer, composer, ground, tickWater };
}