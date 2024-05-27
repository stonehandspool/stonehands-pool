function PageNotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="notification is-warning">
              <h1 className="title is-1 has-text-centered">
                Error: Page Not Found
              </h1>
              <p className="has-text-centered">
                Oops, looks like this page doesn't exist! Sorry about that!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
