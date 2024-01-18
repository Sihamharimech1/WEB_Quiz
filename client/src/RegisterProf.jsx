const RegisterProf = () => {
  
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [profId, setProfId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    const formData = { nom, profId, email, password };

    try {
      const response = await axios.post('http://localhost:3000/registerProf', formData);
      console.log(response.data);

      // Reset form fields
      setNom('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Your styling and JSX code remains the same

  return (
    <div className='all'>
      <div className='box'>
        <form onSubmit={handleSubmit}>
          <div className='unit'>
            <label htmlFor='nom'>Nom</label>
            <input type='text' id='nom' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} required />
          </div>
          <div className='unit'>
            <label htmlFor='profId'>Id Professionel</label>
            <input type='text' id='profId' name='profId' value={profId} onChange={(e) => setProfId(e.target.value)} required />
          </div>
          <div className='unit'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='unit'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='unit'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='unit'>
            <Button type='submit' disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div className='un'>
          <p>You already have an Account. Log in!</p>
          <Link to='/login'>
            <Button>Log in</Button>
          </Link>
        </div>
      </div>
    </div>
  );


}
 
export default RegisterProf;