/* ============================================================
   HADES CODEX — Fire Background System v2
   
   Three layers of fire:
   1. GLSL ShaderMaterial fire (FBM procedural, covers bottom half)
   2. Doom-style canvas fire algorithm (live texture on plane)
   3. Textured soft-glow ember particles (radial gradient map)
   ============================================================ */

class HadesBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 28;

    this.time = 0;
    this.frame = 0;
    this.FW = 160;
    this.FH = 80;
    this.fireBuffer = new Uint8Array(this.FW * this.FH);

    this.init();
    this.animate();
    window.addEventListener('resize', () => this.onResize());
  }

  init() {
    this.buildEmberTexture();
    this.createFireShader();
    this.createDoomFire();
    this.createEmbers();
    this.createCrystals();
    this.createVolumeFog();
    this.initDoomBuffer();
  }

  /* Soft radial-gradient ember texture generated on canvas */
  buildEmberTexture() {
    const sz = 64;
    const c = document.createElement('canvas');
    c.width = sz; c.height = sz;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(sz/2, sz/2, 0, sz/2, sz/2, sz/2);
    g.addColorStop(0,    'rgba(255,240,180,1.0)');
    g.addColorStop(0.12, 'rgba(255,160, 40,0.9)');
    g.addColorStop(0.35, 'rgba(255, 60,  0,0.5)');
    g.addColorStop(0.65, 'rgba(180, 10,  0,0.15)');
    g.addColorStop(1.0,  'rgba(  0,  0,  0,0.0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, sz, sz);
    this.emberTexture = new THREE.CanvasTexture(c);
  }

  /* GLSL FBM procedural fire shader */
  createFireShader() {
    const vert = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const frag = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;

      float hash(vec2 p) {
        p = fract(p * vec2(127.1, 311.7));
        p += dot(p, p + 17.5);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
        return mix(
          mix(hash(i),             hash(i + vec2(1,0)), u.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
          u.y
        );
      }

      mat2 m2 = mat2(0.8,-0.6, 0.6, 0.8);

      float fbm(vec2 p) {
        float f = 0.0, a = 0.5;
        for (int i = 0; i < 7; i++) {
          f += a * noise(p);
          p  = m2 * p * 2.02;
          a *= 0.48;
        }
        return f;
      }

      vec3 fireColour(float t) {
        t = clamp(t, 0.0, 1.0);
        vec3 c = vec3(0.0);
        c = mix(c, vec3(0.50,0.00,0.00), smoothstep(0.00,0.20,t));
        c = mix(c, vec3(0.90,0.12,0.00), smoothstep(0.15,0.38,t));
        c = mix(c, vec3(1.00,0.40,0.00), smoothstep(0.32,0.58,t));
        c = mix(c, vec3(1.00,0.78,0.08), smoothstep(0.52,0.76,t));
        c = mix(c, vec3(1.00,0.97,0.60), smoothstep(0.72,0.90,t));
        c = mix(c, vec3(1.00,1.00,1.00), smoothstep(0.88,1.00,t));
        return c;
      }

      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.38;

        vec2 q = vec2(
          fbm(uv * 2.8 + vec2(0.00, t)),
          fbm(uv * 2.8 + vec2(5.20, t * 0.93))
        );
        vec2 r = vec2(
          fbm(uv * 2.2 + 3.8 * q + vec2(1.70,9.20) + t * 0.13),
          fbm(uv * 2.2 + 3.8 * q + vec2(8.30,2.80) + t * 0.11)
        );

        float f = fbm(uv * 1.9 + 3.5 * r + t * 0.08);

        float rise   = 1.0 - smoothstep(-0.1, 1.05, uv.y * 1.25 - f * 0.35);
        float narrow = max(0.0, 1.0 - abs(uv.x - 0.5) * 1.6);
        float fire   = f * rise * (0.5 + narrow * 0.7);
        fire = clamp(fire - 0.05, 0.0, 1.0);

        float flicker = noise(vec2(uv.x * 12.0, t * 8.0)) * 0.08;
        fire = clamp(fire + flicker * rise, 0.0, 1.0);

        vec3  col  = fireColour(fire * 1.3);
        float vign = smoothstep(0.0, 0.22, uv.x) * smoothstep(0.0, 0.22, 1.0 - uv.x);
        float alpha = fire * 0.72 * vign;

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const makeFireMesh = (w, h, x, y, z, timeOffset) => {
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: { uTime: { value: timeOffset } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      this.scene.add(mesh);
      return { mesh, uniforms: mat.uniforms };
    };

    const f1 = makeFireMesh(80,  50,   0,  -6,  -6, 0);
    const f2 = makeFireMesh(140, 30,   0, -14, -12, 2);
    const f3 = makeFireMesh(50,  60, -20,  -4,  -8, 4);
    const f4 = makeFireMesh(50,  60,  20,  -4,  -8, 1.5);

    this.fireInstances = [f1, f2, f3, f4];
  }

  /* Doom cellular automata fire */
  initDoomBuffer() {
    for (let x = 0; x < this.FW; x++) {
      this.fireBuffer[(this.FH - 1) * this.FW + x] = 255;
      this.fireBuffer[(this.FH - 2) * this.FW + x] = 255;
    }
  }

  createDoomFire() {
    this.doomCanvas = document.createElement('canvas');
    this.doomCanvas.width  = this.FW;
    this.doomCanvas.height = this.FH;
    this.doomCtx = this.doomCanvas.getContext('2d');
    this.fireImgData = this.doomCtx.createImageData(this.FW, this.FH);
    this.doomTexture = new THREE.CanvasTexture(this.doomCanvas);

    const geo = new THREE.PlaneGeometry(100, 32);
    const mat = new THREE.MeshBasicMaterial({
      map: this.doomTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.doomMesh = new THREE.Mesh(geo, mat);
    this.doomMesh.position.set(0, -18, -3);
    this.scene.add(this.doomMesh);
  }

  stepDoomFire() {
    const W = this.FW, H = this.FH;
    const buf = this.fireBuffer;
    for (let y = 0; y < H - 1; y++) {
      for (let x = 0; x < W; x++) {
        const b   = (y + 1) * W + x;
        const bl  = (y + 1) * W + ((x - 1 + W) % W);
        const br  = (y + 1) * W + ((x + 1) % W);
        const b2  = (y + 2 < H) ? (y + 2) * W + x : b;
        const avg = (buf[b] + buf[bl] + buf[br] + buf[b2]) >> 2;
        const dec = (Math.random() * 3) | 0;
        buf[y * W + x] = Math.max(0, avg - dec);
      }
    }
    for (let x = 0; x < W; x++) {
      const v = 210 + ((Math.random() * 46) | 0);
      buf[(H-1)*W+x] = v;
      buf[(H-2)*W+x] = v;
    }
  }

  paintDoomFire() {
    const W = this.FW, H = this.FH;
    const buf = this.fireBuffer;
    const d = this.fireImgData.data;
    for (let i = 0; i < W*H; i++) {
      const v = buf[i];
      const p = i << 2;
      if (v < 48) {
        d[p]=d[p+1]=d[p+2]=0; d[p+3]=0;
      } else if (v < 96) {
        const t=(v-48)/48;
        d[p]=(t*120)|0; d[p+1]=0; d[p+2]=0; d[p+3]=(t*160)|0;
      } else if (v < 160) {
        const t=(v-96)/64;
        d[p]=(120+t*135)|0; d[p+1]=(t*60)|0; d[p+2]=0; d[p+3]=(160+t*60)|0;
      } else if (v < 220) {
        const t=(v-160)/60;
        d[p]=255; d[p+1]=(60+t*140)|0; d[p+2]=(t*20)|0; d[p+3]=220;
      } else {
        const t=(v-220)/35;
        d[p]=255; d[p+1]=(200+t*55)|0; d[p+2]=(20+t*100)|0; d[p+3]=255;
      }
    }
    this.doomCtx.putImageData(this.fireImgData, 0, 0);
    this.doomTexture.needsUpdate = true;
  }

  /* Textured ember particles with custom shader */
  createEmbers() {
    const COUNT = 600;
    const pos   = new Float32Array(COUNT * 3);
    const col   = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    this.eData  = [];

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 12 - 4;
      pos[i*3]   = x;
      pos[i*3+1] = -30 + Math.random() * 55;
      pos[i*3+2] = z;
      const heat = Math.random();
      col[i*3]   = 1.0;
      col[i*3+1] = heat * 0.55;
      col[i*3+2] = heat * heat * 0.1;
      const s = 1.5 + Math.random() * 5;
      sizes[i] = s;
      this.eData.push({
        x, z,
        speed:    0.04 + Math.random() * 0.1,
        wobble:   Math.random() * Math.PI * 2,
        wSpeed:   0.5 + Math.random() * 1.5,
        life:     Math.random(),
        maxLife:  0.4 + Math.random() * 0.7,
        baseSize: s
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos,   3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col,   3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const vsh = `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (260.0 / -mvPos.z);
        gl_Position  = projectionMatrix * mvPos;
      }
    `;
    const fsh = `
      uniform sampler2D uTex;
      varying vec3 vColor;
      void main() {
        vec4 tex = texture2D(uTex, gl_PointCoord);
        if (tex.a < 0.005) discard;
        gl_FragColor = vec4(vColor * 2.0, tex.a * 0.9) * tex;
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms: { uTex: { value: this.emberTexture } },
      vertexShader: vsh,
      fragmentShader: fsh,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    this.embers    = new THREE.Points(geo, mat);
    this.scene.add(this.embers);
  }

  updateEmbers() {
    const pos   = this.embers.geometry.attributes.position.array;
    const col   = this.embers.geometry.attributes.color.array;
    const sizes = this.embers.geometry.attributes.size.array;

    for (let i = 0; i < this.eData.length; i++) {
      const d = this.eData[i];
      d.life   += d.speed * 0.016;
      d.wobble += d.wSpeed * 0.016;

      if (d.life >= d.maxLife) {
        d.life  = 0;
        d.x     = (Math.random() - 0.5) * 70;
        d.z     = (Math.random() - 0.5) * 12 - 4;
        d.speed = 0.04 + Math.random() * 0.1;
      }

      const t     = d.life / d.maxLife;
      const alpha = t < 0.12 ? t / 0.12 : t > 0.75 ? 1 - (t - 0.75) / 0.25 : 1;

      pos[i*3]   = d.x + Math.sin(d.wobble) * (1.5 + t * 2.5);
      pos[i*3+1] = -28 + t * 65;
      pos[i*3+2] = d.z;

      col[i*3]   = 1.0;
      col[i*3+1] = (1 - t) * 0.6 * alpha;
      col[i*3+2] = (1 - t) * (1 - t) * 0.15 * alpha;
      sizes[i]   = d.baseSize * (1.0 - t * 0.65) * alpha;
    }

    this.embers.geometry.attributes.position.needsUpdate = true;
    this.embers.geometry.attributes.color.needsUpdate    = true;
    this.embers.geometry.attributes.size.needsUpdate     = true;
  }

  /* Rotating wireframe crystals */
  createCrystals() {
    const make = (Geo, args, color, x, y, z, op) => {
      const m = new THREE.Mesh(
        new Geo(...args),
        new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: op })
      );
      m.position.set(x, y, z);
      this.scene.add(m);
      return m;
    };
    this.c1 = make(THREE.IcosahedronGeometry, [9,0], 0xd4af37, -18,  6,-12, 0.10);
    this.c2 = make(THREE.OctahedronGeometry,  [6,0], 0xff3311,  20, -7,-16, 0.07);
    this.c3 = make(THREE.TetrahedronGeometry, [5,0], 0x8844ff,   6, 16,-20, 0.06);
    this.c4 = make(THREE.IcosahedronGeometry, [4,1], 0x224488, -10,-14,-18, 0.05);
  }

  /* Dark smoky volume fog plane */
  createVolumeFog() {
    const fogCanvas = document.createElement('canvas');
    fogCanvas.width = fogCanvas.height = 256;
    const ctx = fogCanvas.getContext('2d');
    const g   = ctx.createRadialGradient(128,128,0,128,128,128);
    g.addColorStop(0,   'rgba(30,0,40,0.35)');
    g.addColorStop(0.5, 'rgba(10,0,20,0.15)');
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,256,256);
    const tex = new THREE.CanvasTexture(fogCanvas);
    const fog = new THREE.Mesh(
      new THREE.PlaneGeometry(200,80),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
    );
    fog.position.set(0, 0, -22);
    this.scene.add(fog);
  }

  /* Render loop */
  animate() {
    requestAnimationFrame(() => this.animate());
    this.time  += 0.008;
    this.frame += 1;

    /* GLSL fire uniforms */
    for (const fi of this.fireInstances) {
      fi.uniforms.uTime.value = this.time + fi.uniforms.uTime.value * 0 + (fi._offset || 0);
    }
    /* Re-apply time correctly */
    if (this.fireInstances) {
      this.fireInstances[0].uniforms.uTime.value = this.time;
      this.fireInstances[1].uniforms.uTime.value = this.time + 2.0;
      this.fireInstances[2].uniforms.uTime.value = this.time + 4.0;
      this.fireInstances[3].uniforms.uTime.value = this.time + 1.5;
    }

    /* Doom fire — every 2nd frame */
    if (this.frame % 2 === 0) {
      this.stepDoomFire();
      this.paintDoomFire();
    }

    this.updateEmbers();

    if (this.c1) { this.c1.rotation.x = this.time*0.18; this.c1.rotation.y = this.time*0.26; }
    if (this.c2) { this.c2.rotation.x = -this.time*0.14; this.c2.rotation.z = this.time*0.22; }
    if (this.c3) { this.c3.rotation.y = this.time*0.32; this.c3.rotation.x = this.time*0.18; }
    if (this.c4) { this.c4.rotation.z = this.time*0.12; this.c4.rotation.y = -this.time*0.2; }

    this.camera.position.x = Math.sin(this.time * 0.07) * 1.5;
    this.camera.position.y = Math.cos(this.time * 0.05) * 0.8;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
