import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export const Error = () => {
  const error = useRouteError();
  console.log(error);

  // TODO: Resolver error for pages
  return (
    <div>
      <h1>Woops! You have any error!</h1>
      <p>Sorry guy!</p>
      <p>
        <i>
          {isRouteErrorResponse(error)
            ? error.statusText || error.error?.message
            : "I am sorry!"}
        </i>
      </p>
      <Link to="/">Go to home</Link>
    </div>
  );
};
