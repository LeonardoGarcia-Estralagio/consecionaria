const {writeFileSync} = require('fs')
const autos = require('./autos.json')

function guardarCambios(autos) {
    writeFileSync('./autos.json',JSON.stringify(autos, null, 3), 'utf-8')
}

const consesionaria = {
    autos,
    buscarAuto:function(patente) {
        return this.autos.find(auto => auto.patente === patente) || null
    },
    venderAuto:function(patente) {
        let auto = this.buscarAuto(patente)
        const autosModificados = this.autos.map(auto => {
            if(auto.patente === patente){
                auto.vendido = true
            }
            return auto
        })
        guardarCambios(autosModificados);
        
        return autosModificados.find(auto => auto.patente === patente)
    },
    autosParaLaVente: function() {
        return this.autos.filter(auto => auto.vendido === false)
    },
    autosNuevos:function() {
        return this.autosParaLaVente().filter(auto => auto.km < 100)
    }
}

console.log(consesionaria.autosNuevos());