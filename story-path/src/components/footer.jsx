/**
 * This component is used to render the footer of the web page
 * It is imported to every page so it is always visible
 * The footer does not provide any navigation but displays important information.
 * @returns {JSX.Element}
 */
function Footer() {
  return (
    <footer className="bg-light text-center py-3">
      <div className="container-fluid">
        <p className="mb-0">&copy; 2024 Story Path. All Rights Reserved.</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <div className="text-muted">Privacy Policy</div>
          </li>
          <li className="list-inline-item">
            <div className="text-muted">Terms of Service</div>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
