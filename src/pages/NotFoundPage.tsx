import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 - Page not found</h2>
      <p>It seems you've reached a page that doesn't exist.</p>
      <Link to="/">Go back to the home page</Link>
    </div>
  )
}

export default NotFoundPage;