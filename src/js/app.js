//#region Imports
    import { updateDOM } from "./modules/DOMmanipulation.js";
    import { getData,postData,deleteData,putData,deleteCiudades} from "./modules/requests.js";
//#endregion

//#region classes
    class Departamento {
        constructor(nomDepartamento){
            this.nomDepartamento = nomDepartamento
        }
    }

    class coordenadas {
        constructor(lat,lon){
            this.lat = lat;
            this.lon = lon;
        }
    }

    class Ciudad {
        constructor(nomCiudad,departamentoId,imagen,coordenadas){
            this.nomCiudad = nomCiudad
            this.departamentoId = departamentoId;
            this.imagen = imagen;
            this.coordenadas = coordenadas;
        }
    }
//#endregion

//#region Document_vars
    const Add_Departamento_form = document.getElementById("Add_Departamento_form")
    const Add_Ciudad_form = document.getElementById("Add_Ciudad_form")

    const Delete_Departamento_form = document.getElementById("Delete_Departamento_form");
    const Delete_Ciudad_form = document.getElementById("Delete_Ciudad_form"); 

    const Departamento_Selector = document.getElementById("Departamento_Selector")
    const Delete_Departamento_Selector = document.getElementById("Delete_Departamento_Selector");
    const Delete_Ciudad_Selector = document.getElementById("Delete_Ciudad_Selector")

    const Edit_Departamento_form = document.getElementById("Edit_Departamento_form");
    const Edit_Departamento_Selector = document.getElementById("Edit_Departamento_Selector");

    const Edit_Ciudad_form = document.getElementById("Edit_Ciudad_form");
    const Edit_Ciudad_Selector = document.getElementById("Edit_Ciudad_Selector");

//#endregion 


//#region Events
    document.addEventListener("DOMContentLoaded",function(e){
        updateDOM()
    })

    Add_Departamento_form.addEventListener("submit",async function(e){
        e.preventDefault()

        let Departamentos_data = await getData("Departamentos")
        let input = document.querySelectorAll("#Add_Departamento_form input")[0]
        let new_Departamento = new Departamento (input.value)
        postData(new_Departamento,`Departamentos`)
        updateDOM()
        Add_Departamento_form.reset()
    })

    Add_Ciudad_form.addEventListener("submit",async function(e){
        e.preventDefault()
        let inputs = document.querySelectorAll("#Add_Ciudad_form input")
        let new_coords = new coordenadas(inputs[1].value,inputs[2].value)
        let new_Ciudad = new Ciudad(inputs[0].value,Departamento_Selector.value,(inputs[3].value == "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQojbnTiUCXwUX60dT0FZxbnUw0QAWgv8P_BQoSj0qLdA&s" : inputs[3].value),new_coords)
        postData(new_Ciudad,"Ciudades")
        updateDOM()
        Add_Ciudad_form.reset()
    })

    Delete_Departamento_form.addEventListener("submit",async function(e){
        e.preventDefault()
        deleteData(`Departamentos/${Delete_Departamento_Selector.value}`)
        deleteCiudades(Delete_Departamento_Selector.value)
    })  

    Delete_Ciudad_form.addEventListener("submit",async function(e){
            e.preventDefault()
            console.log(Delete_Ciudad_Selector)
            deleteData(`Ciudades/${Delete_Ciudad_Selector.value}`)
            updateDOM()
    })

    Edit_Departamento_form.addEventListener("submit",async function(e){
        e.preventDefault()
        let dep_data = await getData(`Departamentos/${Edit_Departamento_Selector.value}`);
        let input = document.querySelectorAll("#Edit_Departamento_form input")[0].value
        dep_data["nomDepartamento"] = input
        putData(dep_data,`Departamentos/${Edit_Departamento_Selector.value}`)
    })

    Edit_Ciudad_form.addEventListener("submit",async function(e){
        e.preventDefault()
        let ciudad_data = await getData(`Ciudades/${Edit_Ciudad_Selector.value}`);
        let inputs = document.querySelectorAll("#Edit_Ciudad_form input")
        let new_coords = new coordenadas (inputs[1].value,inputs[2].value)
        ciudad_data["nomCiudad"] = inputs[0].value
        ciudad_data["imagen"] = (inputs[3].value == "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQojbnTiUCXwUX60dT0FZxbnUw0QAWgv8P_BQoSj0qLdA&s" : inputs[3].value)
        ciudad_data["coordenadas"] = new_coords
        putData(ciudad_data,`Ciudades/${Edit_Ciudad_Selector.value}`)
    })
//#endregion