import React, { Component } from "react";

import * as THREE from "three";
import TrackballControls from "three-trackballcontrols";
import ButtonGroup from "./ButtonGroup";
import this.sceneLegend from "./this.sceneLegend";

class this.scene extends Component {
    componentDidMount() {
        var color_pick = ["rgb(0,0,254)", "rgb(0,204,0)", "rgb(102,0,204)"];
        
        //transition visible var
        var threshold = 0.0;

        //name var
        var str1 = "node";
        var str2 = "edge";
        var str3 = "group";
        var str4 = "tran";
        var str5 = "spritey";

        const SCREEN_WIDTH = window.innerWidth - 20; // Seems that this.mount.clientWidth won't update immediately
        const SCREEN_HEIGHT = this.mount.clientHeight; // Grid Height

        this.this.scene = new THREE.this.scene();

        //Add Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, aplpha: false });
        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.mount.appendChild(this.renderer.domElement);

        //this.camera var
        var VIEW_ANGLE = 45,
            ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
            NEAR = 0.1,
            FAR = 20000;
        var this.lookat_point;

        //basic var
        this.camera = new THREE.Perspectivethis.camera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.this.scene.add(this.camera);
        this.camera.position.set(0,150,1200);
        this.camera.lookAt(this.this.scene.position);
        this.lookat_point = this.this.scene.position;
        var this.camera_position = this.camera.position.clone();
        var this.camera_rotation = this.camera.rotation.clone();	

        //group var
        var this.trans_group = new THREE.Group();
        var graph_group = new THREE.Group();

        //ray casting var
        var INTERSECTED;
        var spritey;
        var this.spritey_name_list =[];
        var targetList = [];
        var todoList =[];
        var raycaster = new THREE.Raycaster(); // create once
        var mouse = new THREE.Vector2(); // create once
        var trans = new THREE.Vector3(0,0,80);

        //for this.scene2 var
        var container,
        container2,
        renderer2,
        this.scene2,
        axes2,
        this.camera2,
        CANVAS_WIDTH = SCREEN_WIDTH*0.25,
        CANVAS_HEIGHT = SCREEN_HEIGHT*0.25,
        CAM_DISTANCE = 1000;

        //data var: sphere_data, edge_data, group_data, transition_data
        var sphere_data=[],
        edge_data=[],
        transition_data = [];

        var group_data = [
                new THREE.Vector3(-600,0,0),
                new THREE.Vector3(-200,0,0),
                new THREE.Vector3(200,0,0),
                new THREE.Vector3(600,0,0),
        ];

        for(let i=0;i<data[str_data].node_positions.length;i++) {
            sphere_data.push([
                new THREE.Vector3((data[str_data].node_positions[i][0]-0.5)*400,
                                (data[str_data].node_positions[i][1]-0.5)*400,
                                (data[str_data].node_positions[i][2]-0.5)*400)
                                ,color_pick[data[str_data].node_label[i]]]);
        }
        edge_data = data[str_data].adjacency_matrix;
        transition_data = data[str_data].attention_weights;


        this.controls = new TrackballControls( this.camera, this.renderer.domElement );
        this.controls.minDistance = 100.1;
        this.controls.maxDistance = 10000.5;
        //LIGHTS
        var lights = [];
        lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);
        this.this.scene.add(lights[0]);
        this.this.scene.add(lights[1]);
        this.this.scene.add(lights[2]);

        this.toggle = this.props.toggle;
        //Simple Box with WireFrame
        this.addModels();

        // this.renderthis.scene();
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
        this.renderer.render(this.this.scene, this.camera);
        this.controls.handleResize();
    };

    init = () => {
        // make_graph();
        make_this.scene();
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'keydown', Keyboard, false );
        // var sphere_position = new THREE.Vector3(100, 50, -50);
        // var sphere = make_sphere(0x8888ff,"sphere1",sphere_position);
        // this.scene.add(sphere);
        // var group = make_group((0,0,0));
        // this.scene.add(group);
    }
    
    animate = () => {
        requestAnimationFrame( animate );
        controls.update();
        hover_color_update();
        this.camera2.position.copy( this.camera.position );
        this.camera2.position.sub( controls.target ); // added by @libe
        this.camera2.position.setLength( CAM_DISTANCE );
        this.camera2.lookAt( this.scene2.position );
        renderer.render( this.scene, this.camera );
        renderer2.render( this.scene2, this.camera2 );
    }
    
    
    make_sphere = (sphere_name , sphere_position , sphere_color ) => {
        var sphereGeometry = new THREE.SphereGeometry( 12, 32, 16 );
        var sphereMaterial = new THREE.MeshBasicMaterial( {color: sphere_color} ); 
        sphereMaterial.transparent = true;
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.name = sphere_name;
        sphere.position.copy(sphere_position);
        sphere.castShadow = true;
        // console.log(sphere);
        targetList.push(sphere);
        return sphere;
    }
    
    make_edge = (cylinder_name, group , sphere1_name , sphere2_name, value) => {
    
        var position1 = group.getObjectByName(sphere1_name).position.clone();
        var position2 = group.getObjectByName(sphere2_name).position.clone();
        var distance = position1.distanceTo(position2);
        var cylinderGeometry = new THREE.CylinderGeometry(2,2,distance,32);
        var cylinderMaterial = new THREE.MeshBasicMaterial({
            color: 'rgb(125,125,125)'
        });
        cylinderMaterial.transparent = true;
        cylinderGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, distance / 2, 0 ) );
        // rotate it the right way for lookAt to work
        cylinderGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );
        // Make a mesh with the geometry
        var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        // Position it where we want
        cylinder.position.copy( position1 );
        // And make it point to where we want
        cylinder.lookAt( position2 );
    
        // cylinder.position.copy(center);
        cylinder.castShadow = true;
        cylinder.name = cylinder_name;
        // console.log(cylinder);
        // targetList.push(cylinder);
    
        return cylinder;
    }
    
    make_group = (group_name , group_position) => {
        var group = new THREE.Group();
    
        var sphere = [];
        var edge = [];
    
        for(let i=0;i<sphere_data.length;i++)
        {
            sphere.push([i.toString().concat(str1) , sphere_data[i][0] , sphere_data[i][1]]);
            for(let j=i;j<sphere_data.length;j++)
            {
                edge.push([(i*sphere_data.length+j).toString().concat(str2),
                            i.toString().concat(str1),
                            j.toString().concat(str1),
                            edge_data[i][j]]);
            }
        }
    
    
        sphere.map(ele => group.add(
            make_sphere(ele[0], ele[1], ele[2])
        ));
        
        edge.map(ele => 
        {
            if (ele[3]===1) {
                group.add(make_edge(ele[0], group , ele[1] , ele[2] , ele[3]));
            }
        }
        );
    
    
        group.position.copy(group_position);
        group.name = group_name;
        // console.log(group);
        // console.log(group.children[0]);
        return group;
    }
    
    
    make_graph = () => {
        var group = [];
        graph_group.name = "graph_group";
        for(let i=0;i<group_data.length;i++)
        {
            group.push([i.toString().concat(str3),group_data[i]]);
        }
    
        group.map(ele => graph_group.add(
            make_group(ele[0],ele[1])
        ));
        // console.log(graph_group);
        this.scene.add(graph_group);
    }
    
    make_transition = (transition_name, group1_name , group2_name , sphere1_name , sphere2_name , value) =>{
    
        if(value>1.0)
            value = 1.0;
        //color
        var ar = 255,
            ag = 128,
            ab = 0,
            br = 255,
            bg = 0,
            bb = 0;
    
        var r = Math.floor((br-ar)*(value-threshold)/(1-threshold) + ar);
        var g = Math.floor((bg-ag)*(value-threshold)/(1-threshold) + ag);
        var b = Math.floor((bb-ab)*(value-threshold)/(1-threshold) + ab);
    
        var color1 = 'rgb(';
        var append1 = ',';
        var append2 = ')';
        var color = color1.concat(r.toString(),append1,g.toString(),append1,b.toString(),append2);
        var position1 = this.scene.getObjectByName(group1_name).getObjectByName(sphere1_name).position.clone();
        var position2 = this.scene.getObjectByName(group2_name).getObjectByName(sphere2_name).position.clone();
        position1.add(this.scene.getObjectByName(group1_name).position);
        position2.add(this.scene.getObjectByName(group2_name).position);
        var center =  position1.clone();
        center.add(position2.clone());
        center.divideScalar(2.0);
        center.add(trans);
        // console.log(position1,position2);
        // console.log(center);
        var distance = position1.distanceTo(position2);
        var cylinderGeometry = new THREE.CylinderGeometry(2,2,distance,32);
        var cylinderMaterial = new THREE.MeshBasicMaterial({
            color: color
        });
        cylinderMaterial.shininess = 50;
        cylinderMaterial.transparent = true;
        cylinderMaterial.opacity = 0.5;
    
        cylinderGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, distance / 2, 0 ) );
        // rotate it the right way for lookAt to work
        cylinderGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( THREE.Math.degToRad( 90 ) ) );
        // Make a mesh with the geometry
        var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        // Position it where we want
        cylinder.position.copy( position1 );
        // And make it point to where we want
        cylinder.lookAt( position2 );
    
        // cylinder.position.copy(center);
        cylinder.castShadow = true;
        cylinder.name = transition_name;
        cylinder.userData = {value: value, position: center};
        cylinder.visible = false;
        // console.log(cylinder);
        // targetList.push(cylinder);
    
        return cylinder;
    }
    
    make_this.scene = () => {
        this.make_graph();
        var transition = [];
        this.trans_group.name = "this.trans_group";
        for(let i=0;i<(group_data.length-1);i++)
        {
            for(let j=0;j<sphere_data.length;j++)
            {
                for(let k=0;k<sphere_data.length;k++)
                {
                    transition.push([
                        ((i*sphere_data.length*sphere_data.length)+j*sphere_data.length+k).toString().concat(str4), 
                        i.toString().concat(str3),
                        (i+1).toString().concat(str3),
                        j.toString().concat(str1),
                        k.toString().concat(str1),
                        transition_data[i][j][k]
                    ]);
                }
            }
        }
    
        // var transition = [
        // 	['transition1','group1','group2','sphere1','sphere2','rgb(255,0,0)']
        // ];
    
        transition.map(ele => {
            if (ele[5]>threshold){
                this.trans_group.add(make_transition(ele[0],ele[1],ele[2],ele[3],ele[4],ele[5]));
            }
        }
        );
        // console.log(this.trans_group);
        this.this.scene.add(this.trans_group);
    }
    
    
    
    //mouse action
    onDocumentMouseMove = ( event ) => {
        // the following line would stop any other event handler from firing
        // (such as the mouse's TrackballControls)
        // event.preventDefault();
        
        // update the mouse variable
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    
    }
    
    hover_color_update = () => {
        // find intersections
    
        // create a Ray with origin at the mouse position
        //   and direction into the this.scene (this.camera direction)
        // raycaster = new THREE.Raycaster();
    
        // create an array containing all objects in the this.scene with which the ray intersects
        raycaster.setFromthis.camera( mouse, this.camera );
        var intersects = raycaster.intersectObjects( targetList );
    
        // INTERSECTED = the object in the this.scene currently closest to the this.camera 
        //		and intersected by the Ray projected from the mouse position 	
        
        // if there is one (or more) intersections
        var group_num,sphere_num;
        if ( intersects.length > 0 )
        {
            // if the closest object intersected is not the currently stored intersection object
            if ( intersects[ 0 ].object !== INTERSECTED ) 
            {
                // restore previous intersection object (if it exists) to its original color
                if ( INTERSECTED ) 
                {
                    // if(INTERSECTED.geometry.type==="SphereGeometry")
                    // {	
                        //reset
                    INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                    for(let i=0;i<group_data.length;i++)
                    {
                        for(let j=0;j<graph_group.children[i].children.length;j++)
                        {
                            graph_group.children[i].children[j].material.opacity = 1.0;
                        }
                    }
                    for(let i=0;i<this.trans_group.children.length;i++)
                    {
                        this.trans_group.children[i].visible = false;
                    }
                    while(this.spritey_name_list.length!==0)
                    {
                        this.scene.remove(this.scene.getObjectByName(this.spritey_name_list[(this.spritey_name_list.length-1)]));
                        this.spritey_name_list.pop();
                    }
                    spritey = null;
                }
                // store reference to closest object as current intersection object
                INTERSECTED = intersects[ 0 ].object;
                
                    //set everything to low opacity state
                for(let i=0;i<group_data.length;i++)
                {
                    for(let j=0;j<graph_group.children[i].children.length;j++)
                    {
                        graph_group.children[i].children[j].material.opacity = 0.33;
                    }
                }
    
                //get object that want to be stand out (transition and origin)
                todoList.push(INTERSECTED);
                // console.log(INTERSECTED);
                while (todoList.length!==0)
                {
                    var todoObject = todoList[(todoList.length-1)];
                    todoList.pop();
    
                    spritey = makeTextSprite( parseInt(todoObject.name).toString(), 
                    { fontsize: 75, fontface: "Georgia", borderColor: {r:0, g:0, b:255, a:1.0} } );
                    var temp_position = (todoObject.position.clone());
                    temp_position.add(todoObject.parent.position);
                    spritey.position.copy(temp_position);
                    spritey.position.add(trans);
                    spritey.name = todoObject.name.concat(str5);
                    this.spritey_name_list.push(spritey.name);
                    // console.log(spritey);
                    this.scene.add( spritey );
    
                    todoObject.material.opacity = 1.0;
                    sphere_num = parseInt(todoObject.name);
                    group_num = parseInt(todoObject.parent.name);
                    // console.log(sphere_num,group_num);
                    if(group_num!==0)
                    {
                        for(let i=0;i<this.trans_group.children.length;i++)
                        {
                            var test_num = (parseInt(this.trans_group.children[i].name)
                                -((group_num-1)*sphere_data.length*sphere_data.length));
                            if(
                                ((test_num%sphere_data.length) === sphere_num)
                                &&(test_num<(sphere_data.length*sphere_data.length))
                                &&(test_num>0)
                                )
                            {
                                // console.log(test_num);
                                // this.trans_group.children[i].material.opacity = 1.0;
                                this.trans_group.children[i].visible = true;
                                var num = Math.floor(test_num/sphere_data.length);
                                // console.log(graph_group.children[(group_num-1)].children[num]);
                                todoList.push(graph_group.children[(group_num-1)].children[num]);
                            }
                        }
                    }
                }
    
                //set object connection in its own graph
                sphere_num = parseInt(INTERSECTED.name);
                group_num = parseInt(INTERSECTED.parent.name);
                var temp_num;
                for(let i =0;i<group_data.length;i++)
                {
                    if(i===group_num)
                    {
                        for(let j = 0;j<sphere_data.length;j++)
                        {
                            if(j!==sphere_num)
                            {
                                INTERSECTED.parent.children[j].material.opacity = 0.33;
                            }
                        }
                        for(let j=sphere_data.length;j<INTERSECTED.parent.children.length;j++)
                        {
                            if((parseInt(INTERSECTED.parent.children[j].name)%sphere_data.length) === sphere_num)
                            {
                                temp_num = Math.floor(parseInt(INTERSECTED.parent.children[j].name)/sphere_data.length);
                                INTERSECTED.parent.children[temp_num].material.opacity = 1.0;
                                INTERSECTED.parent.children[j].material.opacity = 1.0;
                            }
                            else if ((Math.floor(parseInt(INTERSECTED.parent.children[j].name)/sphere_data.length))=== sphere_num) 
                            {
                                temp_num = parseInt(INTERSECTED.parent.children[j].name)%sphere_data.length;
                                INTERSECTED.parent.children[temp_num].material.opacity = 1.0;
                                INTERSECTED.parent.children[j].material.opacity = 1.0;
                            }
                        }
                    }
                }
    
                //set itself to a highlight color
                // store color of closest object (for later restoration)
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                // set a new color for closest object
                INTERSECTED.material.color.setHex( 0xFC4AD9 );
            }
        } 
        else // there are no intersections
        {
            // restore previous intersection object (if it exists) to its original color
            if ( INTERSECTED ) 
            {
                // if(INTERSECTED.geometry.type==="SphereGeometry")
                // {
                    //reset
                INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                for(let i=0;i<group_data.length;i++)
                {
                    for(let j=0;j<graph_group.children[i].children.length;j++)
                    {
                        graph_group.children[i].children[j].material.opacity = 1.0;
                    }
                }
                for(let i=0;i<this.trans_group.children.length;i++)
                {
                    this.trans_group.children[i].visible = false;
                }
                while(this.spritey_name_list.length!==0)
                {
                    this.scene.remove(this.scene.getObjectByName(this.spritey_name_list[(this.spritey_name_list.length-1)]));
                    this.spritey_name_list.pop();
                }
                spritey = null;
            }
            // remove previous intersection object reference
            //     by setting current intersection object to "nothing"
            INTERSECTED = null;
        }
    
    }
    
    Keyboard = (event) => {
        if(event.keyCode===72){
            this.camera.position.set(this.camera_position);
            this.camera.rotation.set(this.camera_rotation);
            this.lookat_point.x = 0;
            this.lookat_point.y = 0;
            this.lookat_point.z = 0;
            this.camera.lookAt(this.lookat_point);
            controls.reset();	
        }
        //A x-left
        if(event.keyCode===65){
            this.camera.position.x = this.camera.position.x-100;
            this.lookat_point.x = this.lookat_point.x + 100;
            this.camera.lookAt(this.lookat_point);
        }
        //D x-right
        if(event.keyCode===68){
            this.camera.position.x = this.camera.position.x+100;
            this.lookat_point.x = this.lookat_point.x - 100;
            this.camera.lookAt(this.lookat_point);
        }
        //W y-up
        if(event.keyCode===87){
            this.camera.position.y = this.camera.position.y+100;
            this.lookat_point.y = this.lookat_point.y - 100;
            this.camera.lookAt(this.lookat_point);
        }
        //S y-down
        if(event.keyCode===83){
            this.camera.position.y = this.camera.position.y-100;
            this.lookat_point.y = this.lookat_point.y + 100;
            this.camera.lookAt(this.lookat_point);
        }
        //N -come near
        if(event.keyCode===78){
            this.camera.position.z = this.camera.position.z+100;
            this.lookat_point.z = this.lookat_point.z - 100;
            this.camera.lookAt(this.lookat_point);
        }
        //M -go far
        if(event.keyCode===77){
            this.camera.position.z = this.camera.position.z-100;
            this.lookat_point.z = this.lookat_point.z + 100;
            this.camera.lookAt(this.lookat_point);
        }
    }
    
    makeTextSprite = ( message, parameters ) => {
        if ( parameters === undefined ) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
        var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };
    
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText( message );
        var textWidth = metrics.width;
    
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
    
        context.lineWidth = borderThickness;
        roundRect(context, borderThickness/2, borderThickness/2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);
    
        context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
        context.fillText( message, borderThickness, fontsize + borderThickness);
    
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;
    
        var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
        return sprite;  
    }
    
    roundRect = (ctx, x, y, w, h, r) => { 
        ctx.beginPath(); ctx.moveTo(x + r, y); 
        ctx.lineTo(x + w - r, y); 
        ctx.quadraticCurveTo(x + w, y, x + w, y + r); 
        ctx.lineTo(x + w, y + h - r); 
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); 
        ctx.lineTo(x + r, y + h); 
        ctx.quadraticCurveTo(x, y + h, x, y + h - r); 
        ctx.lineTo(x, y + r); 
        ctx.quadraticCurveTo(x, y, x + r, y); 
        ctx.closePath(); ctx.fill(); ctx.stroke(); 
    }

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
            this.cube.forEach((ele) => {
                this.this.scene.remove(ele);
            });
            this.addModels();
            this.toggle = this.props.toggle;
        }

        if (this.cube) {
            this.cube.forEach((ele) => {
                ele.rotation.y += 0.01;
            });
        }

        this.renderthis.scene();
    };

    renderthis.scene = () => {
        if (this.renderer) this.renderer.render(this.this.scene, this.camera);
    };

    render() {
        return (
            <div
                style={{ width: this.props.width, height: this.props.height }}
                ref={(ref) => {
                    this.mount = ref;
                }}
            >
                <this.sceneLegend />
                <ButtonGroup width={this.props.width} />
            </div>
        );
    }
}

export default this.scene;
