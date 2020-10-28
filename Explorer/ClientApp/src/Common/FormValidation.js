export const validatePassword = password => {
	return !password || password.length < 5
		? 'Field must contain at least 6 characters'
		: undefined;
};

export const validateMatchPassword = (password, allInputs) => {
	return password === allInputs.password
		? undefined
		: 'Password does not match';
};

export const validateSimpleField = field => {
	return field ? undefined : 'Field must not be empty';
};

export const validateYear = year => {
	const currentYear = new Date().getFullYear();
	return year > 1888 && year < currentYear + 2
		? undefined
		: 'Field is incorrect';
};
