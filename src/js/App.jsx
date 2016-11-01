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

	appClick: function (numeroFila, numeroColumna){
		let valores = this.state.valores;
		let nuevoValor = this.state.turno === JugadorX ? 'X' : '0';
		valores[numeroFila][numeroColumna] = nuevoValor;
		this.setState({
			turno: this.state.turno === JugadorX ? Jugador0 : JugadorX,
			valores: this.state.valores
		});
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