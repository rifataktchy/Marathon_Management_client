import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className=" text-white py-10">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center items-center mb-8">
          <img className="h-20 w-20 rounded-full" src={logo} alt="Logo" />
          <p className='font-bold'>Marathon Management System</p>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Column 1: About */}
          <div>
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <p className="text-sm">
            Marathon Management System make meaningful connections. Marathon Management System will help yu to find marathon events.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="/" className="hover:underline">Marathonss</a>
              </li>
              <li>
                <a href="/" className="hover:underline">Signup</a>
              </li>
              <li>
                <a href="/" className="hover:underline">Details</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">
              Have any questions or want to get involved? Reach out to us at:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://facebook.com" className="text-white hover:underline">www.facebook.com</a>
              </li>
              <li>
                <a href="mailto:support@clothdonations.com" className="text-white hover:underline">support@events.com</a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-white hover:underline">+1 234 567 89000</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Marathon Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
