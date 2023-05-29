import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error : unknown = useRouteError();

  let errorMessage : string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'An unexpected error has occurred.'; }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-red-600">
        <div id="error-page">
          <h1 className="lg:text-6xl font-bold text-2xl text-white">Oops!</h1>
          <p className="text-xl text-white">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-3xl text-white font-bold">
            {errorMessage}
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="px-5 py-2 bg-white rounded-md hover:bg-gray-100"
            >
              Accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}