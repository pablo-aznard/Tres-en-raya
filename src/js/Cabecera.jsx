var React = require('react');
var ReactDOM = require('react-dom');

const cabeceraStyle = {
	width: '100%',
	marginTop: '2em',
	textAlign: 'center'
};

var Cabecera = React.createClass({
	render: function() {
		return (
			<header className="cabecera" style={cabeceraStyle}>
				{this.props.texto}
			</header>
		)
	}
});

module.exports = Cabecera;
