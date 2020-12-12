import React, { Component } from "react";

import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import ButtonGroup from "./ButtonGroup";
import SceneLegend from "./SceneLegend";

class Scene extends Component {
    componentDidMount() {
        const width = window.innerWidth - 20; // Seems that this.mount.clientWidth won't update immediately
        const height = this.mount.clientHeight; // Grid Height

        this.scene = new THREE.Scene();

        //Add Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor("#263238");
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        //add Camera
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 20;
        this.camera.position.y = 5;

        //Camera Controls
        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        //LIGHTS
        var lights = [];
        lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);
        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);

        this.toggle = this.props.toggle;
        //Simple Box with WireFrame
        this.addModels();

        // this.renderScene();
        // //start animation
        // this.start();

        this.animate();

        window.addEventListener("resize", this.handleWindowResize);
    }

    componentDidUpdate() {
        this.mount.setAttribute("clientWidth", window.innerWidth - 20);
    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);

        window.removeEventListener("resize", this.handleWindowResize);
    }

    handleWindowResize = () => {
        // from https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
        const width = window.innerWidth - 20;
        const height = this.mount.clientHeight;
        // console.log(window.innerWidth, this.props.width, this.mount.clientWidth);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.renderer.render(this.scene, this.camera);
    };

    addModels = () => {
        // -----Step 1--------
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshBasicMaterial({
            color: "#0F0",
        });

        const { cubeList } = this.props;
        this.cubeList = cubeList;
        this.cube = cubeList.map((idx) => {
            let ele = new THREE.Mesh(geometry, material);
            ele.position.set(0, idx * 10, 0);
            this.scene.add(ele);

            return ele;
        });

        // -----Step 2--------
        //LOAD TEXTURE and on completion apply it on SPHERE
        this.cube.map((ele) => {
            new THREE.TextureLoader().load(
                "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                (texture) => {
                    //Update Texture
                    ele.material.map = texture;
                    ele.material.needsUpdate = true;
                },
                (xhr) => {
                    //Download Progress
                    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                },
                (error) => {
                    //Error CallBack
                    console.log("An error happened" + error);
                }
            );
        });
    };

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
    };

    animate = () => {
        this.frameId = window.requestAnimationFrame(this.animate);

        if (this.toggle !== this.props.toggle) {
            this.cube.map((ele) => {
                this.scene.remove(ele);
            });
            this.addModels();
            this.toggle = this.props.toggle;
        }

        if (this.cube) {
            this.cube.map((ele) => {
                ele.rotation.y += 0.01;
            });
        }

        this.renderScene();
    };

    renderScene = () => {
        if (this.renderer) this.renderer.render(this.scene, this.camera);
    };

    render() {
        return (
            <div
                style={{ width: this.props.width, height: this.props.height }}
                ref={(ref) => {
                    this.mount = ref;
                }}
            >
                <SceneLegend />
                <ButtonGroup width={this.props.width} />
            </div>
        );
    }
}

export default Scene;
