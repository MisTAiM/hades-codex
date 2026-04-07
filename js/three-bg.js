class HadesBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 30;
    this.particles = null;
    this.crystal = null;
    this.crystal2 = null;
    this.time = 0;
    this.EMBER_COUNT = 600;
    this.emberData = [];
    this.init();
    this.animate();
    window.addEventListener('resize', () => this.onResize());
  }

  init() {
    this.createEmbers();
    this.createCrystals();
    this.createGodRays();
  }

  createEmbers() {
    const positions = new Float32Array(this.EMBER_COUNT * 3);
    const colors = new Float32Array(this.EMBER_COUNT * 3);
    const sizes = new Float32Array(this.EMBER_COUNT);

    for (let i = 0; i < this.EMBER_COUNT; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 20;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      this.emberData.push({
        x, z,
        speed: 0.03 + Math.random() * 0.07,
        drift: (Math.random() - 0.5) * 0.02,
        life: Math.random(),
        maxLife: 0.5 + Math.random() * 0.5,
        flicker: Math.random() * Math.PI * 2
      });

      const life = this.emberData[i].life;
      const r = 1.0;
      const g = life < 0.5 ? life * 0.8 : 0.4 - (life - 0.5) * 0.6;
      const b = 0;
      colors[i * 3] = r;
      colors[i * 3 + 1] = Math.max(0, g);
      colors[i * 3 + 2] = b;
      sizes[i] = 1.5 + Math.random() * 3;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      opacity: 0.8
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  createCrystals() {
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });

    const geo1 = new THREE.IcosahedronGeometry(8, 0);
    this.crystal = new THREE.Mesh(geo1, wireframeMat);
    this.crystal.position.set(-15, 5, -10);
    this.scene.add(this.crystal);

    const wireframeMat2 = new THREE.MeshBasicMaterial({
      color: 0xff4422,
      wireframe: true,
      transparent: true,
      opacity: 0.07
    });
    const geo2 = new THREE.OctahedronGeometry(6, 0);
    this.crystal2 = new THREE.Mesh(geo2, wireframeMat2);
    this.crystal2.position.set(18, -8, -15);
    this.scene.add(this.crystal2);

    const wireframeMat3 = new THREE.MeshBasicMaterial({
      color: 0x8855ff,
      wireframe: true,
      transparent: true,
      opacity: 0.06
    });
    const geo3 = new THREE.TetrahedronGeometry(4, 0);
    this.crystal3 = new THREE.Mesh(geo3, wireframeMat3);
    this.crystal3.position.set(5, 15, -20);
    this.scene.add(this.crystal3);
  }

  createGodRays() {
    for (let i = 0; i < 5; i++) {
      const geo = new THREE.PlaneGeometry(0.3, 40);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.015 + Math.random() * 0.02,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const ray = new THREE.Mesh(geo, mat);
      ray.position.set((Math.random() - 0.5) * 40, 0, -25 + Math.random() * 10);
      ray.rotation.z = (Math.random() - 0.5) * 0.3;
      this.scene.add(ray);
    }
  }

  updateEmbers() {
    const positions = this.particles.geometry.attributes.position.array;
    const colors = this.particles.geometry.attributes.color.array;

    for (let i = 0; i < this.EMBER_COUNT; i++) {
      const d = this.emberData[i];
      d.life += d.speed * 0.016;
      d.flicker += 0.05;

      positions[i * 3] = d.x + Math.sin(d.flicker * 0.7) * 0.3;
      positions[i * 3 + 1] = -30 + (d.life / d.maxLife) * 65;
      positions[i * 3 + 2] = d.z + Math.sin(d.flicker * 0.4) * 0.1;

      if (d.life >= d.maxLife) {
        d.life = 0;
        d.x = (Math.random() - 0.5) * 80;
        d.z = (Math.random() - 0.5) * 20;
      }

      const t = d.life / d.maxLife;
      const alpha = t < 0.1 ? t * 10 : t > 0.8 ? (1 - t) * 5 : 1;
      const r = 1.0 * alpha;
      const g = (0.3 + t * 0.2) * alpha * (0.7 + 0.3 * Math.sin(d.flicker));
      colors[i * 3] = r;
      colors[i * 3 + 1] = Math.max(0, g);
      colors[i * 3 + 2] = 0;
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
    this.particles.geometry.attributes.color.needsUpdate = true;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.time += 0.005;

    this.updateEmbers();

    if (this.crystal) {
      this.crystal.rotation.x = this.time * 0.2;
      this.crystal.rotation.y = this.time * 0.3;
    }
    if (this.crystal2) {
      this.crystal2.rotation.x = -this.time * 0.15;
      this.crystal2.rotation.z = this.time * 0.25;
    }
    if (this.crystal3) {
      this.crystal3.rotation.y = this.time * 0.35;
      this.crystal3.rotation.x = this.time * 0.2;
    }

    this.camera.position.x = Math.sin(this.time * 0.1) * 2;
    this.camera.position.y = Math.cos(this.time * 0.08) * 1;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
