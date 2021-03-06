import {Button} from 'react-bootstrap';

var React = require('react');
var ReactDOM = require('react-dom');

const Cabecera = require('./Cabecera.jsx');
const Tablero = require('./Tablero.jsx');

const JugadorX = "jugador 1 - las X";
const Jugador0 = "jugador 2 - los 0";
const VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
const movimientos = 0;
var fin = 0;

const divStyle = {
	textAlign: 'center'
};
const resetStyle = {
	backgroundColor: '#A49494',
	color: 'white'
}

var App = React.createClass({
	getInitialState: function(){
		return{
			turno: JugadorX,
			valores: VALORES,
			movimientos: movimientos,
			fin: fin
		};
	},

	showAlert:function(){
		if (fin == 1)
			alert(this.state.turno+" ha ganado!");
	},

	winner: function () {
		let valores = this.state.valores;
		var win = false;
		var a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0;
		// El 0 gana con +3 y la X gana con -3
		for (var i = 0; i < 3; i++) {
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
		 || Math.abs(e) === 3 || Math.abs(f) === 3 || Math.abs(g) === 3 || Math.abs(h) === 3){
			 return true;
		}
		return false;
	},

	reset: function(){
		this.setState({
			turno: this.state.turno = JugadorX,
			valores: this.state.valores = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
			movimientos: this.state.movimientos = 0,
			fin: fin = 0
		});
	},

	appClick: function (numeroFila, numeroColumna){
		if (fin < 1) {
			let valores = this.state.valores;
			let nuevoValor = this.state.turno === JugadorX ? 'X' : '0';
			valores[numeroFila][numeroColumna] = nuevoValor;
			//cada vez que se hace un setState se ejecuta el render
			this.setState({
				turno: this.state.turno === JugadorX ? Jugador0 : JugadorX,
				valores: this.state.valores,
				movimientos: this.state.movimientos += 1
			});
			if (this.winner()) {
				fin += 1;
				this.showAlert();
			}
		}
	},

	render: function(){
		var texto = "Turno del " +this.state.turno;
		return (
			<div>
				<Cabecera texto={texto}/>
				<div style={divStyle}>Número de movimientos: {this.state.movimientos}</div>
				<Tablero valores={this.state.valores}
					manejadorTableroClick={this.appClick}/>
				<div style={divStyle}><Button style={resetStyle} onClick={this.reset}>Reiniciar partida</Button></div>
			</div>
		)
	}
});

module.exports = App;
