import React from "react";
import { Link } from "react-router-dom"; 

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="text-danger">Oops! Something went wrong.</h1>
      <p className="lead">We couldn't find the page you're looking for.</p>
      <p>
        <strong>Error 404: Page Not Found</strong>
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
