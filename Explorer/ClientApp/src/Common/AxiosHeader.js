import SessionService from '../Services/SessionService';

export default header => ({
	'Content-Type': 'application/json',
	Authorization: `Bearer ${SessionService.getItem('token')}`,
});
