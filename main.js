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
    mostrarMensaje("Por favor, ingrese su nombre.");
    return;
  }

  const horasDeseadasDiv = document.getElementById("horasDeseadas");
  horasDeseadasDiv.style.display = "block";
  document.getElementById("btnIngresarHoras").disabled = true;
}

function calcularTotal() {
  const cantidadHoras = parseInt(document.getElementById("cantidadHoras").value);

  if (!cantidadHoras || isNaN(cantidadHoras) || cantidadHoras <= 0) {
    mostrarMensaje("Ingrese una cantidad válida de horas de vuelo.");
    return;
  }

  const precioHorasDeVuelo = 115;
  const total = precioHorasDeVuelo * cantidadHoras;

  alert("El total a pagar por " + cantidadHoras + " horas de vuelo es de $" + total);

  const pagoDiv = document.getElementById("pago");
  pagoDiv.style.display = "block";
  document.getElementById("btnCalcularTotal").disabled = true;
}

let cliente;

function realizarPago() {
  const cantidadPago = parseFloat(document.getElementById("cantidadPago").value);

  if (!cantidadPago || isNaN(cantidadPago) || cantidadPago <= 0) {
    mostrarMensaje("Ingrese una cantidad válida de pago.");
    return;
  }

  if (!cliente) {
    const cantidadHoras = parseInt(document.getElementById("cantidadHoras").value);
    const precioHorasDeVuelo = 115;
    const total = precioHorasDeVuelo * cantidadHoras;
    cliente = new Cliente("", cantidadHoras, total);
  }

  const montoPagadoTotal = sumarMontos(cliente.montosPagados);
  const saldoPendiente = cliente.costoTotal - montoPagadoTotal;

  if (cantidadPago > saldoPendiente) {
    mostrarMensaje("El monto pagado supera el costo pendiente.");
    return;
  }

  cliente.montosPagados.push(cantidadPago);
  guardarClienteEnStorage(cliente);

  if (montoPagadoTotal + cantidadPago === cliente.costoTotal) {
    alert("Gracias por tu compra. ¡Disfruta de tus horas de vuelo!");
  } else {
    const vuelto = saldoPendiente - cantidadPago;
    alert("Gracias por tu compra. Tu vuelto es de $" + vuelto.toFixed(2));
  }

  document.getElementById("pago").style.display = "none";
}

function sumarMontos(montos) {
  return montos.reduce((acc, val) => acc + val, 0);
}

function guardarClienteEnStorage(cliente) {
  localStorage.setItem("cliente", JSON.stringify(cliente));
}

function obtenerClienteDeStorage() {
  const clienteJSON = localStorage.getItem("cliente");
  return clienteJSON ? JSON.parse(clienteJSON) : null;
}

window.onload = function () {
  const clienteGuardado = obtenerClienteDeStorage();
  if (clienteGuardado) {
    cliente = clienteGuardado;
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("cantidadHoras").value = cliente.horasDeseadas;
    document.getElementById("cantidadPago").focus();
  }
};

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

