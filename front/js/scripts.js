document.addEventListener("DOMContentLoaded", (e) => {
  pintar();
  agregarAlumno();
  // mostrarAlmacenes();
  // mostrarContenedores();
  // mostrarPeriodos();
  // mostrarEstaciones();
  // mostraralmacenesPeriodos();
  // mostrarContenedorEstacion();
  // mostrarEstacionAlmacen();
  // mostrarEstacionAlmacenPeriodo();
  // mostraGraficos();
});

// OBTENER DATA
async function getData(url) {
  return (await fetch(url)).json();
}
//*  ALMACEN */
async function getAlumno() {
  try {
    let alumnos = [];
    let url = "http://localhost/ejb-prueba/backend/api/alumno.php";
    alumnos = await getData(url);

    return alumnos;
  } catch (error) {
    console.log("Error");
    console.log(e);
  }
}

async function pintar() {
  let data = await getAlumno();
  let body = "";
  let number = document.querySelector(".numberAlumno");
  number.innerText = data.length;
  for (let i = 0; i < data.length; i++) {
    body += `<tr><td>${data[i].al1_codigo}</td><td>${data[i].al1_cnombres}</td><td>${data[i].al1_cpaterno}</td>
              <td>${data[i].al1_cmaterno}</td><td>${data[i].al1_cdireccion}</td><td>${data[i].al1_fecha}</td><td>${data[i].al1_nedad}</td>        

              <td>
              <a href="#editEmployeeModal" class="edit" data-toggle="modal"
                ><i
                  class="material-icons"
                  data-toggle="tooltip"
                  title="Edit"
                  >&#xE254;</i
                ></a
              >
              <a
                href="#deleteEmployeeModal"
                class="delete"
                data-toggle="modal"
                ><i
                  class="material-icons"
                  data-toggle="tooltip"
                  title="Delete"
                  >&#xE872;</i
                ></a
              >
            </td>
               </tr>`;
  }

  document.getElementById("almacenes").innerHTML = body;
  eliminarAlumno();
  editarAlumno();
}

function agregarAlumno() {
  const idAdd = document.getElementById("addAlumno");
  const form = document.querySelector(".formAddAlumno");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let datos = new FormData(form);
    datos.append("METHOD", "POST");

    try {
      let response = await fetch(
        "http://localhost/ejb-prueba/backend/api/alumno.php",
        {
          method: "POST",
          body: datos,
        }
      );

      let data = await response.text();
      console.log(data);

      location.replace("http://localhost/ejb-prueba/front/alumno.html");
    } catch (error) {
      console.log(e);
    }
  });
}

//ELIMINAR ALMACEN
async function eliminarNow(id_alumno, url) {
  try {
    let urlEliminar = url + `?al1_codigo=${id_alumno}`;
    let datos = new FormData();
    datos.append("METHOD", "DELETE");
    let response = await fetch(urlEliminar, {
      method: "POST",
      body: datos,
    });
    let data = await response.text();

    location.replace("http://localhost/ejb-prueba/front/alumno.html");
  } catch (e) {
    console.log(e);
  }
}

async function eliminarAlumno() {
  const botonDelete = document.querySelectorAll(".delete");
  let id_alumno = "";
  let url = `http://localhost/ejb-prueba/backend/api/alumno.php`;
  for (let i = 0; i < botonDelete.length; i++) {
    botonDelete[i].addEventListener("click", (e) => {
      id_alumno = "";
      id_alumno = e.path[3].children[0].innerText;
      let eliminar = document.getElementById("eliminarAlumno");

      let confirmar = false;
      eliminar.addEventListener("click", async (e) => {
        e.preventDefault();

        let del = await eliminarNow(id_alumno, url);
      });
    });
  }
}

// ACTUALIZAR ALMACEN
async function actualizarNow(form, url) {
  try {
    let response = await fetch(url, {
      method: "POST",
      body: form,
    });
    let data = await response.text();

    location.replace("http://localhost/ejb-prueba/backend/api/alumno.php");
  } catch (e) {
    console.log(e);
  }
}

async function editarAlumno() {
  const botonUpdate = document.querySelectorAll(".edit");

  for (let i = 0; i < botonUpdate.length; i++) {
    botonUpdate[i].addEventListener("click", (e) => {
      let id2 = "";
      let nombres2 = "";
      let paterno2 = "";
      let materno2 = "";
      let direccion2 = "";
      let fecha2 = "";
      let edad2 = "";
      // let nombres = "";
      // let paterno = "";
      // let materno = "";
      // let direccion = "";
      // let fecha = "";
      // let edad = "";

      let id = document.getElementById("editId");
      let nombres = document.getElementById("editnombres");
      let paterno = document.getElementById("editpaterno");
      let materno = document.getElementById("editmaterno");
      let direccion = document.getElementById("editdireccion");
      let fecha = document.getElementById("editfecha");
      let edad = document.getElementById("editcantidad");

      if (e.target.tagName === "A") {
        id2 = e.path[2].children[0].innerText;
        nombres2 = e.path[2].children[1].innerText;
        paterno2 = e.path[2].children[2].innerText;
        materno2 = e.path[2].children[3].innerText;
        direccion2 = e.path[2].children[4].innerText;
        fecha2 = e.path[2].children[5].innerText;
        edad2 = e.path[2].children[6].innerText;
      } else {
        id = e.path[3].children[0].innerText;
        n_alm = e.path[3].children[1].innerText;
        cant_alm = e.path[3].children[2].innerText;
      }
      console.log(id2);
      id.value = id2;
      nombres = nombres2;
      paterno = paterno2;
      materno = materno2;
      direccion = direccion2;
      fecha = fecha2;
      edad = edad2;

      let formActualizar = document.getElementById("actualizarAlmacen");

      formActualizar.addEventListener("submit", async (e) => {
        e.preventDefault();
        let datos = [];
        datos = new FormData(formActualizar);

        datos.append("METHOD", "PUT");
        let url = `http://localhost/ejb-prueba/backend/api/alumno.php`;
        let del = await actualizarNow(datos, url);
      });
    });
  }
}
//** TABLAS */
const contenedores = document.querySelector(".tablaContenedor");
const almacenes = document.querySelector(".tablaAlmacen");
const periodos = document.querySelector(".tablaPeriodo");
const estaciones = document.querySelector(".tablaEstacion");
const almacenPeriodo = document.querySelector(".tablaAlmacenPeriodo");
const contenedorEstacion = document.querySelector(".tablaContenedorEstacion");
const estacionAlmacen = document.querySelector(".tablaEstacionAlmacen");
const estacionAlmacenPeriodo = document.querySelector(
  ".tablaEstacionAlmacenPeriodo"
);
const grafico = document.querySelector(".tablaGraficos");

/** BOTONES */
const btnContenedores = document.getElementById("v-pills-contenedor-tab");
const btnAlmacenes = document.getElementById("v-pills-almacen-tab");
const btnPeriodos = document.getElementById("v-pills-periodo-tab");
const btnEstaciones = document.getElementById("v-pills-estacion-tab");
const btnAlmacenPeriodo = document.getElementById("v-pills-almacenperiodo-tab");
const btnContenedorEstacion = document.getElementById(
  "v-pills-contenedorestacion-tab"
);
const btnEstacionAlmacen = document.getElementById(
  "v-pills-estacionalmacen-tab"
);
const btnEstacionAlmacenPeriodo = document.getElementById(
  "v-pills-estacionalmacenperiodo-tab"
);
const btnGrafico = document.getElementById("v-pills-grafico-tab");

/**  NAVEGAR POR BOTONES **/
function mostrarAlmacenes() {
  btnAlmacenes.addEventListener("click", () => {
    if (almacenes.classList.contains("none")) {
      pintar();
    }
    almacenes.classList.remove("none");
    contenedores.classList.add("none");
    periodos.classList.remove("none");
    periodos.classList.add("none");
    estaciones.classList.add("none");
    almacenPeriodo.classList.add("none");
    contenedorEstacion.classList.add("none");
    estacionAlmacen.classList.add("none");
    estacionAlmacenPeriodo.classList.add("none");
    grafico.classList.add("none");
  });
}

function mostrarContenedores() {
  btnContenedores.addEventListener("click", () => {
    if (contenedores.classList.contains("none")) {
      pintarContenedor();
    }
    contenedores.classList.remove("none");
    almacenes.classList.add("none");
    periodos.classList.remove("none");
    periodos.classList.add("none");
    estaciones.classList.add("none");
    almacenPeriodo.classList.add("none");
    contenedorEstacion.classList.add("none");
    estacionAlmacen.classList.add("none");
    estacionAlmacenPeriodo.classList.add("none");
    grafico.classList.add("none");
  });
}

function mostrarPeriodos() {
  btnPeriodos.addEventListener("click", () => {
    if (periodos.classList.contains("none")) {
      pintarPeriodo();
    }
    almacenes.classList.add("none");
    contenedores.classList.add("none");
    periodos.classList.remove("none");
    estaciones.classList.add("none");
    almacenPeriodo.classList.add("none");
    contenedorEstacion.classList.add("none");
    estacionAlmacen.classList.add("none");
    estacionAlmacenPeriodo.classList.add("none");
    grafico.classList.add("none");
  });
}

function mostrarEstaciones() {
  btnEstaciones.addEventListener("click", () => {
    if (almacenPeriodo.classList.contains("none")) {
      pintarEstacion();
    }
    almacenes.classList.add("none");
    contenedores.classList.add("none");
    periodos.classList.add("none");
    estaciones.classList.remove("none");
    almacenPeriodo.classList.add("none");
    contenedorEstacion.classList.add("none");
    estacionAlmacen.classList.add("none");
    estacionAlmacenPeriodo.classList.add("none");
    grafico.classList.add("none");
  });
}

function mostraralmacenesPeriodos() {
  btnAlmacenPeriodo.addEventListener("click", () => {
    if (almacenPeriodo.classList.contains("none")) {
      pintarAlmacenPeriodo();
    }
    almacenes.classList.add("none");
    contenedores.classList.add("none");
    periodos.classList.add("none");
    estaciones.classList.add("none");
    almacenPeriodo.classList.remove("none");
    contenedorEstacion.classList.add("none");
    estacionAlmacen.classList.add("none");
    estacionAlmacenPeriodo.classList.add("none");
    grafico.classList.add("none");
  });
}
function mostrarContenedorEstacion() {
  btnContenedorEstacion.addEventListener("click", () => {
    if (contenedorEstacion.classList.contains("none")) {
      pintarContenedorEstacion();
    }
    almacenes.classList.add("none");
    contenedores.classList.add("none");
    periodos.classList.add("none");
    estaciones.classList.add("none");
    almacenPeriodo.classList.add("none");
    contenedorEstacion.classList.remove("none");
    estacionAlmacen.classList.add("none");
    estacionAlmacenPeriodo.classList.add("none");
    grafico.classList.add("none");
  });
}
function mostrarEstacionAlmacen() {
  btnEstacionAlmacen.addEventListener("click", () => {
    if (estacionAlmacen.classList.contains("none")) {
      pintarEstacionAlmacen();
    }
    almacenes.classList.add("none");
    contenedores.classList.add("none");
    periodos.classList.add("none");
    estaciones.classList.add("none");
    almacenPeriodo.classList.add("none");
    contenedorEstacion.classList.add("none");
    estacionAlmacen.classList.remove("none");
    estacionAlmacenPeriodo.classList.add("none");
    grafico.classList.add("none");
  });
}
function mostrarEstacionAlmacenPeriodo() {
  btnEstacionAlmacenPeriodo.addEventListener("click", () => {
    if (estacionAlmacenPeriodo.classList.contains("none")) {
      pintarEstacionAlmacenPeriodo();
    }
    almacenes.classList.add("none");
    contenedores.classList.add("none");
    periodos.classList.add("none");
    estaciones.classList.add("none");
    almacenPeriodo.classList.add("none");
    contenedorEstacion.classList.add("none");
    estacionAlmacen.classList.add("none");
    estacionAlmacenPeriodo.classList.remove("none");
    grafico.classList.add("none");
  });
}

function mostraGraficos() {
  btnGrafico.addEventListener("click", () => {
    if (grafico.classList.contains("none")) {
      pintarDataGrafico1();
      pintarDataGrafico2();
    }
    almacenes.classList.add("none");
    contenedores.classList.add("none");
    periodos.classList.add("none");
    estaciones.classList.add("none");
    almacenPeriodo.classList.add("none");
    contenedorEstacion.classList.add("none");
    estacionAlmacen.classList.add("none");
    estacionAlmacenPeriodo.classList.add("none");
    grafico.classList.remove("none");
  });
}

/** CONTENEDORES  */
async function getContenedor() {
  try {
    let contenedores = [];
    let url = "http://localhost/projectio/backend/api/contenedor.php";
    contenedores = await getData(url);

    return contenedores;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function pintarContenedor() {
  let data = await getContenedor();
  let body = "";
  let number = document.querySelector(".numberContenedor");
  number.innerText = data.length;
  for (let i = 0; i < data.length; i++) {
    body += `<tr><td>${data[i].id_contenedores}</td><td>${data[i].n_cont}</td><td>${data[i].cap_c}</td><td>
              <a href="#editEmployeeModal" class="edit" data-toggle="modal"
                ><i
                  class="material-icons"
                  data-toggle="tooltip"
                  title="Edit"
                  >&#xE254;</i
                ></a
              >
              <a
                href="#deleteEmployeeModal"
                class="delete"
                data-toggle="modal"
                ><i
                  class="material-icons"
                  data-toggle="tooltip"
                  title="Delete"
                  >&#xE872;</i
                ></a
              >
            </td>
               </tr>`;
  }

  document.getElementById("contenedoresTable").innerHTML = body;
  // eliminarAlmacen();
  // editarAlmacen();
}

/** PERIODOS */
async function getPeriodo() {
  try {
    let periodo = [];
    let url = "http://localhost/projectio/backend/api/periodo.php";
    periodo = await getData(url);

    return periodo;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function pintarPeriodo() {
  let data = await getPeriodo();
  let body = "";
  let number = document.querySelector(".numberPeriodo");
  number.innerText = data.length;
  for (let i = 0; i < data.length; i++) {
    body += `<tr><td>${data[i].id_periodo}</td><td>${data[i].n_per}</td><td>
              <a href="#editEmployeeModal" class="edit" data-toggle="modal"
                ><i
                  class="material-icons"
                  data-toggle="tooltip"
                  title="Edit"
                  >&#xE254;</i
                ></a
              >
              <a
                href="#deleteEmployeeModal"
                class="delete"
                data-toggle="modal"
                ><i
                  class="material-icons"
                  data-toggle="tooltip"
                  title="Delete"
                  >&#xE872;</i
                ></a
              >
            </td>
               </tr>`;
  }

  document.getElementById("periodosTable").innerHTML = body;
  // eliminarAlmacen();
  // editarAlmacen();
}

/** ESTACIONES */
async function getEstacion() {
  try {
    let estacion = [];
    let url = "http://localhost/projectio/backend/api/estacion.php";
    estacion = await getData(url);

    return estacion;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function pintarEstacion() {
  let data = await getEstacion();
  let body = "";
  let number = document.querySelector(".numberPeriodo");
  number.innerText = data.length;
  for (let i = 0; i < data.length; i++) {
    body += `<tr><td>${data[i].id_estaciones}</td><td>${data[i].n_est}</td><td>${data[i].cap_m}</td><td>${data[i].cap_t}</td><td>
              <a href="#editEmployeeModal" class="edit" data-toggle="modal"
                ><i
                  class="material-icons"
                  data-toggle="tooltip"
                  title="Edit"
                  >&#xE254;</i
                ></a
              >
              <a
                href="#deleteEmployeeModal"
                class="delete"
                data-toggle="modal"
                ><i
                  class="material-icons"
                  data-toggle="tooltip"
                  title="Delete"
                  >&#xE872;</i
                ></a
              >
            </td>
               </tr>`;
  }

  document.getElementById("estacionesTable").innerHTML = body;
  // eliminarAlmacen();
  // editarAlmacen();
}

/** ALMACENES POR PERIODO */
async function getAlmacenPeriodo() {
  try {
    let almacenPeriodo = [];
    let url = "http://localhost/projectio/backend/api/almxper.php";
    almacenPeriodo = await getData(url);

    return almacenPeriodo;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function pintarAlmacenPeriodo() {
  let data = await getAlmacenPeriodo();
  let body = "";
  let number = document.querySelector(".numberAlmacenPeriodo");
  number.innerText = data.length;
  for (let i = 0; i < data.length; i++) {
    body += `<tr><td>${data[i].id_alper}</td><td>${data[i].n_alm}</td><td>${data[i].n_per}</td><td>${data[i].demanda}</td>
               </tr>`;
  }

  document.getElementById("almacenPeriodoTable").innerHTML = body;
  // eliminarAlmacen();
  // editarAlmacen();
}

/** CONTENEDOR POR ESTACION */
async function getContenedorEstacion() {
  try {
    let contenedorEstacion = [];
    let url = "http://localhost/projectio/backend/api/contxest.php";
    contenedorEstacion = await getData(url);

    return contenedorEstacion;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function pintarContenedorEstacion() {
  let data = await getContenedorEstacion();
  let body = "";
  let number = document.querySelector(".numberContenedorEstacion");
  number.innerText = data.length;
  for (let i = 0; i < data.length; i++) {
    body += `<tr><td>${data[i].id_cnest}</td><td>${data[i].n_cont}</td><td>${data[i].n_est}</td><td>${data[i].c_est}</td><td>${data[i].cost_est}</td></td><td>${data[i].X}</td>
               </tr>`;
  }

  document.getElementById("contenedorEstacionTable").innerHTML = body;
  // eliminarAlmacen();
  // editarAlmacen();
}

/** ESTACION POR ALMACEN */
async function getEstacionAlmacen() {
  try {
    let estacionAlmacen = [];
    let url = "http://localhost/projectio/backend/api/estxalm.php";
    estacionAlmacen = await getData(url);

    return estacionAlmacen;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function pintarEstacionAlmacen() {
  let data = await getEstacionAlmacen();
  let body = "";
  let number = document.querySelector(".numberEstacionAlmacen");
  number.innerText = data.length;
  for (let i = 0; i < data.length; i++) {
    body += `<tr><td>${data[i].id_esalm}</td><td>${data[i].n_est}</td><td>${data[i].n_alm}</td><td>${data[i].c_alm}</td><td>${data[i].cost_alm}</td>
               </tr>`;
  }

  document.getElementById("estacionAlmacenTable").innerHTML = body;
  // eliminarAlmacen();
  // editarAlmacen();
}

/** ESTACION POR ALMACEN POR PERIODO*/
async function getEstacionAlmacenPeriodo() {
  try {
    let estacionAlmacenPeriodo = [];
    let url = "http://localhost/projectio/backend/api/estxalmxper.php";
    estacionAlmacenPeriodo = await getData(url);

    return estacionAlmacenPeriodo;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function pintarEstacionAlmacenPeriodo() {
  let data = await getEstacionAlmacenPeriodo();
  let body = "";
  let number = document.querySelector(".numberEstacionAlmacenPeriodo");
  number.innerText = data.length;
  for (let i = 0; i < data.length; i++) {
    body += `<tr><td>${data[i].id_esalper}</td><td>${data[i].n_est}</td><td>${data[i].n_alm}</td><td>${data[i].n_per}</td><td>${data[i].Y}</td>
               </tr>`;
  }

  document.getElementById("estacionAlmacenPeriodoTable").innerHTML = body;
  // eliminarAlmacen();
  // editarAlmacen();
}

/** GRAFICOS */

async function getGrafico1() {
  try {
    let grafico1 = [];
    let url = "http://localhost/projectio/backend/api/grafico1.php";
    grafico1 = await getData(url);

    return grafico1;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function pintarDataGrafico1() {
  let data = await getGrafico1();
  let cont = [];
  let contFinal = [];
  let i = 0;

  for (let i = 0; i < data.length; i++) {
    let elemento = data[i].n_cont;
    if (!cont.includes(elemento)) {
      cont.push(elemento);
      contFinal.push([elemento]);
    }
  }

  for (let j = 0; j < contFinal.length; j++) {
    for (let i = 0; i < data.length; i++) {
      if (contFinal[j][0] == data[i].n_cont) {
        contFinal[j].push(data[i].x);
      }
    }
  }

  pintarGrafico(contFinal);
}

function pintarGrafico(data) {
  anychart.onDocumentReady(function () {
    // create data set on our data

    var chartData = {
      title: "Contenedor - Estacion",
      header: ["#", "EST1", "EST2", "EST3", "EST4", "EST5"],
      rows: data,
    };

    // create column chart
    var chart = anychart.column();

    // set chart data
    chart.data(chartData);

    // turn on chart animation
    chart.animation(true);

    chart.yAxis().labels().format("${%Value}{groupsSeparator: }");

    // set titles for Y-axis
    chart.yAxis().title("Revenue");

    chart
      .labels()
      .enabled(true)
      .position("center-top")
      .anchor("center-bottom")
      .format("${%Value}{groupsSeparator: }");
    chart.hovered().labels(false);

    // turn on legend and tune it
    chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0]);

    // interactivity settings and tooltip position
    chart.interactivity().hoverMode("single");

    chart
      .tooltip()
      .positionMode("point")
      .position("center-top")
      .anchor("center-bottom")
      .offsetX(0)
      .offsetY(5)
      .titleFormat("{%X}")
      .format("{%SeriesName} : ${%Value}{groupsSeparator: }");

    // set container id for the chart
    chart.container("grafico1");

    // initiate chart drawing
    chart.draw();
  });
}

/** GRAFICO 2 */

async function getGrafico2() {
  try {
    let grafico2 = [];
    let url = "http://localhost/projectio/backend/api/almacen.php";
    grafico2 = await getData(url);

    return grafico2;
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function pintarDataGrafico2() {
  let data = await getGrafico2();
  let contFinal = [];
  let i = 0;

  for (let i = 0; i < data.length; i++) {
    let fila = [];
    fila.push(data[i].n_alm);
    fila.push(data[i].cant_alm);
    contFinal.push(fila);
  }

  pintarGrafico2(contFinal);
}

function pintarGrafico2(data) {
  // create a data set
  var data = anychart.data.set(data);

  // create a chart
  var chart = anychart.bar();

  // create a bar series and set the data
  var series = chart.bar(data);

  // set the chart title
  chart.title("Almacenes");

  // set the titles of the axes
  chart.xAxis().title("Almacenes");
  chart.yAxis().title("Cantidad ");

  // set the container id
  chart.container("grafico2");

  // initiate drawing the chart
  chart.draw();
}
