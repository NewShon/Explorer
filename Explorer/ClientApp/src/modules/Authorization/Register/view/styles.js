export default styles => ({
	error: {
		marginBottom: 15,
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		width: 300,
		padding: 20,
		margin: 'auto',
	},
	input: {
		width: 300,
		marginBottom: 10,
		'&:after': {
			borderBottomColor: '3f51b5',
		},
	},
	button: {
		width: '100%',
	},
	image: {
		width: 300,
	},
});
