class Cliente {
  constructor(nombre, horasDeseadas, costoTotal) {
    this.nombre = nombre;
    this.horasDeseadas = horasDeseadas;
    this.costoTotal = costoTotal;
    this.montosPagados = [];
  }
}

function mostrarMensaje(mensaje) {
  alert(mensaje);
}

function obtenerHorasDeseadas() {
  const nombre = document.getElementById("nombre").value;

  if (!nombre) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingresa tu nombre por favor!',
    });
    return;
  }

  const horasDeseadasDiv = document.getElementById("horasDeseadas");
  horasDeseadasDiv.style.display = "block";
  document.getElementById("btnIngresarHoras").disabled = true;
}

function calcularTotal() {
  const cantidadHoras = parseInt(document.getElementById("cantidadHoras").value);

  if (!cantidadHoras || isNaN(cantidadHoras) || cantidadHoras <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingrese una cantidad válida de horas de vuelo!',
    });
    return;
  }

  const precioHorasDeVuelo = 115;
  const total = precioHorasDeVuelo * cantidadHoras;

  Swal.fire({
    title: "El total a pagar por " + cantidadHoras + " horas de vuelo es de $" + total,
    icon: "info",
    confirmButtonText: "Continuar"
  }).then((result) => {
    if (result.isConfirmed) {
      const pagoDiv = document.getElementById("pago");
      pagoDiv.style.display = "block";
      document.getElementById("btnCalcularTotal").disabled = true;
    }
  });
}

let cliente;

function realizarPago() {
  const cantidadPago = parseFloat(document.getElementById("cantidadPago").value);

  if (!cantidadPago || isNaN(cantidadPago) || cantidadPago <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingrese una cantidad válida de pago!',
    });
    return;
  }

  if (!cliente) {
    const nombre = document.getElementById("nombre").value;
    const cantidadHoras = parseInt(document.getElementById("cantidadHoras").value);
    const precioHorasDeVuelo = 115;
    const total = precioHorasDeVuelo * cantidadHoras;
    cliente = new Cliente(nombre, cantidadHoras, total);
  }

  const pagar = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const montoPagadoTotal = sumarMontos(cliente.montosPagados);
        const saldoPendiente = cliente.costoTotal - montoPagadoTotal;

        if (cantidadPago >= saldoPendiente) {
          const vuelto = cantidadPago - cliente.costoTotal;
          resolve(vuelto);
        } else {
          reject("Pago insuficiente. Aún tienes un saldo pendiente.");
        }
      }, 1000); // Simulamos una operación asincrónica con un retraso de 1 segundo
    });
  };

  pagar()
    .then((vuelto) => {
      Swal.fire("Gracias por tu compra. ¡Disfruta de tus horas de vuelo! Tu vuelto es de $" + vuelto.toFixed(2));
      cliente.montosPagados.push(cantidadPago);
      guardarEnHistorial(cliente);
      actualizarHistorial();

      // Mostrar el historial de compras después de completar la compra
      document.getElementById("historial").style.display = "block";
    })
    .catch((error) => {
      alert(error);
    });

  document.getElementById("pago").style.display = "none";
}

function sumarMontos(montos) {
  return montos.reduce((acc, val) => acc + val, 0);
}

function guardarEnHistorial(cliente) {
  const historial = obtenerHistorialDeStorage() || [];
  historial.push(cliente);
  localStorage.setItem("historial", JSON.stringify(historial));
}

function obtenerHistorialDeStorage() {
  const historialJSON = localStorage.getItem("historial");
  return historialJSON ? JSON.parse(historialJSON) : [];
}

window.onload = function () {
  const clienteGuardado = obtenerClienteDeStorage();
  if (clienteGuardado) {
    cliente = clienteGuardado;
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("cantidadHoras").value = cliente.horasDeseadas;
    document.getElementById("cantidadPago").focus();
  }

  actualizarHistorial();
};

function actualizarHistorial() {
  const historialLista = document.getElementById("historialLista");
  const historial = obtenerHistorialDeStorage();

  historialLista.innerHTML = "<h3>Historial de Compras</h3>";
  historial.forEach((cliente) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${cliente.nombre} - Compró: ${cliente.horasDeseadas} horas - Pagó: $${sumarMontos(cliente.montosPagados).toFixed(2)}`;
    historialLista.appendChild(listItem);
  });
}

function filtrarMontosMayoresA(cantidad) {
  if (!cliente) {
    mostrarMensaje("Aún no ha ingresado los detalles de compra.");
    return;
  }

  const montosMayores = cliente.montosPagados.filter(monto => monto > cantidad);
  mostrarMensaje("Montos mayores a $" + cantidad + ": " + montosMayores.join(", "));
}

function encontrarPrimerMontoMayorA(cantidad) {
  if (!cliente) {
    mostrarMensaje("Aún no ha ingresado los detalles de compra.");
    return;
  }

  const primerMontoMayor = cliente.montosPagados.find(monto => monto > cantidad);
  if (primerMontoMayor) {
    mostrarMensaje("Primer monto mayor a $" + cantidad + ": " + primerMontoMayor);
  } else {
    mostrarMensaje("No se encontró un monto mayor a $" + cantidad);
  }
}

// Nueva función para cargar datos con Ajax
function cargarDatosConAjax() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "data.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const clientesData = JSON.parse(xhr.responseText);
      const clientes = clientesData.map(clienteData => new Cliente(clienteData.nombre, clienteData.horasDeseadas, clienteData.costoTotal));
      console.log("Clientes cargados con Ajax:", clientes);
      // Realizar acciones con los datos cargados, por ejemplo:
      // - Mostrar los datos en la página
      // - Realizar cálculos
      // ...
    }
  };

  xhr.send();
}

// Nueva función para cargar datos con Fetch
function cargarDatosConFetch() {
  fetch("data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la solicitud Fetch");
      }
      return response.json();
    })
    .then(clientesData => {
      const clientes = clientesData.map(clienteData => new Cliente(clienteData.nombre, clienteData.horasDeseadas, clienteData.costoTotal));
      console.log("Clientes cargados con Fetch:", clientes);
      // Realizar acciones con los datos cargados, por ejemplo:
      // - Mostrar los datos en la página
      // - Realizar cálculos
      // ...
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

// Llamar a las funciones para cargar datos en respuesta a un evento (por ejemplo, clic de un botón)
document.getElementById("botonCargarDatos").addEventListener("click", () => {
  cargarDatosConAjax();
  cargarDatosConFetch();
});


