AFRAME.registerComponent("duck", {
  schema: {
    initialForce: { default: 0 },
    maxForce: { default: 6.5 },
    maxScale: { default: 5 }
  },

  init: function() {
    this.system = this.el.sceneEl.systems.physics;
    this.hasBody = false;
    this.position = new THREE.Vector3();
    this.force = new THREE.Vector3(0, this.data.initialForce, 0);
    this.initialScale = this.el.object3D.scale.x;
    this.maxScale = this.data.maxScale * this.initialScale;

    this._handleGrabStart = this._handleGrabStart.bind(this);
  },

  play: function() {
    this.system.addComponent(this);
    this.el.addEventListener("grab-start", this._handleGrabStart);
  },

  pause: function() {
    this.system.removeComponent(this);
    this.el.removeEventListener("grab-start", this._handleGrabStart);
  },

  beforeStep: function() {
    if (this.el.body) {
      const currentScale = this.el.object3D.scale.x;
      const ratio = Math.min(1, (currentScale - this.initialScale) / (this.maxScale - this.initialScale));
      const force = ratio * this.data.maxForce;
      if (force > 0) {
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle);
        const z = Math.sin(angle);
        this.force.set(x, force, z);
        this.position.set(x * 0.01, 0, z * 0.01);
        this.el.body.applyForce(this.force, this.position);
      }
    }
  },

  _handleGrabStart: function() {
    const rand = Math.floor(Math.random() * Math.floor(100));
    if (rand < 1) {
      this.el.emit("specialquack");
    } else if (rand < 20) {
      this.el.emit("quack");
    }
  }
});
