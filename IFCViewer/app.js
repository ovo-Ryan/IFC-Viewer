const container = document.getElementById('viewer-container');
var viewer = new IfcViewerAPI({
    container,
    backgroundColor: new Color(0xffffff)
});
var material = new MeshLambertMaterial();
var scene = viewer.context.getScene();
const categories = {
    IFCWALL,
    IFCSLAB,
    IFCROOF,
    IFCBEAM,
    IFCCOLUMN
};
let mColorBar = new ColorBar();
mColorBar.setTitle('Velocity');
mColorBar.generateColorBar(1);

var sarview = false;
var slice_active  =false;
// Stores the created subsets
const subsets = {};
var subsets_sar = [];
const config = {
    type: 'line',
    data: {},
    options: {
        responsive: false
    }
}
var myChart = new Chart(
    document.getElementById('myChart'),
    config
);


async function loadIfc(url) {
    await viewer.dispose();
    viewer = new IfcViewerAPI({
        container,
        backgroundColor: new Color(0xffffff)
    });
    scene = viewer.context.getScene();
    await viewer.IFC.setWasmPath(""); // set path to IFCF file

    const model = await viewer.IFC.loadIfcUrl(url);
    // scene.remove(model);
    model.removeFromParent();
    await setupAllCategories(sarview);

    viewer.shadowDropper.renderShadow(model.modelID);
    document.getElementById("spinner").style.visibility = "visible";
    await SARView();
    sar_switch();
    document.getElementById("spinner").style.visibility = "hidden";
    return model;
}

loadIfc('IFC/Olympiastuetzpunkt_Revit2021_IFC4.ifc'); // path to IFC file

const input = document.getElementById("file-input");
input.addEventListener(
    "change",
    (changed) => {
        const ifcURL = URL.createObjectURL(changed.target.files[0]);

        loadIfc(ifcURL);
    },
    false
)

var pickeditem = viewer.IFC.pickIfcItem(true);
// event that gets executed Select items and log properties
window.ondblclick = async () => {
    if (viewer.clipper.active) {
        viewer.clipper.createPlane();
    } else {
    viewer.IFC.loader.ifcManager.removeSubset(pickeditem.modelID, material);
    const item = await viewer.IFC.pickIfcItem(true);
    if (item.modelID === undefined || item.id === undefined) return;
    pickeditem = item;

    // Select items and log properties
    part = await viewer.IFC.getProperties(item.modelID, item.id, true, true);
    if (part.type[0].type == 2533589738) {


        psets = part.psets;


        document.getElementById("resultTable").innerHTML = '';
        for (let i = 1; i < 7; i++) {


            document.getElementById("resultTable").innerHTML += '<tr> <td id="key' + i + '">Key</td> <td id="value' + i + '">Value</td> </tr>'
            // }

            // for (let i = 1; i < psets[3].HasProperties.length; i++) {

            document.getElementById("key" + i).innerHTML = psets[3].HasProperties[i].Name.value + ': ';
            document.getElementById("value" + i).innerHTML = psets[3].HasProperties[i].NominalValue.value;

        }
        document.getElementById("resultTable").innerHTML += '<tr> <td id="key' + 7 + '">Key</td> <td id="value' + 7 + '">Value</td> </tr>'
        // }

        // for (let i = 1; i < psets[3].HasProperties.length; i++) {

        document.getElementById("key" + 7).innerHTML = psets[3].HasProperties[7].Name.value + ': ';
        document.getElementById("value" + 7).innerHTML = psets[3].HasProperties[7].NominalValue.value.toFixed(1)
        for (let i = 8; i < psets[3].HasProperties.length; i++) {


            document.getElementById("resultTable").innerHTML += '<tr> <td id="key' + i + '">Key</td> <td id="value' + i + '">Value</td> </tr>'
            // }

            // for (let i = 1; i < psets[3].HasProperties.length; i++) {

            document.getElementById("key" + i).innerHTML = psets[3].HasProperties[i].Name.value.substr(1) + ': ';
            document.getElementById("value" + i).innerHTML = psets[3].HasProperties[i].NominalValue.value.toFixed(1);

        }

        var array = getTableContent('resultTable');
        var title = part.Name.value;
        array = array.slice(7);

        plotChart(array, title);
    } else if (part.type[0].type == 1898987631) {


        psets = part.psets;


        document.getElementById("resultTable").innerHTML = '';
        for (let i = 1; i < 7; i++) {


            document.getElementById("resultTable").innerHTML += '<tr> <td id="key' + i + '">Key</td> <td id="value' + i + '">Value</td> </tr>'
            // }

            // for (let i = 1; i < psets[3].HasProperties.length; i++) {

            document.getElementById("key" + i).innerHTML = psets[8].HasProperties[i].Name.value + ': ';
            document.getElementById("value" + i).innerHTML = psets[8].HasProperties[i].NominalValue.value;

        }
        document.getElementById("resultTable").innerHTML += '<tr> <td id="key' + 7 + '">Key</td> <td id="value' + 7 + '">Value</td> </tr>'
        // }

        // for (let i = 1; i < psets[3].HasProperties.length; i++) {

        document.getElementById("key" + 7).innerHTML = psets[8].HasProperties[7].Name.value + ': ';
        document.getElementById("value" + 7).innerHTML = psets[8].HasProperties[7].NominalValue.value.toFixed(3)
        for (let i = 8; i < psets[8].HasProperties.length; i++) {


            document.getElementById("resultTable").innerHTML += '<tr> <td id="key' + i + '">Key</td> <td id="value' + i + '">Value</td> </tr>'
            // }

            // for (let i = 1; i < psets[3].HasProperties.length; i++) {

            document.getElementById("key" + i).innerHTML = psets[8].HasProperties[i].Name.value.substr(1) + ': ';
            document.getElementById("value" + i).innerHTML = psets[8].HasProperties[i].NominalValue.value.toFixed(3);

        }

        var array = getTableContent('resultTable');
        var title = part.Name.value;
        array = array.slice(7);

        plotChart(array, title);
    } else if (part.type[0].type == 2781568857) {


        psets = part.psets;


        document.getElementById("resultTable").innerHTML = '';
        for (let i = 1; i < 7; i++) {


            document.getElementById("resultTable").innerHTML += '<tr> <td id="key' + i + '">Key</td> <td id="value' + i + '">Value</td> </tr>'
            // }

            // for (let i = 1; i < psets[3].HasProperties.length; i++) {

            document.getElementById("key" + i).innerHTML = psets[7].HasProperties[i].Name.value + ': ';
            document.getElementById("value" + i).innerHTML = psets[7].HasProperties[i].NominalValue.value;

        }
        document.getElementById("resultTable").innerHTML += '<tr> <td id="key' + 7 + '">Key</td> <td id="value' + 7 + '">Value</td> </tr>'
        // }

        // for (let i = 1; i < psets[3].HasProperties.length; i++) {

        document.getElementById("key" + 7).innerHTML = psets[7].HasProperties[7].Name.value + ': ';
        document.getElementById("value" + 7).innerHTML = psets[7].HasProperties[7].NominalValue.value.toFixed(3);
        for (let i = 8; i < psets[7].HasProperties.length; i++) {


            document.getElementById("resultTable").innerHTML += '<tr> <td id="key' + i + '">Key</td> <td id="value' + i + '">Value</td> </tr>'
            // }

            // for (let i = 1; i < psets[3].HasProperties.length; i++) {

            document.getElementById("key" + i).innerHTML = psets[7].HasProperties[i].Name.value.substr(1) + ': ';
            document.getElementById("value" + i).innerHTML = psets[7].HasProperties[i].NominalValue.value.toFixed(3);

        }

        var array = getTableContent('resultTable');
        var title = part.Name.value;
        array = array.slice(7);

        plotChart(array, title);
    }

}}

// Highlight items when hovering over them
window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
document.getElementById("toggle-perspective").addEventListener('click',()=> {
    viewer.context.ifcCamera.toggleProjection();
});

document.getElementById("slice-object").addEventListener('click',()=>{

    viewer.clipper.toggle();
    if(viewer.clipper.active){
        window.onkeydown = (event) => {
            if (event.code === 'KeyC') {
                viewer.clipper.createPlane();
            } else if (event.code === 'Delete') {
                viewer.clipper.deletePlane();
            }
        };
    }
});






function colormap(value) {
    value = Math.trunc(value);
    if (value >= 0) {
        value = value + 1;
    }
    color = 0x000000;
    switch (value) {
        case -5.0:
            color = 0x0000FF;
            break;
        case -4.5:
            color = 0x1919FF;
            break;
        case -4.0:
            color = 0x3232FF;
            break;
        case -3.5:
            color = 0x4B4BFF;
            break;
        case -3.0:
            color = 0x6464FF;
            break;
        case -2.5:
            color = 0x7D7DFF;
            break;
        case -2.0:
            color = 0x9696FF;
            break;
        case -1.5:
            color = 0xAFAFFF;
            break;
        case -1.0:
            color = 0xC8C8FF;
            break;
        case -0.5:
            color = 0xE1E1FF;
            break;
        case 0.00:
            color = 0xFFFFFF;
            break;
        case 0.5:
            color = 0xFFE1E1;
            break;
        case 1.0:
            color = 0xFFC8C8;
            break;
        case 1.5:
            color = 0xFFAFAF;
            break;
        case 2.0:
            color = 0xFF9696;
            break;
        case 2.5:
            color = 0xFF7D7D;
            break;
        case 3.0:
            color = 0xFF6464;
            break;
        case 3.5:
            color = 0xFF4B4B;
            break;
        case 4.0:
            color = 0xFF3232;
            break;
        case 4.5:
            color = 0xFF1919;
            break;
        case 5.0:
            color = 0xFF0000;
            break;

    }
    return color;
}

async function change() {

    var part = await viewer.IFC.getProperties(pickeditem.modelID, pickeditem.id, true, true);

    var psets = part.psets;
    var value = parseInt(document.getElementById('range').value) + 8;

    SARValue = psets[3].HasProperties[value].NominalValue.value;
    color = colormap(SARValue);

    viewer.IFC.loader.ifcManager.removeSubset(pickeditem.modelID, viewer.IFC.selector.defSelectMat);
    viewer.IFC.loader.ifcManager.removeSubset(pickeditem.modelID, material);
    material = new MeshLambertMaterial({
        transparent: true,
        opacity: 0.8,
        color: color,
        depthTest: false
    })

    viewer.IFC.loader.ifcManager.createSubset({
        modelID: pickeditem.modelID,
        ids: [pickeditem.id],
        material: material,
        removePrevious: true,
        scene: viewer.context.getScene()

    })

    document.getElementById('tag').innerHTML = psets[3].HasProperties[value].Name.value;
    // console.log(subset)
}

/**
 * Iterate through the table contents to return an array
 * @param  Int   Table id
 * @return Array
 */
function getTableContent(id) {
    var mytable = document.getElementById(id);
    var data = [];
    for (var i = 0, rows = mytable.rows.length; i < rows; i++) {
        for (var j = 0, cells = mytable.rows[i].cells.length; j < cells; j++) {
            if (!data[i]) {
                data[i] = new Array();
            }
            data[i][j] = mytable.rows[i].cells[j].innerHTML;
        }
    }
    return data;
}


function plotChart(array, title) {
    const labels = [];
    const dataArray = [];
    for (let i = 0; i < array.length; i++) {
        labels.push(array[i][0].substring(0, array[i][0].length - 2));
        dataArray.push(parseFloat(array[i][1]));

    }
    const data = {
        labels: labels,
        datasets: [{
            label: title,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataArray,
        }]
    };


    myChart.data = data;
    myChart.update();
    // const config = {
    //   type: 'line',
    //   data: data,
    //   options: {}
    // }
    // const myChart = new Chart(
    //   document.getElementById('myChart'),
    //   config
    // );

}
function sar_switch(){
    if (sarview == true){
        for (const subset of subsets_sar) {
            scene.add(subset);
        }
        sarview = false;
        document.getElementById("colorbar").style.visibility = "visible";
    }
    else {
        for (const subset of subsets_sar) {
                    subset.removeFromParent();
                }
        sarview = true;
        document.getElementById("colorbar").style.visibility = "hidden";
    }

}
async function SARView() {
    // if (sarview == true) {
        const allCategories = Object.values(categories);
        for (let i = 0; i < allCategories.length; i++) {
            const category = allCategories[i];
            await newSubsetOfType_sar(category);
        // }

    // } else {
    //     for (const subset of subsets_sar) {
    //         subset.removeFromParent();
    //     }
    //     sarview = true;
    }
}

async function newSubsetOfType_sar(category) {
    const ids = await getAll(category);
    switch (category) {
        case 1529196076:
            for (var i = 0; i < ids.length; i++) {
                part = await viewer.IFC.getProperties(0, ids[i], true, true);
                psets = part.psets;
                if (psets[3].HasProperties[7] != null) {
                    value = psets[3].HasProperties[7].NominalValue.value;
                    color = colormap(value);
                    material = new MeshLambertMaterial({
                        transparent: true,
                        opacity: 1,
                        color: color,
                        depthTest: false
                    })
                    var subset = viewer.IFC.loader.ifcManager.createSubset({
                        modelID: 0,
                        ids: [ids[i]],
                        material: material,
                        removePrevious: true,
                        // scene: scene

                    })
                    subsets_sar.push(subset);


                }
            }

            break;
        case 2391406946:
            for (var i = 0; i < ids.length; i++) {
                part = await viewer.IFC.getProperties(0, ids[i], true, true);
                psets = part.psets;
                if (psets[8].HasProperties[7] != null) {
                    value = psets[8].HasProperties[7].NominalValue.value;
                    color = colormap(value);
                    material = new MeshLambertMaterial({
                        transparent: true,
                        opacity: 0.6,
                        color: color,
                        depthTest: false
                    })
                    var subset = viewer.IFC.loader.ifcManager.createSubset({
                        modelID: 0,
                        ids: [ids[i]],
                        material: material,
                        removePrevious: true,
                        // scene: scene

                    })
                    subsets_sar.push(subset);
                }
            }
            break;
        case 2016517767:
            for (var i = 0; i < ids.length; i++) {
                part = await viewer.IFC.getProperties(0, ids[i], true, true);
                psets = part.psets;
                if (psets[7] != null) {
                    value = psets[7].HasProperties[7].NominalValue.value;
                    color = colormap(value);
                    material = new MeshLambertMaterial({
                        transparent: true,
                        opacity: 0.6,
                        color: color,
                        depthTest: false
                    })
                    var subset = viewer.IFC.loader.ifcManager.createSubset({
                        modelID: 0,
                        ids: [ids[i]],
                        material: material,
                        removePrevious: true,
                        // scene: scene

                    })
                    subsets_sar.push(subset);

                }
            }
            break;
    }

    async function creatSARSubset(category) {
        for (var i = 0; i < ids.length; i++) {
            value = await viewer.IFC.getProperties(0, ids[i]);
        }
    }

    // var material = new MeshLambertMaterial({
    //   transparent: true,
    //   opacity: 0.8,
    //   color: color,
    //   depthTest: false
    // });
    return viewer.IFC.loader.ifcManager.createSubset({
        modelID: 0,
        scene: viewer.context.getScene(),
        ids,
        removePrevious: true,
        customID: category.toString()
    })
}

function getName(category) {
    const names = Object.keys(categories);
    return names.find(name => categories[name] === category);
}

// Gets the IDs of all the items of a specific category
async function getAll(category) {
    const manager = viewer.IFC.loader.ifcManager;
    return manager.getAllItemsOfType(0, category, false);
}

// Creates a new subset containing all elements of a category
async function newSubsetOfType(category) {
    const ids = await getAll(category);

    return viewer.IFC.loader.ifcManager.createSubset({
        modelID: 0,
        scene: viewer.context.getScene(),
        ids,
        removePrevious: true,
        customID: category.toString()
    })
}


async function setupAllCategories(sarView) {
    const allCategories = Object.values(categories);
    for (let i = 0; i < allCategories.length; i++) {
        const category = allCategories[i];
        await setupCategory(category);
    }
}

// Creates a new subset and configures the checkbox
async function setupCategory(category) {
    subsets[category] = await newSubsetOfType(category);
    setupCheckBox(category);
}

// Sets up the checkbox event to hide / show elements
function setupCheckBox(category) {
    const name = getName(category);
    const checkBox = document.getElementById(name);
    checkBox.addEventListener('change', (event) => {
        const checked = event.target.checked;
        const subset = subsets[category];

        if (checked) scene.add(subset);
        else {
            subset.removeFromParent();
        }
    });
}

function categoriesShow() {
    if (document.getElementById("checkboxes").style.visibility == "visible") {
        document.getElementById("checkboxes").style.visibility = "hidden";
    } else document.getElementById("checkboxes").style.visibility = "visible";

}

function SARProperties() {
    if (document.getElementById("resultTable").style.visibility == "visible") {
        document.getElementById("resultTable").style.visibility = "hidden";
    } else document.getElementById("resultTable").style.visibility = "visible";
}
