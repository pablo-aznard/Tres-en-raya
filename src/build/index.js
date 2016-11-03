(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Cabecera = require('./Cabecera.jsx');
var Tablero = require('./Tablero.jsx');

var JugadorX = "jugador 1 - las X";
var Jugador0 = "jugador 2 - los 0";
var VALORES = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return {
			turno: JugadorX,
			valores: VALORES
		};
	},

	showAlert: function showAlert() {
		alert(this.state.turno + " ha ganado!");
	},

	winner: function winner() {
		var valores = this.state.valores;
		var win = false;
		var a = 0,
		    b = 0,
		    c = 0,
		    d = 0,
		    e = 0,
		    f = 0,
		    g = 0,
		    h = 0;
		// El 0 gana con +3 y la X gana con -3
		for (var i = 0; i < 3; i++) {
			if (valores[0][i] !== '-') a += valores[0][i] === "0" ? 1 : -1;
			if (valores[1][i] !== '-') b += valores[1][i] === "0" ? 1 : -1;
			if (valores[2][i] !== '-') c += valores[2][i] === "0" ? 1 : -1;
			if (valores[i][0] !== '-') d += valores[i][0] === "0" ? 1 : -1;
			if (valores[i][1] !== '-') e += valores[i][1] === "0" ? 1 : -1;
			if (valores[i][2] !== '-') f += valores[i][2] === "0" ? 1 : -1;
			if (valores[i][i] !== '-') g += valores[i][i] === "0" ? 1 : -1;
			if (valores[2 - i][i] !== '-') h += valores[2 - i][i] === "0" ? 1 : -1;
		}
		if (Math.abs(a) === 3 || Math.abs(b) === 3 || Math.abs(c) === 3 || Math.abs(d) === 3 || Math.abs(e) === 3 || Math.abs(f) === 3 || Math.abs(g) === 3 || Math.abs(h) === 3) return true;
		return false;
	},

	reset: function reset() {
		this.setState({
			turno: this.state.turno = JugadorX,
			valores: this.state.valores = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
		});
	},

	appClick: function appClick(numeroFila, numeroColumna) {
		var valores = this.state.valores;
		var nuevoValor = this.state.turno === JugadorX ? 'X' : '0';
		valores[numeroFila][numeroColumna] = nuevoValor;
		//cada vez que se hace un setState se ejecuta el render
		this.setState({
			turno: this.state.turno === JugadorX ? Jugador0 : JugadorX,
			valores: this.state.valores
		});
		if (this.winner()) {
			this.showAlert();
		}
	},

	render: function render() {
		var texto = "Turno del " + this.state.turno;
		return React.createElement(
			'div',
			null,
			React.createElement(Cabecera, { texto: texto }),
			React.createElement(Tablero, { valores: this.state.valores,
				manejadorTableroClick: this.appClick }),
			React.createElement(
				'button',
				{ onClick: this.reset },
				'Reiniciar partida'
			)
		);
	}
});

module.exports = App;

},{"./Cabecera.jsx":2,"./Tablero.jsx":4}],2:[function(require,module,exports){
"use strict";

var Cabecera = React.createClass({
	displayName: "Cabecera",

	render: function render() {
		return React.createElement(
			"header",
			{ className: "cabecera" },
			this.props.texto
		);
	}
});

module.exports = Cabecera;

},{}],3:[function(require,module,exports){
'use strict';

var casillaStyle = {
	height: '100px',
	width: '100px'
};

var Casilla = React.createClass({
	displayName: 'Casilla',

	casillaClick: function casillaClick() {
		if (this.props.valor === "-") {
			this.props.manejadorClick(this.props.indiceFila, this.props.indiceColumna);
		}
	},
	render: function render() {
		return React.createElement(
			'button',
			{
				style: casillaStyle,
				className: this.props.valor === "-" ? "clickable" : "no_clickable",
				onClick: this.casillaClick },
			this.props.valor
		);
	}
});

module.exports = Casilla;

},{}],4:[function(require,module,exports){
"use strict";

var Casilla = require("./Casilla.jsx");

var Tablero = React.createClass({
	displayName: "Tablero",

	tableroClick: function tableroClick(numeroFila, numeroColumna) {
		this.props.manejadorTableroClick(numeroFila, numeroColumna);
	},
	render: function render() {
		var tablero = this.props.valores.map(function (valoresFila, indiceFila) {
			var fila = valoresFila.map(function (valor, indiceColumna) {
				var mykey = "" + indiceFila + indiceColumna;
				return React.createElement(Casilla, { valor: valor, indiceFila: indiceFila,
					indiceColumna: indiceColumna, key: mykey, manejadorClick: this.tableroClick });
			}, this);
			return React.createElement(
				"div",
				null,
				fila
			);
		}, this);
		return React.createElement(
			"div",
			null,
			tablero
		);
	}
});

module.exports = Tablero;

},{"./Casilla.jsx":3}],5:[function(require,module,exports){
'use strict';

var App = require('./App.jsx');

ReactDOM.render(React.createElement(App, null), document.getElementById('contenedor'));

},{"./App.jsx":1}]},{},[5]);
