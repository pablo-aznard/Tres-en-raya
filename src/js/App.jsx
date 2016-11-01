const Cabecera = require('./Cabecera.jsx');
const Tablero = require('./Tablero.jsx');

const JugadorX = "jugador 1 - las X";
const Jugador0 = "jugador 2 - los 0";
const VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

var App = React.createClass({
	getInitialState: function(){
		return{
			turno: JugadorX,
			valores: VALORES
		};
	},

	showAlert:function(){
		 alert(this.state.turno+" ha ganado!");
	},

	winner: function () {
		console.log("winner function");
		let valores = this.state.valores;
		var win = false;
		var a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0;
		// El 0 gana con +3 y la X gana con -3
		for (var i = 0; i < 3; i++) {
			console.log(a,b,c,d,e,f,g);
			console.log(valores[0][i])
			if (valores[0][i] !== '-') a += (valores[0][i] === "0") ? 1 : -1;
			if (valores[1][i] !== '-') b += (valores[1][i] === "0") ? 1 : -1;
			if (valores[2][i] !== '-') c += (valores[2][i] === "0") ? 1 : -1;
			if (valores[i][0] !== '-') d += (valores[i][0] === "0") ? 1 : -1;
			if (valores[i][1] !== '-') e += (valores[i][1] === "0") ? 1 : -1;
			if (valores[i][2] !== '-') f += (valores[i][2] === "0") ? 1 : -1;
			if (valores[i][i] !== '-') g += (valores[i][i] === "0") ? 1 : -1;
			if (valores[2-i][i] !== '-') h += (valores[2-i][i] === "0") ? 1 : -1;
		}
		if (Math.abs(a) === 3 || Math.abs(b) === 3 || Math.abs(c) === 3 || Math.abs(d) === 3
		 || Math.abs(e) === 3 || Math.abs(f) === 3 || Math.abs(g) === 3 || Math.abs(h) === 3)
			return true;
		return false;
	},

	appClick: function (numeroFila, numeroColumna){
		let valores = this.state.valores;
		let nuevoValor = this.state.turno === JugadorX ? 'X' : '0';
		valores[numeroFila][numeroColumna] = nuevoValor;
		this.setState({
			turno: this.state.turno === JugadorX ? Jugador0 : JugadorX,
			valores: this.state.valores
		});
		if (this.winner()) {
			this.showAlert();
		}
	},

	render: function(){
		var texto = "Turno del " +this.state.turno;
		return (
			<div>
				<Cabecera texto={texto}/>
				<Tablero valores={this.state.valores}
					manejadorTableroClick={this.appClick}/>
			</div>
		)
	}
});

module.exports = App;
