function comprarHorasDeVuelo() {
    const precioHorasDeVuelo = 115;

    const nombre = prompt("Ingrese su nombre:");

    if (nombre) {
      let horasDeseadas;
      let horasValidas = false;
  
      while (!horasValidas) {
        horasDeseadas = parseInt(prompt("¿Cuántas horas de vuelo desea comprar, " + nombre + "?"));
  
        if (!isNaN(horasDeseadas) && horasDeseadas > 0) {
          horasValidas = true;
        } else {
          alert("Ingrese un número válido de horas de vuelo, " + nombre + ".");
        }
      }
  
      const costoTotal = precioHorasDeVuelo * horasDeseadas;
  
      alert("Bueno, " + nombre + "! El costo total por " + horasDeseadas + " horas de vuelo es de $" + costoTotal);
  
      let montoPagado = 0;
  
      while (montoPagado < costoTotal) {
        const montoParcial = parseFloat(prompt("Ingrese la cantidad de dinero que pagará, " + nombre + ":"));
  
        if (!isNaN(montoParcial) && montoParcial > 0) {
          montoPagado += montoParcial;
  
          if (montoPagado < costoTotal) {
            const montoRestante = costoTotal - montoPagado;
            alert("Monto insuficiente, no seas rata " + nombre + ". Debe pagar $" + montoRestante + " adicionales para completar el costo total.");
          }
        } else {
          alert("Ingrese un monto válido, " + nombre + ".");
        }
      }
  
      const vuelto = montoPagado - costoTotal;
      alert("¡Gracias por tu compra, " + nombre + "! Tu vuelto es de $" + vuelto);
    } else {
      alert("Por favor, ingrese su nombre.");
    }
  }
  
  comprarHorasDeVuelo();