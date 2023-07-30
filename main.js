class Cliente {
  constructor(nombre, horasDeseadas, costoTotal) {
    this.nombre = nombre;
    this.horasDeseadas = horasDeseadas;
    this.costoTotal = costoTotal;
    this.montosPagados = [];
  }
}

function comprarHorasDeVuelo() {
  const precioHorasDeVuelo = 115;

  const nombre = document.getElementById("nombre").value;

  if (!nombre) {
    alert("Por favor, ingrese su nombre.");
    return;
  }

  let horasDeseadas = obtenerHorasDeseadas(nombre);
  const costoTotal = precioHorasDeVuelo * horasDeseadas;

  alert("Total a pagar por " + horasDeseadas + " horas de vuelo es de $" + costoTotal);

  const cliente = new Cliente(nombre, horasDeseadas, costoTotal);

  while (sumarMontos(cliente.montosPagados) < cliente.costoTotal) {
    const montoParcial = obtenerMontoParcial(cliente.nombre);

    if (montoParcial > 0) {
      cliente.montosPagados.push(montoParcial);

      const montoPagado = sumarMontos(cliente.montosPagados);
      if (montoPagado < cliente.costoTotal) {
        const montoRestante = cliente.costoTotal - montoPagado;
        alert("Monto insuficiente, no seas tacaño " + cliente.nombre + ". Debe pagar $" + montoRestante + " adicionales para completar el costo total.");
      }
    } else {
      alert("Ingrese un monto válido, " + cliente.nombre + ".");
    }
  }

  const montoPagadoTotal = sumarMontos(cliente.montosPagados);
  const vuelto = montoPagadoTotal - cliente.costoTotal;
  alert("¡Gracias por tu compra, " + cliente.nombre + "! Tu vuelto es de $" + vuelto);
}

function obtenerHorasDeseadas(nombre) {
  let horasDeseadas;
  let horasValidas = false;

  while (!horasValidas) {
    horasDeseadas = parseInt(prompt("¿Cuántas horas de vuelo deseas comprar, " + nombre + "?"));

    if (!isNaN(horasDeseadas) && horasDeseadas > 0) {
      horasValidas = true;
    } else {
      alert("Ingrese un número válido de horas de vuelo, " + nombre + ".");
    }
  }

  return horasDeseadas;
}

function obtenerMontoParcial(nombre) {
  const montoParcial = parseFloat(prompt("Ingrese la cantidad de dinero que pagará, " + nombre + ":"));

  if (!isNaN(montoParcial) && montoParcial > 0) {
    return montoParcial;
  } else {
    return 0;
  }
}

function sumarMontos(montos) {
  return montos.reduce((acc, val) => acc + val, 0);
}