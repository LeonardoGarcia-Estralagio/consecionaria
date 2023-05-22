const autos = require("./autos.json");
const personas = require("./personas.json");

const consesionaria = {
  autos,
  buscarAuto: function (patente) {
    return this.autos.find((auto) => auto.patente === patente) || null;
  },
  venderAuto: function (patente) {
    let auto = this.buscarAuto(patente);
    auto && (auto.vendido = true);
    return auto || "Auto no encontrado";
  },
  autosParaLaVenta: function () {
    return this.autos.filter((auto) => auto.vendido === false);
  },
  autosNuevos: function () {
    return this.autosParaLaVente().filter((auto) => auto.km < 100);
  },
  listaDeVentas: function () {
    return this.autos.filter((auto) => auto.vendido).map((auto) => auto.precio);
  },
  totalDeVentas: function () {
    return this.listaDeVentas().reduce((acum, num) => acum + num, 0);
  },
  puedeComprar: function (auto, persona) {
    return (
      auto.precio <= persona.capacidadDePagoTotal &&
      auto / auto.cuotas <= persona.capacidadDePagoEnCuotas
    );
  },
};
console.log(consesionaria.puedeComprar(autos[0], personas[3]));
